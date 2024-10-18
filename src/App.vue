<script setup>
// import { onMounted } from "vue";
// import { RouterView } from "vue-router";
import { useRouteStore } from "./stores/routes";
import VendorIndex from "./views/vendor/index.vue";
import CartView from "./views/CartView.vue";
import CheckoutView from "./views/CheckoutView.vue";
import ProductView from "./views/ProductView.vue";
import OrderSuccessView from "./views/OrderSuccessView.vue";

const routeStore = useRouteStore();
// onMounted(() => {
//   const monnifyScript = document.createElement("script");
//   monnifyScript.src = "https://sdk.monnify.com/plugin/monnify.js";
//   monnifyScript.crossOrigin = "anonymous"; // Change to "use-credentials" if needed
//   monnifyScript.defer = true;

//   monnifyScript.onload = () => {
//     console.log("Monnify SDK loaded successfully.");
//     // You can initialize Monnify SDK here if needed
//   };

//   monnifyScript.onerror = () => {
//     console.error("Failed to load Monnify SDK.");
//   };

//   document.head.appendChild(monnifyScript);
// });
</script>

<template>
  <div class="bg-[#F4F4F4] w-screen h-screen overflow-y-auto pt-6 pb-20">
    Homw
    <!-- <RouterView /> -->
    <VendorIndex v-if="routeStore.activeRoute === 'home'" />
    <CartView v-if="routeStore.activeRoute === 'cart'" />
    <CheckoutView v-if="routeStore.activeRoute === 'checkout'" />
    <ProductView v-if="routeStore.activeRoute === 'detail'" />
    <OrderSuccessView v-if="routeStore.activeRoute === 'success'" />
  </div>
</template>

<style scoped lang="scss">
body::-webkit-scrollbar,
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 8px;
  height: 100px;
}

::-webkit-scrollbar:horizontal {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track:horizontal {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb:horizontal {
  background: #ececec;
  width: 50px;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  opacity: 0.9;
}
</style>
