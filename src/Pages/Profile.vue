<script setup lang="ts">
import {useUsersStore} from "../stores/UsersStore.ts";
import {onMounted, ref, watch} from "vue";
const usersStore = useUsersStore();

const dataInStore = defineModel()
onMounted(()=>{
  dataInStore.value = usersStore.userName
})

const disableBtn = ref<boolean>(false)
watch(dataInStore,()=>{

  disableBtn.value = dataInStore.value === usersStore.userName || dataInStore.value === '';
})

const changeData = async () => {

}
</script>

<template>


    <div class="TopBar p-8 pt-0 w-full text-xl flex flex-col items-center gap-1.5 absolute top-0 rounded-b-2xl shadow-2xl" >
      <div class="flex justify-center font-bold py-3">Ваши данные</div>

      <div class="Name flex gap-4 w-full">
        <div class=" flex items-center ">Имя</div>
        <input type="text" class="border-2 rounded-2xl p-2" v-model="dataInStore" >

      </div>
      <div class="Pass flex  gap-4 w-full mb-10">
        <div class="flex items-center ">Пароль</div>
        <button class="bg-slate-200 p-2 rounded-2xl " @click="usersStore.setModalWindow()">Изменить</button>
      </div>
      <MyBlackButton
          :class="{ 'opacity-20': disableBtn}"
          :disabled="disableBtn"
          @click="changeData">
        Сохранить
      </MyBlackButton>
    </div>
</template>

<style scoped>

</style>