<template>
    <el-dialog v-model="userStore.visible" title="用户登录" @close="close">
        <div class="content">
            <el-row>
                <el-col :span="12">
                    <div class="login" v-show="sceneFlag === true">
                        <el-form :model="loginParam" :rules="rule" ref="form">
                            <el-form-item prop="phone">
                                <el-input placeholder="请输入手机号" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input placeholder="请输入验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="verificationResult && buttonFlag ? false : true"
                                    @click="getVerificationCode">
                                    <span v-if="buttonFlag">获取验证码</span>
                                    <span v-else>倒计时({{ currentDownTime }})</span>
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <div class="bottom">
                            <el-button type="primary" style="width:100%;"
                                :disabled="!verificationResult || loginParam.code == ''" @click="UserLogin">登录</el-button>
                            <p>微信登陆扫一扫</p>
                            <svg @click="changeScene" t="1692784169827" class="icon" viewBox="0 0 1170 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1672" width="32" height="32">
                                <path
                                    d="M331.429 263.429q0-23.429-14.286-37.715t-37.714-14.285q-24.572 0-43.429 14.571t-18.857 37.429q0 22.285 18.857 36.857t43.429 14.571q23.428 0 37.714-14t14.286-37.428zM756 553.143q0-16-14.571-28.572T704 512q-15.429 0-28.286 12.857t-12.857 28.286q0 16 12.857 28.857T704 594.857q22.857 0 37.429-12.571T756 553.143zM621.143 263.429q0-23.429-14-37.715t-37.429-14.285q-24.571 0-43.428 14.571t-18.857 37.429q0 22.285 18.857 36.857t43.428 14.571q23.429 0 37.429-14t14-37.428zM984 553.143q0-16-14.857-28.572T932 512q-15.429 0-28.286 12.857t-12.857 28.286q0 16 12.857 28.857T932 594.857q22.286 0 37.143-12.571T984 553.143zM832 326.286Q814.286 324 792 324q-96.571 0-177.714 44T486.57 487.143 440 651.429q0 44.571 13.143 86.857-20 1.714-38.857 1.714-14.857 0-28.572-0.857t-31.428-3.714-25.429-4-31.143-6-28.571-6L124.57 792l41.143-124.571Q0 551.429 0 387.429q0-96.572 55.714-177.715T206.571 82t207.715-46.571q100.571 0 190 37.714T754 177.429t78 148.857z m338.286 320.571q0 66.857-39.143 127.714t-106 110.572l31.428 103.428-113.714-62.285q-85.714 21.143-124.571 21.143-96.572 0-177.715-40.286T512.857 797.714t-46.571-150.857T512.857 496t127.714-109.429 177.715-40.285q92 0 173.143 40.285t130 109.715 48.857 150.571z"
                                    fill="#0e932e" p-id="1673"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="login" v-show="sceneFlag === false">
                        <div id="login_container"></div>
                        <div class="bottom">
                            <p>手机验证码登录</p>
                            <svg @click="changeScene" t="1692941031023" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1759" width="32" height="32">
                                <path
                                    d="M704 128v768H320V128h384m0-64H320c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h384c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64zM272 192v64h480v-64H272z m0 576h480v-64H272v64z m176 96h128v-64H448v64z"
                                    p-id="1760" fill="#1296db"></path>
                            </svg>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="advert">
                        <div class="top">
                            <div class="left">
                                <img width="100" :src="QRCodeImageURL" alt="">
                                <svg t="1692839292839" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4216" width="20" height="20">
                                    <path
                                        d="M362.403292 95.115814C163.141681 95.115814 0 230.56555 0 403.339212c0 99.329806 54.179894 181.201646 145.081717 244.411523l-36.119929 108.961787 126.419753-63.811875c45.149912 9.029982 81.87184 18.059965 127.021752 18.059965 11.437978 0 22.875955-0.601999 33.711934-1.203998-7.223986-24.079953-11.437978-49.363904-11.437978-75.851852 0-158.325691 136.051734-286.55144 308.223398-286.55144 12.039976 0 23.477954 0.601999 34.915932 2.407995C696.51264 203.475603 540.594944 95.115814 362.403292 95.115814zM240.79953 339.527337c-24.681952 0-44.547913-19.865961-44.547913-44.547913 0-24.681952 19.865961-44.547913 44.547913-44.547913s44.547913 19.865961 44.547913 44.547913C285.347443 319.661376 265.481481 339.527337 240.79953 339.527337zM495.445032 339.527337c-24.681952 0-44.547913-19.865961-44.547913-44.547913 0-24.681952 19.865961-44.547913 44.547913-44.547913s44.547913 19.865961 44.547913 44.547913C539.992945 319.661376 520.126984 339.527337 495.445032 339.527337zM1024 629.69077c0-145.081717-145.081717-263.073486-307.621399-263.073486-172.171664 0-308.223398 117.99177-308.223398 263.073486 0 145.081717 136.051734 263.073486 308.223398 263.073486 36.119929 0 72.239859-9.029982 108.961787-18.059965l99.329806 54.179894-27.089947-90.299824C969.820106 783.802469 1024 711.56261 1024 629.69077zM620.660788 583.938859c-19.865961 0-36.119929-16.253968-36.119929-36.119929s16.253968-36.119929 36.119929-36.119929 36.119929 16.253968 36.119929 36.119929S640.526749 583.938859 620.660788 583.938859zM817.514403 583.938859c-19.865961 0-36.119929-16.253968-36.119929-36.119929s16.253968-36.119929 36.119929-36.119929 36.119929 16.253968 36.119929 36.119929S837.982363 583.938859 817.514403 583.938859z"
                                        fill="#1afa29" p-id="4217"></path>
                                </svg>
                                <p class="introduce">微信扫码关注</p>
                                <p class="introduce">快速预约挂号</p>
                            </div>
                            <div class="left">
                                <img width="100" :src="QRCodeImageURL" alt="">
                                <svg t="1692839270218" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3156" width="20" height="20">
                                    <path
                                        d="M704 128v768H320V128h384m0-64H320c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h384c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64zM272 192v64h480v-64H272z m0 576h480v-64H272v64z m176 96h128v-64H448v64z"
                                        p-id="3157" fill="#1296db"></path>
                                </svg>
                                <p class="introduce">扫一扫下载</p>
                                <p class="introduce">“预约挂号”APP</p>
                            </div>
                        </div>
                        <h2>帕布鸡官方指定合作平台</h2>
                        <h2>快速挂号，安全放心</h2>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';
import { reqVerificationCode, reqWxLogin } from '@/api/index';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { WxLoginResponseData } from '@/api/type'
import { useRouter, useRoute } from 'vue-router';
import QRCode from 'qrcode';

// QRCODE生成的动态图片路径
let QRCodeImageURL = ref<string>('')
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let sceneFlag = ref<boolean>(true)//0表示手机号码登录，1表示微信扫码登录
let buttonFlag = ref<boolean>(true)//验证码按钮
let currentDownTime = ref<number>(60)//倒计时时间
let loginParam = reactive({
    phone: '',
    code: ''
})
// 登录表单实例
let form = ref()
// 自定义校验规则
const phoneValidatePass = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('手机号码不能为空'))
    } else {
        const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('手机号码不正确'))
        }
    }
}
const getQRCodeImageURL = async ()=>{
    QRCodeImageURL.value = await QRCode.toDataURL('医仁网，挂号快人一步')
}
// 登录表单校验规则
const rule = {
    phone: [
        { validator: phoneValidatePass, message: '号码为国行11位数', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入正确验证码', trigger: 'blur', min: 6, max: 6 }
    ]
}
// 关闭登录对话框
const close = () => {
    Object.assign(loginParam, { phone: '', code: '' })
    form.value.resetFields();
}
// 手机号码或微信登录切换场景
const changeScene = async () => {
    sceneFlag.value = !sceneFlag.value
    // 获取微信扫码登陆参数
    let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin')
    let result: WxLoginResponseData = await reqWxLogin(redirect_URL)
    if (result.code === 200 && result.ok === true) {
        // 生成微信登录二维码
        // @ts-ignore
        new WxLogin({
            self_redirect: true,//手机点击确定后可以在iframe重定向跳转到redirect_uri
            id: 'login_container',//显示二维码的容器id
            appid: result.data.appid,//应用唯一标识appid
            scope: 'snsapi_login',//应用授权作用域//微信扫码登录已授权
            redirect_uri: result.data.redirectUri,//填写授权回调域路径，就是用户授权成功后微信服务平台向后端推送的code的地址
            state: result.data.state,//就是学校服务器重定向地址并携带用户互信息
            style: 'black',//字体颜色
            href: ''//自定义样式表地址
        })
    }

}
const UserLogin = async () => {
    try {
        await form.value.validate()
        await userStore.userLogin(loginParam)
        let redirects:string = $route.query.redirect.toString()       
        if(redirects){            
            $router.push(redirects)
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error).message
        })
    }
}
const getVerificationCode = async () => {
    let result: any = await reqVerificationCode(loginParam.phone)
    if (result.code === 200 && result.ok === true) {
        loginParam.code = result.data
        ElMessage({
            type: 'warning',
            message: `验证码为${result.data}`
        })
    }
    buttonFlag.value = false
}
let verificationResult = computed(() => {
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    return reg.test(loginParam.phone)
})

watch(
    () => buttonFlag.value,
    () => {
        let timer = setInterval(() => {
            currentDownTime.value--
            if (currentDownTime.value == 0) {
                currentDownTime.value = 60
                buttonFlag.value = true
                clearInterval(timer)
            }
        }, 1000)
    },
)
watch(
    () => sceneFlag.value,
    (value: boolean) => {
        if (!value) {
            userStore.queryData()
        }
    },
)
onMounted(()=>{
    getQRCodeImageURL()
})
</script>

<style scoped lang="scss">
.content {
    .login {
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 2%;
        // overflow: auto;
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 20px 0;
        }
    }

    .advert {
        padding: 2%;
        text-align: center;

        .top {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .left {
                display: flex;
                flex-direction: column;
                align-items: center;

                .introduce {
                    text-align: center;
                    margin: 5px 0;
                }
            }
        }

        h2 {
            margin-top: 20px;
            font-size: 20px;
            font-weight: 600;
            color: #7f7f7f;
        }
    }
}</style>