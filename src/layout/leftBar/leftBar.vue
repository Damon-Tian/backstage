<template>
    <el-menu
        :default-active="defaultActive"
        :uniqueOpened="false"
        class="d-leftBar"
        background-color="#1e282c"
        text-color="#fff"
        :collapse="isCollapse"
    >
        <menu-group :menus="menus"></menu-group>
    </el-menu>
    <!-- active-text-color="#ffd04b" -->
</template>

<script>
import menuGroup from './components/menuGruop.vue'
export default {
    components: { menuGroup },
    setup() {},
    data() {
        return {
            defaultActive: '',
        }
    },
    created() {},
    computed: {
        menus() {
            const menus = this.$store.state.routes.routes[0].children
            return menus
        },
        isCollapse() {
            return this.$store.state.bread.isCollapse
        },
    },
    watch: {
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        $route: {
            handler(newValue, oldName) {
                const matched = Array.from(newValue.matched)
                if (!matched.length) {
                    this.$router.push('/404')
                    return
                }
                matched.splice(0, 1)
                this.breadcrumb = matched
                let lastPath = this.breadcrumb.slice(-1)
                this.defaultActive = lastPath[0].name
                this.$store.commit('bread/addBread', newValue)
            },
            immediate: true,
        },
    },
}
</script>

<style lang="less">
@shadowWidth: 8px;
.d-leftBar {
    min-height: 100vh;
    overflow: hidden;
    overflow-y: auto;
    &.el-menu {
        border: none;
        box-shadow: 2px 0px @shadowWidth 0px rgba(0, 0, 0, 0.22);
        width: calc(100% - @shadowWidth);
        transition: none;
    }
    // &:not(.el-menu--collapse) {
    //     width: 200px;
    // }
    // .el-menu-item:hover,
    // .is-active:hover,
    // .el-submenu__title:hover,
    // .el-menu-item:hover.is-active:hover {
    // background: rgba(255, 255, 255, 0.15) !important;
    // }
}
a {
    text-decoration: none;
}
</style>
