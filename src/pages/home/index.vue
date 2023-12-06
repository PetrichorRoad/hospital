<template>
    <div>
        <el-carousel height="350px">
            <el-carousel-item v-for="(item, index) in 4" :key="item">
                <img :src='src + "?" + index' alt="">
            </el-carousel-item>
        </el-carousel>

        <div class="search">
            <el-autocomplete v-model="keyword" :fetch-suggestions="querySearch" clearable class="input"
                placeholder="请输入医院名称" @select="handleSelect" :trigger-on-focus="false" />
            <el-button type="primary" :icon="Search"></el-button>
        </div>

        <el-row :gutter=20>
            <el-col :span="20">
                <Level />
                <Card />
            </el-col>
            <el-col :span="4">
                <Tips/>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import Level from '@/components/Level.vue';
import Card from '@/components/Card.vue';
import Tips from '@/components/Tips.vue';
import { reqHospitalInfo } from '@/api/index';
import type {  HospitalInfo } from '@/api/type'
import {useRouter} from 'vue-router';
let $router = useRouter()
let src = ref("https://picsum.photos/1728/350")
let keyword = ref<string>('')


const querySearch = async (keyword: string, callback: any) => {
    let result: HospitalInfo = await reqHospitalInfo(keyword)
    if (result.code === 200 && result.ok === true) {       
        let showData = result.data.map(item => {
            return {
                value: item.hosname,
                hoscode: item.hoscode
            }
        })       
        callback(showData)
    }
}
const handleSelect = (item:any) => { 
    window.localStorage.setItem('hoscode', item.hoscode )
    // 去详情页
    $router.push({
        path: '/hospital/detail',
    })
}
</script>

<style scoped lang="scss">
.search {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.input) {
        width: 40%;
        min-width: 200px;
    }
}
</style>