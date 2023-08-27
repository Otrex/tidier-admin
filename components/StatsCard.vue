<template> 
  <div class="card"> 
    <h2 class=" text-2xl font-semibold">{{ title }}</h2>
    <h4>Total: {{ data }}</h4>
  </div>
</template>

<script setup lang="ts"> 
defineProps<{
  title: string,
  data: string|number
}>()
</script>

<style scoped> 
.card {
  @apply border border-indigo-950 border-solid p-4;
}
</style>