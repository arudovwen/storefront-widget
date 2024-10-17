import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getMarketmenu } from "~/services/productservices";

export const useMarketStore = defineStore("markets", () => {
  const markets = ref([]);
  const marketMenu = ref(null);
  const marketsData = computed(() => markets.value);

  const marketMenuData = computed(() => marketMenu.value);
  function setMarkets(data) {
    markets.value = data;
  }
  function getMarketMenu(value) {
    getMarketmenu(value).then((res) => {
      marketMenu.value = res.data.data;
    });
  }

  return { markets, marketsData, setMarkets, getMarketMenu, marketMenuData };
});
