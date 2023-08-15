<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-[30rem] h-full bg-indigo-950">
      <side-bar />
    </div>
    <div class="w-full h-full">
      <div>
        <top-nav />
      </div>
      <div class="h-full">
        <nuxt-page />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
