<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <!-- 輪播圖圖片容器 -->
    <ul class="carousel-body">
      <!-- 顯示的圖片加上 fade -->
      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 上一張 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一張 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活點 -->
        <!-- 點擊點可以切換上一张下一张 -->
      <span @click="index=i" v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 輪播圖數據
    sliders: {
      type: Array,
      default: () => []
    },
    // 間隔時長
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自動輪播
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)
    let timer = null
    // 1.自动播放
    const autoPlayFn = () => {
      // 防止定時器重複添加
      clearInterval(timer)
      // 自動撥放, 每隔多久切換索引
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 需要監聽sliders數據變化, 判斷如果有數據且autoplay是true
    watch(() => props.sliders, (newVal) => {
      // 有数据&开启自动播放，才调用自动播放函数
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })

    // 2.鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 3.點擊點可以切換上一张下一张
    const toggle = (step) => {
      const newIndex = index.value + step
      // 超出的情況, 太大了
      if (newIndex >= props.sliders.length) {
        index.value = 0
        return
      }
      // 超出的情況, 太小了
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      // 正常情況下的處理
      index.value = newIndex
    }
    // 4.组件卸載，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
