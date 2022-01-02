export default function ({ redirect, store, route }): void {
  if (store.state.auth.loggedIn) {
    if (route.path.indexOf('welcome') !== -1) {
      redirect("/");
    }
    if (store.state.auth.user.role != "admin" && route.path.indexOf('admin') !== -1) {
      redirect("/");
    }
  }
}