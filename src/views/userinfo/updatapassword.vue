<template>
<div>
    <img src="../../assets/test_logo.gif" class="logo"></img>
   
    <Card class="login">
        <p slot="title">修改密码</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-right:70px">
            <FormItem label="名字" prop="name">
                 <Input v-model="formValidate.name" placeholder="输入用户名"></Input>
            </FormItem>
            <FormItem label="旧密码" prop="oldpassword">
                 <Input v-model="formValidate.oldpassword" placeholder="旧密码不少于6位"></Input>
           </FormItem>
           <FormItem label="新密码" prop="newpassword">
                 <Input v-model="formValidate.newpassword" placeholder="新密码不少于6位"></Input>
           </FormItem>
            <FormItem >
            <Button type="primary" @click="handleSubmit('formValidate')">提交修改信息</Button>
            </FormItem>
        </Form> 
    </Card>
</div> 
</template>

<script>

  export default {
    name: "Forgetpassword", 
    data () {
            return {
                formValidate: {
                    name: '',
                    oldpassword: '',
                    newpassword:'',
                },
                ruleValidate: {
                    name: [
                       { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    oldpassword: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    newpassword: [
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
                        console.log(this.formValidate.name)
                        console.log(this.formValidate.oldpassword)
                        console.log(this.formValidate.newpassword)
                        this.$axios({
                            method:'POST',
                            url:'http://'+this.addre+'/forget/',
                            data:{
                                "user_name":this.formValidate.name,
                                "oldpassword":this.formValidate.oldpassword,
                                "newpassword":this.formValidate.newpassword,
                            },
                            header:{
                                   'Content-Type':'application/json;charset=utf-8'  //如果写成contentType会报错
                            }

                        })
                        .then(response=>{
                            console.log(response.data)
                             this.$Message.success(response.data);
                        })
                        .catch(error=>{
                            console.log(error)
                            this.$Message.error('Fail!');
                        })
                    } 
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
