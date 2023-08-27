<template>
  <div class="px-5">
    <div class="grid mt-[3rem] sm:grid-cols-3 gap-4">
      <div>
        <stats-card title="User" data="200" />
      </div>
      <div>
        <stats-card title="Services" data="200" />
      </div>
      <div>
        <stats-card title="Wallet" data="200" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Dashboard",
});

const data = ref<string[]>([
  "obi", "ben"
])

const img = ref<string|File|Blob>("https://picsum.photos/seed/picsum/200/300");
</script>

<style></style>
