/* eslint-disable indent */
/* eslint-disable eol-last */
import request from '@/utils/request'
// 獲取品牌 limit - 品牌個數
export const findBrand = (limit = 6) => {
        return request('/home/brand', 'get', { limit })
    }
    /**
     * 获取广告图
     * @returns Promise
     */
export const findBanner = () => {
        return request('/home/banner', 'get')
    }
    /**
     * 获取新鮮好物
     * @returns Promise
     */
export const findNew = () => {
        return request('/home/new', 'get')
    }
    /**
     * 获取人气推荐
     * @returns Promise
     */
export const findHot = () => {
        return request('/home/hot', 'get')
    }
    /**
     * 获取商品區域
     * @returns Promise
     */
export const findGoods = () => {
        return request('/home/goods', 'get')
    }
    /**
     * 获取最新专题
     * @returns Promise
     */
export const findSpecial = () => {
    return request('/home/special', 'get')
}