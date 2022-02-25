import { Context } from "@nuxt/types";
export default (context: Context, inject: any): void => {
  const { $accessor } = context.app
  const { $config } = context

  // Avatar
  const avatar = (src: string) => {
    return $config.avatarUrl + src
  }
  inject('avatar', avatar);

  // Reset store
  const resetStore = () => {
    $accessor.questions.reset();
    $accessor.timeline.reset();
    $accessor.alert.reset();
    $accessor.analytics.reset();
    $accessor.dialog.reset();
    $accessor.error.reset();
    $accessor.ranking.reset();
  }
  inject('resetStore', resetStore);
};