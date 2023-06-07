<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBarComponent.vue'
import { onMounted } from 'vue'
import { getAuth } from 'firebase/auth'

const router = useRouter()

onMounted(() => {
  const auth = getAuth()
  auth.onAuthStateChanged(user => {
    if (user) return
    localStorage.clear()
    router.push('/login')
  })
})
</script>

<template>
  <v-app class="max-width-app" style="background: transparent;">
    <NavBar></NavBar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
html {
}
@media screen and (max-width: 600px) {
  html {
    overflow: auto !important;
  }
}

body {
  font-family: 'Montserrat', sans-serif;
}

/* Personaliza o scrollbar em navegadores que suportam a propriedade scrollbar-width */
/* Define a largura do scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

/* Define a cor do scrollbar */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

/* Define a cor da área que não é ocupada pelo scrollbar */
::-webkit-scrollbar-track {
  background-color: transparent;
}

/* Personaliza o scrollbar em navegadores que não suportam a propriedade scrollbar-width */
/* Define a largura do scrollbar */
body::-webkit-scrollbar {
  width: 10px;
}

/* Define a cor do scrollbar */
body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

/* Define a cor da área que não é ocupada pelo scrollbar */
body::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.max-width-app {
  max-width: 1280px;
  margin: 0 auto;
}
</style>