<template>
    <label class="l" :class="{ focus: toTop }">
        <span class="l-label">{{ option.label }}</span>
        <span @click="focusx" class="l-input">
            <input
                :type="option.type || 'text'"
                @blur="blur"
                v-model="value"
                :placeholder="focus ? (option.placeholder ? option.placeholder : ``) : ''"
            />
            <i :class="option.icon"></i>
        </span>
    </label>
</template>

<script>
export default {
    props: ['option', 'value'],
    data() {
        return {
            focus: false,
            empty: true,
        }
    },
    computed: {
        toTop() {
            if (this.empty) {
                if (this.focus) {
                    return true
                }
                return false
            } else {
                return true
            }
        },
    },
    watch: {
        value(val) {
            this.empty = this.value ? false : true
            this.$emit('update:value', val)
        },
    },
    methods: {
        blur() {
            if (this.empty) {
                this.focus = false
            }
        },
        focusx() {
            this.focus = true
        },
    },
}
</script>

<style lang="less" scoped>
.l {
    width: 100%;
    position: relative;
    display: block;
    margin-bottom: 30px;
    font-size: 18x;
    .l-label {
        transition: all 0.3s;
        position: absolute;
        width: 100px;
        top: 7px;
        opacity: 0.7;
        z-index: 1;
    }
    .l-input {
        display: block;
        position: relative;
        padding-top: 10px;
        border-bottom: 1px solid @d-color;
        display: flex;
        font-size: 16px;
        input {
            outline: none;
            border: none;
            flex: 1;
            font-size: 16px;
            background-color: transparent;
        }
        i {
            font-size: 18px;
            width: 20px;
        }
        &::after {
            content: '';
            width: 0%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 2px;
            background-color: @d-color;
            transition: all 0.3s;
            bottom: -1px;
        }
    }
    &.focus {
        .l-label {
            top: -15px;
            font-size: 14px;
        }
        .l-input {
            &::after {
                width: 100%;
            }
        }
    }
}
</style>
