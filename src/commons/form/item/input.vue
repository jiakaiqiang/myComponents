<template>
  <div class="form-input">
    <el-input  v-bind="$attrs" v-model="inputValue"  size="small" @blur="handleEvent('blur')" @change="handleEvent('changeInput')"></el-input>
  </div>
</template>

<script>
export default {
name:'inpust',
data(){
return {
  inputValue:''
}
},
props:{
  value:{
    type:String,
    default:""
  }
},
watch:{
//监听数据双项修改
inputValue(value){
  this.$emit('update:value',value)
}
},
created(){
 this.inputValue=this.value
},
methods:{
  handleEvent(event){
    this.$emit('handleEvent',event,this.inputValue)
  }
}
}
</script>
<style>


</style>
