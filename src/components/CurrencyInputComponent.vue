<template>
  <v-text-field
    label="Valor"
    v-model="formattedValue"  variant="solo"
    color="#404040"
    class="mr-4"
    hide-details
    prefix="R$"
    clearable
    @input="updateValue"
    style="width: 200px;"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const rawValue = ref('');
const formattedValue = ref('');

watch(rawValue, (newValue) => {
  formattedValue.value = formatCurrency(newValue);
});

function formatCurrency(value: any) {
  // Converte o valor para float
  const floatValue = parseFloat(value.replace(/\D/g, '')) / 100;
  
  // Formata o valor como moeda brasileira
  return floatValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateValue(event: any) {
  // Remove tudo que não é número ou ponto do valor digitado
  const raw = event.target.value.replace(/[^\d.]/g, '');
  
  // Atualiza o valor bruto e deixa a formatação para o watcher
  rawValue.value = raw;
}
</script>