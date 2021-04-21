<template>
    <el-form
        :inline="formOption.inline"
        :label-width="formOption.labelWidth"
        :model="formData"
        :rules="rules"
        ref="dForm"
        class="d-form"
    >
        <el-form-item
            v-for="(item, index) in formOption.forms"
            :key="index"
            :label="item.label"
            :prop="item.key"
        >
            <el-input v-model="formData[item.key]" :placeholder="`请输入${item.label}`"></el-input>
        </el-form-item>
        <el-form-item :style="{ textAlign: formOption.buttonAlign }">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="danger" @click="clearForm">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defaultsDeep } from 'lodash'
export default {
    props: ['option'],
    data() {
        return {
            formOption: {},
            defaultFormOption: {
                inline: false,
                labelWidth: '80px',
                forms: [],
                buttonAlign: 'left',
            },
            rules: {},
            formData: {},
        }
    },
    created() {
        this.formOption = defaultsDeep({}, this.option, this.defaultFormOption)
        this.pushRules()
    },
    methods: {
        onSubmit() {
            this.$refs['dForm'].validate((valid) => {
                if (valid) {
                    this.$emit('confirm')
                }
            })
        },
        clearForm() {
            for (let i in this.formData) {
                this.formData[i] = ''
            }
        },
        pushRules() {
            let forms = this.formOption.forms
            forms.forEach((form, index) => {
                this.formData[form.key] = ''
                let rules = []
                form.rules &&
                    form.rules.forEach((rule, ruleIndex) => {
                        let min = false,
                            max = false,
                            validator = false
                        if (typeof rule == 'string') {
                            rules.push({
                                required: true,
                                message: `请输入${form.label}`,
                                trigger: 'blur',
                            })
                        } else {
                            for (let i in rule) {
                                switch (i) {
                                    case 'min':
                                        min = rule[i] == 0 ? 0 : Number(rule[i])
                                        break
                                    case 'max':
                                        max = Number(rule[i])
                                        break
                                    case 'validator':
                                        validator = rule[i]
                                        break
                                }
                            }
                        }
                        if (min) {
                            if (max) {
                                rules.push({
                                    min,
                                    max,
                                    message: `长度在${min}和${max}之间`,
                                    trigger: 'blur',
                                })
                            } else {
                                rules.push({
                                    min,
                                    message: `长度不小于${min}`,
                                    trigger: 'blur',
                                })
                            }
                        } else if (max) {
                            rules.push({
                                max,
                                required: true,
                                message: `长度不超过${max}`,
                                trigger: 'blur',
                            })
                        }
                        if (validator) {
                            rules.push({ validator, trigger: 'blur' })
                        }
                    })
                this.rules[form.key] = rules
            })
        },
    },
}
</script>

<style lang="less" scoped>
.el-input {
    width: 300px;
}
</style>
