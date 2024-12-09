<template>
  <div class="items-center flex justify-center p-6 h-screen w-screen">
    <div class="bg-white rounded-[10px] p-5 md:p-9 text-center max-w-[500px]">
      <img src="/images/success.png" class="mx-auto mb-[10px]" alt="success" />
      <h1 class="text-2xl mb-[24px] font-bold">
        {{
          !routeStore.metadata?.success?.order_type
            ? "Order Successful"
            : "Order Request Submitted"
        }}
      </h1>
      <p
        class="mb-4 text-sm text-[#444] leading-[21px]"
        v-if="routeStore.metadata?.success?.order_type"
      >
        Your order has been sent and is being processed. You will be contacted
        by one of our sales reps within the next 24hrs.
      </p>

      <p
        class="mb-8 md:mb-10 text-sm text-[#444] leading-[21px]"
        v-if="!order_type"
      >
        Your order will be processed as soon as possible. Your order no is
        <span class="font-medium text-[#333]"
          >{{ routeStore.metadata?.success?.orderId }} </span
        >. You will receive an email shortly with the invoice for your order.
      </p>
      <p
        class="font-medium mb-6 text-sm"
        v-if="routeStore.metadata?.success?.order_type"
      >
        You can also proceed to make payment for your order.
      </p>
      <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-[14px]">
        <AppButton
          @click="routeStore.setActiveRoute(`home`)"
          text="Continue shopping"
          type="button"
          btnClass="text-[#2176FF] bg-[#165EF014] w-full !text-sm !font-normal !py-3"
        />
        <AppButton
          v-if="routeStore.metadata?.success?.order_type"
          @click="makePayment"
          :isDisabled="isLoading || loading"
          type="button"
          :text="loading ? 'Processing payment' : 'Make payment'"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal !py-3"
        />
        <!-- <AppButton
          v-if="!order_type"
          link="/procurement/my-orders"
          type="button"
          text="Proceed to dashboard"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal !py-3"
        /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { getcartorder } from "~/services/cartservice";
import { toast } from "vue3-toastify";
import { confirmpayment } from "~/services/cartservice";
import { nanoid } from "nanoid";
import { payWithMonnify } from "@/utils/monnify";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import AppButton from "@/components/AppButton.vue";
import { useRouteStore } from "@/stores/routes";

const routeStore = useRouteStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

const isLoading = ref(false);
const loading = ref(false);
const route = useRoute();
const { orderId, order_type } = route.query;
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
  loading.value = false;
}
const data = ref(null);
onMounted(() => {
  getcartorder({ orderNo: orderId })
    .then((res) => {
      if (res.status == 200) {
        isLoading.value = false;
        data.value = {
          email: authStore.userInfo?.email,
          name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
          amount: res.data.data?.cartTotalwithTax,
          phoneNumber: authStore.userInfo?.phoneNumber,
          reference: `ORD-${orderId}-${nanoid(6)}`,
          orderId: orderId,
        };
      }
    })
    .catch(() => {
      isLoading.value = false;
    });
});
function makePayment() {
  loading.value = true;
  payWithMonnify(data.value, onModalClose, onSuccess);
}

function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    confirmpayment({ orderId })
      .then((res) => {
        if (res.status === 200) {
          cartStore?.clearCart();
          // window.location.replace(`/order-success?orderId=${orderId}`);
          const metadata = {
            orderId,
          };
          routeStore.setMeta({ success: metadata });
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
}
</script>
