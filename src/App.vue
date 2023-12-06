<template>
  <div class="main">
    <hospitalTop/>
    <div class="content">
      <router-view></router-view>
    </div>
    <hospitalBot/>
    <login/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.main{
  display: flex;
  flex-direction: column;
  .content{
    width: 100%;
    min-height: 700px;
    padding: 1% 5%;
    background-color: #fff;
  }
}
</style>
