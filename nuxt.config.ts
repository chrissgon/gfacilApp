import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      devEnv: true,
      devBaseURL: "http://localhost:3333",
      prodBaseURL: "http://ec2-3-87-208-137.compute-1.amazonaws.com:3333",
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

  buildModules: ["@nuxtjs/tailwindcss"],

  typescript: {
    shim: false,
    strict: true,
  },

  tailwindcss: {
    viewer: false,
  },
});
