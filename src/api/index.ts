import request from "@/utils/request";
import type { AddOrUpdateVisitor, UserOrderInfoResponseData, UserParams, CertificatesTypeResponseData, UserInfoResponseData, PaymentStatusResponseData, PaymentInfoResponseData, CreateOrderResponseData, UserVisitorResponseData, HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalInfo, HospitalDetailResponseData, HospitalDepartmentResponseData, LoginData, UserLoginResponseData, WxLoginResponseData, HospitalScheduleResponseData, HospitalDoctorScheduleResponseData } from '@/api/type'
enum API {
    HOSPITAL_URL = '/hosp/hospital/',
    // 获取医院等级地区
    HOSPITAL_LEVEL_URL = 'cmn/dict/findByDictCode/',
    HOSPITAL_REGION_URL = 'cmn/dict/findByParentId/',
    // 医院信息，部门，详情
    HOSPITAL_INFO_URL = 'hosp/hospital/findByHosname/',
    HOSPITAL_DETAIL_URL = 'hosp/hospital/',
    HOSPITAL_DEPARTMENT = 'hosp/hospital/department/',
    // 医院排班数据
    HOSPITAL_WORK_URL = 'hosp/hospital/auth/getBookingScheduleRule/',
    // 某天的排班挂号具体数据
    HOSPITAL_DOCTOR_URL = 'hosp/hospital/auth/findScheduleList/',
    HOSPITAL_DOCTOR_INFO = 'hosp/hospital/getSchedule/',
    // 短信验证码
    USER_PHONE_CODE = 'sms/send/',
    // 获取中国城市数据
    CASCADER_CITY = 'cmn/dict/findByParentId/',
    // 获取证件类型的接口地址
    CERTOIFICATION_TYPE = 'cmn/dict/findByDictCode/',
    // 账号实名制接口
    USER_AUTHENTICATION = 'user/auth/userAuah',
    USER_LOGIN_URL = 'user/login/',
    USER_VISITOR_URL = 'user/patient/auth/findAll',
    USER_INFO_URL = 'user/auth/getUserInfo',
    // 新增就诊人
    ADD_VISITOR = 'user/patient/auth/save',
    // 修改就诊人
    UPDATE_VISITOR = 'user/patient/auth/update',
    // 删除就诊人
    REMOVE_VISITOR = 'user/patient/auth/remove/',
    // 微信扫码登录需要的参数
    WX_LOGIN_ERL = 'user/weixin/getLoginParam/',
    // 创建订单
    CREATE_ORDER = 'order/orderInfo/auth/submitOrder/',
    ACCESS_ORDER = 'order/orderInfo/auth/getOrderInfo/',
    CANCEL_ORDER = 'order/orderInfo/auth/cancelOrder/',
    QRCODE_ORDER = 'order/weixin/createNative/',
    PAYMENT_RESULT = 'order/weixin/queryPayStatus/',
    // 获取全部订单
    USER_ALL_ORDER = 'order/orderInfo/auth/',
    // 订单状态
    ORDER_STATUS = 'order/orderInfo/auth/getStatusList/',



}
export const reqHospital = (page: number, limit: number, hostype = '', districtCode = '') => {
    return request<any, HospitalResponseData>({
        method: 'GET',
        url: API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
    })
}
export const reqHospitalLevelAndRegion = (dictCode: string) => {
    return request<any, HospitalLevelAndRegionResponseData>({
        method: 'GET',
        url: API.HOSPITAL_LEVEL_URL + dictCode
    })
}
export const reqHospitalInfo = (hosname: string) => {
    return request<any, HospitalInfo>({
        method: 'GET',
        url: API.HOSPITAL_INFO_URL + hosname
    })
}

export const reqHospitalAddress = (parentId: number) => {
    return request<any, any>({
        method: 'GET',
        url: API.HOSPITAL_REGION_URL + parentId
    })
}
export const reqHospitalDetail = () => {
    return request<any, HospitalDetailResponseData>({
        method: 'GET',
        url: API.HOSPITAL_DETAIL_URL + JSON.parse(sessionStorage.getItem('hoscode'))
    })
}
export const reqHospitalDepartment = () => {
    return request<any, HospitalDepartmentResponseData>({
        method: 'GET',
        url: API.HOSPITAL_DEPARTMENT + JSON.parse(sessionStorage.getItem('hoscode'))
    })
}
export const reqVerificationCode = (phoneNumber: string) => {
    return request<any, any>({
        method: 'GET',
        url: API.USER_PHONE_CODE + phoneNumber
    })
}
export const reqUserLogin = (data: LoginData) => {
    return request<any, UserLoginResponseData>({
        method: 'POST',
        url: API.USER_LOGIN_URL,
        data: data
    })
}
export const reqWxLogin = (wxRedirectUri: string) => {
    return request.get<any, WxLoginResponseData>(API.WX_LOGIN_ERL + `?wxRedirectUri=${wxRedirectUri}`)
}
export const reqHospitalSchedulingInfo = (page: number, limit: number, hoscode: string, depcode: string) => {
    return request.get<any, HospitalScheduleResponseData>(API.HOSPITAL_WORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)
}
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => {
    return request.get<any, HospitalDoctorScheduleResponseData>(API.HOSPITAL_DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
}
export const reqUserVisitor = () => {
    return request.get<any, UserVisitorResponseData>(API.USER_VISITOR_URL)
}
export const reqDoctorInfo = (scheduleID: string) => {
    return request.get<any, any>(API.HOSPITAL_DOCTOR_INFO + `${scheduleID}`)
}
export const reqCreateOrder = (hosname: string, scheduleID: string, patientID: number) => {
    return request<any, CreateOrderResponseData>({
        method: "POST",
        url: API.CREATE_ORDER + `${hosname}/${scheduleID}/${patientID}`
    })
}
export const reqOrderInfo = (orderID: string) => request.get<any, any>(API.ACCESS_ORDER + orderID)
export const reqCancelOrder = (orderID: string) => request.get<any, any>(API.CANCEL_ORDER + orderID)
export const reqQRcode = (orderID: string) => request.get<any, PaymentInfoResponseData>(API.QRCODE_ORDER + orderID)
export const reqPaymentStatus = (orderID: string) => request.get<any, PaymentStatusResponseData>(API.PAYMENT_RESULT + orderID)
export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USER_INFO_URL)
export const reqCertificationType = (distCode: string = 'CertificatesType') => request.get<any, CertificatesTypeResponseData>(API.CERTOIFICATION_TYPE + distCode)
export const reqUserAuthentication = (data: UserParams) => request.post<any, any>(API.USER_AUTHENTICATION, data)
export const reqUserAllOrder = (page: number, limit: number, patientID: string, status: string) => {
    return request<any, UserOrderInfoResponseData>({
        method: "GET",
        url: API.USER_ALL_ORDER + `${page}/${limit}?patientId=${patientID}&orderStatus=${status}`
    })
}
export const reqOrderStatusList = () => request.get(API.ORDER_STATUS)
export const reqCascaderCity = (parentId:string) => request.get(API.CASCADER_CITY+parentId)
// 新增和删除就诊人接口
export const reqAddOrUpdateVisitor = (data: AddOrUpdateVisitor) =>{
    if(data.id){
        return request.put(API.UPDATE_VISITOR,data)
    }else{
        return request.post(API.ADD_VISITOR, data)
    }
}
export const reqRemoveVisitor = (patientId:string) => request.delete(API.REMOVE_VISITOR+patientId)