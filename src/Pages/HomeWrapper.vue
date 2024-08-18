<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";

const route = useRoute()
const router = useRouter();

import {useUsersStore} from "../stores/UsersStore.ts";

const usersStore = useUsersStore();

import ModalWindow from "../components/UI/ModalWindow.vue";




onMounted(async () => {
  if (!document.cookie || document.cookie == '') {
    await router.push({name: 'Registration'})
  } else {
    await router.push({name: 'Tests'})
  }


})

</script>

<template>
  <div class="Window w-screen h-screen flex flex-col">

    <ModalWindow v-if="usersStore.modalWindow"/>

    <div class="w-full h-32 flex justify-end gap-10 pr-10 items-center  font-light opacity-50 text-2xl">
      <router-link to="/tests">
        <div :class="{'font-medium': route.name === 'Tests' }">Тесты</div>
      </router-link>

      <router-link to="/profile">
        <div :class="{'font-medium': route.name=== 'Profile' }">Профиль</div>
      </router-link>

      <router-link to="/about">
        <div :class="{'font-medium': route.name === 'About' }">О приложении</div>
      </router-link>
    </div>


    <div class="Main w-full h-full flex justify-center">
      <div class="wrapper w-3/4 shadow-2xl rounded-t-3xl pt-10 px-10 relative flex flex-col items-center ">

        <router-view/>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>