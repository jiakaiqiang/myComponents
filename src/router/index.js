//引入路由
import vueRouter from 'vue-router'
import vue from 'vue'
vue.use(vueRouter)
//创建vuerouter实例
let routes=[
    {path:'/loading',component:()=>import('@/commons/load/index')},
    {path:'/',component:()=>import('@/components/HelloWorld')},
    {path:'/eatdot',component:()=>import('@/commons/eatdot/index')}
]
export default  new vueRouter({routes})
