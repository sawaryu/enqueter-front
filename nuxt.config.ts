import colors from 'vuetify/lib/util/colors'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Enqueter',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      // add from generator
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      // add from generator
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/common.ts',
    // '@/plugins/vuetify.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // Ignore path. You can't create components with same name.
  components: [
    {
      path: '@/components/',
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex'
  ],
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.grey.darken4,
          error: colors.amber.darken4
        }
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // production: "https://tubuanpanman.com/api/v1"
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api/v1'
  },
  auth: {
    redirect: {
      login: '/welcome', // User will be redirected to this path if login is required.
      logout: '/welcome', // User will be redirected to this path if after logout, current route is protected.
      callback: false,
      home: '/' // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
    },
    localStorage: true,
    strategies: {
      local: {
        scheme: '@/plugins/customSchema.ts',
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 60 * 60,
          required: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          refresh: { url: '/auth/refresh', method: 'post', propertyName: 'refresh_token' },
          user: { url: '/auth/protected', method: 'get', propertyName: false },
          logout: { url: '/auth/logout', method: 'delete', propertyName: 'access_token' }
        }
      }
    }
  },

  // middleware
  router: {
    middleware: ['auth', 'redirect']
  },

  // avatar
  publicRuntimeConfig: {
    avatarUrl: process.env.AVATAR_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /typed-vuex/,
    ],
    extend(config: any, ctx: any) {
    }
  },

  // progress bar loading
  loading: false

}
