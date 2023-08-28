import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { AddNewUserRequest } from "~/lib/models/requests";
import api from "~/lib/api";
import { useRequestsStore } from "./requests";
import { toFormData } from "axios";


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

  async function getServices() {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.GetServices();
    } finally {
      endRequest();
    }
  }

  async function addService(data: any) {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.AddServices(toFormData(data) as FormData);
    } finally {
      endRequest();
    }
  }

  async function deleteService(id: string) {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.DeleteServices(id);
    } finally {
      endRequest();
    }
  }

  async function dashboard() {
    const endRequest = requestsStore.startRequest();
    try {
      return await api.Dashboard();
    } finally {
      endRequest();
    }
  }

  async function updateService(id: string, data: any) {
    const endRequest = requestsStore.startRequest();
    const filtered: Record<string, any> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (value) filtered[key] = value;
    })
    try {
      return await api.UpdateServices(id, toFormData(filtered) as FormData);
    } finally {
      endRequest();
    }
  }

  return { getUsers, dashboard, addNewUser, getServices, deleteService, addService, updateService };
});
