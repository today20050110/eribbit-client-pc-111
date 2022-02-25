/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
    namespaced: true,
    state: () => {
        return {
            // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
            // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
            list: topCategory.map(item => ({ name: item }))
        }
    },
    // 修改分類函數
    // 加载数据成功后需要修改list所以需要mutations函数
    mutations: {
        // payload 所有的分類集合
        setList(state, payload) {
            state.list = payload
        },
        // 定義show和hide函數, 控制當前分類的二級分類顯示和隱藏
        // 修改当前一级分类下的open数据为true
        show(state, item) {
            const currCategory = state.list.find(category => category.id === item.id)
            currCategory.open = true
        },
        // 修改当前一级分类下的open数据为false
        hide(state, item) {
            const currCategory = state.list.find(category => category.id === item.id)
            currCategory.open = false
        }
    },
    // 獲取分類函數
    // 需要向后台加载数据，所以需要actions函数获取数据
    actions: {
        async getList({ commit }) {
            const { result } = await findAllCategory()
                // 给一级分类加上一个控制二级分类显示隐藏的数据open
            result.forEach(item => {
                    item.open = false
                })
                // 获取数据成功，提交mutations进行数据修改
                // 文檔上是setCategory
                // 修改分類數據
            commit('setList', result)
        }
    }
}
