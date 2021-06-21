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

               this.image_base64 = "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔"
               this.image_base64 = "如果我是一朵花，我又为谁而绽放，如果我是一个草，又往何处去飞翔，生命，出现了奇迹，而担心"
              
              
               

               //前端进行信息加密
               const  encrypt = new JSEncrypt();
               encrypt.setPublicKey(this.public_key);
              //  this.image_base64="等一朵花开的时间 /Then I Love You"
              let imgdata = this.image_base64;
              let fir_head = Math.round(Math.random()*15);//生成第一个序列的起始位置【0-200】
              let sec_head = Math.round(Math.random()*15);//生成第二个序列的起始位置【0-200】
              let fir_seq = imgdata.substr(fir_head,20);//生成第一段序列，长度为500
              let sec_seq = imgdata.substr(sec_head,20);//生成第二段序列，长度500，与第一段部分重叠
              let fir_ciphertext = encrypt.encrypt(fir_seq);//生成第一段序列的密文
              let sec_ciphertext = encrypt.encrypt(sec_seq);//生成第二段序列的密文
              let ciphertext = fir_ciphertext + sec_ciphertext;
              let cutcip_head = Math.abs(fir_head-sec_head)
              ciphertext = ciphertext.substr(0,cutcip_head) + ciphertext.substr(cutcip_head+fir_head+sec_head) + ciphertext.substr(cutcip_head,fir_head+sec_head)
              imgdata = imgdata.substr(0,Math.min(fir_head, sec_head)) + ciphertext +imgdata.substr(Math.max(fir_head,sec_head)+20)//截取部分加密的信息与未截取到的信息，明文+密文+明文
              let cip_length = ciphertext.length
           
          
               this.$axios({
                 method:'post',
                 url:'http://'+this.addre+'/senddata/',
                 data:{
                   "img_base64":imgdata,
                   "fir_head":fir_head,
                   "sec_head":sec_head,
                   "cip_length":cip_length,
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
               this.download_info=response.data;

                //解密
                var decrypt = new JSEncrypt();
               decrypt.setPrivateKey(this.private_key);
               var de_data = decrypt.decrypt(this.download_info);
               de_data = JSON.parse(de_data)//de_data；解析之后的数据，将后端传回来的json对象转换为可识别的js对象
             
              
              this.person_name=de_data['name'];
              this.person_id=de_data['idnum'];
              this.person_birth=de_data['birth'];
              this.person_sex=de_data['sex'];
              this.person_nation=de_data['nation'];
              this.person_address=de_data['address'];
              this.$Message.success('识别成功啦！');
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