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
import { menuUpdate, menuSave } from '@/api/user.js'
export default {
    components: { dForm, dDialog },
    props: ['menuList'],
    mounted() {
        this.getEnum()
    },
    watch: {
        'dialogOption.visible'() {
            let title = this.dialogOption.id
                ? '修改' + this.dialogOption.halfTitle
                : '新增' + this.dialogOption.halfTitle
            this.dialogOption.title = title
        },
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
                title: '菜单',
                halfTitle: '菜单',
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
                        defaultValue: 0,
                        options: [],
                    },
                    {
                        type: 'supply',
                        supply: '(不选，则默认根目录)',
                        style: {
                            color: 'gray',
                            fontSize: '13px',
                        },
                    },
                    {
                        key: 'menuType',
                        type: 'select',
                        label: '菜单类型',
                        rules: ['required'],
                        options: menuTypes,
                    },
                    {
                        key: 'perms',
                        type: 'input',
                        label: '权限字符串',
                    },
                    {
                        key: 'sort',
                        type: 'number',
                        label: '排序（0最大）',
                    },
                    {
                        key: 'url',
                        type: 'input',
                        label: '菜单路由',
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
            let pId = this.formOption.formData.parentId
            pId ? '' : (pId = 0)
            setTimeout(() => {
                this.$refs?.form?.$refs?.tree.setCheckedKeys([pId])
            }, 0)
        },
        async confirm(formData) {
            let res = ''
            console.log(formData)
            if (formData.id > 0) {
                res = await menuUpdate(formData)
            } else {
                res = await menuSave(formData)
            }
            if (res.suc) {
                this.$emit('confirm')
                this.dialogOption.visible = false
            }
        },
    },
}
</script>
