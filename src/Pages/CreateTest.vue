<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios'

import {useRouter} from "vue-router";
const router = useRouter();

import {useUsersStore} from "../stores/UsersStore.ts";
const useStore = useUsersStore()

type userTest = {
  title: string,
  questions:
      {question: string, answer: string}[]
}

const inputTitle = defineModel('inputTitle');
type inputQuestion = {
  question:string,
  answer: string
}
const inputQuestions = ref<inputQuestion[]>([])

const pushQuestion = () => {
  inputQuestions.value.push({question:'',answer:''})
}
const addNewTest = async () => {
   inputQuestions.value = inputQuestions.value.filter(item => {
      if(item.question && item.answer)return item
      if (!item.question && !item.answer)return undefined
    })

    allDataFromLS.value.push({title:inputTitle.value as string, questions:inputQuestions.value})
    localStorage.setItem('userTests', JSON.stringify(allDataFromLS.value))

  console.log(useStore.userId);
  await axios.patch(`https://9cf2a645b071fb84.mokky.dev/users/${useStore.userId}`,{
      tests:[ ...allDataFromLS.value ]
    })

   await router.push({name:'Tests'})
}
const allDataFromLS = ref<userTest[]>([])
onMounted(()=>{
  const storedData = localStorage.getItem('userTests');
  allDataFromLS.value =  storedData ? JSON.parse(storedData) : [];
})
const deleteItem = (id:number) => {
  inputQuestions.value = inputQuestions.value.filter(((_,index) => index !== id))
}
</script>

<template>
<div    class="window w-full h-full">
  <input v-model="inputTitle" type="text" placeholder="Название теста" class="w-full h-14 border-2 pl-5" >


  <div v-for="(item, index) in inputQuestions" :key="index" class="key-value flex gap-1.5">
    <input v-model="item.question" placeholder="Термин"  class="w-1/6 h-14 border-2 pl-5" >
    <input v-model="item.answer" placeholder="Определение" class="w-full h-14 border-2 pl-5" >
    <div @click="deleteItem(index)" class="delete w-14 h-14 border-2 flex items-center justify-center">Х</div>

  </div>

  <div class="buttons flex justify-between">
    <button @click="pushQuestion" class="h-14 w-1/6 bg-slate-100 hover:bg-slate-200 transition">Добавить поле</button>
    <button @click="addNewTest" class="h-14 w-1/6 bg-green-100 hover:bg-green-200 transition">Сохранить</button>

  </div>
<span></span>
</div>
</template>

<style scoped>

</style>