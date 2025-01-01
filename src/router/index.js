
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import User from '@/views/User/index.vue'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path:'/',
            component:Layout,
            children:[
                {
                    path:'',
                    component:Home
                },
                {
                    // 二级路由不需要/
                    // 通过:id，可以将动态的id传递给Category组件，从而使Category组件显示不同内容
                    path:'users/:id',
                    component:User

                },
            ]
        },
        {
            path:'/login',
            component:Login
        }
    ]
})

export default router