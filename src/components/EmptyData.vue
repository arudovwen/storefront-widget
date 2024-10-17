<template>
  <div
    class="flex flex-col items-center justify-center p-4 h-[300px] text-gray-400 text-center"
    :class="className"
  >
    <div class="mb-6 flex justify-center">
      <img alt="empty" src="@/assets/empty.svg" :class="`${classIcon} w-32`" />
    </div>
    <p :class="titleClass" class="text-lg text-[#101828] font-semibold mb-2">
      {{ title || "No data available" }}
    </p>
    <p
      v-if="subtext"
      class="text-sm text-[#475467] max-w-[352px] mx-auto text-center"
    >
      {{ subtext }}
    </p>
    <AppButton
      @click="emits('btnFunction')"
      v-if="btnText"
      :text="btnText"
      btnClass="!py-[10px] bg-primary-500 text-white mt-3 !rounded-lg"
      :icon="btnIcon"
    />
  </div>
</template>
<script setup>
import AppButton from "./AppButton.vue";

defineProps([
  "title",
  "subtext",
  "btnText",
  "url",
  "type",
  "btnIcon",
  "className",
  "classIcon",
  "titleClass",
]);
const emits = defineEmits(["btnFunction"]);
</script>
