<template>
  <Card class="configCard">
    <p slot="title">身份证真伪判别</p>

    <Card id="regist_page" class="page">
      <Table
        border
        height="350"
        ref="selection"
        :columns="columns"
        :data="data1"
      ></Table>
    </Card>
    <Upload
      :before-upload="Upload_idcard"
      :headers="myHeaders"
      multiple
      action="//jsonplaceholder.typicode.com/posts/"
      :max-size="20480"
      :with-credentials="true"
      :show-upload-list="false"
    >
      <Button
        icon="ios-cloud-upload-outline"
        style="margin-top: 30px; margin-left: -200px"
        >上传身份证信息</Button
      >
    </Upload>
    <Button
      @click="verify"
      icon="md-checkmark"
      style="margin-top: -55px; margin-left: 200px"
      >验证</Button
    >
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

      const _this = this;
      reader.onloadend = function (e) {
        file.url = reader.result;
        _this.uploadList.push(file);
        _this.image = file.url;
      };
    },
    verify() {
      
       
      var docnum = this.uploadList.length; //总的上传的身份证图片的数量
      for(var i=1;i<docnum;i++){
          this.image = this.uploadList[i-1].url
           this.$axios({
            method:'post',
            url:'http://'+this.addre+'/verify/',
            data:{
                "img_base64":this.image
            },
            header:{
            'Content-Type':"application/x-www-form-urlencoded",
            }
          })
          .then(res=>{
              this.data1[i-1].pass = res.data


          })
      }
    },
  },
};
</script>
<style scoped>
.page {
  position: relative;

  background-color: lavender;
  height: 400px;
  font-style: initial;
}
</style>