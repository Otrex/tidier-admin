<template> 
<div style="--x-input-border:#38bdf8;"> 
    <label v-if="label">
      <p class="font-medium text-gray-800 dark:text-gray-200 mb-1">{{ label }}</p>
    </label>
    <div tabindex="1" @focusin="isFocused = true" @focusout="isFocused = false" :class="[
      'w-full p-[1px] overflow-hidden',
      isFocused && 'outline-2 outline-[--x-input-border]',
      'placeholder-gray-400 dark:placeholder-gray-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-gray-300 dark:border-gray-700 border shadow-sm rounded-md hover:border-gray-400 dark:hover:border-gray-500 px-1 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200', 
      ]"> 
      
      <label class="flex items-center gap-2"> 
        <div class="aspect-square max-h-[2rem] max-w-[2rem] w-full border border-slate-100 border-solid rounded-md overflow-hidden"> 
          <img v-show="display" :src="display" :class="['w-full h-full max-h-[2rem] bg-slate-100 object-cover']"/>
          <svg v-show="!display" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="max-h-[2rem] max-w-[2rem]"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Zm160.118-390Q361-570 375.5-584.618q14.5-14.617 14.5-35.5Q390-641 375.382-655.5q-14.617-14.5-35.5-14.5Q319-670 304.5-655.382q-14.5 14.617-14.5 35.5Q290-599 304.618-584.5q14.617 14.5 35.5 14.5Z"/></svg>
        </div>
        <div v-show="name" class="grow">{{ name }}</div>
        <div v-show="!name" class="grow text-gray-400">{{ placeholder ? placeholder : 'Select an image'}}</div>
        <input type="file" @focusout="isFocused = false" @focusin="isFocused = true" accept="image/*" @change="change" class="hidden"/>
      </label>
    </div>
</div>
</template>

<script setup lang="ts"> 
const isFocused = ref<boolean>()
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue?: string | File;
  label?: string;
  placeholder?: string
}>();

const display = computed(() => {
  return props.modelValue && typeof props.modelValue !== "string" 
    ? URL.createObjectURL(props.modelValue)
    : props.modelValue
});

const name = computed(() => {
  if (!props.modelValue) {
    return undefined
  }
  if (typeof props.modelValue == "string") {
    return props.modelValue.split("/").at(-1);
  }

  return props.modelValue.name;

})

const change = (e: any) => {
  const file = e.target.files[0];
  emit("update:modelValue", file);
}
</script>

<style> 
    
</style>