<template>
  <article class="TemplateCollaboratorUpdate">
    <AtomBeadcrumb
      class="mb-2"
      :links="[
        { label: 'Colaboradores', link: '/in/collaborator' },
        { label: 'Editar', link: '', disabled: true },
      ]"
    />
    <h2 class="text-xl mb-4 dark:text-slate-200">Colaboradores</h2>

    <OrganismForm
      :sections="sections"
      :values="values"
      spacing="p-2"
      ref="form"
      clear
    >
      <template #actions>
        <MoleculeButton
          :action="back"
          class="w-full mr-3"
          label="Voltar"
          outline
          error
        />
        <MoleculeButton :action="update" class="w-full" label="Editar" filled primary />
      </template>
    </OrganismForm>
  </article>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import OrganismFormVue from "./Organism.Form.vue";

// props
interface Props {
  ID: string;
}
const props = defineProps<Props>();

// computed
const spouseDisabled = computed<boolean>(() => {
  return isSingle.value ? true : false;
});
const formIsValid = computed<boolean>(() => {
  return !!form.value?.isValid;
});

// data
const { Number, Any, Text, MaritalStatus, Phone, Email, Zipcode } =
  useValidation();
const { collaborator } = useApi();
const { show } = useAlertStore();

const values = reactive<any>({});

// const data = ;

// console.log((await (await collaborator.get(props.ID)).res));

Object.assign(values, await (await collaborator.get(props.ID)).res);

// await new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(true);
//   }, 5000);
// });
// console.log(useCollaboratorStore);
// const res = await useCollaboratorStore().get(props.ID);
// console.log("res", res);
const form = ref<InstanceType<typeof OrganismFormVue> | null>(null);

const messageError = "Campo inválido";
const isSingle = ref<boolean>(true);
const sections = reactive([
  {
    name: "Dados Pessoais",
    fields: [
      {
        // value: data.Name,

        input: true,
        name: "Name",
        label: "Nome",
        messageError,
        classes: "w-80",
        validate: (val: string): boolean => {
          return Text(val, 1, 150);
        },
      },
      {
        // value: data.Profession,

        input: true,
        name: "Profession",
        label: "Profissão",
        messageError,
        validate: (val: string): boolean => {
          return Text(val, 1, 100);
        },
      },
      {
        // value: data.MaritalStatus,

        select: true,
        name: "MaritalStatus",
        label: "Estado Civil",
        messageError,
        options: [
          {
            value: "S",
            label: "Solteiro",
            selected: true,
          },
          {
            value: "C",
            label: "Casado",
          },
          {
            value: "D",
            label: "Divorciado",
          },
          {
            value: "V",
            label: "Viúvo",
          },
        ],
        validate: (val: string): boolean => {
          isSingle.value = val === "S";

          if (isSingle.value) {
            form.value?.triggerClearField("Cônjugue");
          }

          return MaritalStatus(val);
        },
      },
      {
        // value: data.Spouse,

        input: true,
        name: "Spouse",
        label: "Cônjugue",
        messageError,
        classes: "w-80",
        disabled: spouseDisabled,
        validate: (val: string): boolean => {
          if (isSingle.value) return true;

          return Text(val, 1, 150);
        },
      },
    ],
  },
  // {
  //   name: "Dados Familiares",
  //   fields: [

  //   ],
  // },
  {
    name: "Dados de Contato",
    fields: [
      {
        // value: data.Address,

        input: true,
        name: "Address",
        label: "Endereço",
        messageError,
        classes: "w-96",
        validate: (val: string): boolean => {
          return Text(val, 1, 200);
        },
      },
      {
        // value: data.AddressNumber,

        input: true,
        name: "AddressNumber",
        label: "Numero de Endereço",
        messageError,
        mask: "#####",
        classes: "w-36",
        validate: (val: string): boolean => {
          return Number(val, 1, 5);
        },
      },
      {
        // value: data.Complement,

        textarea: true,
        name: "Complement",
        label: "Complemento",
        messageError,
        classes: "w-72",
        validate: (val: string): boolean => {
          return Any(val, 0, 50);
        },
      },
      {
        // value: data.Zipcode,

        input: true,
        name: "Zipcode",
        label: "CEP",
        messageError,
        mask: "#####-###",
        classes: "w-48",
        validate: (val: string): boolean => {
          return Zipcode(val);
        },
      },
      {
        // value: data.Cell,

        input: true,
        name: "Cell",
        label: "Celular",
        messageError,
        mask: "(##) #####-####",
        classes: "w-64",
        validate: (val: string): boolean => {
          return Phone(val);
        },
      },
      {
        // value: data.Phone,

        input: true,
        name: "Phone",
        label: "Telefone",
        messageError,
        mask: "(##) #####-####",
        classes: "w-64",
        validate: (val: string): boolean => {
          if (val === "") return true;
          return Phone(val);
        },
      },
      {
        // value: data.Email,

        input: true,
        name: "Email",
        label: "Email",
        messageError,
        classes: "w-96",
        validate: (val: string): boolean => {
          return Email(val);
        },
      },
    ],
  },
]);

// methods
async function update(): Promise<void> {
  await form.value?.validate();

  if (!formIsValid.value) return;

  try {
    await collaborator.update(props.ID, form.value?.getAll());

    back();
  } catch (e) {
    const err = e as Error;
    show("ERROR: UpdateCollaborator", err.message, true);
  }
}

async function back(): Promise<void> {
  useRouter().back();
}
</script>

<style scoped></style>
