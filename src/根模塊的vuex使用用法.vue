<template>
  <div>
    App
    <p>{{$store.state.username}}</p>
    <p>{{$store.getters['newName']}}</p>
    <button @click="mutationsFn">修改名字</button>
  </div>
</template>

<script>
/* eslint-disable indent */
import { useStore } from 'vuex'
  export default {
    name: 'App',
    setup () {
      const store = useStore()
      console.log(store.state.username)
      console.log(store.getters.newName)
      const mutationsFn = () => {
        // store.commit('updateName')
        store.dispatch('updateName')
      }
      return { mutationsFn }
    }
  }
</script>
