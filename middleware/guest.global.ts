import { useAuthStore } from "~~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("- Mounted guest.global middleware");

  const authStore = useAuthStore();

  if (authStore.token.value && to.path === "/") {
    return navigateTo("/d");
  }
  if (!authStore.token.value && to.path !== "/") {
    return navigateTo("/");
  }
});
