<template>
  <div class="configCard">
    <p slot="title">父子组件</p>
    <label>props方法使用的父组件的值：</label><input v-model="data"/>
    <div>{{data}}</div>
    <lable>通过$emit方法父组件得到子组件的值：</lable><input type="text" v-model="sonage">
    <div>{{fatherdata}}</div>
    <div>{{par1}}，{{par2}}</div>
    <button @click="change3()">通过$children获取子元素的值（无边落木萧萧下）</button>
       <div>{{son1}}</div>
      <button @click="change4()">通过$children改变子元素的值（不尽长江滚滚来）</button>
      <div>{{son2}}</div>
      <button @click="get()">通过$ref获取父组件的值</button><div>{{ref}}</div>
    <son ref="one" :sondata="data" @son_age="getage"></son> 
    
   


  
  </div>
</template>
	
<script type="text/javascript">

import son from "../../components/son.vue"

 
export default {
  name: "father",
  components:{
      son,
  },
  provide:{
      fathername:"爸爸啊",
    
     
  },
  data() {
    return {
        name:"爸爸",
        data:"",
        sonage:0,
        fatherdata:"我是即将被子组件用this.$parent.message改变的值",
        par1:"山重水复疑无路",
        par2:"一路一路又一路",
        son1:"获取",
        son2:"不尽长江滚滚来",
        ref:"父组件的值"
    };
  },
  watch: {
    
  },
  create:{
    
  },
  methods: {
      getage(val){
          this.sonage=val
      },
      set(){
        console.log("可以获取到函数")
      },
      change3(){
        this.son1=this.$children.sor1;//获取子元素的值

      },
      change4(){
      
        this.$children.sor2=this.son2;//改变子元素的值
      },
      get(){
        this.ref=this.$refs.one.sor1;//获取子元素的值
        this.$refs.one.test();//获取子元素的函数
        this.$refs.one.sor1="哈哈哈哈哈哈哈";//改变子元素的值
      }
  },
}


</script>
<style scoped>

</style>