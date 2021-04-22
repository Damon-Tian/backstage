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
            v-for="(formItem, index) in formOption.forms"
            :key="index"
            :label="formItem.label"
            :prop="formItem.key"
        >
            <!-- input -->
            <el-input
                v-if="formItem.type == 'input'"
                :style="{ width: formItem.width || formOption.inputWidth }"
                v-model="formData[formItem.key]"
                :placeholder="`请输入${formItem.label}`"
            ></el-input>
            <!-- select -->
            <el-select
                v-else-if="formItem.type == 'select'"
                v-model="formData[formItem.key]"
                :placeholder="formItem.placeholder || '请选择'"
            >
                <el-option
                    v-for="selectOption in formItem.options"
                    :key="selectOption.value"
                    :label="selectOption.label"
                    :value="selectOption.value"
                >
                </el-option>
            </el-select>
            <!-- switch -->
            <el-switch
                v-else-if="formItem.type == 'switch'"
                v-model="formData[formItem.key]"
                :active-text="formItem.active"
                :inactive-text="formItem.inactive"
                :active-color="formItem.activeColor"
                :inactive-color="formItem.inactiveColor"
            >
            </el-switch>
            <!-- radio -->
            <el-radio-group v-else-if="formItem.type == 'radio'" v-model="formData[formItem.key]">
                <el-radio
                    :label="radio.label"
                    v-for="(radio, index) in formItem.options"
                    :key="index"
                >
                    {{ radio.value }}
                </el-radio>
            </el-radio-group>
            <!-- checkbox -->
            <el-checkbox-group
                v-else-if="formItem.type == 'checkbox'"
                v-model="formData[formItem.key]"
            >
                <el-checkbox
                    :label="checkbox.label"
                    :disabled="checkbox.disabled"
                    v-for="(checkbox, index) in formItem.options"
                    :key="index"
                ></el-checkbox>
            </el-checkbox-group>
            <!-- 滑块 -->
            <el-slider
                :style="{ width: formItem.width || formOption.inputWidth }"
                v-else-if="formItem.type == 'slider'"
                v-model="formData[formItem.key]"
            ></el-slider>
            <!-- 日期选择 -->
            <el-date-picker
                v-else-if="formItem.type == 'datePicker'"
                v-model="formData[formItem.key]"
                type="date"
                placeholder="选择日期"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item :style="{ textAlign: formOption.buttonAlign }">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="danger" @click="clearForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defaultsDeep } from 'lodash'
export default {
    props: ['option'],
    data() {
        return {
            formOption: {}, //最终的option
            defaultFormOption: {
                inline: false,
                labelWidth: '100px',
                forms: [],
                inputWidth: '300px',
                buttonAlign: 'left',
            }, //默认配置，会和传入的option合并，形成formOption
            rules: {},
            formData: {}, //表单数据，传值给后台的最终数据格式
            forms: null, //单独存储父级传入的形成form的forms数据
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
                    this.$emit('confirm', this.formData)
                }
            })
        },
        clearForm() {
            this.$refs.dForm.resetFields()
        },
        pushRules() {
            let forms = (this.forms = this.formOption.forms)
            forms.forEach((form, index) => {
                //默认设置
                this.formData[form.key] = form.defaultValue

                let rules = []
                form.rules &&
                    form.rules.forEach((rule, ruleIndex) => {
                        let min = false,
                            max = false,
                            validator = false
                        if (typeof rule == 'string' || rule.required) {
                            rules.push({
                                required: true,
                                message: rule.required || `${form.label}不能为空`,
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
                                    message: rule.message || `长度在${min}和${max}之间`,
                                    trigger: 'blur',
                                })
                            } else {
                                rules.push({
                                    min,
                                    message: rule.message || `长度不小于${min}`,
                                    trigger: 'blur',
                                })
                            }
                        } else if (max) {
                            rules.push({
                                max,
                                required: true,
                                message: rule.message || `长度不超过${max}`,
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

<style lang="less" scoped></style>
