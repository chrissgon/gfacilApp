export const useCollaboratorStore = defineStore("CollaboratorStore", {
  persist: true,
  actions: {
    async get(ID: string): Promise<any> {
      return await useApi().collaborator.get(ID);
    },
    async delete(IDs: string[]): Promise<void> {
      for (const ID of IDs) {
        await useApi().collaborator.delete(ID);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCollaboratorStore, import.meta.hot)
  );
}
