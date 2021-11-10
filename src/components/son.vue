<template>
  <!-- <Card class="config">我是子组件的内容 -->
    <div>
        -------------------从这里开始是子组件的内容-------------------
       <div>{{sondata}}</div>
       <lable>通过props得到父组件的值：</lable><input v-model="sondata"/><br>
       <lable>通过inject得到父组件的值：</lable><input v-model="fathername"/><br>
       <input type="text" v-model="sonage"><button @click="getage()">通过$emit方法向父组件传值</button><br>
       <button @click="change1()">通过$parent获取父元素的值（山重水复疑无路）</button>
       <div>{{parent1}}</div>
      <button @click="change2()">通过$parent改变父元素的值（柳暗花明又一村）</button>
      <div>{{parent2}}</div>
      <div>{{sor1}}，{{sor2}}</div>
     
       </div>
  <!-- </Card> -->
  

</template>
	
<script type="text/javascript">
import Vue from 'vue'


 
export default {
  name: "son",
  props: ['sondata'],
  inject:["fathername"],
  data() {
    return {
        sonage:"输入要向父组件传递的值",
        parent1:"获取",
        parent2:"柳暗花明又一村",
        sor1:"无边落木萧萧下",
        sor2:"一下一下又一下"
    };
  },
  watch: {
    
  },
  create:{
    
  },
  methods: {
      getage(){
          this.$emit('son_age', this.sonage)
      },
      test(){
        console.log("可以获取到子元素的函数")
      },
      change1(){
        this.parent1=this.$parent.par1//获取父组件的值
        this.$parent.set();//调用父组件的函数
        
      },
      change2(){
        this.$parent.par2=this.parent2//在子组件里面改变父组件里面的值
      }
  },
}


</script>
<style scoped>
.config{
height:450px;
}


</style>