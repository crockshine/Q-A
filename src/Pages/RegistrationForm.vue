<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

import axios, {AxiosResponse} from 'axios'
import LoginWrapper from "./LoginWrapper.vue";

const inputCool = ref<boolean>(false)
const inputDataName = defineModel('inputDataName');
const inputDataPassword = defineModel('inputDataPassword');
const inputDataPasswordSecond = defineModel('inputDataPasswordSecond');


const errorMsg = ref<string>('');
const checkForm = () => {
  if (inputDataName.value  && inputDataPassword.value  && inputDataPasswordSecond.value ) {
    if(inputDataPassword.value.toString().length >= 5) {
      inputCool.value = true;
      errorMsg.value = '';
    }
    else {
      inputCool.value = false;
      errorMsg.value = 'Пароль должен содержать 5 и более символов'
    }
  }
  else inputCool.value = false
}

const checkPassword = () => {
  if (inputDataPassword.value != inputDataPasswordSecond.value && inputDataPasswordSecond.value && inputDataName.value){
    errorMsg.value = 'Пароли должны совпадать';
    inputCool.value = false
  }else{
    errorMsg.value = '';
    checkForm();
  }
}

watch([inputDataName,inputDataPassword], checkForm)
watch([inputDataPasswordSecond,inputDataPassword], checkPassword)

type userDataObj = {
  userName: string,
  userPass: string,
}

const submitForm = async () => {

 try {
      const {data}:AxiosResponse<userDataObj[]> = await axios.get('https://9cf2a645b071fb84.mokky.dev/users');
      console.log(data)
      if(data.find(el => el.userName === inputDataName.value)){
        errorMsg.value='Имя пользователя занято'
        inputCool.value = false;
      }else {
        await axios.post('https://9cf2a645b071fb84.mokky.dev/users',
            {
              userName:inputDataName.value,
              userPass:inputDataPassword.value
            });

        document.cookie = `username=${inputDataName.value}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
        await router.push({name: 'Home' });
      }
 }catch (err){
   console.log(err)
 }
}
onMounted(() => {
  if (document.cookie) router.push({name: 'Home'})
})

</script>
<template>

<LoginWrapper :input-cool="inputCool" @submit-form="submitForm" sign-btn-text="Зарегистрироваться">
    <input v-model="inputDataName" placeholder="Имя" type="text" class="w-full h-16 text-center rounded-3xl">
    <input v-model="inputDataPassword" placeholder="Пароль" type="password" class="w-full h-16 text-center rounded-3xl">
    <input v-model="inputDataPasswordSecond" placeholder="Пароль" type="password" class="w-full h-16 text-center rounded-3xl">

    <span class="text-red-700 font-bold">{{errorMsg}}</span>
</LoginWrapper>

</template>

<style scoped>

</style>