<template>
    <div class="order">
        <div class="payment" v-if="$route.query.orderID">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号详情</span>
                    </div>
                </template>
                <div class="top">
                    <el-tag type="success">√预约成功，待支付</el-tag>
                    <div class="QRinfo">
                        <img src="../../../assets/image/FAZE.png" width="50" alt="">
                        <p>微信关注“医仁网预约挂号”“预约快人一步”</p>
                    </div>
                </div>
                <div class="content">
                    <div class="left">
                        <el-descriptions :column="1" border>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        就诊人信息
                                    </div>
                                </template>
                                {{ orderInfo?.patientName == null ? '王德发' : orderInfo?.patientName }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        就诊日期
                                    </div>
                                </template>
                                {{ orderInfo?.reserveDate }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        就诊医院
                                    </div>
                                </template>
                                {{ orderInfo?.hosname }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        医生职称
                                    </div>
                                </template>
                                {{ orderInfo?.title }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        医事服务费
                                    </div>
                                </template>
                                <span style="color: red;">{{ orderInfo?.amount }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        挂号单号
                                    </div>
                                </template>
                                {{ orderInfo?.outTradeNo }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        挂号时间
                                    </div>
                                </template>
                                {{ orderInfo?.createTime }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <div class="button" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
                            <el-popconfirm title="是否确定取消预约" @confirm="cancelOrder">
                                <template #reference>
                                    <el-button>取消预约</el-button>
                                </template>
                            </el-popconfirm>
                            <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="paymentOrder">支付</el-button>
                        </div>
                    </div>
                    <div class="right">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>注意事项</span>
                                </div>
                            </template>
                            <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担：</p>
                            <p style="color: red;">2.【取号】就诊当天需要在{{ orderInfo?.fetchTime + '在医院' + orderInfo?.fetchAddress
                            }}取号，未取号视为爽约，改号不退不换</p>
                            <p style="color: red;">3.【退号】在{{ orderInfo?.quitTime }}可在线退号，逾期将不可办理退号退费</p>
                            <p>4.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit blanditiis unde facilis
                                autem voluptatibus. Deleniti laudantium veritatis soluta corrupti aliquam asperiores magni
                                saepe provident debitis. Obcaecati necessitatibus ipsum est harum!</p>
                            <p>5.注意北京市医保患者在住院期间不能使用社保卡在门诊取号</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis rem labore ex ullam
                                dicta. Cupiditate praesentium laborum ut modi voluptatem soluta vel error adipisicing elit.
                                Reiciendis rem labore ex</p>
                        </el-card>
                    </div>
                </div>
            </el-card>
            <!-- 支付二维码 -->
            <el-dialog v-model="dialogVisible" title="微信支付" width="500" @close="close">
                <div class="qrCode">
                    <img :src="QRCodeImageURL" alt="">
                    <p>请使用微信扫一扫</p>
                    <p>扫描二维码支付</p>
                </div>
                <template #footer>
                    <el-button @click="close">关闭窗口</el-button>
                </template>
            </el-dialog>
        </div>
        <div class="orderList" v-else>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号订单</span>
                    </div>
                </template>
                <!-- 下拉菜单 -->
                <el-form :inline="true">
                    <el-form-item label="就诊人">
                        <el-select placeholder="请选择就诊人" v-model="patientId" @change="change">
                            <el-option v-for="(item) in allVisitor " :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="change">
                            <el-option v-for="(item, index) in allStatus " :label="item.comment" :value="item.status" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-table border :data="orders">
                    <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
                    <el-table-column label="医院" prop="hosname"></el-table-column>
                    <el-table-column label="科室" prop="depname"></el-table-column>
                    <el-table-column label="医生" prop="title"></el-table-column>
                    <el-table-column label="服务费" prop="amount"></el-table-column>
                    <el-table-column label="就诊人" prop="patientName"></el-table-column>
                    <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{row}">
                            <el-button type="text" @click="$router.push({path:'/user/order',query:{orderID:row.id}})">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]" :small="false" :background="true"
                    layout=" prev, pager, next, jumper, ->, sizes,total" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqOrderInfo, reqCancelOrder, reqQRcode, reqPaymentStatus, reqUserAllOrder, reqUserVisitor, reqOrderStatusList } from '@/api';
import { OrderInfoResponseData, PaymentInfoResponseData, PaymentStatusResponseData } from '@/api/type';
import type { Records } from '@/api/type'
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import QRCode from 'qrcode';

let currentPage = ref(1)
let pageSize = ref(10)
let orders = ref<Records>([])
let patientId = ref('')
let orderStatus = ref('')
let total = ref(0)

let allVisitor = ref([])
let allStatus = ref([])

let $route = useRoute()
let orderInfo = ref<any>({})
// 控制支付对话框
let dialogVisible = ref<boolean>(false)
// QRCODE生成的动态图片路径
let QRCodeImageURL = ref<string>('')
// 存储长轮询定时器
let timer


const getAllOrder = async () => {
    let result = await reqUserAllOrder(currentPage.value, pageSize.value, patientId.value, orderStatus.value)
    if (result.code === 200 && result.ok === true) {
        orders.value = result.data.records
        total.value = result.data.total
    }
}

const handleSizeChange = (pageSizes:number) => {
    pageSize.value = pageSizes
    getAllOrder()
}
const handleCurrentChange = (pager: number) => {
    currentPage.value = pager
    getAllOrder()
}
const fetchAllVisitor = async ()=>{
    let result = await reqUserVisitor()
    if (result.code === 200 && result.ok === true) {
        allVisitor.value = result.data
    }
}
const fetchAllStatus = async () => {
    let result:any = await reqOrderStatusList()
    if (result.code === 200 && result.ok === true) {
        allStatus.value = result.data
    }
}
const change = () => {
    getAllOrder()
}
const getOrderInfo = async () => { 
    let result: OrderInfoResponseData = await reqOrderInfo($route.query.orderID as string)
    if (result.code === 200 && result.ok === true) {
        orderInfo.value = result.data
    }
}
const cancelOrder = async () => {
    let result = await reqCancelOrder($route.query.orderID as string)

    if (result.code === 200 && result.ok === true) {
        getOrderInfo()
        ElMessage({
            type: "success",
            message: '取消订单成功'
        })
    } else {
        ElMessage({
            type: "error",
            message: '取消订单失败'
        })
    }
}
const paymentOrder = async () => {
    dialogVisible.value = true
    let result: PaymentInfoResponseData = await reqQRcode($route.query.orderID as string)
    if (result.code === 200 && result.ok === true) {
        // 根据服务器返回的二维码信息用QRCode插件生成二维码
        QRCodeImageURL.value = await QRCode.toDataURL(result.data.codeUrl)
        // 询问服务器交易结果

        // 开启阿贾克斯长轮询，每隔五秒询问服务器支付结果
        // 对服务器压力极大
        timer = setInterval(async () => {
            let PaymentOrderResult: PaymentStatusResponseData = await reqPaymentStatus($route.query.orderID as string)
            if (PaymentOrderResult.data) {
                ElMessage({
                    type: 'success',
                    message: '支付成功'
                })
                clearInterval(timer)
                dialogVisible.value = false
            }
        }, 5000)
    }
}
const close = () => {
    dialogVisible.value = false
    clearInterval(timer)
}
onMounted(() => {
    getOrderInfo()
    getAllOrder()
    fetchAllVisitor()
    fetchAllStatus()
})
</script>

<style scoped lang="scss">
.order {
    .payment {
        .qrCode {
            display: flex;
            align-items: center;
            flex-direction: column;
            line-height: 30px;
        }

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #cccc;
            padding: 2% 0;

            .QRinfo {
                width: 30%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    margin-left: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #7f7f7f;
                    font-weight: 600;
                }
            }
        }

        .content {
            display: flex;
            justify-content: space-around;
            padding: 1%;

            .left {
                width: 30%;

                .button {
                    padding: 5%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
            }

            .right {
                width: 60%;

                p {
                    font-size: 14px;
                    color: #7f7f7f;
                    line-height: 20px;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>