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
    props: ['menuList'],
    mounted() {
        this.getEnum()
    },
    watch: {
        menuList() {
            if (!this.menuList.length) return []
            let arr = JSON.parse(JSON.stringify(this.menuList)),
                result = []
            arr.forEach((item, index) => {
                if (item.subList) {
                    item.subList.forEach((child) => {
                        child.subList = null
                    })
                }
                result.push(item)
            })
            this.formOption.forms.find((item) => item.type == 'tree').options = result
        },
    },
    data() {
        const menuTypes = this.$store.state.user.statusEnums
        return {
            dialogOption: {
                visible: false,
                title: '添加用户',
                width: '550px',
                id: '',
                beforeDataUrl: '/sys_menu/info',
            },
            formOption: {
                labelWidth: '150px',
                formData: {},
                forms: [
                    {
                        key: 'menuName',
                        label: '菜单名称',
                        type: 'input',
                        rules: ['required'],
                    },
                    {
                        key: 'parentId',
                        label: '父级菜单',
                        type: 'tree',
                        checkStrictly: true,
                        defaultProps: {
                            children: 'subList',
                            label: 'menuName',
                        },
                        options: [],
                    },
                    {
                        type: 'supply',
                        supply: '不选，则默认根目录',
                    },
                    {
                        key: 'menuType',
                        type: 'select',
                        label: '菜单类型',
                        rules: ['required'],
                        options: menuTypes,
                    },
                ],
            },
        }
    },
    methods: {
        getEnum() {
            let arr = this.$store.state.user.menuTypeEnums
            if (arr.length) {
                this.formOption.forms.find((item) => item.key == 'menuType').options = arr
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
            this.$refs?.form?.$refs?.tree.setCheckedKeys([formData.id])
        },
        async confirm(formData) {
            let res = ''
            console.log(formData)
            // if (formData.id > -1) {
            //     res = await updateMember(formData)
            // } else {
            //     res = await addMember(formData)
            // }
            // if (res.suc) {
            //     this.$emit('confirm')
            //     this.dialogOption.visible = false
            // }
        },
    },
}
</script>
