<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBarComponent.vue'
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
  overflow: hidden !important;
}
@media screen and (max-width: 600px) {
  html {
    overflow: auto !important;
  }
}

body {
  font-family: 'Montserrat', sans-serif;
}

.max-width-app {
  max-width: 1280px;
  margin: 0 auto;
}
</style>