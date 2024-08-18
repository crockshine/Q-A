import {defineStore} from "pinia";
import {ref} from "vue";

export const useUsersStore = defineStore('usersStore', () => {
    const userId = ref<number>(0)
    const setUserId = (usId:number) => {
        userId.value = usId
    }
///////////////////////////////////////////////////
    const userName = ref<string>('')
    const setUserName = (usName:string)=>{
        userName.value = usName
    }
///////////////////////////////////////////////////
    const userPass=ref<string>('')
    const setUserPass = (usPass:string)=>{
        userPass.value = usPass
    }
///////////////////////////////////////////////////

    const result = ref<number>(0)
    const setResult = (increment:number) =>{
        result.value += increment
    }
///////////////////////////////////////////////////
    const modalWindow = ref<boolean>(false)
    const setModalWindow = () => {modalWindow.value = !modalWindow.value}

    return {
        userId, setUserId,
        userName, setUserName,
        userPass,setUserPass,
        result, setResult,
        modalWindow, setModalWindow
    }
})