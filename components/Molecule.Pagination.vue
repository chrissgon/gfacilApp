<template>
  <div class="MoleculePagination flex justify-between items-center">
    <span class="flex items-center">
      Exibindo
      <AtomFieldSelect
        v-model="perPage"
        @change.capture="resetPage"
        :options="perPageOptions"
        class="mx-2"
      />
      de {{ count }}
    </span>

    <div class="flex items-center select-none">
      <MoleculeButton
        @click="setPage(1)"
        :disabled="isFirstPage"
        icon="bi-arrow-bar-left"
        class="mr-1"
        outline
        primary
      />

      <template v-for="i in pages">
        <MoleculeButton
          v-if="isVisiblePage(i)"
          @click="setPage(i)"
          :label="`${i}`"
          :outline="i !== page"
          :filled="i === page"
          class="mx-1"
          primary
        />
      </template>

      <MoleculeButton
        @click="setPage(pages)"
        :disabled="isLastPage"
        icon="bi-arrow-bar-right"
        class="ml-1"
        outline
        primary
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number;
}

const props = defineProps<Props>();

// data
const page = ref<number>(parseInt(useRuntimeConfig().public.page));
const perPage = ref<number>(parseInt(useRuntimeConfig().public.perPage));
const perPageOptions = reactive<any[]>([
  { label: "5", value: "5", ...isPerPageSelected(5) },
  { label: "10", value: "10", ...isPerPageSelected(10) },
  { label: "25", value: "25", ...isPerPageSelected(25) },
  { label: "50", value: "50", ...isPerPageSelected(50) },
  { label: "100", value: "100", ...isPerPageSelected(100) },
]);

// computed
const pages = computed<number>(() => {
  return Math.ceil(props.count / perPage.value);
});
const isFirstPage = computed<boolean>(() => {
  return page.value === 1;
});
const isLastPage = computed<boolean>(() => {
  return page.value === pages.value;
});
const getPagination = computed<Pagination>(() => {
  return { page: page.value, perPage: parseInt(perPage.value.toString()) };
});

// methods
function isVisiblePage(i: number): boolean {
  if (isFirstPage.value || page.value === 2) {
    return [1, 2, 3].includes(i);
  }
  if (isLastPage.value || page.value === pages.value - 1) {
    return [pages.value - 2, pages.value - 1, pages.value].includes(i);
  }

  const range: number[] = [page.value - 1, page.value, page.value + 1];
  return range.includes(i);
}
function setPage(i: number): void {
  page.value = i;
  emit("change", getPagination.value);
}
function resetPage(): void {
  page.value = 1;
  emit("change", getPagination.value);
}
function isPerPageSelected(i: number): object {
  return { selected: i === perPage.value };
}

// emits
interface Pagination {
  page: number;
  perPage: number;
}
const emit = defineEmits<{
  (e: "change", pagination: Pagination): void;
}>();
</script>

<style lang="scss">
.MoleculePagination {
  select {
    max-height: 30px !important;
    min-height: 30px !important;
    padding: 0 20px 0 5px !important;
  }
  .MoleculeButton > button {
    max-width: 20px;
    max-height: 30px;
    font-size: 0.8rem;
  }
}
</style>
