<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
body,html{
  width: 100%;
  height: 100%;
  
}
#app {
  width: 100%;
  height: 100%;
 
  overflow: hidden;
}
</style>
