<template>
    <el-table
        ref="singleTable"
        row-key="date"
        :data="tableDatas"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :default-sort="option"
        @sort-change="sortChange"
    >
        <el-table-column type="selection" width="55" v-if="tableOptions.table.select">
        </el-table-column>
        <el-table-column
            v-for="(item, index) in tableOptions.columns"
            :key="index"
            :prop="item[dataEnums.prop]"
            :label="item[dataEnums.label]"
            :width="checkAttribute(item, 'width')"
            :sortable="checkAttribute(item, 'sortable')"
            :show-overflow-tooltip="true"
        >
            <template #default="scope">
                <slot
                    :row="scope.row"
                    :index="scope.$index"
                    :column="item"
                    :store="scope.store"
                    :columns="scope.column"
                ></slot>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        :background="tableOptions.pagination.background"
        :layout="tableOptions.pagination.layout"
        :page-size="tableOptions.pagination.pageSize"
        :page-sizes="tableOptions.pagination.pageSizes"
        :total="tableOptions.pagination.total"
        @size-change="sizeChange"
        @current-change="currentChange"
    >
    </el-pagination>
</template>

<script>
/*
    option:{
        width:[
            {date:200},
            {name:200}
        ]
    }
**/
export default {
    props: ['tableData', 'option'],
    computed: {
        parentVue() {
            return this.parent || this.$parent
        },
    },
    setup() {},
    created() {
        this.tableOptions = Object.assign({}, this.option, this.defineTableOptions)
        this.tableDatas = this.tableData || this.tableDatas
    },
    data() {
        return {
            dataEnums: {
                prop: 'key',
                label: 'label',
            },
            defineTableOptions: {
                columns: [
                    { key: 'date', label: '日期' },
                    { key: 'name', label: '姓名' },
                    { key: 'address', label: '地址' },
                    { key: 'sex', label: '性别' },
                ],
                sort: {
                    order: 'descending',
                    prop: () => {
                        return this.dataEnums.prop
                    },
                },
                table: {
                    select: true,
                },
                pagination: {
                    pageSize: 10,
                    pageSizes: [1, 2, 5, 40, 50],
                    total: 10,
                    currentPage: 1,
                    layout: 'prev, pager, next,sizes',
                    background: true,
                    small: false,
                },
            },
            tableDatas: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    sex: 'male',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
            ],
            tableOptions: {},
        }
    },
    methods: {
        sizeChange(val) {
            let { pageSize } = this.tableOptions.pagination
            pageSize = val
        },
        prevClick() {},
        nextClick() {},
        handleSelectionChange(val, arr) {
            console.log(val, arr)
        },
        checkAttribute(item, type) {
            let row = this.option[type]
            if (!row) return
            let result = row.find((wItem) => {
                if (wItem[item[this.dataEnums.prop]]) {
                    return wItem[item[this.dataEnums.prop]]
                }
            })
            return result && result[item[this.dataEnums.prop]]
        },
        sortChange(column, prop, order) {},
    },
}
</script>
<style lang="less" scoped>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
