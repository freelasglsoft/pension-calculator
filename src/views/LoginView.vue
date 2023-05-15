<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const phone = '15991906226'
const text = 'Quero saber mais sobre o Simulador de Pensão.'
const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`

const loading = ref(false)

const login = () => {
  loading.value = true
  router.push({ name: 'main' })
}
</script>

<template>
  <div class="login">
    <div class="form">
      <div class="mb-6 text-center">Bem-vindo de volta!</div>
      <v-text-field
        label="Email"
        v-model="email"
        variant="solo"
        class="mb-6"
        color="#404040"
      />
      <v-text-field
        label="Senha"
        v-model="password"
        variant="solo"
        color="#404040"
        class="mb-6"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      />
      <v-btn class="login-btn mb-6" height="56" :loading="loading" @click="login">Entrar</v-btn>
      <div class="text-center">Não possui uma conta? <a class="text-link" :href="url" target="_blank">Experimente agora!</a></div>
    </div>
  </div>
</template>

<style scoped>
.login {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 400px;
}
.login-btn {
  width: 100%;
  background-color: #404040;
  color: #399B53;
  transition: all 0.3s ease-in-out;
}
.login-btn:hover {
  transform: scale(1.05); /* move o botão um pouco para cima */
}
.login-img {
  width: 100%;
  border-radius: 20px 0 0 20px;
}
.text-link {
  color: #399B53;
}
</style>
