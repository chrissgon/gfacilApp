<template>
  <div class="AtomBeadcrumb flex items-center">
    <template v-for="({ label, link, disabled }, i) in links">
      <NuxtLink
        :to="link"
        :class="
          disabled
            ? 'disabled dark:text-slate-200'
            : 'text-primary-500 dark:text-primary-700 underline'
        "
        class="text-sm font-medium leading-none"
        >{{ label }}</NuxtLink
      >
      <span
        v-if="!(i === links.length - 1)"
        class="px-2 leading-none disabled dark:text-slate-200"
        >/</span
      >
    </template>
  </div>
</template>

<script setup lang="ts">
interface Link {
  label: string;
  link: string;
  disabled?: boolean;
}
interface Props {
  links: Array<Link>;
}

defineProps<Props>();
</script>

<style scoped></style>
