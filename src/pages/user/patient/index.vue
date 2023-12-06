<template>
    <div class="patient">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>就诊人管理</span>
                    <el-button class="button" type="success" :icon="User" @click="addUserVisitor">添加就诊人</el-button>
                </div>
            </template>
            <div class="user" v-if="scene == 0">
                <div v-for="(item) in UserVisitor" :key="item" class="box">
                    <div class="title">
                        <div class="tag">{{ item.isInsure == 1 ? '医保' : '自费' }}</div>
                        <div class="name">{{ item.name }}</div>
                        <el-button type="primary" circle :icon="Edit" @click="addUserVisitor(item)"></el-button>
                        <el-popconfirm title="确定删除该就诊人?" @confirm="removeVisitor(item.id)">
                            <template #reference>
                                <el-button type="danger" circle :icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
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
                    </div>
                </div>
            </div>
            <!-- 添加|修改就诊人信息 -->
            <div class="form" v-if="scene == 1">
                <el-divider content-position="left">就诊人信息</el-divider>
                <el-form style="width: 60%;margin:0 auto;">
                    <el-form-item label="用户姓名">
                        <el-input placeholder="请输入用户姓名" v-model="VisitorParams.name"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="VisitorParams.certificatesType">
                            <el-option v-for="(item, index) in CertificationType" :value="item.value" :label="item.name"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="请输入用户证件号码" v-model="VisitorParams.certificatesNo"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓别">
                        <el-radio-group v-model="VisitorParams.sex">
                            <el-radio :label="1">男🚹</el-radio>
                            <el-radio :label="0">女🚺</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-date-picker type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD"
                            v-model="VisitorParams.birthdate" style="width: 100%;" />
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请输入用户手机号码" v-model="VisitorParams.phone"></el-input>
                    </el-form-item>
                </el-form>
                <el-divider content-position="left">建档信息</el-divider>
                <el-form style="width: 60%;margin:0 auto;">
                    <el-form-item label="婚姻状况">
                        <el-radio-group v-model="VisitorParams.isMarry">
                            <el-radio :label="1">未婚</el-radio>
                            <el-radio :label="0">已婚婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="自费/医保">
                        <el-radio-group v-model="VisitorParams.isInsure">
                            <el-radio :label="1">自费</el-radio>
                            <el-radio :label="0">医保</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="当前地址">
                        <el-cascader :props="props" v-model="VisitorParams.addressSelected" />
                    </el-form-item>
                    <el-form-item label="详细住址">
                        <el-input placeholder="请输入详细地址" v-model="VisitorParams.address"></el-input>
                    </el-form-item>
                </el-form>
                <el-divider content-position="left">联系人信息</el-divider>
                <el-form style="width: 60%;margin:0 auto;" label-width="80">
                    <el-form-item label="用户姓名">
                        <el-input placeholder="请输入联系人姓名" v-model="VisitorParams.contactsName"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请选择证件类型" style="width: 100%;"
                            v-model="VisitorParams.contactsCertificatesType">
                            <el-option v-for="(item, index) in CertificationType" :value="item.value" :label="item.name"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户号码">
                        <el-input placeholder="请输入联系人证件号码" v-model="VisitorParams.contactsCertificatesNo"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请输入联系人手机号码" v-model="VisitorParams.contactsPhone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                        <el-button type="default" @click="reset">重写</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { User, Edit, Delete } from '@element-plus/icons-vue';
import { reqUserVisitor, reqCertificationType, reqCascaderCity, reqAddOrUpdateVisitor, reqRemoveVisitor } from '@/api/index';
import { onMounted, reactive, ref, watch } from 'vue';
import { CertificatesTypeResponseData, AddOrUpdateVisitor } from '@/api/type';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

let $route = useRoute()
let $router = useRouter()
let UserVisitor = ref([])
let scene = ref<number>(0)
let CertificationType = ref<any>([])
// 收集新增或修改就诊人信息
let VisitorParams = reactive<AddOrUpdateVisitor>({
    id: null,
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
})

const props = {
    lazy: true,//懒加载
    // 加载级联数据方法
    async lazyLoad(node, resolve) {
        let result: any = await reqCascaderCity(node.data.id || '86')
        if (result.code === 200 && result.ok === true) {
            // 整理数据
            let showData = result.data.map((item) => {
                return {
                    id: item.id,
                    label: item.name,
                    value: item.value,
                    leaf: !item.hasChildren
                }
            })
            // 注入组件需要展示的数据
            resolve(showData)
        }

    },
}

const getUserVisitor = async () => {
    let result = await reqUserVisitor()
    if (result.code === 200 && result.ok === true) {
        UserVisitor.value = result.data
        console.log(result.data);

    }
}
const addUserVisitor = (visitor: AddOrUpdateVisitor) => {
    scene.value = 1
    Object.assign(VisitorParams, visitor)
}
const getCertificationType = async () => {
    let result: CertificatesTypeResponseData = await reqCertificationType()
    if (result.code === 200 && result.ok === true) {
        CertificationType.value = result.data
    }
}
const submit = async () => {
    // 新增或修改就诊人信息
    console.log(VisitorParams);

    try {
        let result: any = await reqAddOrUpdateVisitor(VisitorParams)

        if (result.code === 200 && result.ok === true) {
            ElMessage({
                type: 'success',
                message: `${VisitorParams.id ? '修改就诊人成功' : '新增就诊人成功'}`
            })
            reset()
            if ($route.query.type == 'add') {
                $router.back()
            }
            scene.value = 0
            getUserVisitor()
        } else {
            ElMessage({
                type: 'error',
                message: '失败'
            })
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '网络错误'
        })
    }
}
const reset = () => {
    Object.assign(VisitorParams, {
        id: '',
        name: '',
        certificatesType: '',
        certificatesNo: '',
        sex: 0,
        birthdate: '',
        phone: '',
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: '',
        contactsName: '',
        contactsCertificatesType: '',
        contactsCertificatesNo: '',
        contactsPhone: ''
    })
}
const removeVisitor = async (id:string)=>{
    let result:any = await reqRemoveVisitor(id)
    if(result.code === 200 && result.ok === true){
        ElMessage({
            type:'success',
            message:'删除就诊人成功'
        })
        getUserVisitor()
    }else{
        ElMessage({
            type: 'error',
            message: '删除就诊人失败'
        })
    }
}
watch(
    () => UserVisitor.value,
    () => {
        if ($route.query.type == 'edit') {
            let visitor = UserVisitor.value.find((item) => {
                return item.id == $route.query.id
            })
            Object.assign(VisitorParams, visitor)
        }
    }
)
onMounted(() => {
    getUserVisitor()
    getCertificationType()
    if ($route.query.type == 'add' || $route.query.type == 'edit') {
        scene.value = 1
    }
})
</script>

<style scoped lang="scss">
.patient {
    .box-card {
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

                    .confirm {
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
}
</style>