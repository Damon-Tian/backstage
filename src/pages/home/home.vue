<template>
    <div>
        <el-button @click="mock">mockkkk</el-button>

        {{ routes }}
            <l-input :option="{label:'姓名'}" v-model:value='name'></l-input>
            <l-input :option="{label:'密码',type:'password'}" v-model:value='password'></l-input>
    </div>
</template>
 
<script>
import axios from 'axios'
import lInput from '@/components/loginInput/input.vue'
export default {
    components:{lInput},
    data() {
        return {
            name:'',
            password:'',
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
