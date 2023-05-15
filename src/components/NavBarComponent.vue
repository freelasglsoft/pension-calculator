<script setup lang="ts">
import router from '@/router'

const toLogin = () => router.push({ name: 'login' })
</script>

<template>
  <nav class="nav-bar">
    <RouterLink to="/" class="d-flex align-center justify-center">
      <img src="@/assets/logo.png" alt="Logo" width="160">
    </RouterLink>
    <v-btn class="nav-btn text-capitalize" flat @click="toLogin">
      Acessar
    </v-btn>
  </nav>
</template>

<style scoped>
.nav-bar {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  height: 88px;
}
.nav-btn {
  transition: all 0.3s ease-in-out;
}

.nav-btn:hover {
  background-color: #404040;
  color: #399B53;
  transform: scale(1.05); /* move o botão um pouco para cima */
}
</style>