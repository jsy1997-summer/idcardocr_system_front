<template>
    <div>
    <Steps :current="current" direction="vertical" class="step" >
        <Step title="进入考试系统前" content="模拟考试前注册时上传身份证信息"></Step>
        <Step title="考试前" content="模拟考试当天输入信息进入待考界面之前"></Step>
        <Step title="待考" content="模拟信息验证的待考界面"></Step>
        <Step title="开始考试" content="模拟信息验证正确进入考试界面"></Step>
    </Steps>
    <Card class="exam_page">
        <p slot="title" >{{page_title}}</p>
        <Card id="regist_page" class="page">
            <h2>全国卫生专业技术资格考试</h2>
             <Card class="idcard_img">
                <div style="text-align:center" v-for="item in uploadList">
                    <img class="img"  :src="item.url">
                </div>
            </Card>
            <Upload :before-upload="handleBeforeUpload" :headers="myHeaders" action="//jsonplaceholder.typicode.com/posts/" :on-success="succeed" :on-error="error" :max-size="20480"  :with-credentials="true" :show-upload-list="false">
                <Button icon="ios-cloud-upload-outline" style="margin-top:310px;margin-left:-200px" >上传身份证信息</Button>
            </Upload>
            <Button @click="regist_finish" icon="md-checkmark" style="margin-top:-55px;margin-left:200px" >注册完成</Button>
        </Card>
         <Card id="verify_page" class="page" style="display:none">
            <h2>全国卫生专业技术资格考试</h2>
            <Card class="verify_login">
                <Form :model="formItem" :label-width="100">
                <FormItem label="名字：">
                    <Input v-model="formItem.name" placeholder="请输入你的名字..."></Input>
                </FormItem>
                <FormItem label="民族：">
                    <Input v-model="formItem.nation" placeholder="请输入你的民族..."></Input>
                </FormItem>
                <FormItem label="身份证号码：">
                    <Input v-model="formItem.id" placeholder="请输入你的身份证号码..."></Input>
                </FormItem>
                <FormItem label="出生日期：">
                    <Row>
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                    </Row>
                </FormItem>
                <FormItem label="性别：">
                    <RadioGroup v-model="formItem.sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                </Form>
            </Card>
            <Button @click="submit" icon="md-arrow-round-up" style="margin-top:310px;">提交</Button>
            
        </Card>
         <Card id="start_page" class="page" style="display:none">
            <h2>全国卫生专业技术资格考试</h2>
            <Card style="margin-top:10px;width:700px;position:absolute;margin:auto;left:0;right:0;top:60px;background-color:rgb(111, 224, 228);text-align:left;">
                <h3 style="text-align:center">考生须知</h3>
                <p>
                (1)首次登录须准确填写注册信息，并牢记登录邮箱和蕊码;登录邮箱务 必真实有效，以保证您丢失密码时，能够收到我们发出的密码重置邮件;每个登录邮箱只能对应一个考生信息不同考生勿使同一邮箱进行报名，否则将导致报名信息丢失。<br>
                (2)在报名系统内绑定个人微信号后，可接收考试重要信息再次登录可通过“微信扫一扫”功能直接进入网上报名系统，每个微信号只能绑定一个考生信息。<br>
                (3)考生须上传经“网报照片审核处理工具”核验后的照片，耒上传照片将无法提交报名信息。<br>
                (4)报考信息〔证件类型、证件编号除外)填写有误的，考生可于网上预报名期间登录系统修改并重新提交，核对无误后重新打印申请表，确保于现场确认的申请表信息与报名系统的最终信息一致。<br>
                (5)2002年(含)以后取得高等教育学历证书的考生务 必准确填写学历编号，以便考试管理机构通过学信网查询学历证书的真伪。</p>
            </Card>
            <Button @click="enter_exam" style="margin-top:300px;">进入考试&nbsp;&nbsp;<Icon type="ios-arrow-forward" /></Button>
            
        </Card>
        <Card id="exam_page" class="page" style="display:none">
            <h2>全国卫生专业技术资格考试</h2>
            <Card style="margin-top:10px;width:700px;position:absolute;margin:auto;left:0;right:0;top:60px;background-color:rgb(111, 224, 228);text-align:left;">
                <p>4.肾脏对水的重要吸收发生在（）？<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A.肾小球<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B.近曲小管<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C.髓袢<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D.近曲小管和集合管<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E.肾盂<br>
                </p>
            </Card>
            <Button @click="submit_exam" style="margin-top:300px;">交卷&nbsp;&nbsp;<Icon type="md-exit" /></Button>
            
        </Card>
    </Card>
 
    
   
    </div>
    
    
</template>
<script>
var token =  localStorage.getItem('tokenKey')


    export default {
        name:'Verifyidcardinfo',
        data(){
            return {
                page_title:"注册页面",
                 uploadList: [],
                 myHeaders: {Authorization: token},
                 current:0,
                 formItem: {
                    name: '',
                    nation:'',
                    id:'',
                    sex: '男',
                    date: '', 
                },
                person:{
                    name:'',
                    id:'',
                    sex:'',
                },
                image_base64:"",
            }
        },
        methods: {
            handleBeforeUpload(file) {
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
            _this.image_base64=file.url  
        }  
    },
    succeed(){
      console.log("上传成功啦")
    },
    error(){
      console.log("上传失败了")
    },
    regist_finish(){
        document.getElementById('regist_page').style.display="none";
        document.getElementById('verify_page').style.display="";
        this.current=1;
        this.page_title="登录考试页面"
        this.$axios({
          method:'post',
          url:'http://'+this.addre+'/noencode_ocr/',
          data:{
            "img_base64":this.image_base64,
            
          },
          header:{
            // 'Content-Type':'application/json'  //如果写成contentType会报错
            'Content-Type':"application/x-www-form-urlencoded",
            }
            })
            .then(response=>{
               var res=response.data;
              this.person.name=res['name'];
              this.person.id=res['idnum'];
              this.person.sex=res['sex'];
              })
            .catch(Error=>{
              console.log(Error)
              })
    },
    submit(){
        if((this.formItem.name==this.person.name)&&(this.formItem.id==this.person.id)&&(this.formItem.sex==this.person.sex)){
            document.getElementById('verify_page').style.display="none";
            document.getElementById('start_page').style.display="";
            this.current=2;
            this.page_title="待考页面"
        }else(
            this.$Message.success("您的信息不正确，验证未通过，无法进入待考页面")
        )

    },
    enter_exam(){
        document.getElementById('start_page').style.display="none";
        document.getElementById('exam_page').style.display="";
        this.current=3;
        this.page_title="进入考试页面"
    },
    submit_exam(){},
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