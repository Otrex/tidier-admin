import api from "~/lib/api";
import { useAuthStore } from "~/store/auth";
import { SESSION } from "~/lib/const";

const EXEMPTED_ROUTES = ["/auth/login", "/auth/refresh"];
export default defineNuxtPlugin(async () => {
  console.log("- Mounted session plugin");

  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const token = useCookie(SESSION);

  api.setBaseUrl(config.public.baseURL);
  api.set401Handler((res) => {
    if (res.config.url !== "/auth/login") {
      authStore.token.value = "";
    }
  });
  
  if (token.value) {
    api.setToken(token.value);
    authStore.token.value = token.value;
  }
});
