<template>
  <div>
    <div class="flex flex-col w-full container gap-y-5 py-10">
      <div>
        <Detail />
      </div>
      <div class="mb-6">
        <Information />
      </div>

      <div></div>
    </div>
  </div>
</template>
<script setup>
import Detail from "@/components/product/Detail.vue";
import Information from "@/components/product/Information.vue";
import { useRouteStore } from "@/stores/routes";
import { onMounted, provide, ref } from "vue";
import { getProduct } from "~/services/productservices";
import { useProductStore } from "~/stores/products";

const store = useProductStore();
const routeStore = useRouteStore();

const loading = ref(true);
function getAProduct() {
  loading.value = true;
  getProduct(routeStore.metadata?.detail?.productId)
    .then((res) => {
      if (res.status === 200) {
        store.setProduct(res.data.data);
        loading.value = false;
      }
    })
    .catch(() => {
      store.setLoader(false);
    });
}

onMounted(() => {
  getAProduct();
});
provide("isLoading", loading);
</script>
