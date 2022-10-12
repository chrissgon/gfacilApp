<template>
  <div class="MoleculeButton">
    <AtomButtonFilled
      v-if="filled"
      :label="label"
      :icon="icon"
      :type="type"
      :disabled="disabled"
      :action="action"
    />
    <AtomButtonOutline
      v-else-if="outline"
      :label="label"
      :icon="icon"
      :type="type"
      :disabled="disabled"
      :action="action"
    />
    <AtomButtonSimple
      v-else-if="simple"
      :label="label"
      :icon="icon"
      :type="type"
      :disabled="disabled"
      :action="action"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  action?: () => Promise<void>;

  filled?: boolean;
  outline?: boolean;
  simple?: boolean;

  icon?: string;
  label?: string;
  disabled?: boolean;

  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
}

const props = defineProps<Props>();

// computed
const type = computed<string | undefined>(() => {
  if (props.primary) return "primary";
  if (props.secondary) return "secondary";
  if (props.success) return "success";
  if (props.warning) return "warning";
  if (props.error) return "error";
});
</script>

<style scoped></style>
