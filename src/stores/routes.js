import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRouteStore = defineStore("routes", () => {
  const routes = ref(["home", "cart", "checkout", "detail", "success"]);
  const activeRoute = ref("home");
  const metadata = ref(null);
  const routesData = computed(() => routes.value);

  function setActiveRoute(data) {
    activeRoute.value = data;
  }
  function setMeta(data) {
    metadata.value = data;
  }

  return {
    routes,
    routesData,
    activeRoute,
    setActiveRoute,
    setMeta,
    metadata,
  };
});
