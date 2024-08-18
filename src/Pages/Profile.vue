<script setup lang="ts">
import {useUsersStore} from "../stores/UsersStore.ts";
const usersStore = useUsersStore();
</script>

<template>


    <div class="TopBar p-8 pt-0 w-full text-xl flex flex-col gap-1.5 absolute top-0 rounded-b-2xl shadow-2xl" >
      <div class="flex justify-center font-bold py-3">Ваши данные</div>

      <div class="Name flex gap-4">
        <div class=" flex items-center ">Имя</div>
        <input type="text" class="border-2 rounded-2xl p-2" :value=usersStore.userName>

      </div>
      <div class="Pass flex flex-wrap gap-4 w-full">
        <div class="flex items-center ">Пароль</div>
        <button class="bg-slate-200 p-2 rounded-2xl " @click="usersStore.setModalWindow()">Изменить</button>
      </div>
    </div>
</template>

<style scoped>

</style>