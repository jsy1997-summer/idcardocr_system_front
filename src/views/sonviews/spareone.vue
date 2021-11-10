<template>
  <Card class="configCard">
    <p slot="title">学习备用</p>
    <!-- <div :style="({width:'100px',heigt:'100px',backgroundColor:'rgb($(r),$(g),$(b))'})"></div> -->
    <Card v-bind:style="{width:width+'px' , height:height+'px', backgroundColor:'rgb('+r+','+g+','+b+')'}"></Card>
    <input type="range" from="0" to="255" v-model="r">调色r<br>
    <input type="range" from="0" to="255" v-model="g">调色g<br>
    <input type="range" from="0" to="255" v-model="b">调色b<br>
    <input type="range" from="0" to="1000" v-model="width">调节长度<br>
    <input type="range" from="0" to="1000" v-model="height">调节宽度<br>
    <div>我的年龄是{{age}}岁</div>
    <Button v-on:click="define">设置</Button> <br>
    <input placeholder="输入数字" v-model="sum"><br>
    <input placeholder="输入数字" v-model="sum"><br>
    <div v-html="message"></div>
    <Button @click="getdata">数据劫持</Button>
    <!-- HTML部分 -->
    <div>
      {{fullName}}
      <button @click="firstName='John'">改名字</button>
    </div>
    <div>我喜欢的偶像是{{idol}}</div>
    <button @click="change">换个偶像</button>
     <div v-show="vshow">试验v-show功能</div>
    <div v-if="vif">试验v-if功能</div>
    <label>输入情况</label>
    <input v-model.lazy="msg" >
    <div>{{msg}}</div>
    <a v-on:click.prevent="doThis">thisthis</a>
    <input v-on:click.ctrl="doThis">
    <div v-text="msg"></div>
    <div v-html="html"></div>
    <li v-for="item in list" v-bind="item.id">
        <input type="checkbox"> {{item.name}}
      </li>
      <div>{{this.$store.state.msg}}</div>
      <select name="abc" id="" v-model="fruit" >
            <option value="苹果" >苹果</option>
            <option value="香蕉" >香蕉</option>
            <option value="榴莲" >榴莲</option>
            <option value="葡萄" >葡萄</option>
        </select>
        <h2>您选择的水果是：{{fruit}}</h2>
        <div v-show="false">v-show用法测试</div>
        <!-- <div id="app">
          <div v-if="Math.random() > 0.5">Sorry</div>
          <div v-else>Not sorry</div>
        </div> -->
        <div>
          <div v-if="type==='A'">A</div>
          <div v-else="type==='B'">B</div>
        </div>
        <div v-show="type==='A'?true:false">A</div>
        <div v-show="type==='B'?true:false">B</div>

       
</div>



 

   

  
  </Card>
</template>
	<script src="http://192.168.1.5:8081/static/test_func.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
import Vue from 'vue'


 
export default {
  name: "spareone",
  data() {
    return {
      r:0,
      g:0,
      b:0,
      width:200,
      height:200,
      age:0,
      sum:'绝地求生',
      message:"<h1>Hello World!</h1>",
      firstName: 'Jacky',
      lastName: 'Lee',
      fullName: '',
      idol:"薛之谦",
      vif:true,
      vshow:false,
      msg:"<div>当春乃发生</div>",
      html:"<div>当春乃发生</div>",
      list: [
          { id: 1, name: '李斯' },
          { id: 2, name: '吕不韦' },
          { id: 3, name: '嬴政' }
        ],
        fruit:"苹果",
        type:"A",
      
    };
  },
   watch: {
    // firstName: {
    //   handler: 'change',
    //   immediate:true
    // }
    idol(){
      console.log("偶像变了呀")
    }
  },
  create:{
    func(ret){
      console.log(ret)
    },
  },
  methods: {
    doThis(){
      console.log("你好时节")
    },
    
    change() {
      alert(this.$data.sum)
      this.idol="王一博"
      this.fullName =  this.firstName + ' ' + this.lastName      
    },
    define(){
     
      this.age=52
      console.log(this.sum)
      this.message = "<h3 style='background-color:yellow'>Welcome</h3>"
    },
    getdata(){
     
      const obj = {}
      const obj1 = {}
      let name = "miser"


      Object.defineProperty(obj,"name",{
       get(){
         return name
       },
       set(newvalue){
         if(newvalue===name) return
         console.log("新的属性的值为：")
         name = newvalue
       }
      })
      obj.name = "李白"  //输出“新的属性的值为：”
      // console.log(obj.name)  //输出 李白

      Object.defineProperty(obj1,"name",{
        value:"张三",
        writable:true
      })

      // console.log(obj1.name) //张三
      obj1.name = "李四"
      // console.log(obj1.name) //李四
    },// 使用getter和setter方法重写了原来的属性，称为”数据劫持“
   

  },
  
}


</script>
<style scoped>

</style>