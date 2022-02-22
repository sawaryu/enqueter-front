import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken4,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.orange.darken3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})
