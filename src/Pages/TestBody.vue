<script setup lang="ts">

import {computed, onMounted, ref} from "vue";

import {useUsersStore} from "../stores/UsersStore.ts";
import axios, {AxiosResponse} from "axios";
import {createLogger} from "vite";

const usersStore = useUsersStore();

// const userTests = computed(() => usersStore.userTests);
type userInfo = {
  userName: string,
  userPass: string,
  id: number,
  tests: userTest[]
}

type userTest = {
  title: string,
  questions:
      { question: string, answer: string }[]
}

const userTests = ref<userTest[]>([])
const isNetwork = ref<boolean>(true)
onMounted(async () => {
  try {
    const {data}: AxiosResponse<userInfo[]> = await axios.get(`https://9cf2a645b071fb84.mokky.dev/users?userName=${document.cookie.split('=')[1]}`)
    if(data[0]){
      userTests.value = data[0].tests
      usersStore.setUserId(data[0].id)
      usersStore.setUserName(data[0].userName)
      usersStore.setUserPass(data[0].userPass)
      localStorage.setItem('userTests', JSON.stringify(userTests.value))
    }else{
      userTests.value = []
    }
  } catch (err) {
    console.log(err);
    isNetwork.value = false
    const storage = localStorage.getItem('userTests');
    if (storage) userTests.value = JSON.parse(storage);
  }
})
const deleteTest = async (id: number) => {
  userTests.value = userTests.value.filter((_, index) => index !== id);
  await axios.patch(`https://9cf2a645b071fb84.mokky.dev/users/${usersStore.userId}`, {
    tests: [
      ...userTests.value
    ]

  })

  localStorage.setItem('userTests', JSON.stringify(userTests.value));
}
</script>

<template>
  <span v-if="!isNetwork">Проверьте подключение. Обновите страницу</span>
  <button :class="{'bg-slate-200 hover:bg-slate-200':!isNetwork}"
          class="bg-green-100 h-14 w-2/5 m-5 flex items-center justify-center hover:bg-green-200 transition relative">
    <router-link to="/create-test" v-if="isNetwork" class="w-full h-full absolute"/>
    Добавить
  </button>


  <div v-for="(test, index) in userTests" :key="index"
       class="test w-full h-16 bg-slate-100 border-2 rounded-full flex justify-between px-20  items-center">
    <div class="left flex gap-5">
      <span class="">{{ test.title }}</span>

      <span class="">Кол-во:{{ userTests[index].questions.length }} </span>
    </div>

    <div class="right flex gap-5 items-center">
      <router-link class="w-52 h-12 bg-green-100 hover:bg-green-200 flex items-center justify-center"
                   :to="{name: 'Game', params:{id: `${index}`}}">
        <button>Начать</button>
      </router-link>

      <router-link v-if="isNetwork" :to="{name: 'Edit-test', params:{id: `${index}`}}"><span class="">/</span>
      </router-link>
      <span v-if="isNetwork" @click="deleteTest(index)" class="">X</span>
    </div>

  </div>
</template>

<style scoped>

</style>