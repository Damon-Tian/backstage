<template>
    <div class="d-header">
        <div class="d-header-top">
            <div class="toggle-leftBar">
                <i class="el-icon-s-fold"></i>
                <el-breadcrumb separator="/">
                    <transition-group name="list" tag="span">
                        <template v-for="item in breadcrumb" :key="item.path">
                            <el-breadcrumb-item :to="{ path: item.path }" class="bread-item">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </template>
                    </transition-group>
                </el-breadcrumb>
            </div>
            <div class="d-header-profile">
                <span>{{ name }}</span>
                <el-dropdown>
                    <div><el-image></el-image><i class="el-icon-arrow-down el-icon--right"></i></div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="d-header-breadcrumb">
            <history-tabs></history-tabs>
        </div>
    </div>
</template>

<script>
import HistoryTabs from './components/historyTabs.vue'
export default {
    components: { HistoryTabs },
    setup() {},
    data() {
        return {
            breadcrumb: [],
            name: ''
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
            },
            immediate: true
        }
    }
}
</script>

<style lang="less" scoped>
.d-header {
    height: 80px;
    .d-header-top {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .toggle-leftBar {
            & > * {
                display: inline-block;
                padding-right: 17px;
            }
        }
        .profile-image {
            width: 40px;
            height: 40px;
        }
    }
}
.bread-item {
    display: inline-block;
    transition: all 0.4s ease;
}
.list-enter-active,
.list-leave-active {
    // transition: all 0.5s ease;
}
.list-leave-active {
    position: absolute;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>
