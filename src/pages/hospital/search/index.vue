<template>
    <div class="search">
        <div class="info">
                <h1>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.hosname }}查询/取消信息</h1>
                <el-empty description="暂无信息"></el-empty>
            </div>
    </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetial';

let hospitalDetailStore = useDetailStore()
</script>

<style scoped lang="scss">
.search{
     h1 {
        font-size: 20px;
        font-weight: 600;
        margin: 15px 0;
        text-align: center;
    }
}
</style>