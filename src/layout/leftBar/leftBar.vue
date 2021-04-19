<template>
    <el-menu
        :uniqueOpened="true"
        default-active="2"
        class="d-leftBar"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-submenu index="1" v-for="(item, index) in routes" :key="index">
            <!-- <template #title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template> -->
            <template #title>
                <i class="el-icon-location"></i>
                <span>首页</span>
            </template>
            <el-menu-item-group v-for="(itemChild, indexChild) in item.children" :key="indexChild">
                <router-link :to="itemChild.path || '/'">
                    <el-menu-item :index="itemChild.name">
                        {{ itemChild.name }}
                    </el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-submenu>
        <!--
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
        </el-menu-item> -->
    </el-menu>
</template>

<script>
export default {
    setup() {},
    data() {
        return {}
    },
    created() {
        // debugger
        console.log(this.$route, this.$router)
    },
    computed: {
        routes() {
            return this.$store.state.routes.routes.slice(0, 1)
        },
    },
    watch: {
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        $route: {
            handler(newValue, oldName) {
                const matched = Array.from(newValue.matched)
                matched.splice(0, 1)
                this.breadcrumb = matched
                console.log('in watch', newValue)
            },
            immediate: true,
        },
    },
}
</script>

<style lang="less" scoped>
.d-leftBar {
    min-height: 100vh;
    overflow: hidden;
    overflow-y: auto;
}
a {
    text-decoration: none;
}
</style>
