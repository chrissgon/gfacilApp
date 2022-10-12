<template>
  <div
    class="MoleculeField dark:text-slate-400"
    :class="{ disabled: isDisabled }"
  >
    <!-- AtomFieldHeader -->
    <AtomFieldHeader :class="getClasses.text" :label="label" />

    <!-- AtomFieldInput -->
    <AtomFieldInput
      v-if="input"
      v-model="model"
      @focus.capture="focusin"
      @blur.capture="processAndCall"
      :classes="getClasses.border"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :type="type"
      :mask="mask"
      class="py-1"
    >
      <template #icon>
        <AtomSpin v-if="loading" />
        <AtomIcon v-else :class="[getClasses.text, getIcon]" />
      </template>
    </AtomFieldInput>
    <!-- AtomFieldTextarea -->
    <AtomFieldTextarea
      v-if="textarea"
      v-model="model"
      @focus.capture="focusin"
      @blur.capture="processAndCall"
      :classes="getClasses.border"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :mask="mask"
      class="py-1"
    >
      <template #icon>
        <AtomSpin v-if="loading" />
        <AtomIcon v-else :class="[getClasses.text, getIcon]" />
      </template>
    </AtomFieldTextarea>
    <!-- AtomFieldSelect -->
    <AtomFieldSelect
      v-if="select"
      v-model="model"
      @focus.capture="focusin"
      @blur.capture="focusout"
      @change.capture="processAndCall"
      :classes="getClasses.border"
      :disabled="isDisabled"
      :options="options"
      class="py-1"
    >
      <template #icon>
        <AtomSpin v-if="loading" />
      </template>
    </AtomFieldSelect>

    <!-- AtomFieldFooter -->
    <AtomFieldFooter :class="getClasses.text" :message="getMessage" />
  </div>
</template>

<script setup lang="ts">
import { getClassesFromColors } from "./types/State";

// props
interface Props {
  input?: boolean;
  textarea?: boolean;
  select?: boolean;

  name: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  message?: string;
  messageError?: string;
  options?: any[];
  placeholder?: string;
  type?: string;
  value?: string;
  mask?: string;

  fail?(value: string): void;
  routine?(value: string): void;
  success?(value: string): void;
  validate?(value: string): Promise<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  input: false,
  textarea: false,
  select: false,

  disabled: false,
  icon: "bi-input-cursor-text",
  label: "",
  message: "",
  messageError: "",
  options: () => [],
  placeholder: "",
  type: "text",
  value: "",

  fail: () => {},
  routine: () => {},
  success: () => {},
  validate: () => new Promise<boolean>((resolve) => resolve(true)),
});

// data
const model = ref(props.value);
const loading = ref(false);
const focus = ref(false);
const error = ref(false);

// computed
const getClasses = computed(() => {
  return getClassesFromColors(getType.value);
});
const getType = computed<string | undefined>(() => {
  if (focus.value || loading.value) return "primary";
  if (error.value) return "error";
});
const getIcon = computed<string>(() => {
  if (props.disabled) return "bi-lock";
  if (error.value) return "bi-x-lg";
  return props.icon;
});

const getMessage = computed<string>(() => {
  return error.value ? props.messageError : props.message;
});
const isDisabled = computed<boolean>(() => {
  return props.disabled || loading.value;
});
const isValid = computed<boolean>(() => {
  return !error.value && !loading.value;
});

// methods
async function process(): Promise<void> {
  disableStates();

  props.routine(model.value);

  loading.value = true;
  setError(await validate());
  loading.value = false;
}
async function processAndCall(): Promise<void> {
  await process();
  callSuccessOrError();
}
function validate(): Promise<boolean> {
  return props.validate(model.value);
}
function setError(valid: boolean) {
  error.value = !valid;
}
function callSuccessOrError(): void {
  error.value ? props.fail(model.value) : props.success(model.value);
}
function disableStates(): void {
  loading.value = false;
  focus.value = false;
  error.value = false;
}
function focusin(): void {
  focus.value = true;
}
function focusout(): void {
  focus.value = false;
}
function clear(): void {
  if (!props.disabled) model.value = "";
}
function isField(label: string): boolean {
  return label == props.label;
}

defineExpose({
  clear,
  validate,
  process,
  processAndCall,
  isField,
  isValid,
  model,
  name: props.name,
});
</script>

<style lang="scss"></style>
