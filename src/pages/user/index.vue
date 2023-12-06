<template>
    <div class="user">
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <p>/ <span> 会员中心</span></p>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
                    <el-icon><CreditCard /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="changeActive('/user/order')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
                    <el-icon>
                        <ChatLineRound />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Document, CreditCard, Memo, User, ChatLineRound, HomeFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
let $router = useRouter()
const changeActive = (path: string) => {
    $router.push({
        path,
    })
}
</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        width: 15%;
        .top{
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            color: #7f7f7f;
            background-color: #ccc;
        }
    }

    .content {
        width: 100%;
        padding:2% 5%;
    }
}
</style>