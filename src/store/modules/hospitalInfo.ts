import { defineStore } from "pinia";
const useInfoStore = defineStore('info', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            hostype: '',
            districtCode: '',
        }
    },
})
export default useInfoStore