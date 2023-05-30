<script setup lang="ts">
import { ExpenseType, type ICategory, type Item } from '@/models/ICategory'
import { useCategoriesStore } from '@/stores/categories'
import {  ref, watch, type Ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CurrencyFormatter from '@/components/CurrencyFormatter.vue'
import CurrencyInput from '@/components/CurrencyInput.vue'

const store = useCategoriesStore()
const route = useRoute()
const router = useRouter()

const currentCategory: Ref<ICategory> = ref({description: '', items: [], order: 0, totalValue: 0, type: ExpenseType.DEFAULT })

const newDescription = ref('')
const newValue = ref(0)

const descriptionElement: Ref<any> = ref('')

const currentCategoryType = computed(() => {
  const type: Record<ExpenseType, string> = {
    [ExpenseType.DEFAULT]: 'Comum',
    [ExpenseType.EXCLUSIVE]: 'Exclusiva'
  }
  return type[currentCategory.value.type]
})

const currentCategoryTotalValue = computed(() => currentCategory.value.items.reduce((acc, curr) => acc + curr.value, 0))

const hasPrevCategory = computed(() => currentCategory.value.order !== 0)

const hasNextCategory = computed(() => currentCategory.value.order !== 6)

onMounted(() => {
  const order = Number(route.query.current)
  currentCategory.value = store.findCategory(order)
})

watch(() => route.query.current, (newValue) => {
  const order = Number(newValue)
  currentCategory.value = store.findCategory(order)
})

const previous = () => {
  router.replace({ query: { current: (currentCategory.value.order - 1) } })
}

const next = () => {
  router.replace({ query: { current: (currentCategory.value.order + 1) } })
}

const finish = () => {
  router.push({ name: 'genitor' })
}

const addNewItem = () => {
  if (!newDescription.value || !newValue.value) return

  const newItem: Item = { description: newDescription.value, value: newValue.value }
  store.addItem(currentCategory.value.order, newItem)

  newDescription.value = ''
  newValue.value = 0

  descriptionElement.value?.$el.querySelector('input')?.focus()
}


</script>

<template>
  <div class="main">
    <div class="d-flex align-center justify-space-between my-2">
      <span class="d-flex align-center justify-end">
        <b>{{ currentCategory.description }} - {{ currentCategoryType }}</b>
      </span>
      <span class="d-flex align-center justify-end">
        <b><CurrencyFormatter :number="currentCategoryTotalValue"/> </b>
      </span>
    </div>
    <div class="py-1 d-flex align-center justify-center">
      <v-text-field v-model="newDescription" variant="underlined" label="Descrição" @keyup.enter="addNewItem" ref="descriptionElement" hide-details></v-text-field>
      <CurrencyInput v-model="newValue" class="px-2" label="Valor" @keyup.enter="addNewItem"></CurrencyInput>
      <v-btn size="small" icon="mdi-plus" flat @click="addNewItem"></v-btn>
    </div>
    <div class="scrollable-container mb-4">
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in currentCategory.items"
            :key="index"
            class="pl-1 mb-2 pr-0"
            ripple
          >
          <div class="d-flex align-center justify-center">
            <CurrencyInput v-model="item.value" :label="item.description"></CurrencyInput>
            <v-btn size="small" icon="mdi-close" flat @click="store.removeItem(currentCategory.order, index)"></v-btn>
          </div> 
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <div class="d-flex justify-end">
      <v-btn class="mr-2" @click="previous" v-if="hasPrevCategory">
        <v-icon left>mdi-arrow-left-thin</v-icon> Anterior
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" @click="next" v-if="hasNextCategory">
        Próxima <v-icon right>mdi-arrow-right-thin</v-icon>
      </v-btn>
      <v-btn class="mr-2" @click="finish" v-else>
        Finalizar <v-icon right>mdi-check</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style>
.main {
  padding: 0 8px;
}

.scrollable-container {
  height: calc(100vh - 280px);
  overflow-x: scroll;
}
</style>