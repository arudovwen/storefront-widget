<template>
  <div class="flex items-center justify-between">
    <ul class="flex gap-x-1">
      <li
        v-for="(link, idx) in links"
        :key="idx"
        :class="` ${className} ${
          link.title && `after:content-['/']`
        }  font-light last:font-semibold text-[10px] sm:text-xs lg:text-sm capitalize  last:after:content-[''] flex gap-x-1 items-center`"
      >
        <button @click="routeStore.setActiveRoute(link.url)" class="">
          {{ link.title }}
        </button>
      </li>
    </ul>
    <button
      @click="routeStore.setActiveRoute('cart')"
      class="flex items-center relative"
    >
      <span
        class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
      >
        <AppIcon class="text-lg text-[#484848]" icon="lucide:shopping-cart" />
        <span
          v-if="cartStore?.cartTotal > 0"
          class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
          >{{ cartStore?.cartTotal }}</span
        >
      </span>
      <span class="text-xs sm:text-sm font-medium inline-flex text-[#333]"
        >Cart</span
      >
    </button>
  </div>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import AppIcon from "../AppIcon.vue";
import { useRouteStore } from "@/stores/routes";

const cartStore = useCartStore();
const routeStore = useRouteStore();
defineProps({
  className: {
    type: String,
    default: "text-matta-black/80 last:text-matta-black",
  },
  links: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [
      {
        title: "storefront",
        url: "home",
      },
    ],
  },
});
</script>
