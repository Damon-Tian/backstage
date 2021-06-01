<template>
    <d-dialog
        :option="dialogOption"
        v-model:visible="dialogOption.visible"
        @beforeDataGeted="beforeDataGeted"
        @closed="closedDialog"
    >
        <template #default>
            <d-form ref="form" :option="formOption" @confirm="confirm"> </d-form>
        </template>
        <template #footer>
            <span></span>
        </template>
    </d-dialog>
</template>

<script>
import dDialog from '@/components/dialog/dDialog.vue'
import dForm from '@/components/form/dForm.vue'
import { addMerchant, updateMerchant } from '@/api/user.js'
export default {
    components: { dForm, dDialog },
    created() {
        this.getEnum()
    },
    watch: {
        'dialogOption.visible'() {
            let title = this.dialogOption.id
                ? '修改' + this.dialogOption.halfTitle
                : '新增' + this.dialogOption.halfTitle
            this.dialogOption.title = title
        },
    },
    data() {
        return {
            dialogOption: {
                visible: false,
                title: '',
                halfTitle: '商家',
                width: '850px',
                id: '',
                beforeDataUrl: '/merchant/info',
            },
            formOption: {
                labelWidth: '150px',
                formData: {},
                inputWidth: '500px',
                forms: [
                    {
                        key: 'merchantName',
                        label: '商户名称',
                        type: 'input',
                        rules: ['required'],
                    },
                    {
                        key: 'username',
                        label: '用户名（登录账号）',
                        type: 'input',
                        rules: ['required'],
                    },
                    {
                        key: 'password',
                        label: '密码',
                        type: 'input',
                        rules: ['required'],
                    },
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
                        onSuccess: (fileData, fileList) => {
                            this.upload(fileList, 'homeCarouselJson')
                        },
                    },
                    {
                        key: 'shopCarouselJson',
                        label: '商家商城轮播图',
                        type: 'upload',
                        onSuccess: (fileData, fileList) => {
                            this.upload(fileList, 'shopCarouselJson')
                        },
                    },
                    {
                        key: 'startCarouselJson',
                        label: '商家广告图',
                        type: 'upload',
                        onSuccess: (fileData, fileList) => {
                            this.upload(fileList, 'startCarouselJson')
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
                        onSuccess: (fileData, fileList) => {
                            this.upload(fileList, 'headImg')
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
                this.formOption.forms.find((item) => item.key == 'status').options = arr
            } else {
                setTimeout(() => {
                    this.getEnum()
                }, 200)
            }
        },
        upload(file, key) {
            this.$refs.form.formData[key] = file
        },
        closedDialog() {
            let form = this.$refs.form
            form.clearForm()
            // this.formOption.forms.forEach((val) => {
            //     form.$refs[val.key] && form.$refs[val.key]?.clearFiles()
            // })
        },
        beforeDataGeted(formData) {
            this.formOption.formData = formData
        },
        async confirm(formData) {
            let res = ''
            let result = JSON.parse(JSON.stringify(formData))
            for (let i in result) {
                if (result[i] instanceof Array) {
                    if (result[i][0] && result[i][0].url) {
                        result[i] = result[i].map((item) => item.url).join(';')
                    } else {
                        result[i] = ''
                    }
                }
            }
            if (result.id > 0) {
                res = await updateMerchant(result)
            } else {
                res = await addMerchant(result)
            }
            if (res.suc) {
                this.$emit('confirm')
                this.dialogOption.visible = false
            }
        },
    },
}
</script>
