<template>
    <div>
        <d-page ref="dPage" :option="option">
            <template #tableColumns="data">
                <span v-if="data.column.key == 'headImg' || data.column.key == 'homeCarouselJson'">
                    <img
                        v-if="data.row[data.column.key]"
                        style="width: 250px; height: 150px; object-fit: cover"
                        :src="data.row[data.column.key]"
                        alt="暂无图片"
                    />
                    <div
                        style="
                            width: 250px;
                            height: 80px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        "
                        v-else
                    >
                        <i class="el-icon-cloudy" style="font-size: 2rem"></i>
                        <span>暂无图片</span>
                    </div>
                </span>
                <span v-else>
                    {{ data.row[data.column.key] }}
                </span>
            </template>
        </d-page>
        <add @confirm="confirm" ref="addM" @closed="closed" :menuList="menuList"></add>
    </div>
</template>

<script>
import dPage from '@/components/page/dPage.vue'
import { deleteMember, getMemberList } from '@/api/user.js'
import add from './addM.vue'
export default {
    components: { dPage, add },
    data() {
        return {
            option: {
                tableOption: {
                    width: [{ headImg: '300px' }, { homeCarouselJson: '300px' }],
                    url: '/sys_menu/list_tree',
                    columns: [
                        { key: 'menuName', label: '菜单名称' },
                        { key: 'menuType', label: '菜单类型' },
                        { key: 'parentName', label: '父级菜单' },
                    ],
                    operationHead: [
                        { label: '新增', fn: this.addM, type: 'primary' },
                        { label: '批量删除', fn: this.delete, type: 'danger' },
                    ],
                    operationColumn: {
                        operationArray: [
                            { label: '修改', fn: this.edit, type: 'primary' },
                            { label: '删除', fn: this.delete, type: 'danger' },
                        ],
                    },
                },
                getedData: this.getMenuList,
            },
            menuList: [],
        }
    },
    computed: {},
    methods: {
        getMenuList(data) {
            this.menuList = data
            return
        },
        closed() {},
        edit(item) {
            this.$refs.addM.dialogOption.id = item.id
            this.$refs.addM.dialogOption.visible = true
        },
        addM() {
            this.$refs.addM.dialogOption.id = ''
            this.$refs.addM.dialogOption.formData = new Object()
            this.$refs.addM.dialogOption.visible = true
        },
        async delete(row) {
            let ids = []
            //删除
            if (row && row.id) {
                ids.push(row.id)
            } else {
                let selectRow = this.table.selectRow
                if (!selectRow.length) {
                    this.$message.warning('至少选择一条数据')
                    return
                }
                selectRow.forEach((item) => {
                    ids.push(item.id)
                })
            }
            //批量删除
            let res = await deleteMember(ids)
            if (res.suc) {
                this.$refs.dPage.getData()
            }
        },
        confirm() {
            this.$refs.dPage.getData()
        },
    },
}
</script>
