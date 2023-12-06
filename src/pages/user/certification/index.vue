<template>
    <div class="certification">
        <!-- 实名认证表单卡片 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <h1>实名信息</h1>
                </div>
            </template>
            <div class="tip">
                <el-icon>
                    <InfoFilled />
                </el-icon>
                <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续操作，建议提前实名认证</span>
            </div>
            <!-- 描述列表 -->
            <el-descriptions v-if="userInfo?.authStatus == 1" class="margin-top" :column="1" border>
                <el-descriptions-item :width="20" label-align="center">
                    <template #label>
                        <div class="cell-item">
                            用户姓名
                        </div>
                    </template>
                    {{ userInfo.name }}
                </el-descriptions-item>
                <el-descriptions-item :width="20" label-align="center">
                    <template #label>
                        <div class="cell-item">
                            证件类型
                        </div>
                    </template>
                    {{ userInfo.certificatesType == '10' ? '身份证' : '户口本' }}
                </el-descriptions-item>
                <el-descriptions-item :width="20" label-align="center">
                    <template #label>
                        <div class="cell-item">
                            身份证号
                        </div>
                    </template>
                    {{ userInfo.certificatesNo }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 数据表单 -->
            <el-form style="width: 70%;" v-if="userInfo?.authStatus == 0" label-width="80" :model="RealNameParams"
                :rules="rules" ref="form">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名" size="default" clearable v-model="RealNameParams.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select style="width: 100%;" placeholder="请选择证件类型" v-model="RealNameParams.certificatesType">
                        <el-option v-for="(item, index) in CertificationType" :value="item.value" :label="item.name"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input placeholder="请输入证件号码" v-model="RealNameParams.certificatesNo" size="default"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="上传证件" prop="certificatesUrl">
                    <el-upload list-type="picture-card" :limit="1" action="/api/oss/file/fileUpload?fileHost=userAuah"
                        :on-exceed="exceedHandle" :on-success="successHandle" :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove" ref="upload">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full v-if="RealNameParams.certificatesUrl" alt="Preview Image"
                            style="width:100% ;height:100%;" :src="RealNameParams.certificatesUrl" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="default" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqUserInfo, reqCertificationType, reqUserAuthentication } from '@/api';
import { UserInfoResponseData, CertificatesTypeResponseData, UserParams } from '@/api/type';
import { InfoFilled, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const dialogVisible = ref(false)
let upload = ref()
let form = ref()

let userInfo = ref<any>({})
let CertificationType = ref<any>([])
let RealNameParams = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
})
const validateName = (_rule: any, value: any, callback: any) => {
    if (/^[\u00B7\u3007\u3400-\u9FFF\uE000-\uF8FF\uF900-\uFAFF\u{20000}-\u{2FFFF}\u{30000}-\u{3FFFF}]+$/u.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的名字'))
    }
}
const validateCertificatesType = (_rule: any, value: any, callback: any) => {
    if (value == '10' || value == '20') {
        callback()
        form.value.clearValidate('validateCertificatesType')
    } else {
        callback(new Error('请选择证件类型'))
    }
}
const validateCertificatesNo = (_rule: any, value: any, callback: any) => {
    let HuKouBen =  / (^d {15}$)| (^d {18}$)| (^d {17} (d|X|x)$)/
    let IDCard = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (HuKouBen.test(value)|| IDCard.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的身份证或户口本'))
    }
}
const validateCertificatesUrl = (_rule: any, value: any, callback: any) =>{
    if(value.length){
        callback()
    } else {
        callback(new Error('请上传证件照'))
    }
    
}
// 表单校验规则
const rules = {
    name: [{ required: true, validator: validateName, trigger: 'blur' }],
    certificatesType: [{ required: true, validator: validateCertificatesType, trigger: 'blur' }],
    certificatesNo: [{ required: true, validator: validateCertificatesNo, trigger: 'blur' }],
    certificatesUrl: [{ required: true, validator: validateCertificatesUrl, trigger: 'blur' }],
}


const getUserInfo = async () => {
    let result: UserInfoResponseData = await reqUserInfo()
    if (result.code === 200 && result.ok === true) {
        userInfo.value = result.data
    }
}
const getCertificationType = async () => {
    let result: CertificatesTypeResponseData = await reqCertificationType()
    if (result.code === 200 && result.ok === true) {
        CertificationType.value = result.data
    }
}
// 照片上传数量超出回调函数
const exceedHandle = () => {
    ElMessage({
        type: 'error',
        message: '证件照只收集两张'
    })
}
// 照片上传成功回调函数
const successHandle = (response: any, _uploadFile: any, _uploadFiles: any) => {
    form.value.clearValidate('validateCertificatesUrl')
    RealNameParams.certificatesUrl = response.data 
}
// 图片预览
const handlePictureCardPreview: any['onPreview'] = () => {
    dialogVisible.value = true
}
// 图片移除回调函数
const handleRemove: any['onRemove'] = () => {
    RealNameParams.certificatesUrl = ''
}
// 重置
const reset = () => {
    Object.assign(RealNameParams, {
        certificatesNo: '',
        certificatesType: '',
        certificatesUrl: '',
        name: ''
    })
    upload.value.clearFiles()
}
// 提交
const submit = async () => {
    let flag = await form.value.validate()
    if(flag){
        let result = await reqUserAuthentication(RealNameParams)
        if (result.code === 200 && result.ok === true) {
            ElMessage({
                type: 'success',
                message: '实名认证成功'
            })
            getUserInfo()
        } else {
            ElMessage({
                type: 'error',
                message: '实名认证失败'
            })
        }
    }else{
        ElMessage({
            type: 'error',
            message: '请正确填写信息'
        })
    }
    
    
}
onMounted(() => {
    getUserInfo()
    getCertificationType()
})
</script>

<style scoped lang="scss">
.certification {
    .box-card {
        display: flex;
        align-items: center;
        flex-direction: column;

        .tip {
            padding: 5% 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

}
</style>