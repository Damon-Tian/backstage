<template>
    <d-page :option="option">
        <!-- <template #tableColumns="data">
            <span :data-s="JSON.stringify(data.row)" :data-c="JSON.stringify(data.column)">
                {{ data.row[data.column.prop] }}
            </span>
        </template> -->
    </d-page>
</template>

<script>
import dPage from '@/components/pageTable/dPage.vue'
export default {
    components: { dPage },
    setup() {},
    data() {
        return {
            option: {
                tableOption: {
                    columns: [{ prop: 'date', label: '日期x' }],
                },
            },
        }
    },
}
</script>
