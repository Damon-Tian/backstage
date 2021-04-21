<template>
    <label class="d-search-block">
        <span>{{ label }}：</span>
        <el-input v-model="value" :placeholder="placeholder"></el-input>
    </label>
</template>

<script>
export default {
    props: ['label', 'placeholder', 'value'],
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
}
</style>
