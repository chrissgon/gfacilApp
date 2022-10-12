<template>
  <div
    class="TemplateLogin flex justify-center items-center w-full min-h-screen dark:bg-slate-900"
  >
    <div
      class="flex justify-center items-center flex-col border rounded-md p-20 px-12 sm:px-24 dark:border-slate-700"
    >
      <img src="/gfacil.png" width="90" />
      <OrganismForm
        @keydown.enter.prevent="login"
        :sections="sections"
        class="text-center-h4 mt-5"
        ref="form"
        column
        columnActions
      >
        <template #actions>
          <MoleculeButton
            :action="login"
            label="Entrar"
            class="w-full mt-5"
            filled
            primary
          />
        </template>
      </OrganismForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrganismFormVue from "./Organism.Form.vue";

// data
const UserStore = useUserStore();
const { show } = useAlertStore();

const form = ref<InstanceType<typeof OrganismFormVue> | null>(null);

const sections = reactive([
  {
    name: "Acesse ao sistema",
    fields: [
      {
        value: "gehon",

        input: true,
        name: "Nickname",
        label: "Usuário",
        icon: "bi-person",
        validate: (val: string): boolean => {
          return true;
        },
      },
      {
        value: "@Gehon123",

        input: true,
        type: "password",
        name: "Password",
        label: "Senha",
        icon: "bi-key",
        // classes: "w-80",
        validate: (val: string): boolean => {
          //   return Text(val, 1, 150);
          return true;
        },
      },
    ],
  },
]);

// methods
async function login(): Promise<void> {
  try {
    const { Nickname, Password } = form.value?.getAll();

    await UserStore.login(Nickname, Password);

    navigateTo("/in/collaborator");
  } catch (e) {
    const err = e as Error;
    show("ERROR: Invalid Credentials", err.message, true);
  }
}
</script>

<style>
.text-center-h4 h4 {
  text-align: center;
}
</style>
