<template>
  <tbody class="MoleculeTableBody">
    <AtomTableBodyRow
      v-for="(row, i) in rows"
      @triggeredInfo="triggeredInfo"
      :columns="columns"
      :row="row"
      :selectable="selectable"
      :class="{
        'bg-slate-100 dark:bg-slate-800': isStriped(i),
        'hover:bg-slate-200 hover:dark:bg-slate-700': hover,
        'border-b': !borderless,
      }"
      :selectByRow="selectByRow"
      :ref="getRefs"
    />
  </tbody>
</template>

<script setup lang="ts">
import AtomTableBodyRowVue from "./Atom.TableBodyRow.vue";

function getRefs(el: any) {
  if (el !== null) {
    els.value.push(el);
  }
}

// props
interface Props {
  columns: object;
  rows: any[];

  borderless?: boolean;
  hover?: boolean;
  selectable?: boolean;
  striped?: boolean;
  selectByRow?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  striped: false,
});

// computed
const selecteds = computed(() => {
  return els.value.filter((el) => el.selected).map((el) => el.props.row);
});

// data
const els = ref<InstanceType<typeof AtomTableBodyRowVue>[] | any[]>([]);

// methods
function selectAll() {
  for (const el of els.value) {
    el?.select();
  }
}
function deselectAll() {
  for (const el of els.value) {
    el?.deselect();
  }
}
function isStriped(i: number): boolean {
  return props.striped && i % 2 === 1;
}
function triggeredInfo(value: any): void {
  emit("triggeredInfo", value);
}

// watch
watch(props.rows, () => {
  els.value.length = 0;
});

// emits
const emit = defineEmits<{
  (e: "triggeredInfo", data: any): void;
}>();

// expose
defineExpose({ selectAll, deselectAll, selecteds });
</script>

<style scoped></style>
