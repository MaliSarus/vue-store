import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsPage from "@/pages/ProductsPage";
import ErrorPage from "@/pages/ErrorPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";

Vue.use(VueRouter);

const routes = [
  {
    name: 'products',
    component: ProductsPage,
    path: '/'
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id'
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart'
  },
  {
    name: 'error',
    component: ErrorPage,
    path: '*'
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
