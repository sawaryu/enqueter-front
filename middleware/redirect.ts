import { Context } from "@nuxt/types";
export default function (context: Context): void {
  const {store, route, redirect} = context;
  if (store.state.auth.loggedIn) {
    if (route.path.indexOf('welcome') !== -1) {
      redirect("/");
    }
    if (store.state.auth.user.role != "admin" && route.path.indexOf('admin') !== -1) {
      redirect("/");
    }
  }
}