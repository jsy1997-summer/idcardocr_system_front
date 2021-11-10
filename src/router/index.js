
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import regis from '../views/userinfo/register.vue'
import forgetpassword from '../views/userinfo/forgetpassword.vue'

import introduce from '../views/sonviews/introduce.vue'
import idcardocr from '../views/sonviews/idcardocr.vue'
import multidocRecognize from '../views/sonviews/multidocRecognize.vue'
import verifyidcardinfo from '../views/sonviews/verifyidcardinfo.vue'
import pdf2image from '../views/sonviews/pdf2image.vue'
import photocheck from '../views/sonviews/photocheck.vue'
import secverify from '../views/sonviews/secverify.vue'
import spareone from '../views/sonviews/spareone.vue'
import father from '../views/sonviews/father.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    redirect: '/login' 
 },
//  {
//   path: "*", 
//   redirect: '/login' 
// },//任意不存在页面都重定向到登录页面
 {
   path:"/login",
   name:"Login",
   meta:{
     title:"登录"
   },
  //  component: Login,
  component: () => import('../views/Login.vue')
 },
 {
   path:'/login/register',
   name:'Register',
   meta:{
     title:"用户注册"
   },
  //  component:regis,
  component:()=>import('../views/userinfo/register.vue')
 },
 {
  path:'/login/forgetpassword',
  name:'Forgetpassword',
  meta:{
    title:"忘记密码"
  },
  // component:forgetpassword,
  component:()=>import('../views/userinfo/forgetpassword.vue')
},
  {
    path: '/home',
    name: 'Home',
    meta:{
      title:"首页"
    },
    // component: Home,
    component:()=>import('../views/Home.vue'),
    children:[
      {
        path: '/introduce',
        name: 'Introduce',
        meta:{
          title:"介绍页面"
        },
        // component:introduce
        component: () => import('../views/sonviews/introduce')
      },
     
      {
        path: '/idcardocr',
        name: 'Idcardocr',
        meta:{
          title:"身份证识别"
        },
        // component:idcardocr
        component: () => import('../views/sonviews/idcardocr')
      },
      {
        path: '/multidocRecognize',
        name: 'MultidocRecognize',
        meta:{
          title:"多文件识别"
        },
        // component:multidocRecognize
        component: () => import('../views/sonviews/multidocRecognize')
      },
      {
        path: '/verifyidcardinfo',
        name: 'Verifyidcardinfo',
        meta:{
          title:"身份信息验证"
        },
        // component:verifyidcardinfo
        component: () => import('../views/sonviews/verifyidcardinfo')
      },
      {
        path: '/pdf2image',
        name: 'Pdf2image',
        meta:{
          title:"pdf转图片"
        },
        // component:pdf2image
        component: () => import('../views/sonviews/pdf2image')
      },
      {
        path: '/photocheck',
        name: 'photocheck',
        meta:{
          title:"照片比对"
        },
        // component:photocheck
        component: () => import('../views/sonviews/photocheck')
      },
      {
        path: '/secverify',
        name: 'secverify',
        meta:{
          title:"真伪判别"
        },
        // component:secverify
        component: () => import('../views/sonviews/secverify'),
      },
      {
        path: '/spare1',
        name: 'spareone',
        meta:{
          title:"学习备用"
        },
        // component:spareone
        component: () => import('../views/sonviews/spareone')
      },
      {
        path: '/father',
        name: 'father',
        meta:{
          title:"父子组件使用"
        },
        // component:father
        component: () => import('../views/sonviews/father')
       
      },
    
  
    ],
    
  },
  
  
 
]





const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
