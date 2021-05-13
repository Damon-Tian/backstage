<template>
    <template v-for="(item, index) in menus">
        <!-- 有子级路由 -->
        <el-submenu :index="item.name" :key="index" v-if="item.children">
            <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ item.name }}</span>
            </template>
            <menu-group :menus="item.children"></menu-group>
        </el-submenu>
        <!-- 无子级路由 -->
        <router-link :to="{ name: item.name }" v-else :key="item.name">
            <el-menu-item :index="item.name">
                <i :class="item.icon || 'el-icon-menu'"></i>
                <template #title>
                    <span style="font-size: 14px">{{ item.name }}</span>
                </template>
            </el-menu-item>
        </router-link>
    </template>
</template>

<script>
export default {
    name: 'menuGroup',
    props: ['menus'],
    setup() {},
    data() {
        return {}
    },
}
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
}
</style>
