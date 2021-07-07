<template>
 <!-- <Scroll> -->
  
   <!-- <div id="body" class="configDIv"> -->
     <Card class="configCard">
       <p slot="title">身份证识别</p>
        <div class="demo-split">
          <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                 <Card style="width:600px">
                   <p slot="title">
                     <Icon type="md-images"></Icon>
                      身份证图片
                  </p>
                
                  <Card style="width:520px;height:310px;margin-left:20px">
                        <div style="text-align:center" v-for="item in uploadList">
                            <img class="img"  :src="item.url">
                        </div>
                  </Card>
                  <Upload :before-upload="handleBeforeUpload" :headers="myHeaders" action="//jsonplaceholder.typicode.com/posts/" :on-success="succeed" :on-error="error" :max-size="2048" style="display: inline-block;margin-top:10px;margin-left:20px;" :with-credentials="true" :show-upload-list="false">
                      <Button icon="ios-cloud-upload-outline">本地上传</Button>
                   </Upload>
                
                  <Button @click="idcard_ocr" icon="ios-eye-outline" style="margin-left:80px;">信息识别</Button>
                 
                  </Card>
                
            </div>
            <div slot="right" class="demo-split-pane">
                 <Card style="width:592px;margin-left:8px">
                   <p slot="title">
                     <Icon type="md-book"></Icon>
                      识别结果
                  </p>
                  <Card style="width:520px;height:310px;margin-left:20px;overflow-y:scroll;">
                      <Collapse v-model="value">
                        <Panel name="1">
                              姓名
                            <p slot="content">{{person_name}}</p>
                       </Panel>
                       <Panel name="2">
                            性别
                            <p slot="content">{{person_sex}}</p>
                       </Panel>
                       <Panel name="3">
                            民族
                            <p slot="content">{{person_nation}}</p>
                        </Panel>
                       <Panel name="4">
                            身份证号
                            <p slot="content">{{person_id}}</p>
                        </Panel>
                        <Panel name="5">
                            出生年月
                            <p slot="content">{{person_birth}}</p>
                        </Panel>
                        <Panel name="6">
                            地址
                            <p slot="content">{{person_address}}</p>
                        </Panel>
                      </Collapse>
                  </Card>
                   <Button @click="exportfordoc" icon="ios-cloud-download-outline" style="margin-top:15px">导出为文件</Button>
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
import { JSEncrypt } from 'jsencrypt'
var token =  localStorage.getItem('tokenKey')
var took = sessionStorage.getItem('tokenKey');
 
// const {JSEncrypt} = require('encryptlong')


  export default {
    name: "Idcardocr", 
    data () {
            return {
                split1: 0.5,
                uploadList: [],
                image_base64:{},//上传之前未经加密的信息，加密之后的信息覆盖存储
                value:"7",
                myHeaders: {Authorization: token},
                person_name:'',
                person_id:'',
                person_birth:'',
                person_sex:'',
                person_nation:'',
                person_address:'',
                download_info:{},//从后端返回来的加密的信息
                public_key:'',//公钥
                private_key:'',//私钥
               
               
            }
        },
        Mounted(){
            document.getElementById('body').scrollTop=10000;
        },
         
       
    methods: {

      handleBeforeUpload(file) {
          //上传新的图片之前先删除上一个图片
         this.uploadList=[];
         console.log("我是上传之前")
     
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
            _this.image_base64=file.url; 
          
           
        }  
       
        
         //得到公钥
        this.$axios({
          method:'post',
          url:'http://'+this.addre+'/getkey/',
          data:{
            "asw":"这里"
          },
          header:{
            'Content-Type':"application/x-www-form-urlencoded",
            }
            })
            .then(response=>{
             
               let res = response.data;
              
              //  后端以dict的格式传数据到前端，数据格式出现了一些问题，需要进行以下一些处理
               this.public_key = res["public_key"];
               this.public_key = this.public_key.replace("b'","")
               this.public_key = this.public_key.replace("'","")
               this.public_key = this.public_key.replace(/\\n/g, " \n ");
               this.private_key = res["private_key"]
               this.private_key = this.private_key.replace("b'","")
               this.private_key = this.private_key.replace("'","")
               this.private_key = this.private_key.replace(/\\n/g, " \n ");
              console.time('y')
                           
               //前端进行信息加密
               const  encrypt = new JSEncrypt();
               encrypt.setPublicKey(this.public_key);
              let imgdata = this.image_base64;
              let fir_head = Math.round(Math.random()*30);//生成第一个序列的起始位置【0-30】
              let sec_head = Math.round(Math.random()*30);//生成第二个序列的起始位置【0-30】
              let fir_seq = imgdata.substr(fir_head,50);//生成第一段序列，长度为50
              // console.log("第一段明文如下")
              // console.log(fir_seq)
              let sec_seq = imgdata.substr(sec_head,50);//生成第二段序列，长度50，与第一段部分重叠不可以再长了，否则会报错
              let fir_ciphertext = encrypt.encrypt(fir_seq);//生成第一段序列的密文
              console.log("第一段密文如下：")
              console.log(fir_ciphertext)
              let sec_ciphertext = encrypt.encrypt(sec_seq);//生成第二段序列的密文
              let ciphertext = fir_ciphertext + sec_ciphertext;
              // console.log("打乱顺序之前的总体密文如下")
              // console.log(ciphertext)
              let cutcip_head = Math.abs(fir_head-sec_head)
              ciphertext = ciphertext.substr(0,cutcip_head) + ciphertext.substr(cutcip_head+fir_head+sec_head) + ciphertext.substr(cutcip_head,fir_head+sec_head)
              imgdata = imgdata.substr(0,Math.min(fir_head, sec_head)) + ciphertext +imgdata.substr(Math.max(fir_head,sec_head)+50)//截取部分加密的信息与未截取到的信息，明文+密文+明文
              // let cip_length = ciphertext.length #单个密文的长度是344，两个密文长度688

              console.timeEnd('y')
             
          
               this.$axios({
                 method:'post',
                 url:'http://'+this.addre+'/senddata/',
                 data:{
                   "img_base64":imgdata,
                   "fir_head":fir_head,
                   "sec_head":sec_head,
                      },
                 header:{
                   'Content-Type':"application/x-www-form-urlencoded",
                      }
              })
                .then(response=>{
                   var res=response.data;
                   console.log(typeof(res))
                   console.log(res)

                 })
                .catch(Error=>{
                   console.log(Error)
                 })
            
              })
            .catch(Error=>{
              console.log(Error)
              })


    },
    succeed(){
      console.log("上传成功啦")
    },
    error(){
      console.log("上传失败了")
    },
    idcard_ocr(){
      console.time("x")
        this.$axios({
          method:'post',
          url:'http://'+this.addre+'/ocr/',
          // data:{
          //   "img_base64":this.image_base64, 
          // },
          header:{
            // 'Content-Type':'application/json'  //如果写成contentType会报错
            'Content-Type':"application/x-www-form-urlencoded",
            }
            })
            .then(response=>{
             
              let res = response.data;
              
    
              //miser解密
              let fir = res["fir"];//第一段起始位置
              let sec = res["sec"];//第二段起始位置
              let cip_all = res["cip_all"];//整体密文加明文部分
              let cip = cip_all.substr(fir+2,688);//密文部分 开头+2是byte格式中的开头符号b'占得位数
              cip = cip.substr(0,sec-fir)+cip.substring(688-(sec+fir))+cip.substring(sec-fir,688-(sec+fir))//还原密文原来的顺序
              let fir_cip = cip.substr(0,344)
              let sec_cip = cip.substr(344,344)
           

              var decrypt = new JSEncrypt();
              decrypt.setPrivateKey(this.private_key);
              let fir_data = decrypt.decrypt(fir_cip);
              let sec_data = decrypt.decrypt(sec_cip);
            
              fir_data = JSON.parse(fir_data)//fir_data；解析之后的数据，将后端传回来的json对象转换为可识别的js对象
              sec_data = JSON.parse(sec_data)
              let result = cip_all.substr(0,fir)+fir_data.substr(0,sec-fir)+sec_data+cip_all.substr(fir+3+688)
              result = eval('(' + result + ')');
             

              this.download_info=result;//为了存入D盘
          
    
              this.person_name=result['name'];
              this.person_id=result['idnum'];
              this.person_birth=result['birth'];
              this.person_sex=result['sex'];
              this.person_nation=result['nation'];
              this.person_address=result['address'];
              this.$Message.success('识别成功啦！');
               console.timeEnd("x")
              })
            .catch(Error=>{
              console.log(Error)
              })
     
     
      
     

    },
    exportfordoc(){
      this.$axios({
          method:'post',
          url:'http://'+this.addre+'/download/',
          data:{
            "download_info":this.download_info,    
          },
          header:{
            // 'Content-Type':'application/json'  //如果写成contentType会报错
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