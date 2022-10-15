// import { install, maska } from "maska";
import Maska from "maska";

export default defineNuxtPlugin((nuxtApp) => {
  // install(nuxtApp.vueApp);
  // nuxtApp.provide("a", {})
  // nuxtApp.vueApp.directive("mask", {
  //   mounted (el) {
  //     el.focus()
  //   },
  //   getSSRProps (binding, vnode) {
  //     // you can provide SSR-specific props here
  //     return {}
  //   }
  // });
  // nuxtApp.vueApp.directive('maska', Maska);
  // nuxtApp.vueApp.directive("mask", {

  //   mounted: (el, binding) => {
  //     console.log(el, binding);
  //   },
  // });
  nuxtApp.vueApp.use(Maska);
  // nuxtApp.vueApp.directive("mask", Maska.maska);
});
