<template>
    <div class="layout">
        <Layout>
            <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1">
                        <Icon type="ios-home"></Icon>
                        <span><router-link to="/introduce"><div style="color:white">首页</div></router-link></span>
                    </MenuItem>
                    <Submenu name="2">
                    <template slot="title">
                        <Icon type="logo-octocat" />
                        文字识别
                    </template>
                    <MenuItem name="2-1"><router-link to="/idcardocr"><div style="color:white">身份证识别</div></router-link></MenuItem>
                    <MenuItem name="2-2"><router-link to="/multidocRecognize"><div style="color:white">多文件识别</div></router-link></MenuItem>
                </Submenu>
                     <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-ionitron" />
                        验证功能
                    </template>
                    <MenuItem name="3-1"><router-link to="/verifyidcardinfo"><div style="color:white">身份信息验证</div></router-link></MenuItem>
                    <MenuItem name="3-2"><router-link to="/photocheck"><div style="color:white">照片比对</div></router-link></MenuItem>
                    <MenuItem name="3-3"><router-link to="/secverify"><div style="color:white">真伪判别</div></router-link></MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="logo-freebsd-devil" />
                        其他功能
                    </template>
                    <MenuGroup title="文档">
                        <MenuItem name="4-1"><router-link to="/pdf2image"><div style="color:white">pdf转图片</div></router-link></MenuItem>
                        <MenuItem name="4-2"><router-link to="/spare1"><div style="color:white">spareone</div></router-link></MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="4-3"><router-link to="father"><div style="color:white">父子组件使用</div></router-link></MenuItem>
                        <MenuItem name="4-4">备用3</MenuItem>
                    </MenuGroup>
                </Submenu>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <div style="left:-200px;top:40px;"><img src="../assets/logo.gif" class="logo"></img></div>
                    <Divider type="vertical" style="height:50px;top:8px;float:left;"/>
                    <div style="float:left;font:bold 30px/60px Georgia, serif;">身份证识别系统</div>
                    <Dropdown  @on-click="happen" style="float:right;" placement="bottom">
                   
                    <img id="ok" ref="myimg" src="" class="person_img"   alt="picture">
                    
                 
                    <DropdownMenu slot="list">
                    <DropdownItem name="quit_login">退出登录</DropdownItem>
                    <DropdownItem @click="person_info" name="person_info">个人信息</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                    <div ref="tip" style="float:right;margin-right:50px">亲爱的“{{text}}”，您好</div>
                   
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '560px'}">
                    <router-view></router-view>    
                </Content>
            </Layout>
            </Layout>
            <Footer class="layout-footer-center">2021-2022 贾素银 &copy; 身份证识别系统</Footer>
        </Layout>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
   data () {
            return {
                theme: 'dark',
                isCollapsed: false,
                text:sessionStorage.getItem("name"),   

            }
        },
    created(){
      
    },
    mounted(){ 
    var name = this.text
    this.$refs.myimg.src=require('../assets/'+name+'.jpg')   
    // document.getElementById('ok').src=require('../assets/'+name+'.jpg')   
    },
  components: {
    // HelloWorld
  },
  computed: {
            menuitemClasses: function () {
                //  var url= sessionStorage.getItem("url");
                //  document.getElementById("myimg").setAttribute("url",url)
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
                
            }
    },
    methods:{
        happen(name){
            if(name==="quit_login"){
                this.$router.push('/login').catch(err=>{
                    console.log("跳转错误",err)
                })
            }
        },
        person_info(){
           console.log("你好")
        },
        quit(){
           console.log("你好")
        }
    }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .layout-footer-center{
    text-align: center;
    height:20px;
    }
    .logo{
        /* top:-40px; */
        width:100px;
        height:45px;
        float: left;
    }
    .person_img{
        width:50px;
        height:50px;
        border-radius: 50%;
        -moz-border-radius: 50%; 
        -webkit-border-radius: 50%;
        background-size:100% 100%;
        background-attachment:fixed;
        background-repeat:no-repeat;
    }

</style>




