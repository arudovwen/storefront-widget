<template>
  <div class="py-2" v-if="detail">
    <div class="flex justify-between items-center">
      <p class="text-base font-bold mb-[10px] capitalize">
        {{ detail.firstName }} {{ detail.lastName }}
      </p>
      <AppIcon
        v-if="active"
        icon="lets-icons:check-fill"
        class="text-[#2176FF] text-lg"
      />
    </div>
    <p class="text-sm mb-[7px] max-w-[280px]">
      {{ detail.street }}
    </p>
    <p class="text-sm">
      {{ detail.lga }},&nbsp; {{ detail.state }},&nbsp; {{ detail.country }}
    </p>
  </div>
</template>

<script setup>
import AppIcon from "@/components/AppIcon.vue";
import { defineProps } from "vue";
defineProps(["active", "detail"]);
</script>
