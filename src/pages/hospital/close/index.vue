<template>
    <div class="close">
        <div class="info">
            <h1>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.hosname }}停诊信息</h1>
            <el-empty description="暂无信息"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetial';

let hospitalDetailStore = useDetailStore()
</script>

<style scoped lang="scss">
.close{
    h1{
        font-size: 20px;
        font-weight: 600;
        margin: 15px 0;
        text-align: center;
    }
}
</style>