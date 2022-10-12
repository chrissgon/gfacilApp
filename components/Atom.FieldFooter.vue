<template>
  <footer
    v-text="message"
    class="AtomFieldFooter text-xs font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden "
  ></footer>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}
defineProps<Props>();
</script>

<style scoped></style>
