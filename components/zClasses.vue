<template>
  <div :class="classes" class="hidden"></div>
</template>

<script setup lang="ts">
const classes = reactive([
  "!border-secondary-500",
  "!border-error-500",
  "!border-primary-500",
  "!border-success-500",
  "!border-warning-500",
  "!text-secondary-500",
  "!text-error-500",
  "!text-primary-500",
  "!text-success-500",
  "!text-warning-500",
  "!bg-secondary-500",
  "!bg-error-500",
  "!bg-primary-500",
  "!bg-success-500",
  "!bg-warning-500",

  "dark:!border-secondary-500",
  "dark:!border-error-500",
  "dark:!border-primary-500",
  "dark:!border-success-500",
  "dark:!border-warning-500",
  "dark:!text-secondary-500",
  "dark:!text-error-500",
  "dark:!text-primary-500",
  "dark:!text-success-500",
  "dark:!text-warning-500",
  "dark:!bg-secondary-500",
  "dark:!bg-error-500",
  "dark:!bg-primary-500",
  "dark:!bg-success-500",
  "dark:!bg-warning-500",

  "dark:!border-secondary-900",
  "dark:!border-error-900",
  "dark:!border-primary-900",
  "dark:!border-success-900",
  "dark:!border-warning-900",

  "top-0",
]);
</script>

<style scoped></style>
