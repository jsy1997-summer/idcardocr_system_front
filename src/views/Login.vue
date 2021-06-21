<template>
<div>
    <img src="../assets/test_logo.gif" class="logo"></img>
    <div style="font:bold 100px/60px Georgia, serif;">文字识别系统</div>
    <Card class="login">
        <p slot="title">登录</p>
           <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" Custom>
        <FormItem prop="user">
            <Input type="text" v-model="formCustom.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formCustom.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="success" long style="background-color:gray" @click="handleSubmit('formCustom')">Sign in</Button>
        </FormItem>
        <FormItem>
            <a @click="enter()">注册</a>                                     <a @click="forget()">忘记密码</a>
        </FormItem>
    </Form>
          
    </Card>
</div> 
</template>

<script>
import global_data from '../store/data'
export default {
  name: 'Login',
   data () {
            return {
                formCustom: {
                    user: '',
                    password: ''
                },
                ruleCustom: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
              
            }
                
           
        },
    methods:{
        handleSubmit(name) {
           
           
            console.log('http://'+this.addre+'/login/')

                this.$refs[name].validate((valid) => {
                    if (valid) {
                           this.$axios({
                            method:'POST',
                            url:'http://'+this.addre+'/login/',
                            data:{
                                "user_name":this.formCustom.user,   
                            },
                            header:{
                                   'Content-Type':'application/json;charset=utf-8'  //如果写成contentType会报错
                            }

                        })
                        .then(response=>{
                            console.log(response.data)
                            if(response.data==this.formCustom.password){
                                global_data.person_name=this.formCustom.user
                                
                                this.$Message.success('Success!');
                                this.$router.push('/home')
                                }
                                else{
                                     this.$Message.error('密码不正确，请重新输入!');      
                        }
                        })
                        .catch(error=>{
                            console.log(error)
                            this.$Message.error('您还没有注册，请先注册!');
                        })
                        
                    } 
                })
            },
            enter(){
                this.$router.push('/register').catch(err => {
                        console.log('跳转错误',err)
              })
            },
            forget(){
                this.$router.push('/forgetpassword').catch(err => {
                        console.log('跳转错误',err)
              })

            }
     
    }
}
</script>
<style scoped>
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




