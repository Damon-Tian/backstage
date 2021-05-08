<template>
    <ul class="history-tab">
        <transition-group name="list" tag="span">
            <li
                v-for="item in breads"
                :key="item.name"
                @click="redirect(item)"
                :class="{ active: item.name == activeTab }"
            >
                {{ item.name }}
                <span class="tab-cancel" v-if="item.path !== '/'" @click.stop="remove(item)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </transition-group>
    </ul>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        breads() {
            return this.$store.state.bread.breads
        },
        activeTab() {
            return this.$store.state.routes.currentRoute.name
        },
    },
    methods: {
        redirect(item) {
            this.$router.push({ name: item.name })
        },
        remove(item) {
            this.$store.commit('bread/removeBread', item.name)
        },
    },
}
</script>

<style lang="less" scoped>
.history-tab {
    padding: 0;
    margin: 0;
    li {
        list-style: none;
        display: inline-block;
        padding: 5px 15px;
        margin-right: 10px;
        font-size: 12px;
        border-radius: 2px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
        cursor: pointer;
        border: 1px solid gainsboro;
        transition: all 0.4s ease;
        &.active {
            color: @d-color;
            border: 1px solid @d-color;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.32);
        }
        .tab-cancel {
            transition: all 0.3s;
            opacity: 0.3;
            font-size: 12px;
            position: relative;
            left: 4px;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            &:hover {
                opacity: 0.7;
                background-color: @d-color;
                color: white;
            }
        }
    }
}
</style>
