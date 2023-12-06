<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import  {useRoute} from 'vue-router';
let $route = useRoute()
// 本地存储用户信息
localStorage.setItem('userinfo',JSON.stringify($route.query))
// 访问到此路由说明微信授权成功
let html = document.querySelector('html')
html.style.display = 'none'
</script>

<style scoped lang="scss">

</style>