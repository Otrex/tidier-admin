<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-1/4 h-full bg-indigo-950">
      <side-bar />
    </div>
    <div class="w-3/4 h-full">
      <div>
        <top-nav />
      </div>
      <div class="h-[calc(100%_-_6rem)] overflow-y-auto">
        <nuxt-page />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
