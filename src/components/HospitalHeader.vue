<template>
    <div class="top">
        <div class="container">
            <div class="left" @click="$router.push('/home')">
                <img src="../assets/image/FAZE.png" alt="">
                <p>医仁 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="login" v-if="!userStore.userInfo.name">注册登录</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="$router.push('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="$router.push('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
const login = () => {
    userStore.visible = true
}
const logout = ()=>{
    userStore.userLogout()
}
</script>

<style lang="scss" scoped>
.top {
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    background-color: #f0f2f5;

    .container {
        width: 90%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 2%;

        .left {
            display: flex;
            align-items: center;

            img {
                width: 70px;
                height: 70px;
            }

            p {
                font-size: 22px;
                color: #FF3726;
                margin-left: 20px;
            }
        }

        .right {
            width: 18%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 14px;
            font-weight: 600;
            color: #ccc;
        }
    }
}</style>