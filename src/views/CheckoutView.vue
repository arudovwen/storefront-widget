<template>
  <section class="min-h-screen flex flex-col p-2 gap-y-2">
    <div class="container py-10 w-full flex-1">
      <div class="mb-6">
        <AppButton
          link="/customer/cart"
          icon="ion:arrow-back-sharp"
          text="Back to cart"
          btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
        />
      </div>
      <div class="flex gap-x-5 w-full flex-col lg:flex-row gap-y-8 lg:gap-y-0">
        <div class="flex-1">
          <CheckoutContent />
        </div>
        <div>
          <CheckoutSide />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import CheckoutContent from "@/components/checkout/Content.vue";
import CheckoutSide from "@/components/checkout/Side.vue";

import AppButton from "@/components/AppButton.vue";
import { ref, onMounted, provide, computed } from "vue";
import { getalladdress } from "@/services/cartservice";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const refresh = ref(false);
const route = useRoute();
const addresses = ref([]);
const isPopOpen = ref(false);
const authOpen = ref(false);
const activeMethod = ref("card");
const cartStore = useCartStore();

function getData() {
  getalladdress(route.params.id).then((res) => {
    addresses.value = res.data.data;
  });
}
const defaultAddress = computed(() => addresses.value.find((i) => i.isDefault));
onMounted(() => {
  getData();
  cartStore.getMyCart();
});

provide("getData", getData);
provide("defaultAddress", defaultAddress);
provide("addresses", addresses);
provide("refresh", refresh);
provide("isPopOpen", isPopOpen);
provide("authOpen", authOpen);
provide("activeMethod", activeMethod);
</script>
