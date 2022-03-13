/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
    // 文件名称数组
    // console.dir(importFn.keys())
export default {
    install(app) {
        // 在app上进行扩展，app提供 component directive 函数
        // 如果要挂载原型 app.config.globalProperties 方式
        // app.component(XtxSkeleton.name, XtxSkeleton)
        // app.component(XtxCarousel.name, XtxCarousel)
        // app.component(XtxMore.name, XtxMore)
        // app.component(XtxBread.name, XtxBread)
        // app.component(XtxBreadItem.name, XtxBreadItem)
        // 批量注册全局组件
        importFn.keys().forEach(key => {
                // 导入组件
                const component = importFn(key).default
                    // 注册组件
                app.component(component.name, component)
            })
            // 定意指令
        defineDirective(app)
    }
}
// 定義指令
const defineDirective = (app) => {
    // 1. 图片懒加载指令 v-lazy
    // 原理: 先存儲圖片地址不能在src上 ,當圖片進入可視區, 將你存儲圖片地址設置給圖片元素即可
    app.directive('lazy', {
        // vue2.0 監聽使用指令的DOM是否創建好, 鉤子函數: inserted
        // vue3.0 的指令擁有的鉤子函數和組件的依樣,使用指令的DOM是否創建好, 鉤子函數: mounted
        mounted(el, binding) {
            // 2. 創建一個觀察對象, 來觀察當前使用指令的元素
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        // 停止觀察
                        observer.unobserve(el)
                            // 4. 處理圖片加載失敗 onerror圖片加載失敗的事件, onload圖片加載成功
                        el.onerror = () => {
                                el.src = defaultImg
                            }
                            // 3. 把指令的值設置給el的src屬性,binding.value就是指令的值
                        el.src = binding.value
                    }
                }, {
                    threshold: 0.01
                })
                // 開啟觀察
            observer.observe(el)
        }
    })
}