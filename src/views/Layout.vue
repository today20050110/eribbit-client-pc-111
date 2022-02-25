<template>
  <!-- 頂部通欄 -->
  <AppTopnav/>
  <!-- 頭部組件 -->
  <AppHeader/>
  <!-- 吸頂頭部 -->
  <AppHeaderSticky/>
  <!-- 內容容器 -->
  <div class="app-body">
    <!-- 二級路由 -->
    <RouterView />
  </div>
  <!-- 底部組件 -->
  <AppFooter/>
  <!-- <button @click="$store.commit('user/setUser', {})">logout</button>
  <button @click="$store.commit('user/setUser', { token: 123, account: 'zhousg' })">login</button> -->
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
