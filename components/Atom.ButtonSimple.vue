<template>
  <button
    @click.prevent="event"
    :disabled="isDisabled"
    :class="[getClasses.text, { disabled: isDisabled }]"
    class="AtomButtonSimple w-full flex justify-center items-center font-medium px-4 rounded-md border-2 border-transparent h-10 leading-none transparent"
  >
    <AtomSpin v-if="loading" :color="getClasses.text" />
    <template v-else>
      <span v-text="label"></span>
      <span v-if="!!label && !!icon" class="mx-1"></span>
      <span :class="icon" class="bi text-lg leading-none"></span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { getClassesFromColors } from "./types/State";

interface Props {
  action?: () => Promise<void>;

  type?: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  action: async () => {},
});

// computed
const getClasses = computed(() => {
  return getClassesFromColors(props.type);
});
const isDisabled = computed<boolean>(() => {
  return loading.value || !!props.disabled;
});

// data
const loading = ref<boolean>(false);

// methods
async function event() {
  loading.value = true;
  await props.action();
  loading.value = false;
}
</script>

<style scoped></style>
