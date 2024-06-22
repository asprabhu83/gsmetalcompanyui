import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import login from '../views/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/' ,
    name: 'login',
    component: login
  },
  {
    path: '/user',
    name: 'usermaster',
   
    component: () => import( '../views/usermaster.vue'),
    
  },
  {
    path: '/newcustomer',
    name: 'newusermaster',
    component: () => import( '../views/userdialogbox.vue'),
    
  },
  {
    path: '/company',
    name: 'companymaster',
   
    component: () => import( '../views/companymaster.vue'),
   
  },
  {
    path: '/jobwork',
    name: 'jobwork',
   
    component: () => import( '../views/jobwork.vue')
  },
  {
    path: '/terms&condition',
    name: 'terms&condition',
   
    component: () => import( '../views/termsandcondition.vue')
  },
  {
    path: '/product',
    name: 'product',
   
    component: () => import( '../views/product.vue')
  },
  {
    path: '/unit',
    name: 'unit',
   
    component: () => import( '../views/unit.vue')
  },
  {
    path: '/quotation',
    name: 'quotation',
   
    component: () => import( '../views/quotation.vue')
  },
  {
    path:'/adduser',
    name:'adduser',
    component: ()=> import( '../views/userdialogbox.vue')
  },
  {
    path:'/edituser',
    props: true,
    name:'edituser',
    component: ()=> import( '../views/userdialogbox.vue')
  },
  {
    path:'/addcompany',
    name:'companydialogbox',
    component: ()=> import( '../views/companydialogbox.vue')
  },
  {
    path:'/editcompany',
    props:true,
    name:'editcompany',
    component: ()=> import( '../views/companydialogbox.vue')
  },
  
  {
    path:'/addjobwork',
    name:'jobworkdialogbox',
    component: ()=> import( '../views/jobworkdialogbox.vue')
  },
  {
    path:'/editjobwork',
    props:true,
    name:'editjobwork',
    component: ()=> import( '../views/jobworkdialogbox.vue')
  },
  {
    path:'/addtermsandcondition',
    name:'termsandconditionsdialogbox',
    component: ()=> import( '../views/termsandconditionsdialogbox.vue')
  },
  {
    path:'/edittermsandconditions',
    props:true,
    name:'edittermsandconditions',
    component: ()=> import( '../views/termsandconditionsdialogbox.vue')
  },
  {
    path:'/addproduct',
    name:'productdialogbox',
    component: ()=> import( '../views/productdialogbox.vue')
  },
  {
    path:'/editproduct',
    props:true,
    name:'editproduct',
    component: ()=> import( '../views/productdialogbox.vue')
  },
  {
    path:'/addunit',
    name:'unitdialogbox',
    component: ()=> import( '../views/unitdialogbox.vue')
  },
  {
    path:'/editunit',
    props:true,
    name:'editunit',
    component: ()=> import( '../views/unitdialogbox.vue')
  },
  {
    path:'/addestimates',
    name:'quotationdialogbox',
    component: ()=> import( '../views/quotationdialogbox.vue')
  },
  {
    path:'/editestimates',
    props:true,
    name:'editestimates',
    component: ()=> import( '../views/quotationdialogbox.vue')
  },
  {
    path: '/cpassword',
    name: 'cpassword',
    component: () => import( '../views/cpassword.vue'),
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const isAuthenticated = computed(()=> { 
  return localStorage.getItem('loginresponse')? true:false
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated.value) {
    next({ name: 'login' })
  } 
  else {
      next()
  }
})
export default router
