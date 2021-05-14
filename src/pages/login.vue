<template>
    <div class="backImg"></div>
    <div class="login">
        <l-input
            :option="{ label: '账号', icon: 'el-icon-user' }"
            v-model:value="username"
            @keydown.enter="login"
        ></l-input>
        <l-input
            :option="{ label: '密码', type: 'password', icon: 'el-icon-key' }"
            v-model:value="password"
            @keydown.enter="login"
        ></l-input>
        <div class="code">
            <l-input :option="{ label: '验证码' }" v-model:value="code"></l-input>
            <span class="code-img"> 1 2 1 2</span>
        </div>
        <el-button type="primary" @click="login" round class="login-button">登录</el-button>
        <div class="back"></div>
    </div>
</template>

<script>
import lInput from '@/components/loginInput/input.vue'
export default {
    components: { lInput },
    data() {
        return {
            username: '',
            password: '',
            code: '',
        }
    },
    methods: {
        async login() {
            let { username, password, code } = this

            if (username == '' || password == '') {
                this.$message.warning('账号、密码或验证码不能为空')
                return
            }
            let res = await this.$store.dispatch('user/login', { username, password })
            if (res) {
                this.$router.push('/')
            }
        },
    },
}
</script>
<style lang="less">
@backImg: '@/assets/back.jpeg';
// body {
//     margin: 0;
//     padding: 0;
// }
.backImg {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.82) no-repeat center/1920px 1080px url(@backImg);
}

.login {
    width: 300px;
    padding: 50px 50px 40px;
    box-sizing: content-box;
    // background-color: white;
    position: absolute;
    color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 35px 10px rgb(0 0 0 / 92%);
    .back {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        position: absolute;
        border-radius: 10px;
        background: no-repeat 50% 50% / 1920px 1080px url(@backImg);
        filter: blur(10px);
        z-index: -1;
        // background-image: linear-gradient(rgba(0, 0, 0, 0.62), rgba(255, 255, 255, 0.545));
    }
    > label {
        margin-bottom: 30px;
    }
    input {
        color: white;
    }
    .code {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .code-img {
            width: 90px;
            text-align: right;
        }
    }
    .login-button {
        margin-top: 15px;
        width: 100%;
    }
}
:deep(.el-notification) {
    color: red;
}
</style>
