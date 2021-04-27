<template>
    <div>
        <d-page :option="option"></d-page>
        <!-- homeeeeeeeee -->
    </div>
</template>

<script>
import axios from 'axios'
import dPage from '@/components/page/dPage.vue'
export default {
    components: { dPage },
    data() {
        return {
            option: {
                tableOption: {
                    url: '/merchant/page_list',
                    columns: [
                        { key: 'id', label: 'id' },
                        { key: 'gmtCreate', label: '创建时间' },
                    ],
                    operationHead: [{ label: '新增', fn: this.deleteItem, type: 'primary' }],
                    operationColumn: {
                        operationArray: [{ label: '修改', fn: this.deleteItem }],
                    },
                },
            },
        }
    },
    computed: {
        routes() {
            return this.$store.state.routes.routes
        },
    },
    methods: {
        mock() {
            axios.post('/api/post', { name: 'damon' })
        },
    },
}
</script>
