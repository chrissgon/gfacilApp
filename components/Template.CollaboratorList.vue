<template>
  <article class="TemplateCollaboratorList">
    <AtomBeadcrumb
      class="mb-2"
      :links="[{ label: 'Colaboradores', link: '', disabled: true }]"
    />
    <h2 class="text-xl">Colaboradores</h2>
    <br />
    <br />
    <div class="flex mb-4">
      <MoleculeButton :action="create" label="Novo" filled primary />
      <MoleculeButton
        :action="update"
        :disabled="!(selecteds.length === 1)"
        icon="bi-pen"
        label="Editar"
        class="ml-7"
        warning
        outline
      />
      <MoleculeButton
        :action="openModalDel"
        :disabled="selecteds.length === 0"
        label="Excluir"
        class="ml-2"
        error
        outline
      />
    </div>

    <OrganismTableServer
      @triggeredInfo="triggeredInfo"
      :request="collaborator.getAll"
      :columns="columns"
      hover
      striped
      ref="table"
    />

    <OrganismModal ref="modalDel" sm onClose footer>
      <template #body>
        <h4 class="text-lg">Deseja excluir?</h4>
        <p class="text-slate-500 dark:text-slate-400 mt-2">
          Todos os registros selecionados serão
          <span class="text-error-500">excluídos</span>.
        </p>
      </template>
      <template #footer>
        <MoleculeButton :action="del" label="Excluir" filled error />
      </template>
    </OrganismModal>

    <OrganismModal ref="modalView" xl>
      <template #body>
        <h4 class="text-lg mb-3">{{ info.Name }}</h4>

        <div class="flex flex-wrap text-slate-500 dark:text-slate-400">
          <span
            v-for="(v, k) in info"
            v-text="`${k}: ${v}`"
            class="p-1 px-2 m-1 bg-slate-200 dark:bg-slate-700 rounded-md"
          >
          </span>
        </div>
      </template>
    </OrganismModal>
  </article>
</template>

<script setup lang="ts">
import OrganismModalVue from "./Organism.Modal.vue";
import OrganismTableServerVue from "./Organism.TableServer.vue";

// data
const { collaborator } = useApi();
const CollaboratorStore = useCollaboratorStore();

const modalView = ref<InstanceType<typeof OrganismModalVue> | null>(null);
const modalDel = ref<InstanceType<typeof OrganismModalVue> | null>(null);
const table = ref<InstanceType<typeof OrganismTableServerVue> | null>(null);
const selecteds = computed<any[]>(() => {
  return table.value?.selecteds || [];
});
const columns = reactive({
  CPF: "CPF",
  RG: "RG",
  Name: "Nome",
  Profession: "Profissão",
  Father: "Pai",
  Mother: "Mãe",
  Address: "Endereço",
  Cell: "Telefone",
  Email: "Email",
});
const info = reactive<any>({});

// methods
async function openModalDel(): Promise<void> {
  modalDel.value?.open();
}
async function del(): Promise<void> {
  try {
    const IDs: string[] = selecteds.value.map<string>(
      (selected) => selected.CollaboratorID
    );

    await CollaboratorStore.delete(IDs);
    await table.value?.load();
    modalDel.value?.close();
  } catch (e) {
    console.log(e);
  }
}

function triggeredInfo(data: any): void {
  modalView.value?.open();
  Object.assign(info, data);
}

async function create(): Promise<void> {
  useRouter().push({ path: "/in/collaborator/new" });
}
async function update(): Promise<void> {
  useRouter().push({
    path: `/in/collaborator/${selecteds.value[0].CollaboratorID}`,
  });
}
</script>

<style scoped></style>
