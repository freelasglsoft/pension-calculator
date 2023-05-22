import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBT9VSFoQ0qYJPrvUN24l0LeKYPKji_S9Y",
  authDomain: "freelasgl.firebaseapp.com",
  projectId: "freelasgl",
  storageBucket: "freelasgl.appspot.com",
  messagingSenderId: "178892127039",
  appId: "1:178892127039:web:b335c9a4ec4f4d0112b18a",
  measurementId: "G-2ZZXYBSG74"
};

initializeApp(firebaseConfig);

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
