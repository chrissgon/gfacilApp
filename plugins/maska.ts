import { maska } from "maska";

export default defineNuxtPlugin((app) => {
  app.vueApp.directive("mask", maska);
});
