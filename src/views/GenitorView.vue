<script setup lang="ts">
import CurrencyInput from '@/components/CurrencyInputComponent.vue'
import router from '@/router';
import { useCategoriesStore } from '@/stores/categories'

const store = useCategoriesStore()

const goToResults = () => router.push({ name: 'results' })

</script>

<template>
  <div class="d-flex flex-column align-center justify-space-between main">
    <h1>Renda Mensal</h1>
    <div class="d-flex align-center justify-space-arround" style="width: 100%;">
      <v-text-field v-model="store.genitorValue" type="number" label="Genitor"></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field v-model="store.genitoraValue" type="number" label="Genitora"></v-text-field>
    </div>
    <v-btn @click="goToResults">Resultados</v-btn>
  </div>
</template>

<style scoped>
.main {
  margin-top: 16px;
  padding: 8px;
  height: 90%;
}
</style>