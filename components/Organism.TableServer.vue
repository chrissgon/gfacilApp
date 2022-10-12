<template>
  <div
    class="OrganismTableServer flex flex-col justify-center items-center relative"
  >
    <AtomPlaceholder v-if="disabled" table />

    <AtomFieldInput
      v-if="!disabled"
      v-model="search"
      placeholder="Pesquise"
      class="w-full mb-4 md:mb-0 md:w-auto md:!absolute md:top-0 md:right-0 md:-translate-y-14"
      @blur.capture="load"
    />
    <OrganismTable
      v-show="!disabled"
      @triggeredInfo="triggeredInfo"
      @paginate="pagination"
      :rows="rows"
      :columns="columns"
      :count="count"
      :class="{ disabled: disabled }"
      class="w-full"
      selectable
      orderable
      hover
      striped
      paginable
      server
      ref="table"
    />
  </div>
</template>

<script setup lang="ts">
import OrganismTableVue from "./Organism.Table.vue";

// props
interface Props {
  request(params: object): Promise<any>;

  columns: object;
  borderless?: boolean;
  hover?: boolean;
  striped?: boolean;
}

const props = defineProps<Props>();

// computed
const selecteds = computed<any[]>(() => table.value?.selecteds || []);
const ordination = computed(() => {
  return table.value?.ordination;
});
const page = computed<number>(() => {
  return table.value?.page || 0;
});
const perPage = computed<number>(() => {
  return table.value?.perPage || 0;
});

// data
const { show } = useAlertStore();

const table = ref<InstanceType<typeof OrganismTableVue> | null>(null);
const disabled = ref<boolean>(true);
const rows = reactive<any[]>([]);
const count = ref<number>(0);
const search = ref<string>("");

// methods
async function load(): Promise<void> {
  try {
    disable();
    reset();
    const { res, count: cnt } = await props.request({
      dateEnd: "2023-06-20 23:59:59",
      dateStart: "2021-06-20 00:00:00",
      page: page.value,
      perPage: perPage.value,
      sortFields: [...(ordination.value?.fields || [])],
      sortDirections: [...(ordination.value?.directions || [])],
      search: search.value,
    });

    table.value?.deselectAll();

    count.value = cnt;

    if (res !== null) {
      rows.push(...res);
    }

    enable();
  } catch (e) {
    const err = e as Error;
    show("ERROR: GetCollaborators", err.message, true);
  }
}
function reset(): void {
  rows.length = 0;
}
function enable(): void {
  disabled.value = false;
}
function disable(): void {
  disabled.value = true;
}
function triggeredInfo(data: any): void {
  emit("triggeredInfo", data);
}
function pagination(): void {
  load();
}

// watch
watch(
  () => ordination.value,
  () => {
    load();
  }
);

// emits
const emit = defineEmits<{
  (e: "triggeredInfo", data: any): void;
}>();

// expose
defineExpose({ selecteds, load });
</script>

<style scoped>
/* @media (min-width: 768px){
  .search {
    position: absolute !important;
  }

} */
</style>
