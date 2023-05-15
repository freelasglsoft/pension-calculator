<script setup lang="ts">
import { ref } from 'vue'

interface Category {
  text: string;
  items: { description: string, value: number }[];
  isDebit: boolean;
}

const categories: Category[] = [
  {
    text: 'Renda Mensal',
    items: [],
    isDebit: false
  }
]

const currentCategory = ref(categories[0])
</script>

<template>
  <div class="main">
    <div>
      {{ currentCategory.text }}
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 90%;
}
</style>