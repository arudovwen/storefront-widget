<template>
  <div class="flex md:hidden justify-between items-center">
    <AppButton
      @click="open = true"
      text="Filter"
      icon="tabler:filter"
      btnClass="border border-[#ECECEC] bg-white text-[#5D6B98] !text-xs"
      iconClass="text-sm"
    />
    <div>
      <Select
        v-model.number="query.sortOrder"
        :options="options"
        placeholder="Sort by"
        classInput="!bg-white !border-[#ECECEC] !rounded-[4px] !text-[#5D6B98] !text-xs !min-h-[34px] md:!h-11 cursor-pointer !w-auto !py-2"
      />
    </div>
  </div>
  <div v-if="vendorInfo?.campaignBanner">
    <Board :url="vendorInfo?.campaignBanner" />
  </div>
  <div v-if="!loading">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px]"
      v-if="productsData?.length"
    >
      <Card
        v-for="(n, idx) in productsData"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <EmptyData v-if="!productsData?.length" title="No product available" />
  </div>
  <Center :isOpen="open" @togglePopup="togglePopup">
    <template #content>
      <div
        class="grid grid-cols-1 gap-y-[14px] w-full px-6 pt-6 pb-10 min-w-[250px] max-w-[320px]"
      >
        <p class="text-base text-[#18273AF0] font-bold">Filter</p>
        <VueSelect
          label="Price"
          :options="options"
          v-model.number="sortOrder"
        />
        <VueSelect
          label="Area of application"
          :options="
            marketStore?.marketMenuData?.map((i) => ({
              ...i,
              value: i.id,
              label: i.title,
            }))
          "
          v-model="applications"
          multiple
        />
        <VueSelect
          label="Producers"
          :options="
            supplierStore?.producersData?.map((i) => ({
              ...i,
              value: i.title,
              label: i.title,
            }))
          "
          v-model="producers"
          multiple
        />
        <button
          @click="applyFilter"
          class="appearance-none leading-none px-20 py-4 w-full lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px]"
        >
          Apply Filter
        </button>
      </div>
    </template>
  </Center>
  <AppLoader v-if="loading" />
</template>
<script setup>
import { useProductStore } from "~/stores/products";
import AppButton from "../AppButton.vue";
import Select from "../Select/index.vue";
import AppLoader from "../AppLoader.vue";
import { inject, provide, ref } from "vue";
import { useSupplierStore } from "@/stores/supplier";
import { useMarketStore } from "@/stores/markets";
import { storeToRefs } from "pinia";
import VueSelect from "../Select/VueSelect.vue";
import Center from "../Modal/Center.vue";
import Card from "../product/Card.vue";
import EmptyData from "../EmptyData.vue";
import Board from "./Board.vue";

const vendorInfo = inject("vendorInfo");
const store = useProductStore();
const supplierStore = useSupplierStore();
const marketStore = useMarketStore();
const { productsData, loading } = storeToRefs(store);
const query = inject("query");
const open = ref(false);
const applications = ref([]);
const producers = ref([]);
const sortOrder = ref("");
const options = [
  {
    label: "Low to High",
    value: 0,
  },
  {
    label: "High to Low",
    value: 1,
  },
];
function togglePopup() {
  open.value = false;
}
function applyFilter() {
  query.producers = producers.value;
  query.applications = applications.value;
  query.sortOrder = sortOrder;
  open.value = false;
}

provide("isOpen", open);
</script>
