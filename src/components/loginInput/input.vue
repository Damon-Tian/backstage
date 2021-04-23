<template>
    <label class="l" :class="{'focus':toTop}">
        <span class="l-label" >{{option.label}}</span>
        <span  @click="focusx" class="l-input">
            <input :type="option.type||'text'"  
            @blur="blur" 
            v-model="value" 
            :placeholder="focus?
            option.placeholder?option.placeholder:`请输入${option.label}`
            :''
            " >
        </span>
    </label>
</template>


<script>
export default {
    props:['option','value'],
    data(){
        return{
            focus:false,
            empty:true
        }
    },
    computed:{
        toTop(){
            if(this.empty){
                if(this.focus){
                    return true
                }
                return false
            }else{
                return true
            }
        },
        empty(){
            return this.value?false:true
        }
    },
    watch:{
        value(val){
            console.log(val)
            this.empty = this.value ? false : true;
        }
    },
    methods:{
        blur(){
            if(this.empty){
                this.focus = false
            }
        },
        focusx(){
            this.focus = true
        }
    }
}
</script>

<style lang="less" scoped>
.l{
    width: 100%;
    position: relative;
    display: block;
    margin-bottom: 20px;
    .l-label{
        transition: all .3s;
        position: absolute;
        font-size: 16px;
        width: 100px;
        top:10px;
        z-index: 1;
    }
    .l-input{
        display: block;
        position: relative;
        padding-top: 10px;
            border-bottom: 1px solid red;

        input{
            outline: none;
            border: none;
        }
        &::after{
            content:'';
            width: 0%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 2px;
            background-color: red;
            transition: all .3s;
            bottom: 0;
        }
    }
    &.focus{
        .l-label{
            top: -10px;
            font-size: 14px;
        }
        .l-input{
            &::after{
                width: 100%;
            }
        }
        
    }
}
</style>