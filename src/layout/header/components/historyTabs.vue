<template>
    <ul class="history-tab">
        <li v-for="(item, index) in breads">
            <router-link :to="item.path">
                {{ item.name }}
                <span class="tab-cancel" v-if="item.path !== '/'" @click.native.stop="remove(item)">
                    <i class="el-icon-close"></i>
                </span>
            </router-link>
        </li>
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
        }
    },
    methods: {
        remove(item) {
            this.$store.commit('bread/removeBread', item.name)
        }
    }
}
</script>

<style lang="less" scoped>
.history-tab {
    padding: 0;
    margin: 0;
    li {
        list-style: none;
        display: inline-block;
        padding: 3px 8px;
        margin-right: 10px;
        font-size: 12px;
        border: 1px solid gainsboro;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        .tab-cancel {
            transition: all 0.3s;
            opacity: 0.8;
            // border: 1px solid transparent;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        &:hover {
            .tab-cancel {
                opacity: 0.7;
                // border: 1px solid red;
                background-color: rgba(0, 0, 0, 0.795);
                color: white;
            }
        }
    }
}
</style>
