<template>
    <div class="dDialog">
        <el-dialog
            v-model="visible"
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
export default {
    props: ['option', 'visible'],
    setup() {},
    created() {
        this.dialogOption = defaultsDeep({}, this.option, this.defaultOption)
    },
    data() {
        return {
            dialogOption: {},
            defaultOption: {
                center: false,
                title: '弹窗',
                width: '50%',
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
