<template>
  <section
    v-if="isVisible"
    class="OrganismModal w-full h-screen flex justify-center items-center absolute p-5 left-0 top-0 z-20"
  >
    <div
      :class="{
        'w-xl': xl,
        'w-lg': lg,
        'w-md': md,
        'w-sm': sm,
      }"
      class="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800"
    >
      <!-- OrganismModalBody -->
      <article class="p-5 overflow-y-auto overflow-x-hidden scrollbar">
        <slot name="body"></slot>
      </article>

      <!-- OrganismModalFooter -->
      <footer v-if="footer || !offClose" class="flex justify-end p-5">
        <MoleculeButton
          v-if="!offClose"
          :action="close"
          label="Fechar"
          secondary
          outline
        />
        <div v-if="footer && !offClose" class="mx-1"></div>

        <slot v-if="footer" name="footer"></slot>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  xl?: boolean;
  lg?: boolean;
  md?: boolean;
  sm?: boolean;
  offClose?: boolean;
  header?: boolean;
  footer?: boolean;
  visible?: boolean;
  backdrop?: boolean;
}

const props = defineProps<Props>();

// data
const isVisible = ref<boolean>(!!props.visible);

// methods
async function close(): Promise<void> {
  isVisible.value = false;
}
function open(): void {
  isVisible.value = true;
}

// expose
defineExpose({ close, open });
</script>

<style lang="scss" scoped>
.OrganismModal {
  background: rgba(0, 0, 0, 0.5);

  article {
    max-height: 70vh;
  }
}

</style>
