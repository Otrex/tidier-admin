<template>
  <div class="flex items-center h-full w-full bg-indigo-200 justify-center">
    <div class="bg-white shadow-md p-9 rounded-md">
      <x-form @submit="onSubmit">
        <div>
          <x-input
            v-model="form.email"
            :rules="[rules.isRequired, rules.isEmail]"
            name="email"
            label="Email"
            class="w-full"
          />
        </div>
        <div>
          <x-input
            class="w-full"
            v-model="form.password"
            type="password"
            :rules="[rules.isRequired]"
            name="password"
            label="Password"
            helper="Must be between 8 and 10 characters"
          />
        </div>
        <x-checkbox v-model="remember" label="Remember for 30 days" />
        <x-button block color="primary" @click="login" type="submit"
          >Submit</x-button
        >
      </x-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from "@indielayer/ui";
import { useAuthStore } from "~/store/auth";
import { ref, reactive } from "vue";

const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const remember = ref(false);

const rules = {
  isEmail: (v: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail must be valid",
  isRequired: (v: string) => !!v || "Field is required",
};

function onSubmit(isValid: boolean) {
  // if (isValid) notifications.success('Valid! Sumitted.')
  // else notifications.error('Invalid! Form has errors')
}

async function login() {
  try {
    await authStore.login(form);
    await navigateTo("/d");
  } catch (error: any) {
    alert(error.message);
  }
}
</script>

<style></style>
