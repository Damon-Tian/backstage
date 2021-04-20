<template>
    <el-table :data="parentVue.tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-pagination
        :background="parentVue.tableOptions.pagination.background"
        :layout="parentVue.tableOptions.pagination.layout"
        :page-size="parentVue.tableOptions.pagination.pageSize"
        :page-sizes="parentVue.tableOptions.pagination.pageSize"
        :total="parentVue.tableOptions.pagination.total"
        @size-change="parentVue.sizeChange"
        @current-change="parentVue.currentChange"
    >
    </el-pagination>
</template>

<script>
export default {
    props: ['parent'],
    computed: {
        parentVue() {
            return this.parent || this.$parent
        },
    },
    setup() {},
    created() {},
    data() {
        return {}
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
