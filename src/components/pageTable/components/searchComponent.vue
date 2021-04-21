<template>
    <div class="page-search">
        <div class="page-search-left">
            <div class="search-item" v-for="item in option" :key="item">
                <d-input
                    v-if="item.type == 'input'"
                    :label="item.label"
                    :key="item.label"
                    :placeholder="item.placeholder"
                    v-model:value="searchValue[item.key]"
                ></d-input>
                <d-select
                    v-else-if="item.type == 'select'"
                    :label="item.label"
                    :key="item.label"
                    :option="item.option"
                    :placeholder="item.placeholder"
                    v-model:value="searchValue[item.key]"
                ></d-select>
            </div>
        </div>
        <div class="page-search-right">
            <slot name="search-confirm">
                <el-button size="small" @click="clearSearch">清空</el-button>
                <el-button size="small" type="primary" @click="getData">搜索</el-button>
            </slot>
        </div>
    </div>
</template>

<script>
import dInput from './dInput.vue'
import dSelect from './dSelect.vue'

export default {
    props: ['option'],
    components: { dInput, dSelect },
    setup() {},
    created() {
        this.option.forEach((item) => {
            this.searchValue[item.key] = ''
        })
    },
    data() {
        return {
            searchValue: {},
        }
    },
    methods: {
        clearSearch() {
            for (let i in this.searchValue) {
                this.searchValue[i] = ''
            }
        },
        getData() {
            this.$emit('getData')
        },
    },
}
</script>

<style lang="less" scoped>
@width: 180px;
.search-item {
    display: inline-block;
    margin-right: 20px;
}
.page-search {
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 5px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
    }
    .page-search-left {
        width: calc(100% - @width);
    }
    .page-search-right {
        text-align: right;
        width: @width;
    }
}
</style>
