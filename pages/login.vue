<template>
  <section class="w-full overflow-auto">
    <MoleculeAlert />
    <TemplateLogin />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
