import { defineStore } from "pinia";
import { reqUserLogin } from '@/api/index';
import { ElMessage } from 'element-plus';
import type { LoginData, UserLoginResponseData, UserLoginInfo} from "@/api/type";
const useUserStore = defineStore('user', {
    state: () => {
        return {
            visible: false,
            userInfo: JSON.parse(localStorage.getItem('userinfo')) || <UserLoginInfo>{}
        }
    },
    actions: {
        async userLogin(loginData: LoginData) {
            let result: UserLoginResponseData = await reqUserLogin(loginData)
            if (result.code === 200 && result.ok === true) {
                localStorage.setItem('userinfo', JSON.stringify(result.data))
                this.userInfo = result.data
                this.visible = false
                ElMessage({ type: 'success', message: `欢迎回来${this.userInfo.name}`})
            }//后端没有验证，压根不存在登陆失败
        },
        userLogout(){
            localStorage.removeItem('userinfo')
            this.userInfo = {name:'',token:''}
        },
        queryData(){
            // 开启定时器轮询访问是否有本地用户信息
            let timer = setInterval(()=>{
                // 本地有数据，扫码成功
                if(localStorage.getItem('userinfo')){
                    // 关闭对话框
                    this.visible=false
                    this.userInfo = JSON.parse(localStorage.getItem('userinfo'))
                    clearInterval(timer)
                }
            },1000)
        }
    }
})
export default useUserStore