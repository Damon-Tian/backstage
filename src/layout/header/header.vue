<template>
    <div class="d-header">
        <div class="d-header-top">
            <div class="toggle-leftBar">
                <i class="el-icon-s-fold"></i>
            </div>
            <div class="d-header-profile">
                <span>{{ name }}</span>
                <el-dropdown>
                    <div><el-image></el-image><i class="el-icon-arrow-down el-icon--right"></i></div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="d-header-breadcrumb">
            <el-breadcrumb separator="/">
                <template v-for="item in breadcrumb" :key="item.path">
                    <el-breadcrumb-item :to="{ path: item.path }">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
export default {
    setup() {},
    data() {
        return {
            breadcrumb: [],
            name: '',
        }
    },
    created() {
        this.name = this.$store.state.user.name
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
.d-header {
    height: 100%;
    .d-header-top {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .profile-image {
            width: 40px;
            height: 40px;
        }
    }
}
</style>
