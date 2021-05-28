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
import { addMember, updateMember } from '@/api/user.js'
export default {
    components: { dForm, dDialog },
    created() {
        // this.getEnum()
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
                title: '用户',
                width: '550px',
                halfTitle: '用户',
                id: '',
                beforeDataUrl: '/member/info',
            },
            formOption: {
                labelWidth: '150px',
                formData: {},
                forms: [
                    {
                        key: 'phone',
                        label: '电话号码',
                        type: 'input',
                        rules: ['required'],
                    },
                    {
                        key: 'merchantNo',
                        label: '商户名称',
                        type: 'input',
                        rules: ['required'],
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
        closedDialog() {
            this.$refs.form.clearForm()
        },
        beforeDataGeted(formData) {
            this.formOption.formData = formData
        },
        async confirm(formData) {
            let res = ''
            if (formData.id > -1) {
                res = await updateMember(formData)
            } else {
                res = await addMember(formData)
            }
            if (res.suc) {
                this.$emit('confirm')
                this.dialogOption.visible = false
            }
        },
    },
}
</script>
