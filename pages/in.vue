<template>
  <div class="flex min-w-full max-h-screen overflow-hidden">
    <MoleculeAlert />
    <AtomNav
      side
      class="w-20 border-r-2 border-slate-100 dark:border-slate-800 dark:bg-slate-900"
    >
    </AtomNav>
    <div class="w-full max-h-screen overflow-auto scrollbar dark:bg-slate-900">
      <AtomNav class="h-16 border-b-2 border-slate-100 dark:border-slate-800">
      </AtomNav>

      <div class="p-5 dark:bg-slate-900">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
