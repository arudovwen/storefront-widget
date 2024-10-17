<template>
  <div class="bg-white w-full">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Shipping address
    </legend>
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-4 w-full"
    >
      <div>
        <Textinput
          placeholder=""
          label="First name"
          type="text"
          name="firstName"
          v-bind="firstNameAtt"
          v-model="firstName"
          :error="errors.firstName"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Last name"
          type="text"
          name="lasttName"
          v-bind="lastNameAtt"
          v-model="lastName"
          :error="errors.lastName"
        />
      </div>

      <FormGroup label="Country" :error="errors.country" name="country">
        <VueSelect
          v-model="country"
          :options="allcountries"
          :reduce="(country) => country.value"
          placeholder="Select country"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.country ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup label="State" :error="errors.state" name="state">
        <VueSelect
          v-model="state"
          :disabled="!country"
          :options="states"
          :reduce="(state) => state.value"
          placeholder="Select state"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <FormGroup label="LGA" :error="errors.lga" class="lg:col-span-2">
        <VueSelect
          class="w-full"
          v-model.value="lga"
          :options="lgasOption"
          placeholder="Select your lga"
          name="lga"
          :reduce="(lga) => lga.value"
          :disabled="country?.toLowerCase() !== 'nigeria'"
        />
      </FormGroup>

      <FormGroup class="lg:col-span-2" label="Street" :error="errors.street">
        <SearchSelect
          class="w-full"
          v-model.value="street"
          :options="addressOptions"
          placeholder=""
          name="street"
          :reduce="(address) => address.value"
        />
      </FormGroup>

      <div class="lg:col-span-2 grid gap-y-[22px] mt-4">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Add address"
          btnClass="bg-primary  text-white !px-4 rounded-lg
      !sm:px-6 !py-[14px]"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { addshipping, addressSearch } from "@/services/cartservice";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import { inject, ref, computed, watch } from "vue";
import Textinput from "@/components/Textinput/index.vue";
import FormGroup from "@/components/FormGroup/index.vue";
// import Checkbox from "@/components/Checkbox.vue";
import AppButton from "@/components/AppButton.vue";
import VueSelect from "@/components/Select/VueSelect.vue";
import SearchSelect from "@/components/Select/SearchSelect.vue";
import { useRoute } from "vue-router";
import Lgas from "@/utils/lgastate.json";

const route = useRoute();
const getData = inject("getData");
const isOpen = inject("isOpen");
// const shippingStore = useShippingStore();
const isLoading = ref(false);
const formValues = {
  firstName: "",
  lastName: "",
  street: "",
  country: "Nigeria",
  state: "",
  lga: "",
  postalCode: "1000",
  city: "lagos",
  isDefault: true,
  busininessId: route.params.id,
};

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  street: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Lga is required"),
  postalCode: yup.string().required("Postal code is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

// const [isDefault, isDefaultAtt] = defineField("isDefault");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [street] = defineField("street");
const [country] = defineField("country");
const [state] = defineField("state");
const [lga] = defineField("lga");

const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      label: `${item.name}`,
      value: item.name,
    };
  });
});
const mystates = computed(() => {
  if (!country.value) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == country.value.toLowerCase()
  ).states;
});

const lgasOption = computed(() => {
  return Lgas.find(
    (i) => i?.state?.toLowerCase() === state?.value?.toLowerCase()
  )?.lgas?.map((i) => {
    return { label: i, value: i };
  });
});
const states = computed(() => {
  return mystates.value.map((item) => {
    return {
      id: item.code,
      label: item.name,
      value: item.name,
    };
  });
});

const addressOptions = ref([]);
watch(street, () => {
  addressSearch({ text: street.value }).then((res) => {
    if (res.status === 200) {
      addressOptions.value = res.data.map((i) => ({
        label: i.label,
        value: i.label,
      }));
    }
  });
});
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  addshipping(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address added");
        getData();
        isOpen.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    });
});
</script>
