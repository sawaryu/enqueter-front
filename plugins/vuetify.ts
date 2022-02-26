import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken4,
        error: colors.amber.darken4
      }
    },
  },
})