import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDepartment } from '@/api/index';
import type { HospitalDetail, HospitalDepartmentResponseData, HospitalDepartmentArr } from "@/api/type";
const useDetailStore = defineStore('detail', {
    state: () => {
        return {
            HospitalDetailInfo: JSON.parse(sessionStorage.getItem('hospitalDetailInfo')) || <HospitalDetail>{},
            HospitalDepartment: JSON.parse(sessionStorage.getItem('hospitalDepartInfo')) || <HospitalDepartmentArr>[],
            depcode: JSON.parse(sessionStorage.getItem('depcode')) || ''
        }
    },
    actions: {
        async getDetailInfo() {
            let result = await reqHospitalDetail()
            if (result.code === 200 && result.ok === true) {
                sessionStorage.setItem('hospitalDetailInfo', JSON.stringify(result.data))
                this.HospitalDetailInfo = result.data
            }
        },
        async getDepartment() {
            let result: HospitalDepartmentResponseData = await reqHospitalDepartment()
            if (result.code === 200 && result.ok === true) {
                sessionStorage.setItem('hospitalDepartInfo', JSON.stringify(result.data))
                this.HospitalDepartment = result.data
            }
        },
        getdepcode(depcode: string) {
            this.depcode = depcode
        }
    },
    getters: {

    }
})

export default useDetailStore