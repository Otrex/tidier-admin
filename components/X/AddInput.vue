<template> 
<div style="--x-input-border: #38bdf8;" class="w-full p-[1px] overflow-hidden"> 
  <label v-if="label" class="font-medium text-gray-800 dark:text-gray-200">{{ label }}</label>
  <div :class="[
    'block w-full',
    label && 'mt-1',
    isFocused && 'outline-2 outline-[--x-input-border]',
    'placeholder-gray-400 dark:placeholder-gray-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-gray-300 dark:border-gray-700 border shadow-sm rounded-md hover:border-gray-400 dark:hover:border-gray-500 px-1 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200', 
  ]"> 
    <div :class="['flex flex-wrap gap-1 w-full whitespace-nowrap',]" @click="input?.focus()" >
      <template v-for="(d, i) in props.modelValue" :key="i">
        <div class="inline-block">
          <button @click="deleteEntry(i)" class="inline-flex bg-slate-200 whitespace-nowrap px-2 py-1 rounded items-center">{{ d }} <b class="ml-3 text-xs">x</b></button>
        </div>
      </template>
      <input v-model="text" @focusin="isFocused = true" @keyup.delete="handlePress" @focusout="isFocused = false" @keypress.enter="add" @keypress="runKey" ref="input" class="inline-block bg-transparent grow focus:outline-none ml-1 px-1 py-1" :placeholder="modelValue && modelValue.length > 0 ? '' :placeholder"/>
    </div>
  </div>
</div>
</template>

<script setup lang="ts"> 
const props = defineProps<{
  modelValue?: string[],
  label?: string,
  placeholder?: string,
}>();

const text = ref<string|undefined>("");
const emit = defineEmits(["update:modelValue"])

const input = ref<HTMLInputElement>()
const isFocused = ref<boolean>()

function add() {
  if (text.value) {
    emit("update:modelValue", [...(props.modelValue || []), text.value])
    text.value = ""
  }
}

function runKey(e: any) {
  if (e.key === ";") {
    text.value = text.value?.replace(";", "")
    add();
  }
  
}

function deleteEntry(i: number) {
  const update = [...(props.modelValue || [])];
  update.splice(i, 1);
  emit("update:modelValue", update)
}

const lock = ref(false)
function handlePress(e: any) {
  // console.log({
  //   text: text.value, lock: lock.value, key: e.key
  // });
  
  if (!text.value && !lock.value) {
    lock.value = true;
    return;
  }
  if (!text.value && lock.value === true) {
    const el = [...(props.modelValue || [])];
    text.value = el.at(-1)
    el.splice(-1, 1);
    lock.value = false
    emit("update:modelValue", el)
  }
  
}
// function change(e: any) {
//   console.log(e.target.innerText.split(";").at(-2));
//   curr.value = e.target.innerText.split(";").at(e.target.innerText.split(";").length - 1)
// }

// function add(e: any) {
//   if (e.key === ";") {

//     emit("update:modelValue", [...(props.modelValue || []), curr.value]);
//     console.log(e.key, [...(props.modelValue || []), curr.value]);
//   }
// }


</script>

<style> 
[dev] * {
  outline: 2px solid red;
}
</style>