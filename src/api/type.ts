// 请求响应通用数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}
// 医院ts数据类型
export interface hospital {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        hostypeString: string,
        fullAddress: string
    }
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: string,
    route: string,
    status: number,
    bookingRule: any
}
// 医院数组类型
export type Content = hospital[];
// 接口返回医院数组的数据类型
export interface HospitalResponseData extends ResponseData {
    data: {
        content: Content,
        // 没啥用的数据不想搞了
        pageable: any,
        totalPages: number,
        totalElements: number,
        last: boolean,
        first: boolean,
        sort: any,
        numberOfElements: number,
        size: number,
        number: number,
        empty: boolean
    }
}
// 获取医院等级地区接口数据类型
export interface HospitalLevelAndRegion {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: object,
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean
}
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];

export interface HospitalLevelAndRegionResponseData extends ResponseData {
    data: HospitalLevelAndRegionArr
}
export interface HospitalInfo extends ResponseData {
    data: Content
}
export interface HospitalDetail {
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    },
    hospital: {
        id: string,
        createTime: string,
        updateTime: string,
        isDeleted: number,
        param: {
            hostypeString: string,
            fullAddress: string
        },
        hoscode: string,
        hosname: string,
        hostype: string,
        provinceCode: string,
        cityCode: string,
        districtCode: string,
        address: string,
        logoData: string
        intro: string
        route: string
        status: number,
        bookingRule: any
    }
}
export interface HospitalDetailResponseData extends ResponseData {
    data: HospitalDetail
}
export interface HospitalDepartment {
    depcode: string,
    depname: string,
    children?: HospitalDepartment[],
}
export type HospitalDepartmentArr = HospitalDepartment[]
export interface HospitalDepartmentResponseData extends ResponseData {
    data: HospitalDepartmentArr
}
// 登陆参数类型
export interface LoginData {
    phone: string,
    code: string
}
export interface UserLoginInfo {
    name: string,
    openid?: string,
    token: string
}

export interface UserLoginResponseData extends ResponseData {
    data: UserLoginInfo
}
// 微信三码登录需要的参数类型
export interface WxLogin {
    redirectUri: string,
    appid: string,
    scope: string,
    state: string
}
export interface WxLoginResponseData extends ResponseData {
    data: WxLogin
}
export interface bookingSchedule {
    workDate: string,
    workDateMd: string,
    dayOfWeek: string,
    docCount: number,
    reservedNumber: any,
    availableNumber: number,
    status: number
}
export interface HospitalSchedule {
    total: number,
    bookingScheduleList: bookingSchedule[],
    baseMap: {
        workDateString: string,
        releaseTime: string,
        bigname: string,
        stopTime: string,
        depname: string,
        hosname: string
    }
}
export interface HospitalScheduleResponseData extends ResponseData {
    data: {
        total: number,
        bookingScheduleList: bookingSchedule[],
        baseMap: {
            workDateString: string,
            releaseTime: string,
            bigname: string,
            stopTime: string,
            depname: string,
            hosname: string
        }
    },
}
export interface HospitalDoctorSchedule {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        dayOfWeek: string,
        depname: string,
        hosname: string
    },
    hoscode: string,
    depcode: string,
    title: string,
    docname: string,
    skill: string,
    workDate: string,
    workTime: number,
    reservedNumber: number,
    availableNumber: number,
    amount: number,
    status: number,
    hosScheduleId: string
}
export interface HospitalDoctorScheduleResponseData extends ResponseData {
    data: HospitalDoctorSchedule[]
}
// 就诊人信息
export interface Visitor {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        certificatesTypeString: string
        contactsCertificatesTypeString: string,
        cityString: string,
        fullAddress: string,
        districtString: string,
        provinceString: string
    },
    userId: number,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number,
    birthdate: string,
    phone: string,
    isMarry: number,
    provinceCode: null,
    cityCode: null,
    address: string,
    contactsName: string,
    contactsCertificatesType: string,
    contactsCertificatesNo: string,
    contactsPhone: string,
    isInsure: number,
    cardNo: null,
    status: string
}
export interface UserVisitorResponseData extends ResponseData {
    data: Visitor[]
}
export interface CreateOrderResponseData extends ResponseData {
    data: number
}
export interface OrderInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": null,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": null,
    "patientPhone": null,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}
export interface OrderInfoResponseData extends ResponseData {
    data: OrderInfo
}
export interface PaymentInfo {
    codeUrl: string,
    orderId: number,
    totalFee: number,
    resultCode: string
}
export interface PaymentInfoResponseData extends ResponseData {
    data: PaymentInfo
}
export interface PaymentStatusResponseData extends ResponseData {
    data: boolean
}
export interface UserInfo {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: any,
    openid: null,
    nickname: string,
    phone: string,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    certificatesUrl: null,
    authStatus: number,
    status: number
}
export interface UserInfoResponseData extends ResponseData {
    data: UserInfo
}
export interface CertificatesType {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": any,
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}
export interface CertificatesTypeResponseData extends ResponseData {
    data: CertificatesType[]
}
export interface UserParams {
    certificatesNo:string,
    certificatesType:string,
    certificatesUrl:string,
    name:string
}
export interface Order {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": null,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": null,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": null,
    "patientPhone": null,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}
export type Records = Order[]
export interface UserOrderInfoResponseData extends ResponseData {
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        order:any,
        hitCount:boolean,
        searchCount:boolean,
        page:number
    }
}
// 新增与修改就诊人ts类型
export interface AddOrUpdateVisitor {
    id?:string,
    name:string,
    certificatesType:string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string
}