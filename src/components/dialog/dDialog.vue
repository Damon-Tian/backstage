<template>
    <div class="dDialog">
        <el-dialog
            v-model="dialogVisible"
            :width="dialogOption.width"
            :title="dialogOption.title"
            :center="dialogOption.center"
            :before-close="dialogOption.handleClose"
            :top="dialogOption.top"
            :append-to-body="dialogOption.appendToBody"
            :close-on-click-modal="dialogOption.closeOnClickModal"
            @opened="dialogOption.opened"
        >
            <slot name="default">
                <span>这是一段信息</span>
            </slot>
            <template #footer v-if="dialogOption.hasFooter">
                <slot name="footer">
                    <span class="dialog-footer">
                        <el-button @click="dialogOption.handleClose">取 消</el-button>
                        <el-button type="primary" @click="dialogOption.confirm">确 定</el-button>
                    </span>
                </slot>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defaultsDeep } from 'lodash'
import { getFormById } from '@/api/user.js'
export default {
    props: ['option'],
    setup() {},
    watch: {
        'option.visible': {
            handler(newValue, old) {
                if (newValue == true) {
                    this.beforeOpen()
                } else {
                    this.beforeClose()
                }
            },
            deep: true,
        },
    },
    data() {
        return {
            loading: true,
            dialogVisible: false,
            dialogOption: {},
            defaultOption: {
                id: '', //判断是否提前获取数据
                center: false,
                title: '弹窗',
                width: '40%',
                top: '15vh',
                appendToBody: false,
                closeOnClickModal: true,
                hasFooter: true,
                opened: () => {},
                handleClose: () => {
                    this.$emit('update:visible', false)
                },
                confirm: () => {},
            },
        }
    },
    methods: {
        async beforeOpen() {
            this.dialogOption = defaultsDeep({}, this.option, this.defaultOption)
            if (this.dialogOption.id) {
                this.loading = this.$loading({
                    lock: true,
                    background: 'rgba(0,0,0,.5)',
                })
                let res = await getFormById(this.dialogOption.beforeDataUrl, this.dialogOption.id)
                this.loading.close()
                this.$emit('beforeDataGeted', res.data)
            }
            this.dialogVisible = true
        },
        beforeClose() {
            this.$emit('closed')
            this.dialogVisible = false
        },
    },
}
</script>
<style lang="less" scoped>
.dDialog {
    :deep(.el-dialog__body) {
        max-height: 60vh;
        overflow: auto;
    }
}
</style>
