<script setup>
// import { onMounted } from "vue";
import { RouterView } from "vue-router";

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
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
