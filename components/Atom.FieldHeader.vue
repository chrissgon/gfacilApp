<template>
  <header
    v-text="label"
    class="AtomFieldHeader text-xs font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden "
  ></header>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}
defineProps<Props>();
</script>

<style scoped></style>
