<template>
  <div>
    <div class="rounded-[10px]">
      <div class="flex flex-col gap-y-5">
        <CheckoutShipping />
        <CheckoutCost />
        <CheckoutPayment />
      </div>
    </div>
  </div>
</template>
<script setup>
import CheckoutShipping from "./Shipping.vue";
import CheckoutPayment from "./Payment.vue";
import CheckoutCost from "./Cost.vue";
</script>
