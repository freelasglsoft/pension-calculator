<script setup lang="ts">
import { ExpenseType, type ICategory } from '@/models/ICategory'
import { computed, ref } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import CurrencyInput from '@/components/CurrencyInputComponent.vue'
import router from '@/router'

const categoriesMock: ICategory[] = [
  {
    description: 'Moradia',
    items: [],
    totalValue: 0,
    order: 0,
    type: ExpenseType.DEFAULT
  },
  {
    description: 'Alimentação',
    items: [],
    totalValue: 0,
    order: 1,
    type: ExpenseType.DEFAULT
  },
  {
    description: 'Higiene',
    items: [],
    totalValue: 0,
    order: 2,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Alimentação',
    items: [],
    totalValue: 0,
    order: 3,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Saúde',
    items: [],
    totalValue: 0,
    order: 4,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Educação',
    items: [],
    totalValue: 0,
    order: 5,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Outros',
    items: [],
    totalValue: 0,
    order: 5,
    type: ExpenseType.EXCLUSIVE
  }
]

const store = useCategoriesStore()

let categoryIndex = 0
const category = ref(categoriesMock[categoryIndex])
const itemDescription = ref('')
const itemValue = ref(0)

const categoryTotalValue = computed(() => {
  const value = category.value.items?.reduce((acc, item) => Number(acc) + Number(item.value), 0)
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
})

function addItem () {
  category.value.items.push({
    description: itemDescription.value,
    value: itemValue.value
  })
}

function removeItem (index: number) {
  category.value.items.splice(index, 1)
}

function nextCategory () {

  category.value.totalValue = category.value.items.reduce((acc, item) => Number(acc) + Number(item.value), 0)
  store.addCategory(category.value)

  if (categoryIndex === 6){
    router.push({ name: 'genitor' })
    return
  }

  itemDescription.value = ''
  itemValue.value = 0

  categoryIndex += 1
  category.value = categoriesMock[categoryIndex]
}
// function prevCategory () {
//   if (categoryIndex === 0) return

//   categoryIndex -= 1
//   category.value = categoriesMock[categoryIndex]
// }

const categoryType = computed(() => {
  const type: Record<ExpenseType, string> = {
    [ExpenseType.DEFAULT]: 'Comum',
    [ExpenseType.EXCLUSIVE]: 'Exclusiva'
  }
  return type[category.value.type]
})

</script>

<template>
  <div class="main">
    <div class="d-flex align-center mb-4">
      <span class="mr-4"><b>Categoria:</b> {{ category.description }} - {{ categoryType }}</span>
      <span><b>Valor Total:</b> {{ categoryTotalValue }}</span>
    </div>
    <div class="d-flex align-center mb-4">
      <v-text-field
        label="Descrição"
        v-model="itemDescription"
        variant="solo"
        color="#404040"
        class="mr-4"
        hide-details
        clearable
        style="width: 200px;"
      />
      <CurrencyInput v-model="itemValue"></CurrencyInput>
      <v-btn icon @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div style="height: calc(100vh - 288px) !important; overflow-y: scroll !important" class="mb-4">
      <v-container>
        <v-row no-gutters>
          <v-col cols="6">
            <h3>Descrição</h3>
          </v-col>
          <v-col cols="4">
            <h3>Valor</h3>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <h3>Ação</h3>
          </v-col>
        </v-row>
        <v-row no-gutters v-for="(item, index) in category.items" :key="index">
          <v-col class="pl-1" cols="6">{{ item.description }}</v-col>
          <v-col class="pl-1" cols="4">{{ item.value }}</v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <v-btn size="small" flat icon="mdi-delete" @click="removeItem(index)"></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  <div class="d-flex">
    <!-- <v-btn class="mr-2" @click="prevCategory">
      <v-icon>mdi-arrow-left-thin</v-icon>
    </v-btn> -->
    <v-spacer></v-spacer>
    <v-btn class="mr-2" @click="nextCategory">
      <v-icon>mdi-arrow-right-thin</v-icon>
    </v-btn>
  </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 16px;
  padding: 8px;
  height: 90%;
}
</style>