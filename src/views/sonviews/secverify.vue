<template>
  <Card class="configCard">
    <p slot="title">身份证真伪判别</p>

    <Card id="regist_page" class="page">
      <Table  
      border 
      height="350" 
      ref="selection" 
      :columns= "columns" 
      :data= "data1"
      ></Table>
    </Card>
    <Upload
      :before-upload= "Upload_idcard"
      :headers= "myHeaders"
      multiple
      action="//jsonplaceholder.typicode.com/posts/"
      :max-size= "20480"
      :with-credentials= "true"
      :show-upload-list= "false"
    >
    
      <Button
        icon="ios-cloud-upload-outline"
        style="position:absolute;margin-top:6px;width:200px;margin-left:-500px;"
        >上传身份证信息</Button>
    </Upload>
    <Button @click="verify" icon="md-checkmark">验证</Button>
    <Button @click="clear" icon="ios-trash-outline">删除</Button>
      
  </Card>
</template>
<script>
var token = localStorage.getItem("tokenKey");

export default {
  name: "secverify",
  data() {
    return {
      uploadList: [],
      myHeaders: { Authorization: token },
      image: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "身份信息",
          key: "card_info",
        },
        {
          title: "验证是否通过",
          key: "pass",
        },
      ],
      data1: [],
     
   
    };
  },

  methods: {
    Upload_idcard(file) {
      this.data1.push({
        card_info: file.name,
        pass: "未经过验证",
      });
      //上传新的图片之前先删除上一个图片
      this.uploadList = [];
      // 创建一个 FileReader 对象
      let reader = new FileReader();
      // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
      // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
      // 读取文件作为 URL 可访问地址
      reader.readAsDataURL(file);
      console.log(file)

      const _this = this;
      reader.onloadend = function (e) {
        file.url = reader.result;
        _this.uploadList.push({
          card_info:file.name,
          url:file.url
        });
      };
    },
    verify() {
      //拿出此时选中的图片
       let val = this.$refs.selection.getSelection()//当前已经被选中的项
      var valstr = [];
      for(let i=0;i<val.length;i++){
        valstr.push(val[i].card_info)
      }
      var verify_img = [];//存储即将被验证的图片
      for(let i=0;i<this.uploadList.length;i++){
        let index = valstr.indexOf(this.uploadList[i].card_info);
        if(index!=-1){
          verify_img.push(this.uploadList[i])//card_inf0和url同时存进去
        }

      }
      this.single_verify(verify_img,0)


      

    },
    //单个图片的验证
    single_verify(value,index){
            //图片依次发送到后端进行验证
          if(index>=value.length){
             return
          }
          console.log("第几个"+index)
           this.$axios({
            method:'post',
            url:'http://'+this.addre+'/verify/',
            data:{
                "card_info":value[index].card_info,
                "img_base64":value[index].url
            },
            header:{
            'Content-Type':"application/x-www-form-urlencoded",
            }
          })
          .then(res=>{
             for(let j=0;j<this.data1.length;j++){
               if(this.data1[j].card_info===res.data.card_info){
                 this.data1[j].pass = res.data.verify_res
               }
              index++;
              this.single_verify(value,index)//递归
            }
            

          })
     

    },
    clear(){
      let val = this.$refs.selection.getSelection()//当前已经被选中的项
      var valstr = [];
      for(let i=0;i<val.length;i++){
        valstr.push(val[i].card_info)
      }
      
      var l=0
      var len=this.data1.length;
      while(l<len){
         let value = this.data1[l].card_info;
         var index = valstr.indexOf(value);
        
         if(index!=-1){
           this.data1.splice(l,1);
           len--;
           continue;
         }
         l++;
    }

 
    
   
      }
     
    },

  
   

    
};
</script>
<style scoped>
Button:nth-of-type(1){
 margin-left: 180px;
 margin-right:180px;
  width:200px;
 
 
}
Button:nth-of-type(2){
  margin-right:-150px;
  width:200px;
  
}
.page {
  position: relative;
  ;
  background-color: lavender;
  height: 400px;
  font-style: initial;
}
</style>