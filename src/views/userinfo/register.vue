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
            <FormItem >
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
