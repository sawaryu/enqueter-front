export default ({ app: { $config } }, inject) => {
  const avatar = (src) => {
    return $config.avatarUrl + src
  }
  inject('avatar', avatar);
};