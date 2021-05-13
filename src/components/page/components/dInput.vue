<template>
    <label class="d-search-block">
        <span>{{ label }}：</span>
        <!-- :style="{ width: labelWidth }" -->
        <!-- :style="{ width: `calc(100% - ${labelWidth})` }" -->
        <el-input v-model="value" :placeholder="placeholder" size="small"></el-input>
    </label>
</template>

<script>
export default {
    props: ['label', 'placeholder', 'value', 'labelWidth'],
    watch: {
        value(val) {
            this.$emit('update:value', val)
        },
    },
}
</script>

<style lang="less">
.d-search-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    font-size: 14px;
    // width: 300px;
    span {
        white-space: nowrap;
    }
}
</style>
