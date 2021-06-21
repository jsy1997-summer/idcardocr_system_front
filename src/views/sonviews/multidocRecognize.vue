<template>
 <!-- <Scroll> -->
  
   <!-- <div id="body" class="configDIv"> -->
     <Card class="configCard">
       <p slot="title">多文件识别</p>
        <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                 <Card style="width:600px">
                   <p slot="title">
                     <Icon type="md-images"></Icon>
                      被识别图片列表
                  </p>
                
                  <Card style="width:520px;height:310px;margin-left:20px;">
                        <!-- <div style="text-align:center" v-for="item in uploadList">
                            <img class="img"  :src="item.url">
                        </div> -->
                        <!-- <div v-if="file_name !== null">Upload file: {{ file_name }}</div> -->
                        <Table  height="250" :columns="columns1" :data="file_name"></Table>
                  </Card>
                  <Upload :before-upload="handleBeforeUpload" :headers="myHeaders" multiple  action="/multidocRecognize" :format="['jpg','jpeg','png']" :max-size="2048"  :on-success="succeed" :on-error="error"   style="display: inline-block;margin-top:10px;margin-left:20px;" :with-credentials="true" :show-upload-list="false">
                      <Button icon="ios-cloud-upload-outline">本地上传</Button>
                   </Upload>
                
                  <Button @click="multi_idcard_ocr" icon="ios-eye-outline" style="margin-left:80px;">信息识别</Button>
                 
                  </Card>
                
            </div>
            <div slot="right" class="demo-split-pane">
                 <Card style="width:592px;margin-left:8px">
                   <p slot="title">
                     <Icon type="md-book"></Icon>
                      识别结果
                  </p>
                  <Card style="width:520px;height:310px;margin-left:20px;">
                      <!-- {{recog_text}} -->
                       <Table height="250" weight="120" :columns="columns" :data="info_data" ref="table"></Table>
                  </Card>
                   <Button @click="download_data" icon="ios-cloud-download-outline" style="margin-top:15px">下载</Button>
                 </Card>
            </div>
        </Split>
    </div>
     </Card>
    
  <!-- </div> -->
 
 <!-- </Scroll> -->
</template>

<script>
import axios from 'axios'
var token =  localStorage.getItem('tokenKey')
var took = sessionStorage.getItem('tokenKey'); 

  export default {
    name: "MultidocRecognize", 
    data () {
            return {
                file_name:[],
                split1: 0.5,
                uploadList: [],
                image_base64:"",
                myHeaders: {Authorization: token},
                recog_text:"",
                card_num:0,//记录上传的身份证图片的数量
                now_id:0,//记录当前识别到第几个图片
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:80,
                        fixed: 'left'
                    },
                    {
                        title:'Sex',
                        width:80,
                        key:'sex'
                    },
                    {
                        title:'Idnum',
                        key:'idnum',
                        width:180
                    },
                    {
                        title:'Birth',
                        key:'birth',
                        width:100
                    },
                    {
                        title: 'Nation',
                        key: 'nation',
                        width:80
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width:300
                    }
                ],
                info_data: [
                    // {
                    //     name: '薛之谦',
                    //     sex: '男',
                    //     idnum:'142622199805240061',
                    //     birth:'19980524',
                    //     nation:'汉',
                    //     address: '山西省临汾市翼城县唐兴小区二巷六号',
                    // },
                    ],
                    columns1:[
                      {
                        title: 'Upload file list',
                        key: 'name',
                        // width:300,
                      }
                    ]
               
            }
        },
        Mounted(){
            document.getElementById('body').scrollTop=10000;
        },
         
       
    methods: {
       handleBeforeUpload(file) {
         this.file_name.push({
           name:file.name
         })

        //上传新的图片之前先删除上一个图片
        //  this.uploadList=[];
        
        
      
        // 创建一个 FileReader 对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        reader.readAsDataURL(file)
    
        const _this = this
        reader.onloadend = function (e) {
            file.url = reader.result
            _this.uploadList.push(file)
         
        }  
    },
    succeed(){
      console.log("上传成功啦")
    },
    error(){
      console.log("上传失败了")
    },
    idcard_ocr(){
        this.$axios({
          method:'post',
          url:'http://'+this.addre+'/ocr/',
          data:{
            "img_base64":this.image_base64,
            
          },
          header:{
            // 'Content-Type':'application/json'  //如果写成contentType会报错
            'Content-Type':"application/x-www-form-urlencoded",
            }
            })
            .then(response=>{
              //  var data = JSON.stringify(response.data);
              //  this.recog_text = this.recog_text + data;
              var info = response.data;
              this.info_data.push({
                name:info['name'],
                sex:info['sex'],
                nation:info['nation'],
                birth:info['birth'],
                idnum:info['idnum'],
                address:info['address']
              })

               this.$Message.success('识别成功啦！')
               if(this.now_id!=this.card_num){
                 this.now_id = this.now_id + 1;
                 this.image_base64 = this.uploadList[this.now_id - 1].url
                 this.idcard_ocr();

               }
              })
            .catch(Error=>{
              console.log(Error)
              })  
    },
    multi_idcard_ocr(){
     
      var docnum = this.uploadList.length;//总的上传的身份证图片的数量
      this.card_num = docnum;
      // for(var i=1;i<=docnum;i++){//依次取出传到后端进行识别
      //   var img = this.uploadList[i-1].url;
      //   this.image_base64="";
      //   this.image_base64 = img;
      //   this.idcard_ocr();
      // }//无法循环访问后端进行识别，访问后端不会等待后端把数据传回来再进行程序，所以会出现同时访问后端报错
      //仅仅是把数据传到后端就会继续进行下一步程序，不会等待后端把数据传回。解决：在返回数据的程序里面回调this.idcard_ocr()
      if(this.info_data.length==0){
        this.image_base64 = this.uploadList[0].url;
        this.idcard_ocr();
        this.now_id = 1;

      }else{
        //  this.now_id =  this.now_id + 1;
        // this.card_num = this.card_num + 1;
        this.image_base64 = this.uploadList[this.now_id].url;
        this.card_num = this.card_num - 1;
      
        this.idcard_ocr();
      }
      
    },
    download_data(){
      this.$refs.table.exportCsv({
                        filename: '身份证信息表'
                    });
    },
  
    exportfordoc(){
      this.$axios({
          method:'post',
          url:'http://'+this.addre+'/download/',
          data:{
            "download_info":this.recog_text,    
          },
          header:{
            'Content-Type':"application/x-www-form-urlencoded",
            }
            })
            .then(response=>{
              this.$Message.success('已经存入D盘');
              })
            .catch(Error=>{
              console.log(Error)
              })
      
    },
    handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file), 1)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },       
    },
    
   
    }

</script>

<style scoped>


</style>