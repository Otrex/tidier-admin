<template>
  <div class="px-5">
    <section>
      <div class="flex justify-end pt-4">
        <x-button class="mr-2" @click="openAddNewService">Add Service Products</x-button>
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
  
        <template #item-isActive="{ item }">
          <div @click.stop="() => {}"> 
            <x-toggle :model-value="item.isActive" @update:modelValue="(v) => updateActive(item, v)"></x-toggle>
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


    <x-modal v-model="updateService" show-close backdrop>
      <template #header>
        {{ updating.value ? 'Update Service Product' : 'Add New Service Product' }}
      </template>

      <div class="flex flex-col gap-2"> 
          <div v-if="updating.value">
            <x-input
              v-model="updating.id"
              disabled
              label="_ID"
              class="w-full"
            />
          </div>
          <div>
            <x-image-input
              v-model="form.image"
              :rules="[rules.isRequired,]"
              name="image"
              label="Image"
              class="w-full"
            />
          </div>
          <div>
            <x-input
              v-model="form.name"
              :rules="[rules.isRequired,]"
              name="name"
              label="Name"
              class="w-full"
            />
          </div>
          <div>
            <x-input
              v-model="form.description"
              :rules="[rules.isRequired,]"
              name="description"
              label="Description"
              class="w-full"
            />
          </div>
          <div>
            <x-input
              v-model="form.unit"
              :rules="[rules.isRequired]"
              name="unit"
              label="Unit"
              placeholder="Kg, or meters etc"
              class="w-full"
            />
          </div>
          <div>
            <x-input
              v-model="form.costPerUnit"
              :rules="[rules.isRequired]"
              name="cost"
              label="Cost/Unit"
              placeholder="Cost of service"
              class="w-full"
            />
          </div>
          <div>
            <x-select
              v-model="form.type"
              label="Service Type"
              :options="typeOptions"
              placeholder="Select service type"
              class="w-full"
            />
          </div>
          <div>
            <x-add-input
              v-model="form.equipments"
              label="Equipments/Tools/Materials"
              placeholder="Enter the materials required"
              class="w-full"
            />
          </div>
          <div>
            <x-input
              v-model="form.equipmentCostPerUnit"
              :rules="[rules.isRequired]"
              name="equipmentCostPerUnit"
              label="Equipments Cost Per Unit"
              placeholder="E.g. 2000"
              class="w-full"
            />
          </div>

          <div class="pt-2">
            <x-toggle
              v-model="form.isActive"
              :rules="[rules.isRequired]"
              name="equipmentCostPerUnit"
              label="Active"
              placeholder="E.g. 2000"
              class="w-full"
            />
          </div>

      </div>

      <template #actions>
        <div class="text-right space-x-4">
          <x-button @click="cancel">Cancel</x-button>
          <x-button v-if="!updating.value" color="success" @click="addNewService">Add</x-button>
          <x-button v-else color="success" @click="updateCurrentService">Update</x-button>
        </div>
      </template>
    </x-modal>

  </div>
</template>

<script setup lang="ts">
import { IService, ServiceProductType } from "~/lib/models";
import { computed, ref } from "vue";
import { useUsersStore } from "~/store/users";
import api from "~/lib/api";

definePageMeta({
  name: "Services",
});

const page = ref(1)
const totalPages = ref(1)
const updateService = ref(false);
const usersStore = useUsersStore();
const updating = reactive({
  id: "",
  value: false
});
const onSubmit = () => {}
const sort = ref<any[]>([]);
const items = ref<Array<IService & {id: number}>>([]);
const currentService = ref<IService & { id: number }>();

const typeOptions = Object.values(ServiceProductType)
  .map((e) => ({ value: e, label: e }));
const rules = {
  isRequired: (v: string) => !!v || "Field is required",
};


const form = reactive({
  name: "",
  description: "",
  costPerUnit: 0,
  isActive: true,
  unit: "",
  equipments: ["Rice"] as string[],
  type: undefined as ServiceProductType | undefined,
  equipmentCostPerUnit: 0,
  image: "" as string | File,
})

const reset = () => {
  form.name = "";
  form.description = "";
  form.costPerUnit = 0;
  form.isActive = true;
  form.unit = "";
  form.equipments = [];
  form.type = undefined;
  form.equipmentCostPerUnit = 0;
  form.image = "";
}

const openAddNewService = () => {
  updateService.value = true;
  updating.value = false;
  updating.id = ""
  reset()
}

const fill = (data: IService & {id:number}) => {
  form.name = data.name;
  form.description = data.description;
  form.costPerUnit = data.costPerUnit;
  form.isActive = data.isActive;
  form.unit = data.unit;
  form.equipments = data.equipments;
  form.type = data.type;
  form.equipmentCostPerUnit = data.equipmentCostPerUnit;
  form.image = data.image;

  updating.id = data._id;
  updating.value = true
}

const cancel = () => {
  updateService.value = false
  reset()
}

const clickRow = (e: IService & {id: number}) => {
  updateService.value = true;
  fill(e)
}

const headers = ref([
  { text: "#", value: "id", sortable: true, align: "center" },
  { text: "Name", value: "name" },
  { text: "Description", value: "description" },
  { text: "Type", value: "type" },
  { text: "Cost/Unit", value: "costPerUnit", sortable: true },
  { text: "Active", value: "isActive" },
]);





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

async function updateCurrentService() {
  try {
    // await usersStore.updateService();
  } catch (error) {
    
  }
}

async function addNewService() {
  try {
    // const res = await usersStore.addNewUser(form as AddNewUserRequest);
    await usersStore.addService(form);
    await getServices();
    cancel();

  } catch (error: any) {
    alert(error.message || error.errors)
  }
}


const DEFAULT_LIMIT = 20;
async function getServices() {
  try {
    const res = await usersStore.getServices();
    items.value = res.data.map((service, idx) => {
      return {
        ...service,
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
    await getServices()
  } catch (error) {}
})

</script>

<style></style>
