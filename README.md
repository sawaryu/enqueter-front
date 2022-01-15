# Enqueter Front

## Tasks

`1/15`
* Questionの状態判断を見た目から用意にする。: ok
* question show page をcloseの場合に結果のみを表示する。: ok
* breakpointがxs,smを同一グリッドレイアウトにする。 : おおよそok
 -setting: ok
 -profile(インスタを真似る): ▲
 -questions: ok
 -home: ok
* 質問切れ時のメッセージ最適化わかりやすく: ok
* Create answer modalの説明(クローズ日時): ok

`1/16`
* question delete の構成を考え、反映する。
* ※高難易度:next questionを押下後にヘッダーのバグが生じる(対応策としてxs,smでは検索をモーダル化する) :

## Summary
EnqueterプロジェクトのFront。Vue.js(Nuxt.js)を使用

* setup
```
# confirm vue version
$ yarn list vue
yarn list v1.22.17
warning Filtering by arguments is deprecated. Please use the pattern option instead.
└─ vue@2.6.14
✨ Done in 0.68s.

# global install (ok once)
$ npm install -g yarn

# terminal
$ yarn add @nuxtjs/vuetify -D

# nuxt.config.js
{
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ]
}
```

## vuexのtypescript化
（参考）
> https://tech.smartshopping.co.jp/nuxt-typed-vuex


## build and CI/CD
* build

```
$ yarn run generate
```

* confirming netlify
```
drag dist dir on your netlify
```