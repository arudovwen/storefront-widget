<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-xl border-b border-[#f3f3f3]">
      Promotion
    </h2>

    <form
      @submit.prevent="handleSubmit"
      class="px-[30px] pt-6 pb-[30px] flex items-center gap-x-3"
    >
      <div class="flex-1 max-w-[313px]">
        <Textinput
          placeholder="Enter a discount code here if you have one"
          required
          v-model="code"
        />
      </div>
      <AppButton
        :isLoading="loading"
        :isDisabled="(!cartStore.cartId && authStore.isLoggedIn) || !code"
        type="submit"
        text="Apply discount"
        btnClass="!px-[14px] !py-[10px] h-11 bg-primary-500 text-sm text-white leading-normal disabled:!opacity-90"
      />
    </form>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { inject, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { applyDiscount } from "~/services/cartservice";
import AppButton from "../AppButton.vue";
import Textinput from "@/components/Textinput/index.vue";

const code = ref(null);
const loading = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const authOpen = inject("authOpen");
const isApplied = ref(false);
function handleSubmit() {
  if (!authStore.isLoggedIn) {
    authOpen.value = true;
    return;
  }

  loading.value = true;
  applyDiscount({
    discountCode: code.value,
    orderId: cartStore.cartId,
  })
    .then((res) => {
      if (res.status === 200) {
        cartStore.getMyCart();
        loading.value = false;
        isApplied.value = true;
        toast.success("Discount applied");
      }
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Invalid code"
      );
      loading.value = false;
    });
}
function handleFirst() {
  if (
    cartStore?.cartData?.firstOrder &&
    cartStore.cartId &&
    isApplied.value == false
  ) {
    code.value = "1ST50KOFF";
    handleSubmit();
  }
  if (!cartStore?.cartData?.firstOrder && cartStore.cartId && code.value) {
    handleSubmit();
  }
}
watch(
  () => [cartStore?.cartData],
  () => {
    handleFirst();
  }
);
</script>
