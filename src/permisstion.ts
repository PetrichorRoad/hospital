// 路由鉴定权限
import router from "./router";

// 进度条
import useUserStore from "./store/modules/user";
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// 加载旋转小圆圈效果不要
Nprogress.configure({showSpinner:false})
// 配置前端鉴权路由
// 未登录用户可访问路由白名单
let whiteList = [
    '/home','/wxlogin', '/', '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'
]
let userStore: any = null
// 添加相应的全局守卫
router.beforeEach((to,_from,next)=>{
    Nprogress.start()
    document.title=`医仁 - ${to.meta.title}`
    if(localStorage.getItem('userinfo')){
        // 用户已登录任何界面都可访问
        next()
    }else{
        if(whiteList.includes(to.path)){
            next()
        }else{
            if (userStore === null){
                userStore = useUserStore()
            }
            userStore.visible = true;
            next({path:'/home',query:{redirect:to.fullPath}})
        }
    }
})

router.afterEach(()=>{
    Nprogress.done()
})