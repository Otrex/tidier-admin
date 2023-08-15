import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { createGlobalState } from "@vueuse/core";

export const useRequestsStore = createGlobalState(() => {
  const requests = ref(new Set<string>());
  const hasActiveRequests = computed(() => requests.value.size > 0);

  function startRequest() {
    const uuid = uuidv4();
    requests.value.add(uuid);
    return () => {
      requests.value.delete(uuid);
    };
  }

  function clearAll() {
    requests.value = new Set<string>();
  }
  return { requests, hasActiveRequests, clearAll, startRequest };
});
