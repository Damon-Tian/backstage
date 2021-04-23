<template>
    <div class="login">
        <l-input :option="{ label: '姓名' }" v-model:value="name"></l-input>
        <l-input :option="{ label: 'xxx', type: 'password' }" v-model:value="password"></l-input>
    </div>
</template>

<script>
import lInput from '@/components/loginInput/input.vue'
export default {
    components: { lInput },
    data() {
        return {
            name: '',
            password: '',
        }
    },
    computed: {
        routes() {
            return this.$store.state.routes.routes
        },
    },
    methods: {},
}
</script>
<style lang="less">
body {
    width: 100%;
    height: 100vh;
    background: no-repeat center/cover url('@/assets/back.jpeg');
}
.login {
    width: 300px;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
}
</style>
