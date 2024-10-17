import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getProducers } from "~/services/productservices";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const product = ref([]);
  const producers = ref([]);
  const total = ref(0);
  const isLoading = ref(false);

  const productsData = computed(() => products.value);
  const productData = computed(() => product.value);
  const producerData = computed(() => producers.value);
  const loading = computed(() => isLoading.value);

  function setProduct(data) {
    console.log("🚀 ~ setProduct ~ data:", data);
    product.value = data;
  }
  function setProducts({ data, totalCount }) {
    products.value = data;
    total.value = totalCount;
    window.scrollTo(0, 0);
  }

  function getAllProducers() {
    getProducers({ PageNumber: 1, PageSize: 50 }).then((res) => {
      producers.value = res.data.data;
    });
  }
  function setLoader(data) {
    isLoading.value = data;
  }

  return {
    total,
    product,
    products,
    productsData,
    productData,
    setProducts,
    setProduct,
    loading,
    setLoader,
    producerData,
    getAllProducers,
  };
});
