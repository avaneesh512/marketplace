import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import register from "../views/register.vue";
import dashboard from "../views/dashboard.vue";
import landing from "../views/landing.vue";
import contactus from "../views/contact-us.vue";
import orders from "../views/orders.vue";
import products from "../views/products.vue";
import profile from "../views/profile.vue";
import admin from "../views/admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: landing
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/contact-us",
    name: "contactus",
    component: contactus,
  },
  {
    path: "/orders",
    name: "orders",
    component: orders,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/products",
    name: "products",
    component: products,    
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
    meta: { requiresAuth: true }
  }

];

const router = new VueRouter({
  mode: 'history',
  baseUrl: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth)) {
   
    if (!loggedIn ) {
      next("/login")
    } else {
      next()
    }
  }else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (loggedIn) {
      next("/")
    } else {
      next()
    }
  }
  else {
    next()
  }
})

export default router;
