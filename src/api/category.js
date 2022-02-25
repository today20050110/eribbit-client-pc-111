/* eslint-disable indent */
// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据 (頂級 二級 對應的商品推薦數據)
 */
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}
