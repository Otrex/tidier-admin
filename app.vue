<template>
  <div class="w-full h-screen overflow-hidden">
    <linear-loader v-show="store.hasActiveRequests" />
    <nuxt-page />
  </div>
</template>
<script setup lang="ts">
import { useRequestsStore } from "~/store/requests";

const store = useRequestsStore();
</script>
