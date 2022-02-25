/* eslint-disable indent */
/* eslint-disable eol-last */
// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
/**
 *  數據懶加載函數
 * @param {Element} target -DOM對象
 * @param {Function} apiFn - API函數
 * @returns
 */
export const useLazyData = (apiFn) => {
    // 需要
    // 1. 被观察的对象
    // 2. 不同的API函数
    const target = ref(null)
    const result = ref([])
        // stop停止觀察
    const { stop } = useIntersectionObserver(
            // 監聽的目標元素
            target,
            ([{ isIntersecting }], observerElement) => {
                // isIntersecting是否進入可視區
                if (isIntersecting) {
                    stop()
                        // 调用API函數获取数据
                    apiFn().then(data => {
                        result.value = data.result
                    })
                }
            }, {
                // 控制何時開始加載數據的閥值
                threshold: 0
            }
        )
        // 返回--->数据（dom,后台数据）
    return { target, result }
}