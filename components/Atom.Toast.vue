<template>
  <!-- AtomToast -->
  <div
    v-if="visible"
    :class="{
      visible: visible,
      'text-success-500': !error,
      'text-error-500': error,
      'left left-6 right-auto': left,
      'right right-6 left-auto': !left,
      'top-6 bottom-auto': top,
      'bottom-6 top-auto': !top,
    }"
    class="AtomToast flex flex-col absolute text-sm overflow-hidden rounded-sm select-none max-w-lg z-10 bg-white dark:bg-slate-800"
  >
    <!-- progress -->
    <div
      :class="{
        'bg-success-500': !error,
        'bg-error-500': error,
      }"
      class="progress h-1 ease-out"
    ></div>

    <!-- header -->
    <header class="w-full flex justify-between items-center px-4 py-3">
      <h4 class="flex w-full font-medium">
        <i :class="icon" class="mr-2 bi"></i>
        <p v-text="title"></p>
      </h4>

      <!-- action -->
      <div class="action ml-5 flex items-center">
        <!-- <CsButton @click="hide" :button="button" /> -->
      </div>
    </header>
    <!-- message -->
    <article
      v-if="messageNotNull"
      v-text="message"
      class="message text-xs w-full justify-between items-center px-4 py-3 pt-0"
    ></article>
  </div>
</template>

<script setup lang="ts">
interface Props {
  left?: boolean;
  top?: boolean;
}

defineProps<Props>();

// data
const visible = ref<boolean>(false);
const error = ref<boolean>(false);
const title = ref<string>("");
const message = ref<string>("");

// computed
const icon = computed<string>(() => {
  return error.value ? "bi-x-circle-fill" : "bi-check-circle-fill";
});
const messageNotNull = computed<boolean>(() => {
  return !!message.value;
});

// methods
function show(ttl: any, msg: any, IsErr: boolean) {
  if (!visible.value) {
    title.value = ttl;
    message.value = msg;
    error.value = IsErr;

    visible.value = true;

    setTimeout(() => {
      visible.value = false;
    }, 5000);
  }
}

// expose
defineExpose({ show });
</script>

<style lang="scss" scoped>
.AtomToast {
  box-shadow: 0 3px 15px rgba(#000, 0.1);

  .progress {
    animation: progress 5s ease;
  }

  &.left {
    animation: left 5s ease;
  }
  &.right {
    animation: right 5s ease;
  }
}

@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes left {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-50px);
  }
  5%,
  95% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes right {
  0%,
  100% {
    opacity: 0;
    transform: translateX(50px);
  }
  5%,
  95% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
