<template>
  <section
    :class="{
      '!w-0': hide,
      'min-h-screen max-h-screen overflow-y-scroll': side,
      'min-w-full': !side,
    }"
    class="AtomNav overflow-hidden ease-out duration-300 scrollbar"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
// props
interface Props {
  side?: boolean;
}

defineProps<Props>();

const hide = ref<boolean>(false);

function toggle() {
  hide.value = !hide.value;
}

defineExpose({ toggle });
</script>

<style scoped></style>
