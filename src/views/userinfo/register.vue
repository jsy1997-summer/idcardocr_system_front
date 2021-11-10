<template>
<div>
    <img src="../../assets/test_logo.gif" class="logo"></img>
   
    <Card class="login">
        <p slot="title">用户注册</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-right:70px">
            <FormItem label="名字" prop="name">
                 <Input v-model="formValidate.name" placeholder="输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                 <Input v-model="formValidate.password" placeholder="密码不少于6位"></Input>
           </FormItem>
            <div>点击上传头像  
                <Upload :before-upload="Upload"  action="//jsonplaceholder.typicode.com/posts/"  :max-size="2048" style="display: inline-block;margin-top:10px;margin-left:20px;" :with-credentials="true" :show-upload-list="false">
                <button>
                    <div style="height:50px;weight:500px!important;background-color:gray">
                    <img style="height:50px;weight:50px;" v-for="item in uploadList" :src="item.url">
                    </div>
                                  
                </button>                     
                </Upload>                  
                </div>
            <FormItem >
            <br>
            <Button type="primary" @click="handleSubmit('formValidate')" style="float:left">提交注册信息</Button>
             <Button type="primary" @click="back()" style="float:right">返回登录页面</Button>
            </FormItem>
            
        </Form> 
    </Card>
</div> 
</template>

<script>

  export default {
    name: "Register", 
    data () {
            return {
                uploadList:[],
                base64:{},
                formValidate: {
                    name: '',
                    password: '',
                },
                ruleValidate: {
                    name: [
                       { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    }
               
            }
        },
        methods:{
            handleSubmit (name) {
            
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.$axios({
                            method:'POST',
                            url:'http://'+this.addre+'/register/',
                            data:{
                                "user_name":this.formValidate.name,
                                "user_password":this.formValidate.password,
                                "user_image":this.base64,
                            },
                            header:{
                                   'Content-Type':'application/json;charset=utf-8'  //如果写成contentType会报错
                            }

                        })
                        .then(response=>{
                            console.log(response.data)
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    } 
                })
            },
             back(){
                 this.$router.push('/login').catch(err => {
                        console.log('跳转错误',err)
            })
            },
            Upload(file){
                 this.uploadList=[];

                let reader = new FileReader();
                reader.readAsDataURL(file)
                const _this = this
                reader.onloadend = function (e) {
                    file.url = reader.result
                    _this.uploadList.push(file)
                    _this.base64 = file.url
                    }  
            },
           
        }
        
    }
    
</script>
<style>
.logo{
      width:150px;
      height:150px;
  }
  .login{
    width:500px;
    position: position;
    margin:auto;
    top:80px;
    bottom:0;
    left:0;
    right:0;
}
</style>
