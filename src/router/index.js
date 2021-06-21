
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import regis from '../views/userinfo/register.vue'
import forgetpassword from '../views/userinfo/forgetpassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    redirect: '/login' 
 },
 {
   path:"/login",
   name:"Login",
   meta:{
     title:"登录"
   },
   component: Login,
 },
 {
   path:'/register',
   name:'Register',
   meta:{
     title:"用户注册"
   },
   component:regis,
 },
 {
  path:'/forgetpassword',
  name:'Forgetpassword',
  meta:{
    title:"忘记密码"
  },
  component:forgetpassword,
},
  {
    path: '/home',
    name: 'Home',
    meta:{
      title:"首页"
    },
    component: Home,
    children:[
      {
        path: '/introduce',
        name: 'Introduce',
        meta:{
          title:"介绍页面"
        },
        component: () => import('../views/sonviews/introduce')
      },
     
      {
        path: '/idcardocr',
        name: 'Idcardocr',
        meta:{
          title:"身份证识别"
        },
        component: () => import('../views/sonviews/idcardocr')
      },
      {
        path: '/multidocRecognize',
        name: 'MultidocRecognize',
        meta:{
          title:"多文件识别"
        },
        component: () => import('../views/sonviews/multidocRecognize')
      },
      {
        path: '/verifyidcardinfo',
        name: 'Verifyidcardinfo',
        meta:{
          title:"身份信息验证"
        },
        component: () => import('../views/sonviews/verifyidcardinfo')
      },
      {
        path: '/pdf2image',
        name: 'Pdf2image',
        meta:{
          title:"pdf转图片"
        },
        component: () => import('../views/sonviews/pdf2image')
      },
      {
        path: '/photocheck',
        name: 'photocheck',
        meta:{
          title:"照片比对"
        },
        component: () => import('../views/sonviews/photocheck')
      },
  
    ],
  },
  
  
 
]

const router = new VueRouter({
  routes
})

export default router
