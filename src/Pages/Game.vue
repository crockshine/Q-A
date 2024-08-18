<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useUsersStore} from "../stores/UsersStore.ts";
const usersStore = useUsersStore();

const route = useRoute()
const router = useRouter()
const routeId = ref<number>(parseInt(<string>route.params.id));

const questionAndAnswer = ref<{ question: string, answer: string }[]>([])
const answers = ref<string[]>([])

const countOfQuestion = ref<number>(0)

onMounted(() => {
  const storage = localStorage.getItem('userTests');
  if (storage) {
    questionAndAnswer.value = JSON.parse(storage)[routeId.value].questions;
  }
  createArrAns()
})

const createArrAns = () => {
  answers.value = [
    ...questionAndAnswer.value.filter(item => item.answer !== questionAndAnswer.value[countOfQuestion.value].answer).map(item => item.answer)
  ];
  shuffleAnswers()
}

const shuffleAnswers = () => {
  if (answers.value.length <= 5) answers.value.push(questionAndAnswer.value[countOfQuestion.value].answer)

  for (let i = answers.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers.value[i], answers.value[j]] = [answers.value[j], answers.value[i]];
  }
  if (answers.value.length > 5) {
    answers.value = answers.value.slice(0, 5);
    answers.value[Math.floor(Math.random() * 5)] = questionAndAnswer.value[countOfQuestion.value].answer;
  }

}

const correctly = ref<boolean>()
const clickedIndex = ref<number>()

let incrementOneQuestion:number = 0;
const checkAns = (item: string, index:number) => {
  if (questionAndAnswer.value[countOfQuestion.value].answer === item) {
    incrementOneQuestion = 100 / questionAndAnswer.value.length
    correctly.value = true;
    usersStore.setResult(incrementOneQuestion)
  } else {
    correctly.value = false;
  }
  clickedIndex.value = index;
}

const nextQuestion = () => {

  correctly.value = undefined;
  clickedIndex.value = undefined;
  countOfQuestion.value++;

  if (questionAndAnswer.value.length > countOfQuestion.value) {
    createArrAns()
  } else {
    router.push({name: 'Result'})
  }
}
</script>

<template>
  <div class="window flex flex-col items-center w-full h-full">
    <div :class="{'bg-green-300': correctly, 'bg-red-300': correctly === false}" class="head w-full h-1/6 mb-3 flex items-center justify-center">
      <div class="text-2xl text-slate-600 font-bold">{{ questionAndAnswer[countOfQuestion]?.question }}</div>
    </div>
    <div class="bottom flex-1 w-full flex flex-col items-center">
      <div v-for="(item, index) in answers" :key="index" :id="index.toString()"
           :class="{'opacity-50': correctly !== undefined && index !== clickedIndex}"
           class="w-full h-14 bg-slate-100 border-2 rounded-full px-20 mb-1 flex items-center justify-center ">
        <button  @click="checkAns(item,index)" class="h-full w-full" :disabled="correctly !== undefined">{{item}}</button>
      </div>
      <button v-if="correctly !== undefined" @click="nextQuestion()" class="w-1/3 h-14 mt-10 bg-slate-200">далее</button>

    </div>
  </div>
</template>

<style scoped>

</style>