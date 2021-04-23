<template>
    <d-page ref="table" :option="option"> </d-page>
    <d-dialog :option="dialogOption" v-model:visible="dialogOption.visible">
        <template #default>
            <!-- <d-form :option="formOption"></d-form> -->
            <d-table :option="tableOption"></d-table>
        </template>
        <template #footer>
            <span></span>
            <!-- <el-button @click="dialogOption.visible = false">没有按钮了</el-button> -->
        </template>
    </d-dialog>
</template>

<script>
import dDialog from '@/components/dialog/dDialog.vue'
import dPage from '@/components/page/dPage.vue'
import dForm from '@/components/form/dForm.vue'
import dTable from '@/components/table/dTable.vue'
export default {
    components: { dPage, dDialog, dForm, dTable },
    data() {
        return {
            tableOption: {
                url: '/getForm',
                autoTableHeight: false,
                columns: [
                    { key: 'name', label: '名称' },
                    { key: 'age', label: '年纪' },
                    { key: 'name', label: '名称' },
                    { key: 'age', label: '年纪' },
                    { key: 'name', label: '名称' },
                    { key: 'age', label: '年纪' },
                    { key: 'name', label: '名称' },
                ],
                table: {
                    select: false,
                },
            },
            formOption: {
                forms: [
                    { key: 'name', label: '姓名', type: 'input' },
                    { key: '好看吗', label: '好看吗', type: 'switch', defaultValue: true },
                ],
            },
            dialogOption: {
                title: '这是一个window',
                visible: false,
                center: true,
                hasFooter: false,
            },
            option: {
                searchOption: {
                    arrayWidth: '120px',
                    searchArray: [
                        {
                            key: 'age',
                            type: 'select',
                            label: 'age',
                            option: [
                                { label: '2岁', value: 2 },
                                { label: '4岁', value: 4 },
                                { label: '全部', value: '' },
                            ],
                        },
                        {
                            key: 'Name',
                            type: 'input',
                            label: '名字',
                        },
                        {
                            key: 'Name',
                            type: 'input',
                            label: '名字萨达群翁',
                        },
                    ],
                },
                tableOption: {
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
            },
        }
    },
    methods: {
        deleteMore() {
            this.dialogOption.visible = true
        },
    },
}
</script>
