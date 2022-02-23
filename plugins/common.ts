import { Context } from "@nuxt/types";
export default (context: Context, inject: any) => {
  const { $accessor } = context.app
  const { $config } = context

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
  }
  inject('resetStore', resetStore);
};