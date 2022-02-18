/* eslint-disable func-call-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
    // 路由規則
const routes = [
    // 一級路由布局容器
    {
        path: '/',
        component: Layout,
        children: [{
            path: '/',
            component: Home
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
