<template>
  <tr
    :class="{
      'cursor-pointer': selectable,
      'border-primary-500': selected,
    }"
    class="TableBodyRow border-transparent border-b-slate-200 dark:border-b-slate-800"
  >
    <td v-if="selectable" @click="selection" class="w-0 px-3">
      <i v-if="selected" class="bi bi-check-square-fill text-primary-600"></i>
      <i v-else class="bi bi-square text-primary-800"></i>
    </td>
    <td
      v-for="(_, column) in columns"
      v-text="row[column]"
      @click="triggeredInfo"
      class="p-3"
    ></td>
  </tr>
</template>

<script setup lang="ts">
interface Props {
  columns: object;
  row: any;

  selectable?: boolean;
  selectByRow?: boolean;
}

const props = defineProps<Props>();

// data
const selected = ref<boolean>(false);

// methods
function triggeredInfo(): void {
  emit("triggeredInfo", props.row);

  if (props.selectByRow) selection();
}
function selection(): void {
  if (!props.selectable) return;

  if (selected.value) return deselect();

  select();
}
function select(): void {
  selected.value = true;
}
function deselect(): void {
  selected.value = false;
}

// emits
const emit = defineEmits<{
  (e: "triggeredInfo", data: any): void;
}>();

// expose
defineExpose({ selected, props, select, deselect });
</script>

<style scoped>
tr {
  border-left-width: 3px;
}
</style>
