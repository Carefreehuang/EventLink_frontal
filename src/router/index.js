import Layout from '@/views/Layout/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path:'/',
            component:Layout,
        },
        {
            path:'/login',
            component:Login
        }
    ]
})

export default router