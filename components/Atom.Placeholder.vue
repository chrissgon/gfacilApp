<template>
  <div class="AtomPlaceholder w-full block animate-pulse">
    <article v-if="beadcrumb">
      <p class="w-16 h-3 rounded-sm"></p>
      <p class="w-40 h-6 rounded-sm mt-2"></p>
    </article>

    <article v-if="table">
      <p
        v-for="i in 7"
        :class="{ 'bg-transparent': i % 2 === 0 }"
        class="w-full h-10 rounded-sm"
      ></p>

      <div class="flex justify-between mt-8">
        <p class="w-20 h-8 rounded-sm"></p>
        <div class="flex">
          <p v-for="_ in 3" class="w-8 h-8 ml-4 rounded-sm"></p>
        </div>
      </div>
    </article>

    <article v-if="form" class="flex flex-wrap">
      <template v-for="_ in 2">
        <div class="w-full mt-10">
          <p class="w-32 h-6 rounded-sm mb-4"></p>
        </div>
        <p v-for="_ in 3" class="w-20 h-10 rounded-sm m-2"></p>
        <p v-for="_ in 2" class="w-72 h-10 rounded-sm m-2"></p>
        <p v-for="_ in 5" class="w-32 h-10 rounded-sm m-2"></p>
        <p v-for="_ in 3" class="w-96 h-10 rounded-sm m-2"></p>
        <p v-for="_ in 2" class="w-16 h-10 rounded-sm m-2"></p>
        <p v-for="_ in 1" class="w-52 h-10 rounded-sm m-2"></p>
      </template>
    </article>
  </div>
</template>

<script setup lang="ts">
interface Props {
  table?: boolean;
  beadcrumb?: boolean;
  form?: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.AtomPlaceholder p {
  background-color: rgb(241 245 249 / 1) !important;
}
.dark .AtomPlaceholder p {
  background-color: rgb(30 41 59 / 1) !important;
}

.bg-transparent {
  background: transparent !important;
}
</style>
