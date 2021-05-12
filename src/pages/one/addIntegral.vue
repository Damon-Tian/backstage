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
import { addMemberIntegral } from '@/api/user.js'
export default {
    components: { dForm, dDialog },
    created() {
        // this.getEnum()
    },
    data() {
        return {
            dialogOption: {
                visible: false,
                title: '添加用户',
                width: '550px',
                id: '',
                beforeGetData: false,
            },
            formOption: {
                labelWidth: '150px',
                formData: {},
                forms: [
                    {
                        key: 'integral',
                        label: '积分',
                        type: 'number',
                        rules: ['required'],
                    },
                ],
            },
        }
    },
    methods: {
        closedDialog() {
            this.$refs.form.clearForm()
        },
        beforeDataGeted(formData) {
            this.formOption.formData = formData
        },
        async confirm(formData) {
            let res = await addMemberIntegral({ id: this.dialogOption.id, ...formData })
            if (res.suc) {
                this.$emit('confirm')
                this.dialogOption.visible = false
            }
        },
    },
}
</script>
