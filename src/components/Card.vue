<template>
    <div class="card">
        <el-card class="box-card panel" v-for="(item) in hasHospitalArr" :key="item.id" shadow="hover"
            @click="goDetail(item.hoscode)">
            <div class="content">
                <div class="left">
                    <div class="name">{{ item.hosname || '汉东屌炸天医科大学' }}</div>
                    <div class="info">
                        <div class="level">
                            <svg t="1692256758346" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1696" width="16" height="16">
                                <path
                                    d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                    p-id="1697"></path>
                            </svg>
                            <span>{{ item.param.hostypeString || '九级甲等' }}</span>
                        </div>
                        <div class="time">
                            <svg t="1692256875877" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1557" width="16" height="16">
                                <path
                                    d="M512 813.248c-158.784 0-288-129.216-288-288s129.216-288 288-288 288 129.216 288 288-129.216 288-288 288m0-640c-194.08 0-352 157.92-352 352 0 101.856 43.744 193.472 113.152 257.824a31.04 31.04 0 0 0-13.248 7.552l-58.528 58.56a31.968 31.968 0 1 0 45.248 45.216l58.528-58.528a31.584 31.584 0 0 0 8.832-19.84A349.664 349.664 0 0 0 512 877.248c71.328 0 137.664-21.44 193.152-58.048a31.04 31.04 0 0 0 8.224 16.672l58.528 58.56a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.28l-58.528-58.528a31.36 31.36 0 0 0-9.28-6.176C819.616 720.064 864 627.84 864 525.248c0-194.08-157.92-352-352-352"
                                    fill="#3E3A39" p-id="1558"></path>
                                <path
                                    d="M544 519.104v-185.856a32 32 0 0 0-64 0v199.104c0 8.48 3.36 16.64 9.376 22.624l107.296 107.296a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544 519.104zM182.624 286.4l90.528-90.56a32 32 0 0 0-45.248-45.216L137.376 241.152A31.968 31.968 0 1 0 182.624 286.4M883.872 227.872l-90.496-90.496a31.968 31.968 0 1 0-45.248 45.248l90.496 90.496a31.904 31.904 0 0 0 45.248 0 31.968 31.968 0 0 0 0-45.248"
                                    fill="#3E3A39" p-id="1559"></path>
                            </svg>
                            <span>每天{{ item.bookingRule !== null ? item.bookingRule.releaseTime : '25:00' }}放号</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img :src="item.logoData !== null ? `data:image/jpeg;base64,${item.logoData}` : `https://picsum.photos/50/50`"
                        alt="" width="50">
                </div>
            </div>
        </el-card>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { reqHospital } from '@/api/index';
import type { Content, HospitalResponseData } from '@/api/type'
import { ElMessage } from 'element-plus';
import  useInfoStore  from '@/store/modules/hospitalInfo';
import { useRouter } from 'vue-router';
let hospitalInfoStore = useInfoStore()
let $router = useRouter()
const hasHospitalArr = ref<Content>([])
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

watch(hospitalInfoStore.$state, () => {
    getHospitalInfo()
})
const goDetail = (hascode) => {  
    sessionStorage.setItem('hoscode',JSON.stringify(hascode))
    $router.push({
        path: '/hospital/detail',
    })
}
const getHospitalInfo = async () => {
    let result: HospitalResponseData = await reqHospital(currentPage.value, pageSize.value, hospitalInfoStore.hostype, hospitalInfoStore.districtCode)
    if (result.code === 200 && result.ok === true) {
        hasHospitalArr.value = result.data.content
        total.value = result.data.totalElements
        if (result.data.content.length < 1) {
            ElMessage({
                type: 'error',
                message: '一个都没有'
            })
        }

    } else {
        ElMessage({
            type: 'error',
            message: '或去医院卡片信息失败'
        })
    }

}
const handleSizeChange = () => {
    getHospitalInfo()
}
const handleCurrentChange = () => {
    getHospitalInfo()
}
onMounted(() => {
    getHospitalInfo()
})
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .panel {
        width: 49%;
        margin: 10px 0;

        .content {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .left {
                width: 60%;

                .name {
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .info {
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;

                    .level,
                    .time {
                        display: flex;
                        align-items: center;

                        span {
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>