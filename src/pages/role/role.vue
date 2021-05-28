<template>
    <div>
        <d-page ref="dPage" :option="option">
            <template #tableColumns="data">
                <span v-if="data.column.key == 'headImg' || data.column.key == 'homeCarouselJson'">
                </span>
                <span v-else>
                    {{ data.row[data.column.key] }}
                </span>
            </template>
        </d-page>
        <add @confirm="confirm" ref="addM" @closed="closed"></add>
    </div>
</template>

<script>
import dPage from '@/components/page/dPage.vue'
import add from './addM.vue'
import { deleteMerchant } from '@/api/user.js'
export default {
    components: { dPage, add },
    data() {
        return {
            option: {
                searchOption: {
                    searchArray: [],
                },
                tableOption: {
                    url: '/sys_role/page_list',
                    columns: [
                        { key: 'id', label: 'id' },
                        { key: 'roleKey', label: '角色key' },
                        { key: 'roleName', label: '角色名称' },
                    ],
                    operationHead: [
                        { label: '新增', fn: this.addM, type: 'primary' },
                        { label: '批量删除', fn: this.delete, type: 'danger' },
                    ],
                    operationColumn: {
                        operationArray: [
                            { label: '修改', fn: this.edit },
                            { label: '删除', fn: this.delete, type: 'danger' },
                        ],
                    },
                },
            },
        }
    },
    computed: {
        routes() {
            return this.$store.state.routes.routes
        },
        table() {
            return this.$refs.dPage.$refs.dTable
        },
    },
    methods: {
        closed() {},
        edit(item) {
            this.$refs.addM.dialogOption.id = item.id
            this.$refs.addM.dialogOption.visible = true
        },
        addM() {
            this.$refs.addM.dialogOption.id = ''
            this.$refs.addM.dialogOption.formData = new Object()
            this.$refs.addM.dialogOption.visible = true
        },
        async delete(row) {
            let ids = []
            //删除
            if (row && row.id) {
                ids.push(row.id)
            } else {
                let selectRow = this.table.selectRow
                if (!selectRow.length) {
                    this.$message.warning('至少选择一条数据')
                    return
                }
                selectRow.forEach((item) => {
                    ids.push(item.id)
                })
            }
            //批量删除
            let res = await deleteMerchant(ids)
            if (res.suc) {
                this.$refs.dPage.getData()
            }
        },
        confirm() {
            this.$refs.dPage.getData()
        },
    },
}
</script>
