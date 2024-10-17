/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const loggedUser = ref("");
    const hasPin = ref(false);
    const language = ref(window?.navigator?.language);
    const isLoggedIn = computed(() => !!loggedUser.value);
    const refresh_token = computed(() => loggedUser?.value?.jwToken);
    const access_token = computed(() => loggedUser?.value?.jwToken);
    const roles = computed(() => loggedUser?.value?.roles);
    const userId = computed(() => loggedUser?.value?.id);
    const userType = computed(() => loggedUser?.value?.businessUserType);
    const businessId = computed(() => loggedUser?.value?.businessId);
    const userInfo = computed(() => loggedUser?.value);

    function setLoggedUser(data) {
      loggedUser.value = data;
    }

    function setHasPin(data) {
      hasPin.value = data;
    }

    function setAccessToken(value) {
      let userInfo = { ...loggedUser?.value, access_token: value };
      setLoggedUser(userInfo);
    }
    function setRefreshToken(value) {
      let userInfo = { ...loggedUser?.value, refresh_token: value };
      setLoggedUser(userInfo);
    }
    function updateUser(value) {
      let userInfo = { ...loggedUser?.value, fullName: value };
      setLoggedUser(userInfo);
    }
    function updateAccountType(value) {
      let userInfo = { ...loggedUser?.value, accountType: value };

      setLoggedUser(userInfo);
    }
    function updateUserInfo(data) {
      let userInfo = { ...loggedUser?.value, ...data };
      setLoggedUser(userInfo);
    }

    const logOut = () => {
      localStorage.clear();
      setLoggedUser(null);
      setHasPin(false);
      window.location.href = "/";
    };
    return {
      updateUser,
      isLoggedIn,
      refresh_token,
      access_token,
      roles,
      userId,
      userType,
      userInfo,
      setRefreshToken,
      setAccessToken,
      updateAccountType,
      updateUserInfo,
      setLoggedUser,
      logOut,
      loggedUser,
      businessId,
      language,
      setHasPin,
      hasPin,
    };
  },
  {
    persist: true,
  }
);
