<template>
    <el-container>
        <el-aside class="asideBar" :style="{ width: collapse ? '75px' : '220px' }">
            <left-bar></left-bar>
        </el-aside>
        <el-container>
            <el-header height="75px">
                <headers></headers>
            </el-header>
            <el-main style="height: calc(100vh - 75px)">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { setTheme } from '@/assets/style/theme/index.js'
import leftBar from './leftBar/leftBar.vue'
import headers from './header/header.vue'
setTheme()
</script>
<script>
export default {
    computed: {
        collapse() {
            return this.$store.state.bread.isCollapse
        },
    },
    created() {
        this.$store.dispatch('user/getStatusEnum')
        this.$store.dispatch('user/getMenuTypeEnum')
    },
}
</script>
<style lang="less">
.asideBar {
    transition: all 0.3s;
}
:deep(.el-main) {
    height: calc(100vh - 75px);
    overflow-y: auto;
}
</style>
