<script setup lang="ts">
  import {useUsersStore} from "../../stores/UsersStore.ts";
  const usersStore = useUsersStore()


</script>

<template>
  <div class="wrapper w-screen h-screen absolute  flex items-center justify-center ">

    <div class="absolute bg-black opacity-50 w-full h-full  z-10 "  @click="usersStore.setModalWindow()"></div>
    <div class="whiteForm absolute w-1/2 h-1/2 bg-white z-20 rounded-2xl flex flex-col items-center p-4 gap-2">

      <span class="text-center font-bold text-2xl">Изменение пароля</span>

      <div class="InputBlock flex flex-col gap-2 h-full w-full pt-10">
        <input class="border-2 rounded-2xl p-2" placeholder="Введите текущий пароль">
        <input class="border-2 rounded-2xl p-2" placeholder="Введите новый пароль">
        <input class="border-2 rounded-2xl p-2" placeholder="Повторите новый пароль">
      </div>

      <MyBlackButton >
        Сохранить
      </MyBlackButton>
    </div>
  </div>
</template>

<style scoped>

</style>