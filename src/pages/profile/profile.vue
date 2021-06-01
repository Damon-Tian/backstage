<template>
    <el-card>
        <d-form ref="form" :option="option" @confirm="save"></d-form>
    </el-card>
</template>

<script>
import { updateProfile } from '@/api/user.js'
import dForm from '@/components/form/dForm.vue'
export default {
    components: { dForm },
    mounted() {
        this.getEnum()
        this.getUser()
    },
    data() {
        return {
            option: {
                labelWidth: '200px',
                inputWidth: '80%',
                formData: {},
                forms: [
                    {
                        key: 'merchantName',
                        label: '商户名称',
                        type: 'input',
                        rules: ['required'],
                    },
                    // {
                    //     key: 'password',
                    //     label: '密码',
                    //     type: 'input',
                    // },
                    {
                        key: 'address',
                        label: '商家地址',
                        type: 'input',
                    },
                    {
                        key: 'logo',
                        label: '商家logo',
                        type: 'input',
                    },
                    {
                        key: 'homeCarouselJson',
                        label: '商家首页轮播图',
                        type: 'upload',
                        onSuccess: (fileData) => {
                            this.upload(fileData, 'homeCarouselJson')
                        },
                    },
                    {
                        key: 'shopCarouselJson',
                        label: '商家商城轮播图',
                        type: 'upload',
                        onSuccess: (fileData) => {
                            this.upload(fileData, 'shopCarouselJson')
                        },
                    },
                    {
                        key: 'startCarouselJson',
                        label: '商家广告图',
                        type: 'upload',
                        onSuccess: (fileData) => {
                            this.upload(fileData, 'startCarouselJson')
                        },
                    },
                    {
                        key: 'email',
                        label: '邮箱',
                        type: 'input',
                    },
                    {
                        key: 'headImg',
                        label: '头像',
                        type: 'upload',
                        onSuccess: (fileData) => {
                            this.upload(fileData, 'headImg')
                        },
                    },
                    {
                        key: 'isConsumables',
                        label: '是否耗材预警',
                        type: 'switch',
                        activeValue: 'Y',
                        inactiveValue: 'N',
                    },
                    {
                        key: 'isFaultNotice',
                        label: '是否故障报警',
                        type: 'switch',
                        activeValue: 'Y',
                        inactiveValue: 'N',
                    },

                    {
                        key: 'merchantPerson',
                        label: '商户联系人',
                        type: 'input',
                    },
                    {
                        key: 'merchantPhone',
                        label: '商户联系电话',
                        type: 'input',
                    },
                    {
                        key: 'status',
                        label: '状态',
                        type: 'select',
                        options: status,
                    },
                ],
            },
        }
    },
    methods: {
        getEnum() {
            let arr = this.$store.state.user.statusEnums
            if (arr.length) {
                this.option.forms.find((item) => item.key === 'status').options = arr
            } else {
                setTimeout(() => {
                    this.getEnum()
                }, 200)
            }
        },
        getUser() {
            let user = this.$store.state.user.user
            if (user) {
                this.option.formData = { ...user }
            } else {
                setTimeout(() => {
                    this.getUser()
                }, 200)
            }
        },
        upload(file, key) {
            this.$refs.form.formData[key] = file.msg
        },
        async save(formdata) {
            let result = JSON.parse(JSON.stringify(formdata))
            for (let i in result) {
                if (result[i] instanceof Array) {
                    if (result[i][0] && result[i][0].url) {
                        result[i] = result[i].map((item) => item.url).join(';')
                    } else {
                        result[i] = ''
                    }
                }
            }
            let res = await updateProfile(result)
            this.$store.dispatch('user/getProfile')
        },
    },
}
</script>
