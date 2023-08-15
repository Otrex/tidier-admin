import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { IUser } from "~/lib/models";
import { LoginRequest } from "~/lib/models/requests";
import api from "~/lib/api";
import { useRequestsStore } from "./requests";
import { SESSION } from "~/lib/const";

export const useAuthStore = createGlobalState(() => {
  const requestsStore = useRequestsStore();
  const user = ref<IUser | null>();
  const token = ref("");
  const expiresIn = ref(300);

  function setAuthSession() {
    api.setToken(token.value);
    const maxAge = expiresIn.value;
    const expires = new Date(Date.now() + maxAge * 1000);
    const options = {
      maxAge,
      expires,
    };
    useCookie(SESSION, options).value = token.value;
  }

  async function login(data: LoginRequest) {
    const endRequest = requestsStore.startRequest();
    try {
      const res = await api.Login(data);

      token.value = res.token.value;
      user.value = res.user;

      setAuthSession();
    } finally {
      endRequest();
    }
  }
  return { token, user, login };
});
