import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
  path: "/login",
  component: () => AsyncLoad(import("@/views/login")),
  children: [
    {
      path: "",
      name: "Login",
      component: () => AsyncLoad(import("@/views/login/login.vue"))
    },
    {
      path: "register",
      name: "Register",
      component: () => AsyncLoad(import("@/views/login/register.vue"))
    },
    {
      path: "forgetPassword",
      name: "ForgetPassword",
      component: () => AsyncLoad(import("@/views/login/forgetPassword.vue"))
    },
  ]
};