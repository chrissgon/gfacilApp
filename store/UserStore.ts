interface State {
  logged: boolean;
}

export const useUserStore = defineStore("UserStore", {
  persist: true,
  state: (): State => ({
    logged: false,
  }),
  actions: {
    async login(nickname: string, password: string): Promise<void> {
      if (nickname === "gehon" && password === "@Gehon123") {
        this.logged = true;
        return;
      }

      throw new Error("invalid login");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
