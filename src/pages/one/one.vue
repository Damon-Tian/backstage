// 用户相关
<template>
    <div>
        <d-page ref="dPage" :option="option">
            <template #tableColumns="data">
                <span v-if="data.column.key == 'headImg' || data.column.key == 'homeCarouselJson'">
                    <template v-if="data.row[data.column.key]">
                        <img
                            style="height: 150px; object-fit: cover; margin-right: 3px"
                            :style="{
                                width: 250 / data.row[data.column.key].split(';').length + 'px',
                            }"
                            v-for="item in data.row[data.column.key].split(';')"
                            :key="item"
                            :src="item"
                            alt="暂无图片"
                        />
                    </template>
                    <!-- style="
                            width: 250px;
                            height: 80px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        " -->
                    <div v-else>
                        <!-- <i class="el-icon-cloudy" style="font-size: 2rem"></i> -->
                        <span>暂无图片</span>
                    </div>
                </span>
                <span v-else>
                    {{ data.row[data.column.key] }}
                </span>
            </template>
        </d-page>
        <add @confirm="confirm" ref="addM" @closed="closed"></add>
        <add-integral @confirm="confirm" ref="addIntegral"></add-integral>
    </div>
</template>

<script>
import dPage from '@/components/page/dPage.vue'
import { deleteMember, getMemberList } from '@/api/user.js'
import add from './addM.vue'
import addIntegral from './addIntegral.vue'
export default {
    components: { dPage, add, addIntegral },
    data() {
        return {
            option: {
                tableOption: {
                    width: [{ headImg: '300px' }, { homeCarouselJson: '300px' }],
                    url: '/member/page_list',
                    columns: [
                        { key: 'phone', label: '手机号码' },
                        { key: 'headImg', label: '头像' },
                        { key: 'memberNo', label: '用户编号' },
                        { key: 'merchantNo', label: '商家编号' },
                        { key: 'integral', label: '积分' },
                    ],
                    operationHead: [
                        { label: '新增', fn: this.addM, type: 'primary' },
                        { label: '批量删除', fn: this.delete, type: 'danger' },
                    ],
                    operationColumn: {
                        operationArray: [
                            { label: '加积分', fn: this.addIntegral },
                            { label: '修改', fn: this.edit },
                            { label: '删除', fn: this.delete, type: 'danger' },
                        ],
                    },
                },
            },
        }
    },
    computed: {
        table() {
            return this?.$refs?.dPage?.$refs?.dTable
        },
    },
    methods: {
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
        addIntegral(item) {
            this.$refs.addIntegral.dialogOption.id = item.id
            // this.$refs.addIntegral.dialogOption.formData = new Object()
            this.$refs.addIntegral.dialogOption.visible = true
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
