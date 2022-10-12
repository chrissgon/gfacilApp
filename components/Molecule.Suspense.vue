<template>
  <Suspense>
    <slot></slot>

    <template #fallback>
      <AtomPlaceholder :table="table" :beadcrumb="beadcrumb" :form="form" />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
interface Props {
  table?: boolean;
  beadcrumb?: boolean;
  form?: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
