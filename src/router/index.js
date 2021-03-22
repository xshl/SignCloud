import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./tools";
import login from "./login";

Vue.use(VueRouter);

const AsyncLoad = tool.AsyncLoad;

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => AsyncLoad(import("@/views/home.vue")),
    },
    login,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;