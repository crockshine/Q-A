<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute();


type Props = {
  inputCool:boolean,
  signBtnText:string
}

type Emit = {
  (eventName: 'submitForm'):void
}

defineEmits<Emit>()
const props = defineProps<Props>()
</script>

<template>
  <div class="window w-screen h-screen flex justify-center items-center">
    <div class="Form w-2/5 h-2/3 rounded-2xl shadow-2xl bg-slate-200 flex flex-col items-center justify-center px-10 gap-5 relative">
      <div class="absolute flex justify-center items-center top-0 w-full h-20 ">

        <router-link to="/signup"
                     class="Top-menu  font-bold text-slate-500  w-full px-12 h-full  flex justify-center items-center rounded-tl-2xl "
                     :class="{Gradient: route.name !== 'SignUp', 'flex-1': route.name !== 'SignUp', 'text-2xl cursor-default': route.name === 'SignUp' }">
          <span>Вход</span>
        </router-link>


        <router-link to="/registration"
                     class="font-bold   text-slate-500 w-full px-2  h-full  flex justify-center items-center rounded-tr-2xl"
                     :class="{ Gradient: route.name !== 'Registration', 'flex-1': route.name !== 'Registration', 'text-2xl cursor-default':route.name === 'Registration'}"
                     >
          <span>Регистрация</span>
        </router-link>
      </div>


      <div class="center flex flex-col gap-3">

        <slot></slot>

      </div>

      <MyBlackButton
               @click="$emit('submitForm')"
               :class="{ 'bg-green-500': props.inputCool}"
               :disabled="!inputCool"
      >
          {{ props.inputCool ? props.signBtnText : 'Введите данные' }}
      </MyBlackButton>

    </div>
  </div>

</template>

<style scoped>
.Gradient{
  background: rgb(255,255,255);
  background: linear-gradient(360deg, rgba(255,255,255,0) 0%, rgb(170, 175, 181) 100%);
}
</style>