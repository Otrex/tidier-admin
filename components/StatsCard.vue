<template> 
  <div class="card"> 
    <h2 class=" text-2xl font-semibold mb-2">{{ title }}</h2>
    <div class="flex flex-wrap gap-2 items-center"> 
      <template v-for="(data, key) in stats" :key="data">
        <div> 
          <div class="inline-flex items-center">
            <label class="bg-green-700 text-white w-[2rem] aspect-square inline-flex items-center justify-center">{{ data  }}</label>
            <span class=" font-semibold bg-green-200 px-2">{{ key }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts"> 
import { GetDashboardStats } from "lib/models/responses"

const props = defineProps<{
  title: string,
  data: GetDashboardStats["stats"]
}>()

const stats = computed(() => {
  if (props.title === "Wallet") {
    return props.data && { balance: props.data.wallet.balance,  }
  }
  return props.data && props.data[props.title.toLowerCase() as keyof typeof props.data] || {}
})

</script>

<style scoped> 
.card {
  @apply border border-indigo-950 border-solid p-4;
}
</style>