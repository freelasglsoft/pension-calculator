<script setup lang="ts">
const toWhatsApp = () => {
  const phone = '43999206317'
  const text = 'Quero saber mais sobre o Simulador de Pensão.'
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank')
}
</script>

<template>
  <div class="grid">
    <div class="d-flex align-start flex-column justify-center" style="color: #404040;">
      <h1 class="mb-4">Simulador de Pensão</h1>
      <p class="subtitle-1 mb-6">
        Planeje seu futuro financeiro sem perder tempo fazendo os cálculos à mão.<br>Use seu tempo com sabedoria. Rápido e simples.
      </p>
      <v-btn class="hero-btn text-capitalize" flat @click="toWhatsApp">
        Experimente agora
      </v-btn>
    </div>
    <div>
      <img src="@/assets/hero.png" alt="Hero" class="hero-img" loading="lazy">
    </div>
  </div>
</template>

<style scoped>
.grid {
  padding: 16px;
  display: grid;
  height: 90%;
  align-items: center;
  column-gap: 16px;
  grid-template-columns: 1fr 0.8fr;
}
@media screen and (max-width: 600px) {
  .grid {
    display: flex;
    flex-direction: column-reverse;
    justify-content: start;
  }
}
.hero-btn {
  background-color: #404040;
  color: #399B53;
  transition: all 0.3s ease-in-out;
}
.hero-btn:hover {
  transform: scale(1.05); /* move o botão um pouco para cima */
}
.hero-img {
  width: 100%;
  border-radius: 20px;
}
</style>
