<template>
  <div class="OrganismTable overflow-hidden dark:text-slate-200">
    <article class="container-table overflow-x-scroll scrollbar">
      <table class="w-full">
        <MoleculeTableHeader
          @selectAll="selectAll"
          @deselectAll="deselectAll"
          :columns="columns"
          :orderable="orderable"
          :selectable="selectable"
          ref="header"
        />

        <MoleculeTableBody
          @triggeredInfo="triggeredInfo"
          :rows="filtered"
          :columns="columns"
          :borderless="borderless"
          :hover="hover"
          :selectable="selectable"
          :selectByRow="selectByRow"
          :striped="striped"
          ref="body"
        />
      </table>
    </article>

    <footer v-if="paginable">
      <MoleculePagination @change="paginate" :count="getCount" class="pt-5" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import MoleculeTableBodyVue from "./Molecule.TableBody.vue";
import MoleculeTableHeaderVue from "./Molecule.TableHeader.vue";
// props
interface Props {
  columns: object;
  rows: any[];
  count?: number;
  server?: boolean;

  orderable?: boolean;
  selectable?: boolean;
  paginable?: boolean;
  selectByRow?: boolean;

  borderless?: boolean;
  hover?: boolean;
  striped?: boolean;
}

const props = defineProps<Props>();

// computed
const filtered = computed<any[]>(() => {
  if (props.server) return props.rows;

  return props.rows.filter((_, i) => {
    const first = page.value * perPage.value - perPage.value;
    const last = page.value * perPage.value;
    return i >= first && i < last;
  });
});
const selecteds = computed<any[]>(() => {
  return body.value?.selecteds || [];
});

const getCount = computed<number>(() => {
  return !!props.count ? props.count : props.rows.length;
});
const ordination = computed(() => {
  return header.value?.ordination;
});
const allSelected = computed<boolean>(() => {
  return selecteds.value.length === props.rows.length;
});
const noneSelected = computed<boolean>(() => {
  return selecteds.value.length === 0;
});

// data
const header = ref<InstanceType<typeof MoleculeTableHeaderVue> | null>(null);
const body = ref<InstanceType<typeof MoleculeTableBodyVue> | null>(null);
const page = ref<number>(parseInt(useRuntimeConfig().public.page));
const perPage = ref<number>(parseInt(useRuntimeConfig().public.perPage));

// methods
function selectAll(): void {
  body.value?.selectAll();
}
function deselectAll(): void {
  body.value?.deselectAll();
}
function paginate(pagination: any) {
  page.value = pagination.page;
  perPage.value = pagination.perPage;

  deselectAll();
  emit("paginate", pagination);
}
function triggeredInfo(value: any): void {
  emit("triggeredInfo", value);
}

// watch
watch(
  () => selecteds.value,
  () => {
    if (allSelected.value) {
      header.value?.selectAll();
    }
    if (noneSelected.value) {
      header.value?.deselectAll();
    }
  }
);

// emits
const emit = defineEmits<{
  (e: "paginate", pagination: any): void;
  (e: "triggeredInfo", data: any): void;
}>();

// expose
defineExpose({
  ordination,
  selecteds,
  page,
  perPage,
  selectAll,
  deselectAll,
});
</script>

<style lang="scss" scoped>
.container-table {
  max-height: calc(100vh - 275px);
}
</style>
