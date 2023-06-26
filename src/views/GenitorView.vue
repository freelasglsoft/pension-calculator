<script setup lang="ts">
import router from '@/router'
import { useCategoriesStore } from '@/stores/categories'
import { ref } from 'vue'
import CurrencyInput from '@/components/CurrencyInput.vue'

const store = useCategoriesStore()
const loading = ref(false)

const goToResults = () => {
  if (!store.quantity) return

  loading.value = true
  store.generateResults()
  setTimeout(() => { 
    loading.value = false 
    router.push({ name: 'results' })
  }, 2000)  
}

</script>

<template>
  <div class="main-container">
    <v-row justify="center">
      <h2>Renda Líquida</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete v-model="store.gender" hide-details variant="underlined" label="Gênero" :items="['Genitor', 'Genitora']"></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <CurrencyInput v-model="store.genitor" label="Salário da genitor"></CurrencyInput>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <CurrencyInput v-model="store.genitora" label="Salário da genitora"></CurrencyInput>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="store.quantity"
                type="number"
                label="Quantidade de moradores na casa"
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex align-center justify-end mt-4">
            <v-btn class="mr-2" @click="goToResults" :loading="loading">
              Resultados <v-icon right class="ml-1">mdi-notebook</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.main-container {
  height: 80vh;
  margin-top: 16vh;
}
</style>