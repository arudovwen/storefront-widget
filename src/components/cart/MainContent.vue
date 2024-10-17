<template>
  <div class="grid gap-y-[30px]">
    <div class="bg-white rounded-[10px]">
      <div class="flex flex-col gap-y-5" v-if="cartStore?.cart?.length">
        <div
          v-for="(item, id) in cartStore?.cart"
          :key="id"
          class="border-b last:border-none border-[#f3f3f3]"
        >
          <CartItem :detail="item" />
        </div>
      </div>

      <EmptyData v-else title="You have no item in your cart" />
    </div>
    <Discount />
    <Auth />
  </div>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem.vue";
import { provide, ref } from "vue";
import EmptyData from "../EmptyData.vue";
import Discount from "../checkout/Discount.vue";
import Auth from "../Modal/Auth.vue";

const cartStore = useCartStore();
const type = ref("login");

provide("type", type);
</script>
