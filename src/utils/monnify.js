/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid

export function payWithMonnify(data, onModalClose, onSuccess) {
  console.log("🚀 ~ payWithMonnify ~ data:", data);
  window.MonnifySDK.initialize({
    amount: data.amount,
    currency: "NGN",
    reference:
      data.reference || "" + Math.floor(Math.random() * 1000000000 + 1),
    customerName: data.name,
    customerEmail: data.email,
    apiKey: import.meta.env.VITE_APP_MONNIFYISTEST,
    contractCode: import.meta.env.VITE_APP_MONNIFYCONTRACTCODE,
    paymentDescription: "Order payment",
    isTestMode: import.meta.env.VITE_APP_MONNIFYISTESTMODE,
    metadata: {},
    paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD", "PHONE_NUMBER"],
    incomeSplitConfig: [],
    onComplete: function (response) {
      onSuccess(response);
    },
    onClose: function (data) {
      if (data.responseCode === "USER_CANCELLED") {
        onModalClose();
      }
      if (data.status === "FAILED") {
        onModalClose();
      }
    },
  });
}
