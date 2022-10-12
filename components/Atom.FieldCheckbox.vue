<template>
  <label :for="ID">
    <input
      v-model="checked"
      type="checkbox"
      :id="ID"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  checked?: boolean;
}

defineProps<Props>();

const ID = ref(Math.random().toString());
</script>

<style scoped></style>
