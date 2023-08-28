<template>
  <div class="px-5">
    <div class="grid mt-[3rem] sm:grid-cols-2 gap-4">
      <div>
        <stats-card title="Users" :data="data" />
      </div>
      <div>
        <stats-card title="Services" :data="data" />
      </div>
      <div>
        <stats-card title="Jobs" :data="data" />
      </div>
      <div>
        <stats-card title="Wallet" :data="data" />
      </div>
    </div>

    <div> 

    </div>
  </div>
</template>

<script setup lang="ts">
import { GetDashboardStats } from "lib/models/responses";
import { useUsersStore } from "~/store/users";

definePageMeta({
  name: "Dashboard",
});

const data = ref<GetDashboardStats['stats']>();
const usersStore = useUsersStore()

onMounted(async () => {
  try {
    const res = await usersStore.dashboard();
    data.value = res.stats;
  } catch (error) {
  }
})

const img = ref<string|File|Blob>("https://picsum.photos/seed/picsum/200/300");
</script>

<style></style>
