<template>
    <div class="detail">
        <div class="top">
            <div class="title">{{ hospitalDetailStore.HospitalDetailInfo.hospital?.hosname }}</div>
            <div class="level">
                <el-icon color="lightgreen">
                    <View />
                </el-icon>
                <span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="info">
            <div class="left">
                <img :src="`data:image/jpeg;base64,${hospitalDetailStore.HospitalDetailInfo.hospital?.logoData}`" alt=""
                    width="80" height="80">
            </div>
            <div class="middle">
                <el-icon :size="20" color="lightblue">
                    <Promotion />
                </el-icon>
            </div>
            <div class="right">
                <div class="address">具体地址 :<span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.param.fullAddress
                }}</span></div>
                <div class="route">规划路线 :<span>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.route }}</span></div>
            </div>
        </div>
        <div class="detailInfo">
            <h1>医院介绍</h1>
            <div>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.intro }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { View, Promotion } from '@element-plus/icons-vue';
import useDetailStore from '@/store/modules/hospitalDetial';

let hospitalDetailStore = useDetailStore()
</script>

<style scoped lang="scss">
.detail {
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

    .info {
        display: flex;
        padding-top: 30px;
        align-items: center;

        .right {
            flex: 1;

            div {
                margin-top: 10px;
                font-size: 14px;
                color: #7f7f7f;

                span {
                    font-weight: normal;
                    margin-left: 10px;
                }
            }
        }

        .middle {
            width: 50px;
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

    .detailInfo {
        padding: 5% 0;

        h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 15px 0;
        }

        div {
            font-size: 14px;
            color: #7f7f7f;
            line-height: 20px;
        }
    }
}
</style>