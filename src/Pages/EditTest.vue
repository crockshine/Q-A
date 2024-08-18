<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {useRoute , useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const routeId = ref<number>( parseInt(<string>route.params.id));

type userTest = {
  title: string,
  questions:
      {question: string, answer: string}[]
}

const pushQuestion = () => {
  allDataFromLS.value[routeId.value].questions.push({question:'',answer:''})
}
const addNewTest = async () => {
  allDataFromLS.value[routeId.value].questions = allDataFromLS.value[routeId.value].questions.filter(item => {
    if(item.question && item.answer)return item
    if (!item.question && !item.answer)return undefined
  })

  localStorage.setItem('userTests', JSON.stringify(allDataFromLS.value))

  await axios.patch('https://9cf2a645b071fb84.mokky.dev/users/1',{
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
  allDataFromLS.value[routeId.value].questions = allDataFromLS.value[routeId.value].questions.filter(((_,index) => index !== id))
}
</script>

<template>
  <div    class="window w-full h-full">
    <input :value="allDataFromLS[routeId]?.title || ''" type="text" placeholder="Название теста" class="w-full h-14 border-2 pl-5" >


    <div v-if="allDataFromLS[routeId]" v-for="(item, index) in allDataFromLS[routeId].questions" :key="index" class="key-value flex gap-1.5">
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