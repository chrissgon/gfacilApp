<template>
  <th
    @click="sort"
    :class="{ 'cursor-pointer': orderable }"
    class="TableHeaderColumn p-3"
  >
    {{ label }}
    <span v-if="orderable">
      <i
        v-if="isAsc"
        class="bi bi-sort-alpha-down text-lg text-primary-700"
      ></i>
      <i v-if="isDesc" class="bi bi-sort-alpha-up text-lg text-error-700"></i>
    </span>
  </th>
</template>

<script setup lang="ts">
interface Props {
  value: string;
  label: string;
  orderable?: boolean;
}

const props = defineProps<Props>();

// computed
const isAsc = computed<boolean>(() => {
  return dir.value == DirectionTypesEnum.asc;
});
const isDesc = computed<boolean>(() => {
  return dir.value == DirectionTypesEnum.desc;
});
const isNone = computed<boolean>(() => {
  return dir.value == DirectionTypesEnum.none;
});

// data
enum DirectionTypesEnum {
  none = "none",
  asc = "asc",
  desc = "desc",
}
const dir = ref<DirectionTypesEnum>(DirectionTypesEnum.none);

// methods
function sort(): void {
  if (!props.orderable) return;

  if (isNone.value) {
    dir.value = DirectionTypesEnum.asc;
    return;
  }
  if (isAsc.value) {
    dir.value = DirectionTypesEnum.desc;
    return;
  }

  dir.value = DirectionTypesEnum.none;
}

// expose
defineExpose({ props, dir });
</script>

<style scoped>
.TableHeaderColumn i {
  line-height: 0 !important;
}
</style>
