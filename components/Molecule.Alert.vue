<template>
  <div class="MoleculeAlert">
    <AtomToast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import AtomToastVue from "./Atom.Toast.vue";

const { set } = useAlertStore();

const toast = ref<InstanceType<typeof AtomToastVue> | null>(null);

watch(
  () => toast.value,
  () => {
    set(toast.value);
  }
);
</script>

<style scoped></style>
