<template>
  <div class="page-home">
    <!-- 首頁入口 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 輪播圖 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鮮好物 -->
      <HomeNew />
    <!-- 人氣推薦 -->
      <HomeHHot />
      <!-- 熱門品牌 -->
      <HomeBrand />
      <!-- 商品區域 -->\
      <HomeProduct />
      <!-- 最新專題 -->
      <HomeSpecial />
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHHot from './components/home-hot'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>
<style scoped lang="less"></style>
