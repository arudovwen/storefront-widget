<template>
  <div class="">
    <div class="flex flex-col w-full h-full">
      <StorefrontBanner />

      <div class="flex flex-1 container py-6 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full hidden lg:block">
          <StorefrontSideBar />
        </div>
        <div class="flex-1 flex flex-col gap-y-8 overflow-y-auto no-scrollbar">
          <StorefrontContent />
       <div class="flex justify-center">
        <Pagination
            v-if="productStore.productsData.length"
            :total="productStore.total"
            :current="query.PageNumber"
            :per-page="query.PageSize"
            :pageRange="pageRange"
            @page-changed="(page) => query.PageNumber = page"
            @perPageChanged="perPage"
          />
       </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";
import { reactive, ref, watch, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { getProducts, getProductsByTag } from "~/services/productservices";
import StorefrontSideBar from "@/components/Storefront/SideBar.vue";
import StorefrontBanner from "@/components/Storefront/Banner.vue";
import StorefrontContent from "@/components/Storefront/Content.vue";
import Pagination from "@/components/Pagination/index.vue";

const productStore = useProductStore();
const route = useRoute();
console.log(window.matta.matta)
const vendorInfo = ref(null);
const pageRange = 5;

const query = reactive({
  PageNumber: 1,
  PageSize: 20,
  searchParameter: route.query.search_query || "",
  MarketId: route.params.id,
  Producer: route.query.producer,
  producers: [],
  applications: [],
  totalData: 0,
  sortOrder: "",
  sortBy: "",
  // storelug: window.matta.matta?.toLowerCase(),
});

function perPage({ currentPerPage }) {
  query.PageNumber = 1;
  query.PageSize = currentPerPage;
}

function getAllProducts() {
  productStore.setLoader(true);
  const params = {
    PageNumber: query.PageNumber,
    PageSize: query.PageSize,
    producers: query.producers,
  };

  const fetchProducts = route.query.tag ? getProductsByTag({ ...params, tag: route.query.tag }) : getProducts(query);

  fetchProducts
    .then((res) => {
    
      if (res.status === 200) {
        productStore.setProducts( res?.data);
        query.totalData = res.data.data ? res.data.data.totalCount : res.data.totalCount;
      }
    })
    .catch(() => {
      productStore.setProducts([]);
    })
    .finally(() => {
      productStore.setLoader(false);
    });
}

onMounted(() => {
  getAllProducts();
});

watch(
  () => [query.producers, query.PageNumber, query.sortOrder, query.sortBy, query.applications],
  () => {
    getAllProducts();
  }
);

provide("query", query);
provide("vendorInfo", vendorInfo);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
