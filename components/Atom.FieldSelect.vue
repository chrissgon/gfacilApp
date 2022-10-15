<template>
  <div class="AtomSelect relative flex items-center">
    <select
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="classes"
      :disabled="disabled"
      :value="modelValue"
      class="w-full border-2 z-10 pl-3 pr-9 py-2 rounded-md text-sm outline-none bg-transparent dark:border-slate-800"
    >
      <option
        v-for="{ label, value, disabled, selected } in options"
        v-text="label"
        :disabled="disabled"
        :selected="selected"
        :value="value"
        class="dark:bg-slate-800"
      ></option>
    </select>
    <div class="absolute right-3 flex items-center">
      <slot name="icon"> </slot>
      <i
        class="bi bi-caret-down-fill text-xs text-slate-400 dark:text-slate-600 ml-2"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

interface Props {
  classes?: string;
  disabled?: boolean;
  modelValue: any;
  options: Option[];
}

defineProps<Props>();

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
select {
  appearance: none;
}
</style>
