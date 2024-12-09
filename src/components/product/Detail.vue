<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <Breadcrumbs
      className="mb-8 !text-[#333] last:!text-[#165EF0]"
      :links="links"
    />
    <div
      class="p-4 sm:p-6 lg:p-[30px] bg-white rounded-[10px] flex flex-col lg:flex-row gap-x-[38px] gap-y-10 lg:gap-y-0"
    >
      <div
        class="flex-1 flex flex-col-reverse lg:flex-row gap-y-[14px] lg:gap-y-0 lg:gap-x-[14px]"
      >
        <div
          v-if="!isLoading"
          class="lg:w-[100px] flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-3"
        >
          <img
            :src="n"
            v-for="n in productData.gallery"
            :key="n"
            :alt="n"
            width="100px"
            height="100"
            @click="imageUrl = n"
            class="cursor-pointer bg-gray-100 w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
        </div>
        <div
          v-if="isLoading"
          class="lg:w-[100px] flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-3"
        >
          <div
            v-for="n in 4"
            :key="n"
            class="bg-gray-200 animate-pulse w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
        </div>
        <div v-if="!isLoading" class="flex-1 relative">
          <img
            :src="imageUrl || productData.featuredPhoto"
            alt="cover"
            width="400"
            height="300"
            class="bg-gray-100 w-full h-[200px] lg:h-[300px] xl:h-[460px] rounded-[5px] object-cover"
          />
          <span
            class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
            ><AppIcon
              @click="handleLike(productData.liked)"
              :icon="!productData.liked ? 'ph:heart' : 'ph:heart-fill'"
              class="text-xs sm:text-sm md:text-base darks:text-white"
          /></span>
        </div>
        <div v-if="isLoading" class="flex-1 relative">
          <div
            class="bg-gray-200 animate-pulse w-full h-[200px] lg:h-[300px] xl:h-[460px] rounded-[10px]"
          />
        </div>
      </div>
      <div class="lg:w-[550px]" v-if="!isLoading">
        <h1 class="font-bold text-lg sm:text-2xl lg:text-[32px] mb-3 lg:mb-5">
          {{ productData.name }}
        </h1>
        <p class="text-[#444] text-xs lg:text-sm mb-[15px]">
          {{ productData.description }}
        </p>
        <p class="text-xs :text-sm mb-[22px]">
          <span class="font-normal">Producer:</span>
          <span class="font-bold"> {{ productData?.producer?.title }}</span>
        </p>

        <p
          v-if="!productData.hidePrice"
          class="text-xl lg:text-2xl font-[800] mb-[29px]"
        >
          <span class="font-normal text-base">Starting from</span>
          {{ currencyFormat(mypackage?.amount || 0) }}
          <span class="text-sm text-[#444] font-normal"
            >/{{ `${mypackage?.unit || ""}` }}</span
          >
        </p>

        <div
          v-if="productData?.sampleAvailable || productData.hidePrice"
          class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4 mb-[17px] items-center"
        >
          <AppButton
            v-if="productData.hidePrice"
            @click="handleRequest('quote')"
            text="Request quote"
            icon="akar-icons:receipt"
            btnClass="!rounded-[6px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !font-normal "
          />
          <AppButton
            v-if="productData?.sampleAvailable"
            @click="handleRequest('sample')"
            text="Request sample"
            icon="mdi:phone-message-outline"
            btnClass="!rounded-[6px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !font-normal"
          />
        </div>

        <div class="mb-[30px]" v-if="!productData.hidePrice">
          <h2 class="font-medium text-sm mb-2">Choose packaging</h2>
          <div class="flex gap-4 items-center flex-col lg:flex-row">
            <div class="flex-1 w-full">
              <VueSelect
                v-model="selectedPackage"
                :options="packageOptions"
                placeholder="Select a package"
                classInput="min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[6px] !text-[#333] !h-[50px] cursor-pointer bg-[#FCFCFC]"
              />
            </div>
            <div class="h-[50px] lg:flex-1 lg:max-w-[180px] w-full">
              <CartButton />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4 w-full"
        >
          <AppButton
            v-if="
              !productData.hidePrice &&
              productData?.supplierId !== authStore.businessId
            "
            @click="handleCart('add')"
            text="Add to cart"
            icon="bytesize:cart"
            :isLoading="cartLoading"
            :isDisabled="cartLoading || requestloading"
            btnClass="bg-primary-500  text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm w-full"
          />
          <AppButton
            v-if="!productData.hidePrice"
            @click="handleOrderRequest('add')"
            icon="simple-line-icons:call-out"
            text="Request a call"
            :isLoading="requestloading"
            :isDisabled="cartLoading || requestloading"
            btnClass="text-white  !px-[15px] !py-[13px] !normal-case bg-[#f90] flex w-full"
          />
        </div>
      </div>

      <!-- Sklenton starts here  -->
      <div class="lg:w-[550px]" v-if="isLoading">
        <div
          class="font-bold text-lg sm:text-2xl lg:text-[32px] mb-3 lg:mb-6 bg-gray-200 w-[160px] p-[8px] rounded-full animate-pulse"
        ></div>
        <p
          class="text-[#444] text-xs lg:text-sm mb-6 bg-gray-200 w-[260px] p-[8px] rounded-full animate-pulse"
        ></p>
        <p
          class="text-xl lg:text-2xl font-[800] mb-6 bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
        ></p>
        <p class="text-xs :text-sm mb-6">
          <span
            class="font-normal bg-gray-200 inline-flex w-[80px] p-[4px] rounded-full animate-pulse"
          ></span
          ><span
            class="font-bold bg-gray-200 w-[140px] inline-flex p-[4px] rounded-full animate-pulse ml-2"
          >
          </span>
        </p>
        <div
          class="flex flex-col md:flex-row gap-x-[18px] gap-y-4 lg:gap-y-0 mb-6 justify-start items-center"
        >
          <div
            class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4 items-center"
          >
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[38px] rounded-full animate-pulse"
            />
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[38px] rounded-full animate-pulse"
            />
          </div>
          <p
            class="text-xl lg:text-2xl font-[800] bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
          ></p>
        </div>
        <div class="mb-6">
          <p
            class="text-xl lg:text-2xl font-[800] mb-6 bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
          ></p>
          <AppButton
            text=""
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[260px] !h-[50px] rounded-full animate-pulse"
          />
        </div>
        <div class="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
          <AppButton
            text=""
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
          />
          <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
            />
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Center :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #default>
      <div class="h-full w-full bg-white rounded-lg p-6 lg:p-10">
        <Sample v-if="requestType == 'sample'" />
        <Quote v-if="requestType == 'quote'" />
      </div>
    </template>
  </Center>

  <AddedToCart
    v-if="isAdded"
    :selectedPackage="mypackage.package"
    @close="isAdded = false"
    :totalAmount="mypackage?.amount * mypackage?.size"
    :quantity="counter"
    :name="productData.name"
    :hidePrice="productData.hidePrice"
  />
  <Auth />
  <Center
    :isOpen="isRequestAdded"
    @togglePopup="isRequestAdded = false"
    v-if="isRequestAdded"
  >
    <template #default>
      <div class="bg-white px-6 py-6">
        <div class="flex justify-between mb-5 items-center">
          <div>
            <img src="/images/box.svg" alt="Detail" />
          </div>
          <!-- <span @click="handleclose" class="absolute top-3 right-4">
              <i
                class="uil uil-times cursor-pointer text-xl text-[#98A2B3]"
              ></i>
            </span> -->
        </div>

        <h4 class="font-semibold text-[#101828] text-lg">Order Request</h4>

        <p class="text-sm text-[#475467]">
          Your item has been added. Would you like to add another item or
          proceed to send request?
        </p>

        <div class="flex gap-x-4 items-center mt-6">
          <button
            @click="isRequestAdded = false"
            type="button"
            class="h-11 appearance-none leading-none px-4 py-[10px] rounded-lg text-matta-black hover:bg-gray-100 text-sm w-full border border-[#D0D5DD] font-medium justify-center flex items-center"
          >
            Add another item
          </button>

          <button
            @click="navigateTo('/order-requests')"
            type="button"
            class="h-11 bg-blue-600 border-blue-600 appearance-none leading-none px-4 py-[10px] rounded-lg text-white text-sm w-full border font-medium disabled:opacity-50 flex items-center justify-center"
          >
            Send request
          </button>
        </div>
      </div>
    </template>
  </Center>
</template>
<script setup>
import { useProductStore } from "~/stores/products";
import { toast } from "vue3-toastify";
import { confirmpurchase, requestACall } from "~/services/cartservice";
import Breadcrumbs from "@/components/Breadcrumbs/index.vue";
import "tippy.js/dist/tippy.css";
import AppIcon from "../AppIcon.vue";
import currencyFormat from "@/utils/currencyFormat";
import AppButton from "../AppButton.vue";
import VueSelect from "../Select/index.vue";
import CartButton from "../CartButton.vue";
import Center from "../Modal/Center.vue";
import AddedToCart from "../AddedToCart.vue";
import { computed, inject, provide, ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useSupplierStore } from "@/stores/supplier";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useShippingStore } from "@/stores/shipping";
import Sample from "../Requests/Sample.vue";
import Quote from "../Requests/Quote.vue";
import Auth from "../Modal/Auth.vue";
import { useRouteStore } from "@/stores/routes";

const isRequestAdded = ref(false);
const isLoading = inject("isLoading");
const store = useProductStore();
const cartStore = useCartStore();
const shippingStore = useShippingStore();
const authStore = useAuthStore();
const supplierStore = useSupplierStore();
const { productData } = storeToRefs(store);
const isAdded = ref(false);
// const route = useRoute();
const router = useRouter();
const selectedPackage = ref(null);
// const { name, category } = route.params;
const imageUrl = ref(productData?.value?.featuredPhoto);
const routeStore = useRouteStore();
const packageOptions = computed(() =>
  productData?.value?.packagesAvailable?.map((i) => {
    return {
      label: `${i.package.title}/${i.size}${i.unit} - ${currencyFormat(
        i.amount * i.size
      )}`,
      value: JSON.stringify({ ...i }),
    };
  })
);
const links = [
  {
    title: "Storefront",
    url: `home`,
  },
  {
    title: routeStore.metadata?.detail?.productTitle,
    url: "#",
  },
];
const authOpen = ref(false);
const isOpen = ref(false);
const active = ref("signin");
const isAuthOpen = ref(false);
const requestType = ref(null);
// eslint-disable-next-line no-unused-vars
function handleclose(val) {
  if (val == "success") {
    window.location.reload();
  }
  isAuthOpen.value = isOpen.value = false;
}
function handleRequest(type) {
  if (!authStore.isLoggedIn && type == "sample") {
    toast.info("Login to continue");
    authOpen.value = true;
    return;
  }
  isOpen.value = true;
  requestType.value = type;
}
function toggleModal(val) {
  active.value = val;
}
const mypackage = computed(() =>
  selectedPackage.value ? JSON.parse(selectedPackage.value) : null
);
const counter = ref(1);
const cartLoading = ref(false);
function handleCart(type) {
  if (!selectedPackage.value) {
    toast.info("Please choose a package");
    return;
  }

  if (counter.value < 1) {
    toast.info("Please enter a quantity");
    return;
  }
  cartLoading.value = true;
  let data = {
    id: 0,
    packageId: mypackage?.value.package.id,
    unit: mypackage?.value.unit,
    productId: productData?.value?.id,
    product: productData?.value.name,
    productImg: productData.value?.gallery?.length
      ? productData.value?.gallery[0]
      : productData.value?.featuredPhoto,
    selectedPackage: mypackage?.value.package?.title,
    selectedPackageData: mypackage.value,
    productBrandName: productData?.value.productBrandName,
    supplierId: productData?.value.supplierId,
    producer: productData.value?.manufacturer,
    quantity: counter.value,
    packagePrice: mypackage?.value.amount * mypackage?.value.size,
  };

  cartStore?.addToCart(data, type).then((res) => {
    if (!res.status && res.message === "incart") {
      toast.info("Already in cart");
    }
    if (res.status && res.message !== "buy") {
      isAdded.value = true;
      setTimeout(() => {
        isAdded.value = false;
      }, 3000);
    }
    if (res.message === "buy") {
      router.push("/customer/cart");
    }
    cartLoading.value = false;
  });
}

const requestloading = ref(false);
function handleOrderRequest(type) {
  requestACall();
  if (!authStore.isLoggedIn) {
    toast.info("Login to continue");
    authOpen.value = true;
    return;
  }

  if (counter.value < 1) {
    toast.info("Please enter a quantity");
    return;
  }
  let data = {
    id: 0,
    packageId: mypackage?.value.package.id,
    unit: mypackage?.value.unit,
    productId: productData?.value?.id,
    product: productData?.value.name,
    productImg: productData.value?.gallery?.length
      ? productData.value?.gallery[0]
      : productData.value?.featuredPhoto,
    selectedPackage: mypackage?.value.package?.title,
    selectedPackageData: mypackage.value,
    productBrandName: productData?.value.productBrandName,
    supplierId: productData?.value.supplierId,
    producer: productData.value?.manufacturer,
    quantity: counter.value,
    packagePrice: mypackage?.value.amount * mypackage?.value.size,
  };
  requestloading.value = true;
  cartStore?.addToCart(data, type).then(() => {
    confirmpurchase({ shippingAddressId: shippingStore?.defaultAddress?.id })
      .then((res) => {
        if (res.status === 200) {
          requestloading.value = false;
          cartStore?.clearCart();
          window.location.href = `/order-success?orderId=${res.data.data}&order_type=requests`;
        }
      })
      .catch((err) => {
        const error = `${
          err?.response?.data?.Message || err?.response?.data?.message
        }, Contact us for assistance on your order`;
        toast.error(error);
        requestloading.value = false;
      });
  });
}

function togglePopup() {
  isOpen.value = false;
}

watch(
  () => [packageOptions.value],
  () => {
    if (packageOptions.value?.length) {
      selectedPackage.value = packageOptions.value[0]?.value;
    }
  }
);
watch(productData, () => {
  supplierStore.fetchSupplier(productData.value.supplierId);
  imageUrl.value = productData?.value?.featuredPhoto;
});
provide("counter", counter);
provide("toggleModal", toggleModal);
provide("togglePopup", togglePopup);
provide("product", productData);
provide("isOpen", isOpen);
provide("authOpen", authOpen);
provide("action", null);
provide("handleOrderRequest", null);
provide("handleProceed", null);
</script>
