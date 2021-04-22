<template>
    <search-component
        ref="search"
        v-if="pageOption.searchOption.searchArray.length"
        :option="pageOption.searchOption"
        @getData="getData"
    ></search-component>
    <d-table
        ref="dTable"
        :option="pageOption.tableOption"
        :searchValue="pageOption.searchOption.searchValue"
    >
        <template #default="data">
            <slot
                name="tableColumns"
                :row="data.row"
                :index="data.index"
                :column="data.column"
                :store="data.store"
            >
                {{ data.row[data.column.key] }}
            </slot>
        </template>
    </d-table>
</template>

<script>
import { defaultsDeep } from 'lodash'
import dTable from '../singleTable/dTable.vue'
import searchComponent from './components/searchComponent.vue'
export default {
    props: ['option'],
    components: { dTable, searchComponent },
    setup() {},
    created() {
        this.pageOption = defaultsDeep({}, this.option, this.pageDefaultOption)
    },
    data() {
        return {
            pageOption: {},
            pageDefaultOption: {
                searchOption: {
                    searchArray: [
                        //key是searchValue的属性值，其余为自定义属性
                        //此处length存在 search 自己放出
                        // { key: 'name', type: 'input', label: 'name', placeholder: 'input yyy name' },
                        // {
                        //     key: 'age',
                        //     type: 'select',
                        //     label: 'age',
                        //     option: [
                        //         { label: '2岁', value: 2 },
                        //         { label: '4岁', value: 4 },
                        //         { label: '全部', value: '' },
                        //     ],
                        // },
                    ],
                    searchValue: {},
                },
                tableOption: {
                    isSearch: true,
                },
            },
        }
    },
    methods: {
        getData() {
            let searchValue = this.$refs.search.searchValue
            this.$refs.dTable.getData(searchValue)
        },
    },
}
</script>
