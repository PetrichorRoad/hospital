<template>
    <div class="register">
        <div class="top">
            <div class="title">{{ hospitalDetailStore.HospitalDetailInfo.hospital?.hosname }}</div>
            <div class="level">
                <el-icon color="lightgreen">
                    <View />
                </el-icon>
                <span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <img v-if="hospitalDetailStore.HospitalDetailInfo.hospital?.logoData!==undefined" :src="`data:image/jpeg;base64,${hospitalDetailStore.HospitalDetailInfo.hospital?.logoData}`" alt="" width="80"
                    height="80">
            </div>
            <div class="right">
                <h1>挂号规则</h1>
                <div class="cycle">预约周期 :<span>{{ hospitalDetailStore.HospitalDetailInfo.bookingRule?.cycle }}天</span></div>
                <div class="open">放号时间 :<span>{{ hospitalDetailStore.HospitalDetailInfo.bookingRule?.releaseTime }}</span></div>
                <div class="close">停挂时间 :<span>{{ hospitalDetailStore.HospitalDetailInfo.bookingRule?.stopTime }}</span></div>
                <div class="address">具体地址 :<span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.param.fullAddress }}</span></div>
                <div class="route">规划路线 :<span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.route }}</span></div>
                <div class="withdrawal">退号时间 :<span>就诊前一日{{ hospitalDetailStore.HospitalDetailInfo.bookingRule?.quitTime }}前取消</span></div>
                <h1>医院预约规则</h1>
                <p class="rule" v-for="(item, index) in hospitalDetailStore.HospitalDetailInfo.bookingRule?.rule" :key="index">{{ (index +
                    1) + '.' + item }}</p>
            </div>
        </div>
        <div class="Department" v-if="Object.keys(hospitalDepartStore).length>0">
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" :class="{ active: index === currentIndex }"
                        v-for="(item, index) in hospitalDepartStore" :key="item.depcode">{{ item.depname }}</li>
                </ul>
            </div>
            <div class="department">
                <div class="showDepart" v-for="(item) in hospitalDepartStore" :key="item.depname">
                    <h1 class="current">{{ item.depname }}</h1>
                    <ul>
                        <li @click="registration(i)" v-for="(i) in item.children" :key="i.depcode">{{ i.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { View } from '@element-plus/icons-vue';
import useDetailStore from '@/store/modules/hospitalDetial';
import { useRouter } from 'vue-router';

let $router = useRouter()
let hospitalDetailStore = useDetailStore()
let hospitalDepartStore = useDetailStore().HospitalDepartment

// 控制高亮
let currentIndex = ref<number>(0)

const changeIndex = (index) => {
    currentIndex.value = index
    let nav = document.querySelectorAll('.current')
    // 妙不可言
    nav[currentIndex.value].scrollIntoView({
        behavior:'smooth',
        block:'start'
    }) 
}
const registration = (item:any) => {
    sessionStorage.setItem('depcode',JSON.stringify(item.depcode))
    hospitalDetailStore.getdepcode(item.depcode)
    $router.push('registration')
    
    // userStore.visible = true
}
onMounted(()=>{
    hospitalDetailStore.getDetailInfo()
    hospitalDetailStore.getDepartment()
})
</script>

<style scoped lang="scss">
.register {
    .top {
        display: flex;
        align-items: center;

        .title {
            text-align: center;
            font-size: 26px;
            font-weight: 800;
            margin-right: 20px;
        }

        .level {
            color: #7f7f7f;

            span {
                margin-left: 10px;
            }
        }
    }

    .content {
        display: flex;
        padding-top: 30px;

        .right {
            flex: 1;

            h1 {
                font-size: 20px;
                font-weight: 600;
                margin: 15px 0;
            }

            div {
                margin-top: 10px;
                font-size: 16px;
                font-weight: 600;
                span {
                    font-size: 14px;
                    line-height:20px ;
                    color: #7f7f7f;
                    font-weight: normal;
                    margin-left: 10px;
                }
            }
        }

        .left {
            width: 100px;
            display: flex;
            justify-content: center;

            img {
                border-radius: 50%;
            }
        }
    }

    .Department {
        display: flex;
        margin-top: 20px;
        height: 500px;
        font-size: 14px;
        color: #7f7f7f;

        .leftNav {
            width: 100px;
            height: 100%;
            background: rgb(248, 248, 248);

            ul {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                li {
                    text-align: center;
                    line-height: 41px;

                    &.active {
                        border-left: 2px solid red;
                        color: red;
                        background-color: white;
                    }
                }
            }
        }

        .department {
            overflow: auto;
            flex: 1;
            &::-webkit-scrollbar{
                display: none;
            }

            .showDepart {
                width: 100%;

                h1 {
                    background-color: rgb(250, 250, 250);
                    line-height: 30px;
                    margin-left: 10px;
                    font-weight: 900;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    align-items: center;

                    li {
                        width: 30%;
                        line-height: 24px;
                    }
                }
            }
        }
    }
}</style>