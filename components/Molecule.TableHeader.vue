<template>
  <thead class="MoleculeTableHeader bg-slate-100 dark:bg-slate-800">
    <tr
      :class="{ 'border-primary-500': selected }"
      class="border-transparent"
      align="left"
    >
      <th
        v-if="selectable"
        @click="verify"
        :class="{
          'cursor-pointer': selectable,
        }"
        class="w-0 px-3 border-transparent"
      >
        <i v-if="selected" class="bi bi-check-square-fill text-primary-600"></i>
        <i v-else class="bi bi-square text-primary-800"></i>
      </th>
      <AtomTableHeaderColumn
        v-for="(label, value) in columns"
        :label="label"
        :value="value"
        :orderable="orderable"
        ref="els"
      />
    </tr>
  </thead>
</template>

<script setup lang="ts">
import AtomTableHeaderColumnVue from "./Atom.TableHeaderColumn.vue";

interface Props {
  columns: object;

  orderable?: boolean;
  selectable?: boolean;
}

defineProps<Props>();

// computed
const ordination = computed(() => {
  const fields = [];
  const directions = [];

  for (const el of els.value) {
    if (el.dir !== "none") {
      fields.push(el.props.value);
      directions.push(el.dir);
    }
  }

  return { fields, directions };
});

// data
const els = ref<InstanceType<typeof AtomTableHeaderColumnVue>[] | []>([]);
const selected = ref<boolean>(false);

// methods
function verify(): void {
  if (selected.value) {
    emit("deselectAll");
    deselectAll()
    return 
  };

  emit("selectAll");
  selectAll();
}
function selectAll(): void {
  selected.value = true;
}
function deselectAll(): void {
  selected.value = false;
}

// emits
const emit = defineEmits<{
  (e: "selectAll"): void;
  (e: "deselectAll"): void;
}>();

// expose
defineExpose({ selectAll, deselectAll, ordination });
</script>

<style scoped>
tr {
  border-left-width: 3px;
}
</style>
