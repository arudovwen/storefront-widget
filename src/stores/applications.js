import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getTechmenu } from "~/services/productservices";

export const useApplicationStore = defineStore("applications", () => {
  const applications = ref([]);
  const applicationMenu = ref([]);

  const applicationsData = computed(() => applications.value);
  const applicationMenuData = computed(() => applicationMenu.value);
  function setApplications(data) {
    applications.value = data;
  }
  function getAppMenu(value) {
    getTechmenu(value).then((res) => {
      applicationMenu.value = res.data.data;
    });
  }

  return {
    applications,
    applicationsData,
    setApplications,
    applicationMenuData,
    getAppMenu,
  };
});
