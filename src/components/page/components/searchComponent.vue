<template>
    <div class="page-search">
        <div class="page-search-left">
            <div class="search-item" v-for="item in option.searchArray" :key="item">
                <d-input
                    v-if="item.type == 'input'"
                    :label="item.label"
                    :key="item.label"
                    :label-width="option.arrayWidth || '60px'"
                    :placeholder="item.placeholder || `请输入${item.label}`"
                    v-model:value="option.searchValue[item.key]"
                ></d-input>
                <d-select
                    v-else-if="item.type == 'select'"
                    :label="item.label"
                    :key="item.label"
                    :option="item.option"
                    :label-width="option.arrayWidth || '60px'"
                    :placeholder="item.placeholder"
                    v-model:value="option.searchValue[item.key]"
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
        this.option.searchArray.forEach((item) => {
            this.option.searchValue[item.key] = item.defaultValue || ''
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
                this.option.searchValue[i] = ''
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
    margin-right: 30px;
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
        bottom: 0px;
        height: 4px;
        background-image: linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.01));
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
