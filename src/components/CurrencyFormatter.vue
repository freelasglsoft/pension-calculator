<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    required: true
  }
})

const formattedNumber = computed(() => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatter.format(props.number)
})
</script>

<template>
  <span>{{ formattedNumber }}</span>
</template>
