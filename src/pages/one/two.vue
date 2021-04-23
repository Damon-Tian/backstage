<template>
    <d-table ref="table" :option="option"></d-table>
</template>

<script>
import dTable from '@/components/table/dTable.vue'
export default {
    components: { dTable },
    data() {
        return {
            option: {
                sortable: [{ name: true }],
                operationHead: [{ label: '批量删除', fn: this.deleteMore }],
                columns: [
                    { key: 'name', label: '姓名s' },
                    { key: 'age', label: '年龄' },
                ],
                operationColumn: {
                    operationArray: [{ label: '删除', fn: this.deleteItem, type: 'danger' }],
                },
                url: '/getForm',
            },
        }
    },
    methods: {
        getForm() {
            return getForm
        },
        deleteMore() {
            alert(JSON.stringify(this.$refs.table.selectRow))
        },
        deleteItem(item) {
            alert(JSON.stringify(item))
        },
    },
}
</script>
