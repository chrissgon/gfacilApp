<template>
  <section>
    <MoleculeSuspense beadcrumb form>
      <TemplateCollaboratorUpdate :ID="$route.params.id.toString()" />
    </MoleculeSuspense>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
