<template>
  <div class="bg-white rounded-[10px] border border-[#f3f3f3]">
    <div>
      <div class="px-[30px] py-5 border-b border-[#f3f3f3]">
        <h2 class="mb-1 font-bold text-xl">Shipping Cost Breakdown</h2>
      </div>
      <div class="p-[30px]">
        <Table
          :columns="columns"
          :rows="rows"
          :isBalance="true"
          :emptyTitle="error"
          :isLoading="loading"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/index.vue";
import { shippingBreakdown } from "@/services/cartservice";
import { useCartStore } from "@/stores/cart";
import currencyFormat from "@/utils/currencyFormat";
import { ref, onMounted, inject, watch } from "vue";
import { useRoute } from "vue-router";

const defaultAddress = inject("defaultAddress");
const rows = ref([]);
const error = ref(null);
const loading = ref(false);
const route = useRoute();
const columns = [
  {
    header: "Item",
    key: "item",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Size",
    key: "size",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Quantity",
    key: "quantity",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Shipping cost",
    key: "shippingCost",
    isHtml: false,
    isStatus: false,
  },
];
const refresh = inject("refresh");
const cartStore = useCartStore();
function getData() {
  loading.value = true;

  shippingBreakdown(route.params.id)
    .then((res) => {
      loading.value = false;

      if (res.status === 200) {
        refresh.value = !refresh.value;
        rows.value = [
          ...res.data.data.items,
          {
            item: "Total Cost",
            size: "",
            quantity: "",
            shippingCost: res.data.data.totalShippingCost,
          },
        ].map((i) => ({ ...i, shippingCost: currencyFormat(i.shippingCost) }));
        cartStore.getMyCart();
        error.value = null;
      }
    })
    .catch((err) => {
      loading.value = false;

      error.value = err.response.data.Message || err.response.data.message;
    });
}

onMounted(() => {
  // getData();
});

watch(defaultAddress, () => {
  getData();
});
</script>
