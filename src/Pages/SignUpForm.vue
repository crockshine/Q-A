<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

import {useRouter} from "vue-router";
const router = useRouter();

import axios, {AxiosResponse} from 'axios'
import LoginWrapper from "./LoginWrapper.vue";



const inputCool = ref<boolean>(false)
const inputDataName = defineModel('inputDataName');
const inputDataPassword = defineModel('inputDataPassword');

const errorMsg = ref<string>('');

type userDataObj = {
  userName: string,
  userPass: string,
  isSignUp? : boolean,
  id?: number
}
const submitForm = async () => {
  const userData: userDataObj = {
    userName: inputDataName.value as string,
    userPass: inputDataPassword.value as string
  }
  try{
    const {data}:AxiosResponse<userDataObj[]> = await axios.get('https://9cf2a645b071fb84.mokky.dev/users?userName='+inputDataName.value)

    if(data.length !== 0 && data[0].userPass === inputDataPassword.value){
      document.cookie = `username=${userData.userName}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
      await router.push({name: 'Home' });
    }
    else errorMsg.value = 'Пользователя не найдено'

  }catch(err){
    console.log(err)
  }
}

watch([inputDataName, inputDataPassword],
    () => {
      inputCool.value = !!(inputDataName.value && inputDataPassword.value);
      errorMsg.value = '';
    })

onMounted(() => {
  if (document.cookie) router.push({name: 'Home'})
})
</script>

<template>

  <LoginWrapper @submitForm="submitForm" :inputCool="inputCool" sign-btn-text="Вход">
    <input v-model="inputDataName" placeholder="Имя" type="text" class="w-full h-16 text-center rounded-3xl">
    <input v-model="inputDataPassword" placeholder="Пароль" type="password" class="w-full h-16 text-center rounded-3xl">
    <span class="text-red-700 font-bold text-center">{{errorMsg}}</span>
  </LoginWrapper>

</template>

<style scoped>

</style>