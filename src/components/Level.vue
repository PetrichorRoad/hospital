<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级:</div>
            <ul class="right">
                <li :class="{ active: activeLevelFlag === '' }" @click="changeLevel('')">全部</li>
                <li v-for="(item) in levelArr" :key="item.value" @click="changeLevel(item.value)"
                    :class="{ active: activeLevelFlag === item.value }">{{ item.name }}</li>
            </ul>
        </div>
        <div class="content">
            <div class="left">地区:</div>
            <ul class="right">
                <li :class="{ active: activeRegionFlag === '' }" @click="changeRegion('')">全部</li>
                <li v-for="(item) in regionArr" :key="item.value" @click="changeRegion(item.value)"
                    :class="{ active: activeRegionFlag === item.value }">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/index';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/type';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import useInfoStore from '@/store/modules/hospitalInfo';

let hospitalInfoStore = useInfoStore()
const levelArr = ref<HospitalLevelAndRegionArr>([])
const regionArr = ref([])

// 医院等级,地区响应数据

// 控制医院等级高亮数据
let activeLevelFlag = ref<string>('')
let activeRegionFlag = ref<string>('')

const changeLevel = (value:string)=>{
    activeLevelFlag.value=value
    hospitalInfoStore.hostype=value    
}
const changeRegion = (value: string) => {
    activeRegionFlag.value = value
    hospitalInfoStore.districtCode= value
}

const getHospitalLevel = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
    if (result.code === 200 && result.ok === true) {
        levelArr.value = result.data     
    } else {
        ElMessage({
            type: 'error',
            message: '或去医院等级信息失败'
        })
    }

}
const getHospitalRegion = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('BeiJin')
    if (result.code === 200 && result.ok === true) {
        regionArr.value = result.data
    } else {
        ElMessage({
            type: 'error',
            message: '或去医院地区信息失败'
        })
    }
}

onMounted(() => {
    getHospitalLevel()
    getHospitalRegion()
})
</script>

<style scoped lang="scss">
.level {
    padding: 2%;

    h1 {
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 20px;
    }

    color: #7f7f7f;

    .content {
        display: flex;
        align-items: center;
        height: 40px;

        .left {
            font-weight: 600;
        }

        .right {
            .active {
                color: #55a6fe;
            }

            display: flex;
            flex-wrap: wrap;

            li {
                margin-left: 10px;

                &:hover {
                    color: #55a6fe;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>