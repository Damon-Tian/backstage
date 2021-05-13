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
import { addRole, updateRole } from '@/api/user.js'
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
                title: '',
                halfTitle: '角色',
                width: '550px',
                id: '',
                beforeDataUrl: '/sys_role/info',
            },
            formOption: {
                labelWidth: '150px',
                formData: {},
                forms: [
                    {
                        key: 'menuIds',
                        label: '菜单列表',
                        type: 'input',
                    },
                    {
                        key: 'roleKey',
                        label: '角色key',
                        type: 'input',
                    },
                    {
                        key: 'roleName',
                        label: '角色名称',
                        type: 'input',
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
            this.$refs.form.formData[key] = file.msg
        },
        closedDialog() {
            this.$refs.form.clearForm()
        },
        beforeDataGeted(formData) {
            this.formOption.formData = formData
        },
        async confirm(formData) {
            let res = ''
            if (formData.id > 0) {
                res = await updateRole(formData)
            } else {
                res = await addRole(formData)
            }
            if (res.suc) {
                this.$emit('confirm')
                this.dialogOption.visible = false
            }
        },
    },
}
</script>
