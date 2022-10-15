import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: "http://localhost:3333",
      page: "1",
      perPage: "50",
    },
  },

  meta: {
    title: "Gfácil - Gerenciamento de Cooperativas",
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css",
      },
      //       s://fonts.googleapis.com">
      // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      // <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
      },
    ],
  },

  imports: {
    dirs: ["store"],
  },

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: "/",
  //   },
  // },

  buildModules: ["@nuxtjs/tailwindcss"],

  typescript: {
    shim: false,
    strict: true,
  },

  tailwindcss: {
    viewer: false,
  },
});
