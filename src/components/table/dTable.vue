<template>
    <div class="table-operation-head" v-if="tableOption.operationHead.length">
        <template v-for="(button, index) in tableOption.operationHead" :key="index">
            <el-button
                v-if="button.type != 'danger'"
                @click="button.fn"
                :type="button.type"
                :size="button.size || 'small'"
                :plain="button.plain"
                :circle="button.circle"
                :disabled="button.disabled"
            >
                {{ button.label }}
            </el-button>
            <el-popconfirm
                v-else
                confirmButtonText="删除"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除吗？"
                @confirm="button.fn"
            >
                <template #reference>
                    <el-button
                        :type="button.type"
                        :size="button.size || 'small'"
                        :plain="button.plain"
                        :circle="button.circle"
                        :disabled="button.disabled"
                    >
                        {{ button.label }}
                    </el-button>
                </template>
            </el-popconfirm>
        </template>
    </div>
    <el-table
        v-loading="loading"
        ref="dTable"
        row-key="id"
        :data="tableData"
        style="width: 100%"
        :stripe="tableOption.stripe"
        :default-sort="option"
        @sort-change="sortChange"
        @select="rowSelect"
        @select-all="selectAll"
        :tree-props="tableOption.rowChildren"
    >
        >
        <el-table-column type="selection" width="55" v-if="tableOption.table.select">
        </el-table-column>
        <el-table-column
            v-for="(item, index) in tableOption.columns"
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
                >
                    {{ scope.row[item[dataEnums.prop]] }}
                </slot>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            v-if="showOperation"
            :fixed="tableOption.operationColumn.fixed"
            :width="operationColumnWidth"
        >
            <template #default="scope">
                <template
                    v-for="(button, index) in tableOption.operationColumn.operationArray"
                    :key="index"
                >
                    <el-button
                        v-if="button.type != 'danger'"
                        @click="button.fn(scope.row)"
                        :type="button.type"
                        :size="button.size || 'small'"
                        :plain="button.plain == false ? false : true"
                        :circle="button.circle"
                        :disabled="button.disabled"
                    >
                        {{ button.label }}
                    </el-button>
                    <el-popconfirm
                        v-else
                        confirmButtonText="删除"
                        cancelButtonText="取消"
                        icon="el-icon-info"
                        iconColor="red"
                        title="  确定删除吗？"
                        @confirm="button.fn(scope.row)"
                    >
                        <template #reference>
                            <el-button
                                :type="button.type"
                                :size="button.size || 'small'"
                                :plain="button.plain == false ? false : true"
                                :circle="button.circle"
                                :disabled="button.disabled"
                            >
                                {{ button.label }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </template>
        </el-table-column>
    </el-table>

    <div class="table-pagination">
        <el-pagination
            :background="tableOption.pagination.background"
            :layout="tableOption.pagination.layout"
            :page-size="tableOption.pagination.pageSize"
            :page-sizes="tableOption.pagination.pageSizes"
            :total="tableOption.pagination.total"
            :current-page="tableOption.pagination.page"
            :pager-count="tableOption.pagination.pagerCount"
            :small="tableOption.pagination.small"
            @size-change="sizeChange"
            @current-change="currentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
/*
    option:{
        operationHead
        width:[
            {date:200},
            {name:200}
        ]
    }
**/
import { defaultsDeep } from 'lodash'
import { getForm } from '@/api/user.js'
export default {
    props: ['option', 'searchValue'],
    emits: ['getedData'],
    setup() {},
    computed: {
        showOperation() {
            return this.option.operationColumn ? true : false
        },
        operationColumnWidth() {
            return this.option.operationColumn?.operationArray?.length * 80
        },
    },
    created() {
        this.tableOption = defaultsDeep({}, this.option, this.defaultTableOption)
        this.getData()
    },
    mounted() {
        if (this.tableOption.autoTableHeight) {
            this.resizeTable()
            window.addEventListener('resize', this.resizeTable)
        }
    },
    beforeUnmount() {
        if (this.tableOption.autoTableHeight) {
            window.removeEventListener('resize', this.resizeTable)
        }
    },
    data() {
        return {
            loading: true,
            bodyHeihgt: '',
            dataEnums: {
                prop: 'key',
                label: 'label',
            },
            defaultTableOption: {
                stripe: true,
                autoTableHeight: true,
                columns: [
                    // { key: 'date', label: '日期' },
                    // { key: 'name', label: '姓名' },
                    // { key: 'address', label: '地址' },
                    // { key: 'sex', label: '性别' },
                ],
                sort: {
                    order: 'descending',
                    prop: 'key',
                },
                table: {
                    select: true,
                },
                operationColumn: {
                    //操作列属性
                    show: true,
                    // fixed: 'right',
                    operationArray: [], //操作按钮组
                },
                operationHead: [
                    // 控制上方 类似 批量删除 按钮
                ],
                pagination: {
                    pageSize: 10,
                    pageSizes: [1, 2, 5, 40, 50],
                    total: 0,
                    pageNum: 1,
                    layout: 'prev, pager, next,sizes',
                    background: true,
                    small: true,
                    pagerCount: 5,
                },
                rowChildren: {
                    children: 'subList',
                    hasChildren: true,
                },
            },
            tableOption: {},
            defaultParams: {
                page: 1,
                pageSize: 10,
            },
            selectRow: [], //选中的数据
            tableData: [],
        }
    },
    methods: {
        resizeTable() {
            let bodyWrapper = document.getElementsByClassName('el-table__body-wrapper')[0]
            this.getParentTop(bodyWrapper, 0)
            bodyWrapper.style.height =
                document.documentElement.offsetHeight - this.bodyHeihgt - 120 + 'px'
        },
        async getData() {
            this.loading = true
            let { pageNum, pageSize } = this.tableOption.pagination
            let { order, prop } = this.tableOption.sort
            let params = {
                pageNum,
                pageSize,
                order,
                prop,
                ...this.searchValue,
            }
            let res = await getForm(this.tableOption.url, params)
            if (res.suc) {
                this.tableOption.pagination.total = res.data.total
                this.tableData = res.data.records || res.data
                this.$emit('getedData', res.data)
            }
            this.loading = false
        },
        prevClick() {},
        nextClick() {},
        handleSelectionChange(val, arr) {
            console.log(val, arr)
        },
        checkAttribute(item, type) {
            let row = this.tableOption[type]
            if (!row) return
            let result = row.find((wItem) => {
                if (wItem[item[this.dataEnums.prop]]) {
                    return wItem[item[this.dataEnums.prop]]
                }
            })
            return result && result[item[this.dataEnums.prop]]
        },
        sortChange(column, prop, order) {
            let sort = this.tableOption.sort
            sort.prop = column.prop
            sort.oder = column.order
            this.getData()
        },
        sizeChange(val) {
            this.tableOption.pagination.pageSize = val
            this.tableOption.pagination.pageNum = 1
            this.getData()
        },
        currentChange(val) {
            this.tableOption.pagination.pageNum = val
            this.getData()
        },
        getParentTop(DOM, firstValue) {
            if (firstValue == 0) {
                this.bodyHeihgt = firstValue
            }
            this.bodyHeihgt += DOM.offsetTop
            if (DOM.offsetParent) {
                if (DOM.parentElement.offsetTop == 0) {
                    return
                }
                this.getParentTop(DOM.offsetParent)
            }
        },
        rowSelect(selection, row) {
            this.selectRow = selection
        },
        selectAll(selection) {
            this.selectRow = selection
        },
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
.table-pagination {
    text-align: right;
    padding: 20px 0 0 0;
}
:deep(.el-table__body-wrapper) {
    overflow-y: auto;
}
</style>
