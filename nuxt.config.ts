// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  extends: ['@zunderai/ui'],
  modules: ['@nuxt/ui'],

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiModel: process.env.OPENAI_MODEL,
    public: {
      useSimulatedChat: process.env.USE_SIMULATED_CHAT === "true",
    },
  },

  experimental: {
    componentIslands: true,
  },
})