<template>
  <div>
    <div class="flex justify-between py-5 px-5">
      <div>
        <h1 class="text-2xl font-bold capitalize">{{ $route.name }}</h1>
      </div>
      <div class="inline-flex items-center">
        <div class="bg-indigo-950 text-white px-3">
          Admin {{ user?.fullName }}
        </div>
      </div>
    </div>
    <x-divider />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

const user = computed(() => authStore.user.value);
</script>

<style></style>
