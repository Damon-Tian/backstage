<template>
    <d-page ref="table" :option="option"> </d-page>
</template>

<script>
import dPage from '@/components/pageTable/dPage.vue'
export default {
    components: { dPage },
    data() {
        return {
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
                        operationArrys: [{ label: '删除', fn: this.deleteItem, type: 'danger' }],
                    },
                    url: '/getForm',
                },
            },
        }
    },
}
</script>
