<template>
    <div class="hospital">
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <p>/ <span> 医院信息</span></p>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
                    <el-icon><icon-menu /></el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Document, Menu as IconMenu, InfoFilled, Setting, Search, HomeFilled } from '@element-plus/icons-vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useDetailStore from '@/store/modules/hospitalDetial';

let $route = useRoute()
let $router = useRouter()
let hospitalDetailStore = useDetailStore()

const changeActive = (path:string)=>{
    $router.push({
        path,
    })
}
onMounted(()=>{
    hospitalDetailStore.getDetailInfo()
    hospitalDetailStore.getDepartment()   
})
</script>

<style scoped lang="scss">
.hospital {
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