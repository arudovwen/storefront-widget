<template>
  <div class="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px]">
    <div class="px-5 pt-3 pb-4">
      <div class="mb-6">
        <CheckoutShippingAddress :detail="shippingStore?.defaultAddress" />
      </div>
      <div
        class="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-y-0 md:gap-x-4"
      >
        <AppButton
          @click="openModal('edit')"
          text="New shipping address"
          icon="icon-park-outline:plus"
          btnClass="bg-primary-500  text-white !px-4
      !sm:px-6 !py-[9px] text-xs sm:text-sm"
        />

        <AppButton
          v-if="shippingStore?.addressesData?.length"
          @click="openModal('select')"
          text="Change address"
          btnClass="!px-4
      !sm:px-6 !py-[0px] text-sm hover:underline"
        />
      </div>
    </div>
  </div>

  <ModalCenter>
    <template #default>
      <div class="w-full max-w-[500px] p-6 md:py-9 md:px-10 z-[999] relative">
        <CheckoutShippingEditForm v-if="type === 'edit'" />
        <CheckoutSelect v-if="type === 'select'" />
      </div>
    </template>
  </ModalCenter>
  <DeleteModal
    @deleteItem="deleteItem"
    title=" Remove Shipping Address"
    :open="isDeleteOpen"
    btnText="Delete address"
    :loading="deleteLoading"
    @close="
      () => {
        isDeleteOpen = false;
        isOpen = true;
      }
    "
  />
</template>
<script setup>
import ModalCenter from "@/components/Modal/Center.vue";
import CheckoutShippingEditForm from "./shipping/EditForm.vue";
import CheckoutShippingAddress from "./shipping/Address.vue";
import CheckoutSelect from "./Select.vue";
import { ref, provide, onMounted } from "vue";
import AppButton from "@/components/AppButton.vue";

import { deleteAddress } from "~/services/cartservice";
import { toast } from "vue3-toastify";
import { useShippingStore } from "@/stores/shipping";
import DeleteModal from "../DeleteModal.vue";
const shippingStore = useShippingStore();
const type = ref("edit");
const detail = ref(null);
const isOpen = ref(false);
const isDeleteOpen = ref(false);
const deleteLoading = ref(false);
function openModal(val) {
  type.value = val;
  isOpen.value = true;
}
onMounted(() => {
  shippingStore.getAlladdress();
});

function deleteItem() {
  deleteLoading.value = true;
  deleteAddress(detail.value.id)
    .then(() => {
      shippingStore.getAlladdress();
      deleteLoading.value = false;
      isDeleteOpen.value = false;
      isOpen.value = true;
      type.value = "select";
    })
    .catch((err) => {
      deleteLoading.value = false;
      toast.error(err?.response?.data?.Message || err?.response?.data?.message);
    });
}
provide("type", type);
provide("isOpen", isOpen);
provide("detail", detail);
provide("isDeleteOpen", isDeleteOpen);
provide("deleteLoading", deleteLoading);
</script>
