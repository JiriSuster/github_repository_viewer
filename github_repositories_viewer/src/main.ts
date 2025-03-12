import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: {
        dark: true,
        colors: {
          humanit_main: '#37bfb5',
          humanit_darker: '#089A8F',
          humanit_lighter: '#B2F4EF',
        },
      },
    },
  },
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueAwesomePaginate)
app.mount('#app')
