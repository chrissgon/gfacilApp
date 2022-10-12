<template>
  <!-- @keydown.enter.prevent -->
  <form :class="{ 'flex-col': column }" @keydown.enter.prevent class="OrganismForm flex flex-wrap">
    <template v-for="{ name, fields } in sections">
      <h4
        v-text="name"
        class="w-full text-base mb-1 mt-6 dark:text-slate-200"
      ></h4>
      <MoleculeField
        v-for="{
          input,
          textarea,
          select,
          value,
          disabled,
          icon,
          label,
          name,
          message,
          messageError,
          options,
          placeholder,
          type,
          mask,
          classes,

          fail,
          routine,
          success,
          validate,
        } in fields"
        :class="[width, spacing, classes, { 'w-auto': column }]"
        :disabled="disabled || readonly"
        :icon="icon"
        :value="existsDataValue(name) ? values[name] : value"
        :input="input"
        :label="label"
        :name="name"
        :message="message"
        :messageError="messageError"
        :options="options"
        :placeholder="placeholder"
        :select="select"
        :textarea="textarea"
        :type="type"
        :mask="mask"
        :fail="fail"
        :routine="routine"
        :success="success"
        :validate="validate"
        ref="els"
      />
    </template>

    <footer
      :class="{ disabled: readonly, 'justify-between': clear }"
      class="w-full flex flex-wrap justify-end items-center mt-5"
    >
      <MoleculeButton
        v-if="clear"
        :class="{ 'w-full': columnActions }"
        :action="clearAll"
        label="Limpar"
        warning
        outline
      />

      <div
        :class="{
          'w-full': columnActions,
          'flex-wrap': columnActions,
        }"
        class="flex"
      >
        <slot name="actions"></slot>
      </div>
    </footer>
  </form>
</template>

<script setup lang="ts">
import MoleculeFieldVue from "./Molecule.Field.vue";

interface Props {
  sections: any[];
  clear?: boolean;
  column?: boolean;
  columnActions?: boolean;
  values?: any;

  readonly?: boolean;
  spacing?: string;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  spacing: "p-1",
  values: {},
});

// data
const els = ref<InstanceType<typeof MoleculeFieldVue>[] | []>([]);

// computed
const isValid = computed<boolean>(() => {
  for (const el of els.value) {
    if (!el.isValid) return false;
  }
  return true;
});

// methods
async function clearAll(): Promise<void> {
  for (const el of els.value) {
    el.clear();
    el.processAndCall();
  }
}

async function validate(): Promise<void> {
  for (const el of els.value) {
    el.process();
  }
}

function triggerClearField(label: string) {
  for (const el of els.value) {
    if (el.isField(label)) return el.clear();
  }
}

function getAll(): any {
  const data: any = {};

  for (const el of els.value) {
    data[el.name] = el.model;
  }

  return data;
}

function existsDataValue(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(props.values, name);
}

// expose
defineExpose({ validate, triggerClearField, getAll, isValid });
</script>

<style lang="scss" scoped>
.w-auto {
  width: auto !important;
}
</style>
