# Enqueter Front

```html
(dominance of&nbsp;<span style="color: #bbdefb">No</span>)
```

```diff
-    remove(question_id: number){
-      this.questions = this.questions.filter((q: Question) => q.id !== question_id)
-    }
-  }
+    remove(question_id: number) {
+      this.questions = this.questions.filter(
+        (q: Question) => q.id !== question_id
+      );
+    },
+  },
```

## Tasks

`1/15`
* Questionの状態判断を見た目から用意にする。: ok
* question show page をcloseの場合に結果のみを表示する。: ok
* breakpointがxs,smを同一グリッドレイアウトにする。 : ok
 -setting: ok
 -profile(インスタを真似る): ok
 -questions: ok
 -home: ok
* 質問切れ時のメッセージ最適化わかりやすく: ok
* Create answer modalの説明(クローズ日時): ok

`1/16`
* question deleteをmy pageのみで実行表示できるように修正: ok
* (最優先)createQuestion, introduceに改行処理: ok (pre-wrapでおkだった)
* introduce 「http://」でリンク化: 

`追々対応`
* ER図の作成
* point system 最適化
* ※高難易度:next questionを押下後にヘッダーのバグが生じる(対応策としてxs,smでは検索をモーダル化する) :
* ※高難易度:report system

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