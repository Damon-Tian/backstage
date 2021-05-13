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
                :disabled="formItem.disabled"
            ></el-input>
            <!-- select -->
            <el-select
                v-else-if="formItem.type == 'select'"
                v-model="formData[formItem.key]"
                :placeholder="formItem.placeholder || '请选择'"
                :disabled="formItem.disabled"
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
                :active-value="formItem.activeValue"
                :inactive-value="formItem.inactiveValue"
                :disabled="formItem.disabled"
            >
            </el-switch>
            <!-- number -->

            <el-input-number
                v-else-if="formItem.type == 'number'"
                v-model="formData[formItem.key]"
                :min="formItem.min || 0"
                :max="formItem.max || 100"
                :label="formItem.label"
            ></el-input-number>

            <!-- radio -->
            <el-radio-group v-else-if="formItem.type == 'radio'" v-model="formData[formItem.key]">
                <el-radio
                    :label="radio.label"
                    v-for="(radio, index) in formItem.options"
                    :key="index"
                    :disabled="radio.disabled"
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
                :disabled="formItem.disabled"
            ></el-slider>
            <!-- 日期选择 -->
            <el-date-picker
                v-else-if="formItem.type == 'datePicker'"
                v-model="formData[formItem.key]"
                type="date"
                placeholder="选择日期"
                :disabled="formItem.disabled"
            >
            </el-date-picker>
            <!-- 上传文件 -->
            <el-upload
                v-else-if="formItem.type == 'upload'"
                class="upload-demo"
                :action="baseUrl + '/upload/upload_file'"
                :headers="{ Authorization: $store.state.user.token }"
                :on-remove="
                    () => {
                        formData[formItem.key] = ''
                    }
                "
                :on-success="formItem.onSuccess"
                :on-error="formItem.onError"
                :limit="1"
                :on-exceed="
                    () => {
                        $message({ type: 'error', message: '最多上传一个文件' })
                    }
                "
            >
                <img
                    v-if="formData[formItem.key]"
                    :src="formData[formItem.key]"
                    style="object-fit: contain; display: block; height: 200px"
                    :style="{ width: formItem.width ? formItem.width : '300px' }"
                    alt="图片"
                />
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <!-- 树 -->
            <el-tree
                v-else-if="formItem.type == 'tree'"
                :data="formItem.options"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :check-strictly="formItem.checkStrictly || false"
                highlight-current
                @check="(() => check(formItem))()"
                :props="
                    formItem.defaultProps || {
                        children: 'children',
                        label: 'label',
                    }
                "
            >
            </el-tree>
            <!-- 补充信息 -->
            <span v-else-if="(formItem.type = 'supply')" :style="formItem.style">{{
                formItem.supply
            }}</span>
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
            baseUrl: 'https://adminapi.wmelon.cn/sha',
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
        this.setFormData()
    },
    watch: {
        option: {
            handler(val, oldVal, x, y) {
                this.formOption = defaultsDeep({}, this.option, this.defaultFormOption)
                this.pushRules()
                this.setFormData()
            },
            deep: true,
        },
    },
    methods: {
        check(formItem) {
            // formItem
            return (item, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) => {
                if (item.id == this.formData.id || item.parentId == this.formData.id) {
                    this.$refs.tree.setCheckedKeys([])
                    this.formData[formItem.key] = formItem.defaultValue
                    return
                }
                if (checkedKeys.length) {
                    this.$refs.tree.setCheckedKeys([item.id])
                    this.formData[formItem.key] = item.id
                } else {
                    this.$refs.tree.setCheckedKeys([])
                    this.formData[formItem.key] = formItem.defaultValue
                }
                // formItem.check(this.$refs.tree)
                // console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys, item)
            }
        },
        setFormData() {
            if (this.option.formData && Object.keys(this.option.formData).length) {
                this.formData = defaultsDeep({}, this.option.formData, this.formData)
            }
        },
        onSubmit() {
            this.$refs['dForm'].validate((valid) => {
                if (valid) {
                    this.$emit('confirm', this.formData)
                }
            })
        },
        clearForm() {
            for (let i in this.formData) {
                this.formData[i] = (this.option.formData && this.option.formData[i]) || null
            }
            // this.$refs.dForm.resetFields()
        },
        pushRules() {
            let forms = (this.forms = this.formOption.forms)
            forms.forEach((form, index) => {
                //默认设置
                this.formData[form.key] = form.defaultValue || null

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
