import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard/dashboard";
import Login from "../views/Login";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiredAdmin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../components/Categories/list.vue"),
    children: [
      {
        path: "create",
        name: "CategoriesCreate",
        component: () => import("../components/Categories/create.vue"),
      },
      {
        path: "update",
        name: "CategoriesUpdate",
        component: () => import("../components/Categories/update.vue"),
      },
    ],
  },
  {
    path: "/size-gown",
    name: "Gowns",
    component: () => import("../components/Gowns/list.vue"),
    children: [
      {
        path: "create",
        name: "GownsCreate",
        component: () => import("../components/Gowns/create.vue"),
      },
      {
        path: "update",
        name: "GownsUpdate",
        component: () => import("../components/Gowns/update.vue"),
      },
    ],
  },
  {
    path: "/fabrics",
    name: "Fabrics",
    component: () => import("../components/Fabric/list.vue"),
    children: [
      {
        path: "create",
        name: "FabricsCreate",
        component: () => import("../components/Fabric/create.vue"),
      },
      {
        path: "update",
        name: "FabricsUpdate",
        component: () => import("../components/Fabric/update.vue"),
      },
    ],
  },
  {
    path: "/size-types",
    name: "Size",
    component: () => import("../components/Size/list.vue"),
    children: [
      {
        path: "create",
        name: "SizeCreate",
        component: () => import("../components/Size/create.vue"),
      },
      {
        path: "update",
        name: "SizeUpdate",
        component: () => import("../components/Size/update.vue"),
      },
    ],
  },
  {
    path: "/size-types-categories",
    name: "SizeTypeCategories",
    component: () => import("../components/SizeTypeCategories/list.vue"),
    children: [
      {
        path: "create",
        name: "SizeTypeCategoriesCreate",
        component: () => import("../components/SizeTypeCategories/create.vue"),
      },
      {
        path: "update",
        name: "SizeTypeCategoriesUpdate",
        component: () => import("../components/SizeTypeCategories/update.vue"),
      },
    ],
  },
  {
    path: "/designs",
    name: "Design",
    component: () => import("../components/Design/list.vue"),
    children: [
      {
        path: "create",
        name: "DesignCreate",
        component: () => import("../components/Design/create.vue"),
      },
      {
        path: "update",
        name: "DesignUpdate",
        component: () => import("../components/Design/update.vue"),
      },
    ],
  },
  // {
  //   path: "/client",
  //   name: "Client",
  //   component: () => import("../components/Client/listItems.vue"),
  //   children: [
  //     {
  //       path: "create",
  //       name: "DesignCreate",
  //       component: () => import("../components/Client/createOrder.vue"),
  //     },
  //     {
  //       path: "update",
  //       name: "DesignUpdate",
  //       component: () => import("../components/Client/updateOrder.vue"),
  //     },
  //   ],
  // },
  {
    path: "/users",
    name: "User",
    component: () => import("../components/Users/list.vue"),
    children: [
      {
        path: "create",
        name: "UserCreate",
        component: () => import("../components/Users/create.vue"),
      },
      {
        path: "update",
        name: "UserUpdate",
        component: () => import("../components/Users/update.vue"),
      },
      {
        path: "sizes",
        name: "UserSize",
        component: () => import("../components/Users/size.vue"),
      },
    ],
  },
  {
    path: "/admins",
    name: "Admin",
    component: () => import("../components/Admins/list.vue"),
    children: [
      {
        path: "create",
        name: "AdminCreate",
        component: () => import("../components/Admins/create.vue"),
      },
      {
        path: "update",
        name: "AdminUpdate",
        component: () => import("../components/Admins/update.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Order",
    component: () => import("../components/Order/list.vue"),
    children: [
      {
        path: "create",
        name: "OrderCreate",
        component: () => import("../components/Order/create.vue"),
      },
      {
        path: "update",
        name: "OrderUpdate",
        component: () => import("../components/Order/update.vue"),
      },
      {
        path: "show",
        name: "OrderShow",
        component: () => import("../components/Order/show.vue"),
      },
    ],
  },
  {
    path: "/messages",
    name: "Messages",
    component: () => import("../components/Messages/list.vue"),
    children: [
      {
        path: "show",
        name: "MessageShow",
        component: () => import("../components/Messages/update.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "SettingsUpdate",
    component: () => import("../components/Settings/update.vue"),
  },
  {
    path: "/site-info",
    name: "Info",
    component: () => import("../components/Settings/info.vue"),
  },
  {
    path: "/button-case",
    name: "OrderButtonCase",
    component: () => import("../components/Order/buttonCase.vue"),
  },
  {
    path: "/cut-case",
    name: "OrderCutCase",
    component: () => import("../components/Order/cutCase.vue"),
  },
  {
    path: "/ready-to-deliver",
    name: "OrderReadyToDeliver",
    component: () => import("../components/Order/ready_to_deliver.vue"),
  },
  {
    path: "/delivered",
    name: "OrderDelivered",
    component: () => import("../components/Order/delivered.vue"),
  },
  {
    path: "/sewing-case",
    name: "OrderSewingCase",
    component: () => import("../components/Order/sewingCase.vue"),
  },
  {
    path: "/waiting-payment",
    name: "OrderWaitingPayment",
    component: () => import("../components/Order/waitingPayment.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: () => import("../components/profile.vue"),
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role");
  const publicPages = ["Login"];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = store.state.token || localStorage.getItem("token");

  // Check if route requires admin role
  if (to.meta.requiredAdmin && role !== "admin") {
    // Redirect non-admins away from admin-only pages
    if (role === "button_operator") {
      return next("/button-case");
    } else if (role === "sewing_worker") {
      return next("/sewing-case");
    } else if (role === "shear_factor") {
      return next("/cut-case");
    } else if (role === "seller") {
      return next("/orders");
    } else {
      return next("/login");
    }
  }

  // Redirect to login if auth required but not logged in
  if (authRequired && !loggedIn) {
    return next("/login");
  }

  // Redirect to appropriate page if logged in and trying to access login
  if (loggedIn && !authRequired) {
    if (role === "admin") {
      return next("/");
    } else if (role === "button_operator") {
      return next("/button-case");
    } else if (role === "sewing_worker") {
      return next("/sewing-case");
    } else if (role === "shear_factor") {
      return next("/cut-case");
    } else if (role === "seller") {
      return next("/orders");
    } else {
      return next("/login");
    }
  }

  next();
});
export default router;
