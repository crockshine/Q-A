<script setup lang="ts">
import {defineComponent} from "vue";
defineComponent({
  name:'MyBlackButton'
})

</script>

<template>
  <button  class="w-2/5 h-16 bottom-0 rounded-t-2xl bg-black absolute font-bold text-white">
    <slot/>
  </button>
</template>

<style scoped>

</style>