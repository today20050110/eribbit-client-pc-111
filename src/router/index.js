/* eslint-disable space-before-function-paren */
/* eslint-disable func-call-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
const TopCategory = () =>
    import ('@/views/category/index')
const SubCategory = () =>
    import ('@/views/category/sub')
const Goods = () =>
    import ('@/views/goods/index')
    // 路由規則
const routes = [
    // 一級路由布局容器
    {
        path: '/',
        component: Layout,
        children: [
            { path: '/', component: Home },
            { path: '/category/:id', component: TopCategory },
            { path: '/category/sub/:id', component: SubCategory },
            { path: '/product/:id', component: Goods }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 每次切換路由的時候滾動到頁面頂部
    scrollBehavior() {
        // vue 2.0 x y 控制
        // Vue3.0 left top 控制
        return { left: 0, top: 0 }
    }
})

export default router