<template>
    <div>
        <d-table ref="dTable" :option="option">
            <template #operation="data">
                <span class="operation-column">
                    <el-button size="mini" @click="alerts(data.row)">编辑</el-button>
                    <el-button size="mini" @click="alerts(data.row)">编辑</el-button>
                </span>
            </template>
            <template #default="data">
                <span v-if="data.column.prop == 'date'">
                    THIS IS DATE RIGHT ? {{ data.row.date }}
                </span>
                <span v-else>
                    {{ data.row[data.column.prop] }}
                </span>
            </template>
        </d-table>
    </div>
</template>

<script>
import dTable from '@/components/table/dTable.vue'
export default {
    components: { dTable },
    setup() {},
    data() {
        return {
            option: {
                url: '/getForm',
                columns: [{ prop: 'date', label: '日期x' }],
                operationHead: [
                    {
                        label: '删除',
                        fn: () => {
                            console.log(this.$refs.dTable.selectRow)
                        },
                    },
                ],
                width: [{ date: '280' }],
                sortable: [{ date: true }],
                // operationColumn: {
                //     width: 150,
                //     fixed: 'right',
                //     operationArray: [
                //         {
                //             label: 'alert',
                //             fn: () => {
                //                 alert('1111')
                //             },
                //             plain: true,
                //             type: 'primary',
                //         },
                //         {
                //             label: 'edit',
                //             fn: () => {
                //                 alert('1111')
                //             },
                //             plain: true,
                //             type: 'danger',
                //         },
                //     ],
                // },
            },
        }
    },
    methods: {
        alerts(val) {
            alert(val)
        },
    },
}
</script>
