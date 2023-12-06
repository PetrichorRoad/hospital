<template>
    <div class="registration">
        <div class="top">
            <span>{{ scheduleList.baseMap?.hosname }}<span>|</span></span><span>{{ scheduleList.baseMap?.bigname
            }}<span>*</span></span><span>{{ scheduleList.baseMap?.depname }}</span>
        </div>
        <div class="middle">
            <h1>{{ scheduleList.baseMap?.workDateString }}</h1>
            <div class="container">
                <div :class="{ active:((item.status == 0 && item.availableNumber != -1) || item.status == 1),panel:item.status == -1|| item.availableNumber == -1,current:item.workDate == workTime.workDate }"
                    v-for="(item) in scheduleList?.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="timer">{{ item.workDate }} {{ item.dayOfWeek }}</div>
                    <div class="status" v-if="item.status == -1">停止挂号</div>
                    <div class="status" v-if="item.status == 0">{{
                        item.availableNumber == -1 ? '已约满' : `有号(${item.availableNumber})` }}</div>
                    <div class="status" v-if="item.status == 1">即将放号</div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="scheduleList.total" :page-size="6"
                v-model:current-page="pageNumber" @current-change="getHospitalSchedulingInfo" />
        </div>
        <div class="bottom">
            <div class="will" v-if="workTime.status == 1">
                <span>{{ workTime.workDateMd }}放号</span>
            </div>
            <div class="source" v-else>
                <div class="morning">
                    <div class="tip">
                        <svg t="1693036041593" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1547" width="32" height="32">
                            <path
                                d="M512 200A312 312 0 1 0 824 512 312 312 0 0 0 512 200z m0 549.333333A237.333333 237.333333 0 1 1 749.333333 512 237.6 237.6 0 0 1 512 749.333333z"
                                p-id="1548" fill="#1296db"></path>
                            <path
                                d="M474.666667 44.32m5.333333 0l64 0q5.333333 0 5.333333 5.333333l0 102.24q0 5.333333-5.333333 5.333334l-64 0q-5.333333 0-5.333333-5.333334l0-102.24q0-5.333333 5.333333-5.333333Z"
                                p-id="1549" fill="#1296db"></path>
                            <path
                                d="M154.935877 207.647092m3.771237-3.771236l45.254833-45.254834q3.771236-3.771236 7.542473 0l72.294597 72.294597q3.771236 3.771236 0 7.542473l-45.254834 45.254834q-3.771236 3.771236-7.542472 0l-72.294597-72.294598q-3.771236-3.771236 0-7.542472Z"
                                p-id="1550" fill="#1296db"></path>
                            <path
                                d="M44.426667 474.613333m5.333333 0l102.24 0q5.333333 0 5.333333 5.333334l0 64q0 5.333333-5.333333 5.333333l-102.24 0q-5.333333 0-5.333333-5.333333l0-64q0-5.333333 5.333333-5.333334Z"
                                p-id="1551" fill="#1296db"></path>
                            <path
                                d="M155.058812 816.193176m3.771236-3.771236l72.294597-72.294598q3.771236-3.771236 7.542473 0l45.254834 45.254834q3.771236 3.771236 0 7.542473l-72.294597 72.294597q-3.771236 3.771236-7.542473 0l-45.254834-45.254834q-3.771236-3.771236 0-7.542472Z"
                                p-id="1552" fill="#1296db"></path>
                            <path
                                d="M474.773333 866.613333m5.333334 0l64 0q5.333333 0 5.333333 5.333334l0 102.24q0 5.333333-5.333333 5.333333l-64 0q-5.333333 0-5.333334-5.333333l0-102.24q0-5.333333 5.333334-5.333334Z"
                                p-id="1553" fill="#1296db"></path>
                            <path
                                d="M736.508185 789.084994m3.771236-3.771236l45.254834-45.254834q3.771236-3.771236 7.542472 0l72.294597 72.294597q3.771236 3.771236 0 7.542473l-45.254834 45.254834q-3.771236 3.771236-7.542472 0l-72.294597-72.294598q-3.771236-3.771236 0-7.542472Z"
                                p-id="1554" fill="#1296db"></path>
                            <path
                                d="M866.773333 474.506667m5.333334 0l102.24 0q5.333333 0 5.333333 5.333333l0 64q0 5.333333-5.333333 5.333333l-102.24 0q-5.333333 0-5.333334-5.333333l0-64q0-5.333333 5.333334-5.333333Z"
                                p-id="1555" fill="#1296db"></path>
                            <path
                                d="M736.439877 234.62232m3.771237-3.771237l72.294597-72.294597q3.771236-3.771236 7.542472 0l45.254834 45.254834q3.771236 3.771236 0 7.542472l-72.294597 72.294598q-3.771236 3.771236-7.542473 0l-45.254833-45.254834q-3.771236-3.771236 0-7.542473Z"
                                p-id="1556" fill="#1296db"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <div class="doctor" v-for="(item) in morningArrangement" :key="item">
                        <div class="left">
                            <span>{{ item.title }}</span><span>|</span><span>{{ item.docname }}</span>
                            <p class="introduce">{{ item.skill }}</p>
                        </div>
                        <div class="right">
                            <div class="price">¥{{ item.amount }}</div>
                            <el-button type="primary" @click="gotoBindVisitor(item)">剩余({{ item.reservedNumber }})</el-button>
                        </div>
                    </div>
                </div>
                <div class="after">
                    <div class="tip">
                        <svg t="1693037099275" class="icon" viewBox="0 0 1330 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4277" width="32" height="32">
                            <path
                                d="M248.598885 582.029238H82.917861a27.690853 27.690853 0 1 0 0 55.227008h165.681024a27.690853 27.690853 0 0 0 0-55.227008zM1242.839726 582.029238H1077.158702a27.690853 27.690853 0 1 0 0 55.227008h165.681024a27.690853 27.690853 0 0 0 0-55.227008z"
                                fill="#F6BB42" p-id="4278"></path>
                            <path
                                d="M1053.489985 179.970432l-117.260706 117.260706A27.536155 27.536155 0 0 0 974.594259 336.214909l117.879496-117.570101a27.690853 27.690853 0 0 0-38.98377-38.674376z"
                                fill="#FFCE54" p-id="4279"></path>
                            <path
                                d="M635.187941 29.759158V195.440182a27.690853 27.690853 0 0 0 55.227008 0V29.759158a27.690853 27.690853 0 1 0-55.227008 0z"
                                fill="#F6BB42" p-id="4280"></path>
                            <path
                                d="M233.283832 218.644808l117.106009 117.106008a27.536155 27.536155 0 0 0 38.98377-38.98377L272.267603 179.970432a27.690853 27.690853 0 0 0-38.983771 38.674376zM379.163576 720.174107a301.196035 301.196035 0 0 1-20.729465-110.454016 304.444683 304.444683 0 1 1 587.850505 110.454016z"
                                fill="#FFCE54" p-id="4281"></path>
                            <path
                                d="M662.878794 277.739253A331.980838 331.980838 0 0 0 360.909271 747.710262h603.320255a331.980838 331.980838 0 0 0-301.350732-469.971009z m264.068635 414.744001H398.655461a276.75383 276.75383 0 1 1 541.441255-82.763163 270.56593 270.56593 0 0 1-13.149287 82.763163z"
                                fill="#F6BB42" p-id="4282"></path>
                            <path
                                d="M584.756555 957.325377l58.475656 58.475655a27.536155 27.536155 0 0 0 19.491885 8.04427 27.536155 27.536155 0 0 0 19.491885-8.04427l58.630353-58.475655a27.84555 27.84555 0 0 0 0-39.138468 27.84555 27.84555 0 0 0-39.138468 0l-11.447615 11.447615v-99.006401a27.690853 27.690853 0 0 0-27.536155-27.690853 27.690853 27.690853 0 0 0-27.690853 27.690853V930.253314l-11.447615-11.447615a27.690853 27.690853 0 0 0-38.98377 0 27.690853 27.690853 0 0 0 0.154697 38.519678z"
                                fill="#ED5564" p-id="4283"></path>
                            <path
                                d="M1298.066734 692.483254H27.690853a27.690853 27.690853 0 1 0 0 55.227008h1270.375881a27.690853 27.690853 0 1 0 0-55.227008z"
                                fill="#656D78" p-id="4284"></path>
                        </svg>
                        <span>下午号源</span>
                    </div>
                    <div class="doctor" v-for="(item) in afterArrangement" :key="item">
                        <div class="left">
                            <span>{{ item.title }}</span><span>|</span><span>{{ item.docname }}</span>
                            <p class="introduce">{{ item.skill }}</p>
                        </div>
                        <div class="right">
                            <div class="price">¥{{ item.amount }}</div>
                            <el-button type="primary" @click="gotoBindVisitor(item)">剩余({{ item.reservedNumber }})</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { reqHospitalSchedulingInfo, reqHospitalDoctor } from '@/api/index';
import type { HospitalScheduleResponseData, HospitalDoctorScheduleResponseData } from '@/api/type';
import { useRouter } from 'vue-router';
let hosCode = JSON.parse(sessionStorage.getItem('hoscode'))
let depCode = JSON.parse(sessionStorage.getItem('depcode'))

let pageNumber = ref<number>(1)
let limitNumber = ref<number>(6)
let scheduleList = ref<any>({})
let $router = useRouter()
// 当前排班日期数据
let workTime = ref<any>({})
// 排班医生数据
let doctorWorkSchedule = ref<any>([])
const getHospitalSchedulingInfo = async () => {
    let result: HospitalScheduleResponseData = await reqHospitalSchedulingInfo(pageNumber.value, limitNumber.value, hosCode, depCode)
    if (result.code === 200 && result.ok === true) {
        scheduleList.value = result.data
        workTime.value = result.data.bookingScheduleList[0]
        getHospitalDoctorSchedulingInfo()
    }
}
const getHospitalDoctorSchedulingInfo = async () => {
    let result: HospitalDoctorScheduleResponseData = await reqHospitalDoctor(hosCode, depCode, workTime.value.workDate)
    if (result.code === 200 && result.ok === true) {       
        doctorWorkSchedule.value = result.data
    }
}
const changeTime = (item) => {
    workTime.value = item
    getHospitalDoctorSchedulingInfo()
}
// 跳转绑定就诊人
const gotoBindVisitor = (item)=>{
    sessionStorage.setItem('doctor',JSON.stringify(item))
    $router.push('visitor')
}
// 计算出上午，下午医生排班数据
let morningArrangement = computed(() => {
    return doctorWorkSchedule.value.filter((item) => {
        return item.workTime == 0
    })
})
let afterArrangement = computed(() => {
    return doctorWorkSchedule.value.filter((item) => {
        return item.workTime == 1
    })
})
onMounted(() => {
    getHospitalSchedulingInfo()
})
</script>

<style scoped lang="scss">
.registration {
    .top {
        color: #7f7f7f;
        font-size: 14px;
        font-weight: 600;
        padding: 1% 0;

        span {
            margin-left: 10px;
        }
    }

    .middle {
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-weight: 600;
        }

        .container {
            padding: 3% 0;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .active {
                width: 14%;
                height: 100px;
                border: 1px solid lightblue;

                .timer {
                    background-color: lightblue;
                    height: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .status {
                    height: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .panel {
                width: 14%;
                height: 100px;
                border: 1px solid gray;

                .timer {
                    background-color: #ddd;
                    height: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .status {
                    height: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .current{
                transform: scale(1.2);
            }
        }
    }

    .bottom {
        padding: 1% 0;

        .will {
            text-align: center;
            font-size: 26px;
            font-weight: 600;
        }

        .source {

            .morning,
            .after {
                .tip {
                    display: flex;
                    align-items: center;
                    color: aqua;
                    font-size: 24px;
                    font-weight: 600;
                    padding: 3% 0;

                    span {
                        margin-left: 10px;
                    }
                }

                .doctor {
                    display: flex;
                    justify-content: space-between;
                    padding: 1% 3%;
                    border-bottom: 1px solid #ccc;

                    .left {
                        flex: 1;

                        span {
                            margin-right: 10px;
                            font-size: 20px;
                            font-weight: 600;
                            color: skyblue;
                        }

                        .introduce {
                            margin-top: 10px;
                            line-height: 20px;
                            font-size: 14px;
                            color: #7f7f7f;
                        }
                    }

                    .right {
                        width: 20%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>