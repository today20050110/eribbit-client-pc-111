/* eslint-disable space-before-function-paren */
/* eslint-disable func-call-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

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
const Cart = () =>
    import ('@/views/cart/index')
const Login = () =>
    import ('@/views/login/index')
const LoginCallback = () =>
    import ('@/views/login/callback')
const Checkout = () =>
    import ('@/views/member/pay/checkout')
const Pay = () =>
    import ('@/views/member/pay/index')
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
            { path: '/product/:id', component: Goods },
            { path: '/cart', component: Cart },
            { path: '/member/checkout', component: Checkout },
            { path: '/member/pay', component: Pay }
        ]
    },
    { path: '/login', component: Login },
    { path: '/login/callback', component: LoginCallback }
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
    // 前置导航守卫
router.beforeEach((to, from, next) => {
    // 需要登录的路由：地址是以 /member 开头
    const { profile } = store.state.user
    if (!profile.token && to.path.startsWith('/member')) {
        return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
    }
    next()
})

export default router