<template>
  <section class="min-h-screen flex flex-col p-2 gap-y-2">
    <div class="flex-1 flex flex-col gap-y-3 container">
      <div class="mb-6">
        <AppButton
          @click="routeStore.setActiveRoute('home')"
          icon="ion:arrow-back-sharp"
          text="Back to storefront"
          btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
        />
      </div>
      <div class="rounded-lg flex flex-col lg:flex-row gap-6">
        <div class="flex-1">
          <div class="bg-white rounded-[10px] border border-[#f3f3f3]">
            <div
              class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]"
            >
              Cart
            </div>
            <MainContent />
          </div>
        </div>
        <div class="w-full lg:w-[380px]"><SideContent /></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import MainContent from "@/components/cart/MainContent.vue";
import SideContent from "@/components/cart/SideContent.vue";
import AppButton from "@/components/AppButton.vue";
import { onMounted, provide, ref } from "vue";

import { confirmpurchase } from "~/services/cartservice";
import { toast } from "vue3-toastify";
import { useShippingStore } from "@/stores/shipping";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useRouteStore } from "@/stores/routes";

const routeStore = useRouteStore();

const shippingStore = useShippingStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const loading = ref(false);
const authOpen = ref(false);
const action = ref("");

function handleProceed() {
  if (!authStore.isLoggedIn) {
    action.value = "order";
    authOpen.value = true;
    return;
  }

  // router.push("/order/checkout");
  routeStore.setActiveRoute("checkout");
}
function handleOrderRequest() {
  if (!authStore.isLoggedIn) {
    action.value = "call";
    authOpen.value = true;
    return;
  }
  loading.value = true;
  confirmpurchase({ shippingAddressId: shippingStore?.defaultAddress?.id })
    .then((res) => {
      if (res.status === 200) {
        loading.value = false;
        cartStore?.clearCart();
        // window.location.href = `/order-success?orderId=${res.data.data}&order_type=requests`;
        const data = {
          orderId: res.data.data,
          order_type: "requests",
        };

        routeStore.setMeta({ success: data });
        routeStore.setActiveRoute("success");
      }
    })
    .catch((err) => {
      const error = `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`;
      toast.error(error);
      loading.value = false;
    });
}

onMounted(() => {
  cartStore.getMyCart();
});

provide("action", action);
provide("authOpen", authOpen);
provide("handleOrderRequest", handleOrderRequest);
provide("handleProceed", handleProceed);
</script>
