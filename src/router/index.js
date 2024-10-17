import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/vendor/index.vue";

const localName = window.matta.vendor || "vendor";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Storefront",
      component: HomeView,
      props: true, // Enable props to pass the route params to the component
    },
    {
      path: "/product/:name/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/customer/cart",
      name: "shopping cart",

      component: () =>
        import(/* webpackChunkName: "shoppingcart" */ "../views/CartView.vue"),
      meta: {
        title: "Shopping cart - Matta Trade",

        metaTags: [
          {
            name: "description",
            content: "Shopping cart  of Matta Trade.",
          },
          {
            property: "og:description",
            content: "Shopping cart  page Matta Trade.",
          },
        ],
        breadcrumbs: [
          {
            name: "overview",
            url: "/dashboard",
          },

          {
            name: "Shopping cart",
            url: "#",
          },
        ],
        requiresAuth: true,
      },
    },
    {
      path: "/order/checkout",
      name: "checkout",

      component: () =>
        import(/* webpackChunkName: "checkout" */ "../views/CheckoutView.vue"),
      meta: {
        title: "Checkout - Matta Trade",

        metaTags: [
          {
            name: "description",
            content: "Checkout  of Matta Trade.",
          },
          {
            property: "og:description",
            content: "Checkout  page Matta Trade.",
          },
        ],
        breadcrumbs: [
          {
            name: "overview",
            url: "/dashboard",
          },
          {
            name: "shopping cart",
            url: "/customer/cart",
          },
          {
            name: "Checkout",
            url: "#",
          },
        ],
      },
    },
    {
      path: "/order-success",
      name: "success",

      component: () =>
        import(
          /* webpackChunkName: "ordersuccess" */ "../views/OrderSuccessView.vue"
        ),
      meta: {
        title: "Order Succcess - Matta Trade",

        metaTags: [
          {
            name: "description",
            content: "Order Succcess  of Matta Trade.",
          },
          {
            property: "og:description",
            content: "Order Succcess  page Matta Trade.",
          },
        ],
        breadcrumbs: [],
      },
    },
  ],
});

export default router;
