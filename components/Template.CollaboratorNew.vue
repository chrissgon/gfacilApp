<template>
  <article class="TemplateCollaboratorNew">
    <AtomBeadcrumb
      class="mb-2"
      :links="[
        { label: 'Colaboradores', link: '/in/collaborator' },
        { label: 'Novo', link: '', disabled: true },
      ]"
    />
    <h2 class="text-xl mb-4 dark:text-slate-200">Colaboradores</h2>

    <OrganismForm :sections="sections" spacing="p-2" ref="form" clear>
      <template #actions>
        <MoleculeButton
          :action="back"
          class="w-full mr-3"
          label="Voltar"
          outline
          error
        />
        <MoleculeButton :action="add" class="w-full" label="Salvar" filled primary />
      </template>
    </OrganismForm>
  </article>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import OrganismFormVue from "./Organism.Form.vue";

// computed
const spouseDisabled = computed<boolean>(() => {
  return isSingle.value ? true : false;
});
const formIsValid = computed<boolean>(() => {
  return !!form.value?.isValid;
});

// data
const {
  Number,
  Any,
  CPF,
  Date,
  Gender,
  RG,
  Text,
  MaritalStatus,
  Phone,
  Email,
  Zipcode,
} = useValidation();
const { collaborator } = useApi();
const { show } = useAlertStore();
const { StrToMD5, DateToUTC } = useUtils();

const { data: options } = await useAsyncData<any[]>(
  "options",
  async () => await $fetch(`http://localhost:3000/issuers.json`)
);
const form = ref<InstanceType<typeof OrganismFormVue> | null>(null);
const messageError = "Campo inválido";

const isSingle = ref<boolean>(true);
const sections = reactive([
  {
    name: "Dados Pessoais",
    fields: [
      {
        // value: "Christopher",

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
        // value: "676.633.060-07",

        input: true,
        name: "CPF",
        mask: "###.###.###-##",
        label: "CPF",
        messageError,
        validate: (val: string): boolean => {
          return CPF(val);
        },
      },
      {
        // value: Math.floor(Math.random() * 600000000000) + 1,
        // value: "32.839.439-7",

        input: true,
        name: "RG",
        mask: "##.###.###-X",
        label: "RG",
        messageError,
        validate: (val: string): boolean => {
          return RG(val);
        },
      },
      {
        // value: "2002-09-21",

        input: true,
        name: "IssueDate",
        type: "date",
        label: "Data de Emissão",
        messageError,
        validate: (val: string): boolean => {
          return Date(val);
        },
      },
      {
        select: true,
        value: "SSP",
        name: "Issuer",
        label: "Orgão Emissor",
        options: options.value,
        messageError,
        classes: "w-72",
        validate: (val: string): boolean => {
          return Text(val, 1, 50);
        },
      },
      {
        // value: "2002-09-21",

        input: true,
        name: "BirthDate",
        type: "date",
        label: "Data de Nascimento",
        messageError,
        validate: (val: string): boolean => {
          return Date(val);
        },
      },
      {
        select: true,
        name: "Gender",
        value: "M",
        label: "Gênero",
        options: [
          {
            value: "M",
            label: "Masculino",
            selected: true,
          },
          {
            value: "F",
            label: "Feminino",
          },
        ],
        messageError,
        validate: (val: string): boolean => {
          return Gender(val);
        },
      },
      {
        // value: "Paulistano",

        input: true,
        name: "Naturalness",
        label: "Naturalidade",
        messageError,
        validate: (val: string): boolean => {
          return Text(val, 1, 50);
        },
      },
      {
        // value: "Brasileiro",

        input: true,
        name: "Nationality",
        label: "Nacionalidade",
        messageError,
        validate: (val: string): boolean => {
          return Text(val, 1, 50);
        },
      },
      {
        // value: "1111 1111 1111",

        input: true,
        name: "VoterCard",
        label: "Titulo de Eleitor",
        messageError,
        mask: "#### #### ####",
        validate: (val: string): boolean => {
          return Number(val, 1, 14);
        },
      },
      {
        // value: "123",

        input: true,
        name: "Zone",
        label: "Zona",
        messageError,
        mask: "###",
        classes: "w-24",
        validate: (val: string): boolean => {
          return Number(val, 1, 4);
        },
      },
      {
        // value: "1324",

        input: true,
        name: "Section",
        label: "Seção",
        messageError,
        mask: "####",
        classes: "w-28",
        validate: (val: string): boolean => {
          return Number(val, 1, 5);
        },
      },
      {
        // value: "Web Developer",

        input: true,
        name: "Profession",
        label: "Profissão",
        messageError,
        validate: (val: string): boolean => {
          return Text(val, 1, 100);
        },
      },
    ],
  },
  {
    name: "Dados Familiares",
    fields: [
      {
        value: "Edilson Joaquim",

        input: true,
        name: "Father",
        label: "Nome do Pai",
        messageError,
        classes: "w-80",
        validate: (val: string): boolean => {
          return Text(val, 1, 150);
        },
      },
      {
        // value: "Cicera Ivanete",

        input: true,
        name: "Mother",
        label: "Nome da Mãe",
        messageError,
        classes: "w-80",
        validate: (val: string): boolean => {
          return Text(val, 1, 150);
        },
      },
      {
        select: true,
        name: "MaritalStatus",
        label: "Estado Civil",
        value: "S",
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
          form.value?.triggerClearField("Cônjugue");
          return MaritalStatus(val);
        },
      },
      {
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
  {
    name: "Dados de Contato",
    fields: [
      {
        // value: "Avenida Raimundo Pereira",

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
        // value: "321",

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
        // value: "02938-000",

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
        // value: "(11) 98307-8780",

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
        // value: `${Math.random().toString(36).slice(2)}@gmail.com`,

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
async function add(): Promise<void> {
  await form.value?.validate();

  if (!formIsValid.value) return;

  try {
    const data = form.value?.getAll();

    await collaborator.add({
      ...data,
      CooperativeID: "06d6d24c-f1bc-4bbf-a903-9b02fe4cff80",
      IssueDate: DateToUTC(data.IssueDate),
      BirthDate: DateToUTC(data.BirthDate),
      Password: StrToMD5(data.CPF),
    });

    back();
  } catch (e) {
    const err = e as Error;
    show("ERROR: AddCollaborator", err.message, true);
  }
}
async function back(): Promise<void> {
  useRouter().back();
}
</script>

<style scoped></style>
