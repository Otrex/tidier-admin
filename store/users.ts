import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { AddNewUserRequest } from "~/lib/models/requests";
import api from "~/lib/api";
import { useRequestsStore } from "./requests";


export const useUsersStore = createGlobalState(() => {
  const requestsStore = useRequestsStore();


  async function getUsers() {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.GetUsers();
    } finally {
      endRequest();
    }
  }

  async function addNewUser(data: AddNewUserRequest) {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.AddNewUser(data);
    } finally {
      endRequest();
    }
  }
  return { getUsers, addNewUser };
});
