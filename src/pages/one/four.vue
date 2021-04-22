<template>
    <d-form :option="option" @confirm="sendData"></d-form>
    <d-form :option="option" @confirm="sendData"></d-form>
    <d-form :option="option" @confirm="sendData"></d-form>
</template>

<script>
import dForm from '@/components/form/dForm.vue'
export default {
    components: { dForm },
    setup() {},
    data() {
        return {
            option2: {
                forms: [
                    {
                        key: 'age',
                        label: '年龄',
                        type: 'select',
                        rules: ['required'],
                        options: [
                            { label: '2', value: 2 },
                            { label: '3个', value: 3 },
                        ],
                    },
                ],
            },
            option: {
                labelWidth: '140px',
                forms: [
                    {
                        key: 'name',
                        label: '名字',
                        type: 'input',
                        rules: [
                            'required',
                            { min: '2', max: '5' },
                            {
                                validator: function (rule, value, callback) {
                                    if (value == 666) {
                                        callback('恭喜你中奖了~')
                                    }
                                    callback()
                                },
                            },
                        ],
                    },
                    {
                        key: 'age',
                        label: '年龄',
                        type: 'select',
                        rules: ['required'],
                        options: [
                            { label: '2', value: 2 },
                            { label: '3个', value: 3 },
                        ],
                    },
                    {
                        key: 'weather',
                        type: 'switch',
                        label: '天气好吗',
                        active: '好',
                        inactive: '不好',
                        inactiveColor: 'gray',
                        defaultValue: true,
                    },
                    {
                        key: 'sex',
                        type: 'radio',
                        label: '性别',
                        rules: [{ required: '请选择性别' }],
                        defaultValue: 'male',
                        options: [
                            { value: 'male', label: 'male' },
                            { value: '女', label: 'female' },
                        ],
                    },
                    {
                        key: 'fruit',
                        type: 'checkbox',
                        label: '喜欢吃什么水果',
                        rules: [{ required: '请选择水果' }],
                        defaultValue: ['苹果'],
                        options: [{ label: '苹果' }, { label: '桃子' }, { label: '随便' }],
                    },
                    {
                        key: 'likenumber',
                        label: '你喜欢数字几',
                        type: 'slider',
                        defaultValue: 10,
                    },
                    {
                        key: 'date',
                        label: '喜欢哪一天',
                        type: 'datePicker',
                        rules: ['required'],
                    },
                ],
            },
        }
    },
    methods: {
        sendData(formData) {
            console.log(formData)
        },
    },
}
</script>
