<template>
  <nav class="pt-9">
    <h1 class="text-white font-extrabold text-4xl px-[2rem] mb-9">Tidier</h1>
    <div class="mx-5 h-[1px] opacity-10 bg-white"></div>
    <div class="mt-5">
      <template v-for="(menu, idx) in menuItems" :key="idx">
        <nuxt-link :to="menu.link" exact-active-class="active">
          <div
            class="text-white items-center ml-5 flex flex-row hover:fill-indigo-950 fill-white hover:bg-slate-200 hover:text-indigo-950 px-[2rem] pt-[1rem] pb-[.8rem] gap-2"
          >
            <div>
              <x-svg
                :value="menu.icon"
                class="w-[1.5rem] h-[1.5rem] overflow-hidden aspect-square"
              />
            </div>
            <div class="pb-1">
              {{ menu.label }}
            </div>
          </div>
        </nuxt-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuItems = ref([
  {
    label: "Dashboard",
    link: "/d",
    icon: "dashboard",
  },
  {
    label: "Users",
    link: "/d/users",
    icon: "users",
  },
  {
    label: "Services",
    link: "/d/services",
    icon: "services",
  },
]);
</script>

<style>
.active > * {
  @apply fill-indigo-950 !bg-white !text-indigo-950;
}

.h-active > * {
  @apply fill-indigo-950 bg-indigo-400 text-indigo-950;
}
</style>
