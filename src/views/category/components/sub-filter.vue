<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(item.id)" :class="{active:item.id===filterData.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{item.name}}：</div>
      <div class="body">
        <a @click="changeProp(item,prop.id)" :class="{active:prop.id===item.selectedProp}" href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{prop.name}}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    const route = useRoute()
    // 監聽二級類目ID的變化 獲取篩選數據
    const filterData = ref(null)
    const filterLoading = ref(false) // 控制骨架加載
    // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    watch(
      () => route.params.id,
      (newVal, oldVal) => {
        // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
        // 變化後的ID有值 且 處在二級類名路由下
        if (newVal && route.path === '/category/sub/' + newVal) {
          // 發請求獲取數據
          filterLoading.value = true
          newVal &&
            findSubCategoryFilter(route.params.id).then(({ result }) => {
              // 每一組可篩選的條件缺失 全部 條件,處理下數據加上 全部
              // 給每一組數據加上一個選中的ID 設定為NULL 跟添加的ID一樣為NULL
              result.selectedBrand = null
              // 品牌全部
              result.brands.unshift({ id: null, name: '全部' })
              result.saleProperties.forEach((p) => {
                p.selectedProp = null
                // 销售属性全部
                p.properties.unshift({ id: null, name: '全部' })
              })
              // 設置修改的數據
              filterData.value = result
              filterLoading.value = false
            })
        }
      },
      { immediate: true }
    )
    // 获取筛选参数
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 銷售屬性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      // 參考數據: { brandId: '', attrs: [ { groupName: '', propertyName: '' }, ... ] }
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }

    // 紀錄當前选择品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 紀錄當前选中属性
    const changeProp = (p, attrId) => {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
      padding: 10px 0;
    }
}
</style>
