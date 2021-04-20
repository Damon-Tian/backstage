<template>
    <el-container>
        <el-aside width="200px">
            <left-bar></left-bar>
        </el-aside>
        <el-container>
            <el-header height="75px">
                <headers></headers>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { setTheme } from '@/assets/style/theme/index.js'
setTheme()

import leftBar from './leftBar/leftBar.vue'
import headers from './header/header.vue'
</script>

<style lang="less">
@import '@/layout/css/basic.less';
@import '@/assets/style/normalize.css';
</style>
