<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 篩選區 -->
      <SubFilter @filter-change="filterChange"/>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    // 加載中
    const loading = ref(false)
    // 是否加載完畢
    const finished = ref(false)
    // 商品列表數據
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      // 設置二級分類的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 獲取數據成功
        if (result.items.length) {
          // 有數據,就加載數據
          goodsList.value.push(...result.items)
          // 把page改成下一頁頁碼
          reqParams.page++
        } else {
          // 沒有數據,代表加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级分类重新加载數據
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        goodsList.value = [] // 導致列表變空,加載更多組件會頂上來,進入可視區,再去加載數據
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 1. 更改排序組件的篩選數據, 重新請求
    const sortChange = (sortParams) => {
      finished.value = false
      // 合併請求參數, 保留之前參數
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2. 更改篩選組件的篩選數據, 重新請求
    const filterChange = (filterParams) => {
      finished.value = false
      // 合併請求參數, 保留之前參數
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return { loading, finished, goodsList, getData, sortChange, filterChange }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
