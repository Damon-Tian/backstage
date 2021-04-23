<template>
    <label class="d-search-block">
        <span>{{ label }}：</span>
        <!-- :style="{ width: labelWidth }" -->
        <!-- :style="{ width: `calc(100% - ${labelWidth})` }" -->
        <el-select v-model="value" filterable :placeholder="placeholder">
            <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </label>
</template>

<script>
export default {
    props: ['option', 'placeholder', 'value', 'label', 'labelWidth'],
    watch: {
        value(val) {
            this.$emit('update:value', val)
        },
    },
}
</script>
