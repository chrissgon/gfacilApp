<template>
  <section class="App flex min-w-full max-h-screen overflow-hidden dark">
    <NuxtPage />
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss">
html,
body {
  font-family: "Inter";
  font-size: 0.85rem;
  max-width: 100%;
  overflow-x: hidden;

  * {
    transition: 0.1s border, background, color, opacity;
  }
}

.dark div:not(button) {
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: no-drop;
  * {
    pointer-events: none;
  }
}

.scrollbar {
  scrollbar-width: auto;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
    border: 0px solid transparent;
  }
}

.dark .scrollbar {
  scrollbar-color: #777 transparent !important;

  &::-webkit-scrollbar-thumb {
    background-color: #777 !important;
  }
}

</style>
