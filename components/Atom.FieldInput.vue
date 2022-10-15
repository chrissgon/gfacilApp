<template>
  <div class="AtomInput relative flex items-center">
    <input
      v-maska="mask"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="classes"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="w-full border-2 pl-3 pr-9 py-2 rounded-md text-sm outline-none bg-transparent dark:border-slate-800"
    />
    <div class="absolute right-3 flex">
      <slot name="icon"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  classes?: string;
  disabled?: boolean;
  modelValue: any;
  placeholder?: string;
  type?: string;
  mask?: string;
}

defineProps<Props>();

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.dark input {
  color-scheme: dark;
}
</style>
