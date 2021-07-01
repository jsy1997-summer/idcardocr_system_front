<template>
   <Card class="configCard">
       <p slot="title">考中身份验证</p>
        <!-- <div class="demo-split" style="height:400px;">
             <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <Card style="width:600px">
                   <p slot="title">
                     <Icon type="md-images"></Icon>
                      身份证图片
                  </p>
                  <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/" :before-upload="Upload_idcard" :show-upload-list="false" style="height:290px">
                  <div style="height:290px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;margin-top:100px"></Icon>
                        <p>Click or drag files here to upload</p>
                        <div style="text-align:center;margin-top:-160px;z-index:-2" v-for="item in uploadList1">
                            <img class="img"  :src="item.url">
                        </div>
                  </div>
                  </Upload>
                
                  
                </Card>    
            </div>
            <div slot="right" class="demo-split-pane">
                 <Card style="width:592px;margin-left:8px">
                   <p slot="title">
                     <Icon type="md-camera" />
                      考中拍照图片
                  </p>
                   <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/" :before-upload="Upload_photo" :show-upload-list="false" style="height:290px">
                   <div style="height:290px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;margin-top:100px"></Icon>
                        <p>Click or drag files here to upload</p>
                        <div style="text-align:center;margin-top:-160px" v-for="item in uploadList2">
                            <img class="img"  :src="item.url">
                        </div>
                   </div>
                  </Upload>
                 </Card>
            </div>
          </Split> 
        </div> -->
       <!-- <Button @click="contrast" icon="md-color-wand" style="margin-top:30px;">对比验证</Button> -->
      
        <Card id="regist_page" class="page" style="display:none">
            <h2>全国卫生专业技术资格考试</h2>
             <Card class="idcard_img">
                <div style="text-align:center" v-for="item in uploadList">
                    <img class="img"  :src="item.url">
                </div>
            </Card>
            <Upload :before-upload="Upload_idcard" :headers="myHeaders" action="//jsonplaceholder.typicode.com/posts/"  :max-size="20480"  :with-credentials="true" :show-upload-list="false">
                <Button icon="ios-cloud-upload-outline" style="margin-top:310px;margin-left:-200px" >上传身份证信息</Button>
            </Upload>
            <Button @click="regist_finish" icon="md-checkmark" style="margin-top:-55px;margin-left:200px" >注册完成</Button>
        </Card>
        <Card id="login_page" class="page" >
            <h2>全国卫生专业技术资格考试</h2>
            <Card class="idcard_img">
                <Form :model="formItem" :label-width="100" class="login_img">
                    <FormItem prop="user">
                        <Input type="text" v-model="formItem.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formItem.idcard" placeholder="ID Card Number">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
            </Card>
            <Button @click="login" icon="md-arrow-round-up" style="margin-top:310px;">登录</Button> 
            <Button @click="regist" icon="md-arrow-round-up" style="margin-top:310px;margin-left:60px;">注册</Button> 
        </Card>
        <Card id="exam_page" class="page" style="display:none">
            <h2>全国卫生专业技术资格考试</h2>
            <Card style="font-weight:bold;line-height:700%;width:530px;height:130px;position:absolute;margin:auto;top:-150px;bottom:0px;left:-85px;right:85px;background-color:rgb(111, 224, 228);text-align:center;">
                {{tip}}
            </Card>
            <Card style="width:170px;height:130px;position:absolute;margin:auto;top:-150px;bottom:0px;left:265px;right:-265px;background-color:rgb(111, 224, 228);">
                <video ref="video" style="position:absolute;margin:auto;top:0px;bottom:0px;left:0px;right:0px;" width="170" height="150" autoplay></video>
                <canvas style="display:none;" ref="canvas" width="640" height="480"></canvas>
                <!--图片展示-->
            </Card>

            <Card style="width:700px;position:absolute;margin:auto;top:190px;bottom:60px;left:0px;right:0px;background-color:rgb(111, 224, 228);text-align:left;">
                <p >4.肾脏对水的重要吸收发生在（）？<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A.肾小球<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B.近曲小管<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C.髓袢<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D.近曲小管和集合管<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E.肾盂<br>
                </p>
            </Card>
            <Button @click="callCamera" style="margin-top:305px;margin-right:50px">调用摄像头&nbsp;&nbsp;<Icon type="md-camera" /></Button>
            <Button @click="check" style="margin-top:305px;margin-right:50px">人脸检测&nbsp;&nbsp;<Icon type="md-checkmark-circle" /></Button>
            <Button @click="handup" style="margin-top:305px;">交卷&nbsp;&nbsp;<Icon type="ios-hand" /></Button>
           
        </Card>
     
   </Card>
 
    
</template>
<script>
var token =  localStorage.getItem('tokenKey')

    export default {
        name:'photocheck',
        data(){
            return {
                split1: 0.5,
                uploadList:[],
                uploadList2: [],
                card_image:'',//存放身份证图片的base64格式
                live_image:'',//存放拍照图片的base64格式
                myHeaders: {Authorization: token},
                formItem: {
                    username: '',
                    idcard:'',
                },
                tip:'温馨提示：这里公布结果',
                modelSel:'',
             
           
            }
        },
        methods: {
             Upload_idcard(file) {
                //上传新的图片之前先删除上一个图片
                this.uploadList=[];
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
                _this.card_image = file.url
             
            }  
            },
            regist_finish(){
                 document.getElementById('regist_page').style.display="none";
                 document.getElementById('login_page').style.display="";
                 this.$axios({
                     method:'post',
                     url:'http://'+this.addre+'/contrast/',
                     data:{
                        "card_image":this.card_image,
                    },
                    header:{
                        'Content-Type':"application/x-www-form-urlencoded",
                    }
                })
                .then(response=>{
                })
                .catch(Error=>{
                    console.log(Error)
                })
            
            },
            login(){
                 document.getElementById('login_page').style.display="none";
                 document.getElementById('exam_page').style.display="";
                 this.$axios({
                     method:'post',
                     url:'http://'+this.addre+'/contrast_login/',
                     data:{
                         "idnum":this.formItem.idcard
                     },
                     header:{
                         'Content-Type':"application/x-www-form-urlencoded",
                     }
                 })
                 .then(res=>{
                     console.log(res)
                 })
                 .catch(err=>{
                     console.log(err)
                 })
            },
            regist(){
                 document.getElementById('login_page').style.display="none";
                 document.getElementById('regist_page').style.display="";
            },
           
            contrast(){
                this.$axios({
                    method:'post',
                    url:'http://'+this.addre+'/contrast/',
                    data:{
                        "card_image":this.card_image,
                        "live_image":this.live_image,
                    },
                    header:{
                        'Content-Type':"application/x-www-form-urlencoded",
                    }
                })
                .then(response=>{
                    let tip = response.data
                    console.log(tip)
                    alert(tip)
                })
                .catch(Error=>{
                    console.log(Error)
                })
            },
            callCamera(){
                 // H5调用电脑摄像头API
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(success => {
                    // 摄像头开启成功
                    this.$refs['video'].srcObject = success
                    // 实时拍照效果
                    this.$refs['video'].play()
                }).catch(error => {
                    console.error('摄像头开启失败，请检查摄像头是否可用！')
                })
            },
             /**打开摄像头*/
             getUserMedia(constraints, success, error) {
                    if (navigator.mediaDevices.getUserMedia) {
                        //最新的标准API
                        navigator.mediaDevices.getUserMedia(constraints).then(success=>{
                            // 摄像头开启成功
                            this.$refs['video'].srcObject = success
                            // 实时拍照效果
                            this.$refs['video'].play()
                        }).catch(error);
 
                    } else if (navigator.webkitGetUserMedia) {
                        //webkit核心浏览器
                        navigator.webkitGetUserMedia(constraints,success, error)
                    } else if (navigator.mozGetUserMedia) {
                        //firfox浏览器
                        navigator.mozGetUserMedia(constraints, success, error);
                    } else if (navigator.getUserMedia) {
                        //旧版API
                        navigator.getUserMedia(constraints, success, error);
                    }
                },
                check(){
                     let ctx = this.$refs['canvas'].getContext('2d')
                // 把当前视频帧内容渲染到canvas上
                     
                     ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
                      // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
                     var live_image = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
                      
                     this.$axios({
                         method:'post',
                         url:'http://'+this.addre+'/compare/',
                         data:{
                             "live_image":live_image
                         },
                        header:{
                        'Content-Type':"application/x-www-form-urlencoded",
                         }
                      })
                      .then(response=>{
                          let tip = response.data
                          this.tip = tip
                      })
                      .catch(err=>{
                          console.log(err)
                      })
                     
 
              

                   
                },
                handup(){
                    //交卷的时关闭摄像头
                     if (!this.$refs['video'].srcObject) return
                    let stream = this.$refs['video'].srcObject
                    let tracks = stream.getTracks()
                    tracks.forEach(track => {
                         track.stop()
                    })
                    this.$refs['video'].srcObject = null
                }

    
    }
    }
 
</script>
<style scoped>
.step{
    position: fixed;
    text-align:left;
    margin-top:180px; 
}   
.exam_page{
    margin-left:350px;
    margin-top:30px;
    height:500px;
    width:900px;
    background-color: aquamarine;
}
.login_img{
    margin-left:-50px;
    margin-right:50px;
    margin-top: 70px;

}
.page{
    position: relative;
    background-color: azure;
    height:400px;
    font-style:initial;
}
.idcard_img{
    height:300px;
    width:500px;
    position: absolute;
    margin:auto;
    right:0;
    left:0;
    top:0;
    bottom:0;
}
.verify_login{
    width:400px;
    height:290px;
    position:absolute;
    margin: auto;
    right:0;
    left:0;
    top:0;
    bottom:0;
}

</style>