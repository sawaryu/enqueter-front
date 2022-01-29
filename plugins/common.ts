export default ({ app: { $config } }, inject: any) => {
  const avatar = (src: string) => {
    return $config.avatarUrl + src
  }
  inject('avatar', avatar);
};