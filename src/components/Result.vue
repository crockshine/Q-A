<script setup lang="ts">
import {useUsersStore} from "../stores/UsersStore.ts";
import {useRouter} from "vue-router";
const router = useRouter()
const usersStore = useUsersStore();

const routerPushAndClearData = () => {
  usersStore.result = 0;
  router.push('/')
}
</script>

<template>
<div class="wrapper w-full h-full flex flex-col justify-center items-center pb-32">
  <div class="result text-9xl font-bold text-slate-800">{{Math.round(usersStore.result)}} %</div>
  <span class="mt-8 text-3xl font-bold text-slate-800">Ваш результат</span>
  <div @click="routerPushAndClearData" class="w-1/3 h-20 flex items-center justify-center bg-slate-300 rounded-2xl mt-10
                                              hover:bg-slate-400 hover:cursor-pointer">На главную</div>
</div>
</template>

<style scoped>

</style>