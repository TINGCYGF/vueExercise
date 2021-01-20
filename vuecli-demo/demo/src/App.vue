<template>
  <div id="app">
      {{n}}
      <button @click="add">+1</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      n:0
    }
  },
  methods:{
    add(){
      this.n +=1
    }
  }
}
</script>

<style lang="scss">
#app {

}
</style>
