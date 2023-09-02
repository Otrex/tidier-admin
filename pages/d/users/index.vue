<template>
  <div class="px-5">
    <section>
      <div class="flex justify-end pt-4">
        <x-button class="mr-2" @click="addUser = true">Add User</x-button>
      </div>
    </section>
    <section>
      <x-table
        v-model:sort="sort"
        class="my-10"
        dense
        striped
        :headers="headers"
        :items="itemsSorted"
        @click-row="clickRow"
      >
        <template #item-phoneVerifiedAt="{ item }">
          {{ formatDate(item.phoneVerifiedAt) }}
        </template>
        <template #item-isBlacklisted="{ item }">
          <div @click.stop="() => {}"> 
            <x-toggle :model-value="item.isBlacklisted" :loading="item.loading" @update:modelValue="(v) => updateBlacklist(item, v)"></x-toggle>
          </div>
        </template>
        <template #item-action="{ item }">
          <div @click.stop="() => {}"> 
            <button class="!bg-red-600 inline-flex items-center p-1 rounded-md" @click="deleteUser(item)"> <x-svg class="fill-white bg-red-600" value="delete" /></button>
          </div>
        </template>
        <template #item-role="{ item }">
          <x-tag size="sm" color="pink" v-if="item.role === UserRole.ADMIN" rounded>{{ item.role }}</x-tag>
          <x-tag size="sm" color="blue" v-else-if="item.role === UserRole.KEEPER" rounded>{{ item.role }}</x-tag>
          <x-tag size="sm" color="orange" v-else rounded>{{ item.role }}</x-tag>
        </template>
      </x-table>
      <div class="text-right"> 
        <div class="inline-block"> 
          <x-pagination v-model="page" :total-pages="totalPages" variant="quick" />
        </div>
      </div>
    </section>


    <x-modal v-model="addUser" show-close backdrop>
      <template #header>
        Add New User
      </template>

      <div> 
        <x-form @submit="onSubmit">
          <div>
            <x-input
              v-model="form.fullName"
              :rules="[rules.isRequired,]"
              name="fullName"
              label="Full Name"
              class="w-full"
            />
          </div>
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
              v-model="form.phoneNumber"
              :rules="[rules.isRequired]"
              name="phoneNumber"
              label="Phone Number"
              class="w-full"
            />
          </div>
          <div>
            <x-select
              v-model="form.role"
              label="User Role"
              :options="userRoleOptions"
              placeholder="Select user role"
              class="w-full"
            />
          </div>
          <div v-if="form.role === UserRole.KEEPER">
            <x-select
              v-model="form.keeperType"
              label="Keeper Type"
              :options="keeperOptions"
              placeholder="Select Keeper type"
              class="w-full"
            />
          </div>
        </x-form>
      </div>

      <template #actions>
        <div class="text-right space-x-4">
          <x-button @click="addUser = false">Cancel</x-button>
          <x-button color="success" @click="addNewUser">Add</x-button>
        </div>
      </template>
    </x-modal>

    <x-modal v-model="userNewPassword" show-close backdrop>
      <template #header>
        User Password
      </template>
      <div> 
        <div> 
          {{ userNewPassword }}
        </div>
      </div>
    </x-modal>

    <x-modal v-model="showUser" show-close backdrop>
      <div v-if="currentUser"> 
        <div class="mt-[2rem] p-5"> 
          <template v-for="(d, key) of currentUser"  :key="key"> 
            <div class="flex flex-row" v-if="key !== '__v'"> 
              <div class="w-1/2 py-2 font-medium uppercase" v-if="key === 'id'"> SN </div>
              <div class="w-1/2 py-2 font-medium uppercase" v-else> {{ key }}</div>
              <div class="w-1/2 py-2">{{ d }}</div>
            </div>
          </template>
        </div>
      </div>
    </x-modal>
  </div>
</template>

<script setup lang="ts">
import { IUser } from "~/lib/models";
import { computed, ref } from "vue";
import { useUsersStore } from "~/store/users";
import { KeeperType, UserRole } from "~/lib/enums";
import { AddNewUserRequest } from "lib/models/requests";
import api from "~/lib/api";

definePageMeta({
  name: "Users",
});

const showUser = ref(false)
const currentUser = ref<IUser & { id: number, loading?: boolean }>();

const rules = {
  isEmail: (v: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail must be valid",
  isRequired: (v: string) => !!v || "Field is required",
};
const userNewPassword = ref("");

const addUser = ref(false);
const usersStore = useUsersStore();
const form = reactive({
  email: "",
  fullName: "",
  role: "",
  keeperType: "",
  phoneNumber: "",
})
const totalPages = ref(1)
const page = ref(1)

const headers = ref([
  { text: "#", value: "id", sortable: true, align: "center" },
  { text: "Full Name", value: "fullName" },
  { text: "Email", value: "email" },
  { text: "Role", value: "role", sortable: true },
  { text: "Verified At", value: "phoneVerifiedAt" },
  { text: "Blacklisted", value: "isBlacklisted" },
  { text: "Action", value: "action" },
]);

const items = ref<Array<IUser & {id: number}>>([]);
const keeperOptions = Object.values(KeeperType).map((e) => ({ value: e, label: e }));
const userRoleOptions = Object.values(UserRole).map((e) => ({ value: e, label: e }));

const sort = ref<any[]>([]);
const blacklistLoading = ref<boolean>()

function clickRow(e: any) {
  currentUser.value = e;
  showUser.value = true;
}
const itemsSorted = computed(() => {
  const $items = items.value.slice(0);

  return $items.sort((a: any, b: any) => {
    for (const $sort of sort.value) {
      const [key, asc] = $sort.split(",");

      if (a[key] > b[key]) return asc === "-1" ? -1 : 1;
      if (a[key] < b[key]) return asc === "-1" ? 1 : -1;
    }

    return 0;
  });
});

async function addNewUser() {
  try {
    const res = await usersStore.addNewUser(form as AddNewUserRequest);
    userNewPassword.value = res.password;

    await getUsers();
  } catch (error: any) {
    alert(error.message || error.errors)
  }
}

async function deleteUser(item: any) {
  try {
    await usersStore.deleteUser(item._id);
    await getUsers();
  } catch (error: any) {
    alert(error.message || error.errors)
  }
}


async function updateBlacklist(item: IUser & { loading?: boolean }, v: any) {
  try {
    item.loading = true;
    await api.BlacklistUser(item._id, v);
    await getUsers();
  } catch (error: any) {
    alert(error.message)
  } finally {
    item.loading = false;
  }
}

watch(userNewPassword, () => {
  if (userNewPassword.value as any === false) {
    addUser.value = false;
  }
})

const DEFAULT_LIMIT = 20;
async function getUsers() {
  try {
    const res = await usersStore.getUsers();
    items.value = res.data.map((user, idx) => {
      return {
        ...user,
        id: idx + 1
      }
    })

    totalPages.value = Math.ceil(res.pageData.total / DEFAULT_LIMIT);
    page.value = res.pageData.currentPage;
  } catch (error) {
    
  }
}

onMounted(async () => {
  try {
    await getUsers()
  } catch (error) {}
})

</script>

<style></style>
