<template>
  <!-- 頂部通欄 -->
  <nav>頂部通欄</nav>
  <!-- 頭部組件 -->
  <header>頭部組件</header>
  <!-- 內容容器 -->
  <div class="main">
    <!-- 二級路由 -->
    <RouterView />
  </div>
  <!-- 底部組件 -->
  <footer>底部組件</footer>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped>

</style>
