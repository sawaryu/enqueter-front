export default ({ app: { $axios, $accessor } }) => {
  $axios.onError(error => {
    const statusCode = error.response.status;
    // TODO (when account delete)
    if (statusCode == 400 || statusCode == 409 || statusCode == 401) {
      $accessor.flash.showMessage(
        {
          message: error.response.data.message,
          type: "error",
          status: true,
        },
        { root: true }
      );
    }
    else if (statusCode == 500) {
      $nuxt.error({
        statusCode: statusCode,
        message: "Server erros occured.",
      });
    } else if (statusCode == 503) {
      $nuxt.error({
        statusCode: statusCode,
        message: "You can't use the service because of the server maintenance.",
      });
    } else if (statusCode == 404) {
      $nuxt.error({
        statusCode: statusCode,
        message: "Not found",
      });
    } else if (statusCode == 403) {
      $nuxt.error({
        statusCode: statusCode,
        message: "you don`t have the authorization for access to this page.",
      });
    }
    return;
  });
};