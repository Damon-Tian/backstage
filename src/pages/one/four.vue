<template>
    <d-form :option="option" @confirm="sendData"></d-form>
</template>

<script>
import dForm from '@/components/form/dForm.vue'
export default {
    components: { dForm },
    setup() {},
    data() {
        return {
            option: {
                forms: [
                    {
                        key: 'name',
                        label: '名字',
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
                    { key: 'age', label: '年龄' },
                ],
            },
        }
    },
    methods: {
        sendData() {
            alert('可以发送数据了')
        },
    },
}
</script>
