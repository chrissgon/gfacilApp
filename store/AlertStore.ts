import AtomToastVue from "~~/components/Atom.Toast.vue";

interface State {
  toast: InstanceType<typeof AtomToastVue> | null;
}

export const useAlertStore = defineStore("AlertStore", {
  state: (): State => ({
    toast: null,
  }),
  actions: {
    set(toast: InstanceType<typeof AtomToastVue> | null): void {
      this.toast = toast;
    },
    show(ttl:string, msg:string, IsErr:boolean):void{
        this.toast?.show(ttl, msg, IsErr)
    }
  },
});
