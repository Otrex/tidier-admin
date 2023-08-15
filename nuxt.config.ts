// https://nuxt.com/docs/api/configuration/nuxt-config
import { colors } from "@indielayer/ui";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    ...({
      postcss: {
        postcssOptions: {
          plugins: {
            "tailwindcss/nesting": {},
            tailwindcss: {},
            autoprefixer: {},
          },
        },
      },
    } as any),
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@indielayer/ui/nuxt",
      {
        prefix: "X",
        theme: {
          colors: {
            primary: colors.emerald,
            secondary: colors.slate,
            success: colors.green,
            warning: colors.yellow,
            error: colors.red,
          },
        },
      },
    ],
  ],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  ...{
    tailwindcss: {
      cssPath: "~/assets/css/tailwind.css",
      configPath: "tailwind.config",
    },
  },
});
