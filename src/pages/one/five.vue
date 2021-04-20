<template>
    <div>
        <d-table :option="option">
            <template #default="data">
                <span v-if="data.column.key == 'date'">
                    THIS IS DATE RIGHT ? {{ data.row.date }}
                </span>
                <span v-else>
                    {{ data.row[data.column.key] }}
                </span>
            </template>
        </d-table>
    </div>
</template>

<script>
import dTable from '@/components/singleTable/dTable.vue'
export default {
    components: { dTable },
    setup() {},
    data() {
        return {
            option: {
                width: [{ date: '280' }],
                sortable: [{ date: true }],
            },
        }
    },
}
</script>
