export default ({ app: { $config, $accessor } }, inject: any) => {
  const avatar = (src: string) => {
    return $config.avatarUrl + src
  }
  inject('avatar', avatar);

  const resetStore = () => {
    $accessor.questions.reset();
    $accessor.timeline.reset();
    $accessor.alert.reset();
    $accessor.analytics.reset();
    $accessor.dialog.reset();
    $accessor.error.reset();
    $accessor.ranking.reset();
    $accessor.sort.reset();
  }
  inject('resetStore', resetStore);
};