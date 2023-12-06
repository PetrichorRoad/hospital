<template>
    <div class="visitor">
        <div class="tip">确认挂号信息</div>
        <!-- 就诊人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>点击确认就诊人</span>
                    <el-button type="success" :icon="User" @click="$router.push({path:'/user/patient',query:{type:'add'}})">添加就诊人</el-button>
                </div>
            </template>
            <div class="user">
                <div v-for="(item,index) in UserVisitor" :key="item" class="box" @click="changeVisitor(index)">
                    <div class="title">
                        <div class="tag">{{ item.isInsure == 1 ? '医保' : '自费' }}</div>
                        <div class="name">{{ item.name }}</div>
                        <el-button type="primary" circle :icon="Edit" @click="$router.push({path:'/user/patient',query:{type:'edit',id:item.id}})"></el-button>
                    </div>
                    <div class="body">
                        <div>证件类型:<span>{{ item.param.certificatesTypeString }}</span></div>
                        <div>证件号码:<span>{{ item.certificatesNo }}</span></div>
                        <div>用户性别:<span>{{ item.sex == 1 ? '男' : '女' }}</span></div>
                        <div>出生日期:<span>{{ item.birthdate }}</span></div>
                        <div>手机号码:<span>{{ item.phone }}</span></div>
                        <div>婚姻状况:<span>{{ item.isMarry == 1 ? '已婚' : '未婚' }}</span></div>
                        <div>当前住址:<span>{{ item.address }}</span></div>
                        <div>详细地址:<span>{{ item.param.fullAddress }}</span></div>
                        <div class="confirm" v-show="current == index">已选择</div>
                    </div>
                </div>
            </div>
        </el-card>
        <!-- 医生信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期
                        </div>
                    </template>
                    {{ DoctorInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院
                        </div>
                    </template>
                    {{ DoctorInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室
                        </div>
                    </template>
                    {{ DoctorInfo.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名
                        </div>
                    </template>
                    {{ DoctorInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称
                        </div>
                    </template>
                    {{ DoctorInfo.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长
                        </div>
                    </template>
                    {{ DoctorInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            服务费
                        </div>
                    </template>
                    <span style="color:red;">{{ DoctorInfo.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>


        </el-card>
        <!-- button -->
        <div class="button">
            <el-button type="primary" size="large" :disabled="current===-1" @click="submitOrder()">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Edit } from '@element-plus/icons-vue';
import { reqUserVisitor, reqDoctorInfo,reqCreateOrder } from '@/api/index';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

let $router = useRouter()

// 确诊人索引
let current = ref(-1)
let UserVisitor = ref([])
let DoctorInfo:any = ref({})
// 获取用户就诊人信息
const getUserVisitor = async () => {
    let result = await reqUserVisitor()
    if (result.code === 200 && result.ok === true) {
        UserVisitor.value = result.data
    }
}
const getDoctorInfo = async () => {
    let result = await reqDoctorInfo(JSON.parse(sessionStorage.getItem('doctor')).id)
    if (result.code === 200 && result.ok === true) {
        DoctorInfo.value = result.data
    }
}
const changeVisitor = (index)=>{
    current.value = index
}
const submitOrder = async ()=>{
    const hoscode = JSON.parse(sessionStorage.getItem('hoscode'))
    const scheduleID = JSON.parse(sessionStorage.getItem('doctor')).id
    let result = await reqCreateOrder(hoscode,scheduleID,UserVisitor.value[current.value].id)
    if (result.code === 200 && result.ok === true) {
        ElMessage({
            type:'success',
            message:'订单创建成功'
        })
        $router.push({path:'/user/order',query:{orderID: result.data }})
    }else{
        ElMessage({
            type: 'error',
            message: '订单创建失败'
        })
    }
}
onMounted(() => {
    getUserVisitor()
    getDoctorInfo()
})

</script>

<style scoped lang="scss">
.visitor {
    .tip {
        font-size: 20px;
        font-weight: 900;
        color: #7f7f7f;
        text-align: center;
        padding: 2% 0;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .box {
                width: 30%;
                margin: 1% 0;
                border: 1px solid #e5e5e5;
                border-radius: 4px;
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

                .title {
                    height: 70px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    background-color: #e5e5e5;

                    .tag {
                        font-size: 14px;
                        line-height: 20px;
                        background-color: #fff;
                        border-radius: 2px;
                        padding: 0 2px;
                    }

                    .name {
                        color: #7f7f7f;
                        font-weight: 600;
                    }
                }

                .body {
                    padding: 5% 10%;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    div {
                        font-size: 14px;
                        color: #7f7f7f;
                        line-height: 30px;

                        span {
                            margin-left: 10px;
                        }
                    }
                    .confirm{
                        position: absolute;
                        top: 20%;
                        left: 15%;
                        width: 200px;
                        height: 200px;
                        text-align: center;
                        line-height: 200px;
                        font-size: 30px;
                        color: red;
                        border-radius: 50%;
                        border: 5px solid red;
                        transform: rotate(45deg);
                        opacity: 0.3;
                        font-weight: 800;
                    }
                }
            }
        }
    }

    .button {
        display: flex;
        justify-content: center;
    }
}
</style>