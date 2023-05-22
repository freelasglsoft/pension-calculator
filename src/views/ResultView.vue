<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { money } from '@/helpers/Formatters'
import { calculate } from '@/helpers/Calculator'
import { ExpenseType, type ICategory } from '@/models/ICategory'

const store = useCategoriesStore()

const genitorWeight = ref('')
const genitoraWeight = ref('')

const exclusiveCategories: Ref<ICategory[]> = ref([])
const defaultCategories: Ref<ICategory[]> = ref([])

const exclusiveTotal = ref(0)
const defaultTotal = ref(0)

const total = ref('')

const genitorPaidValue = ref('')
const genitoraPaidValue = ref('')

onMounted(() => {
  defaultCategories.value = store.categories.filter(x => x.type === ExpenseType.DEFAULT)
  exclusiveCategories.value = store.categories.filter(x => x.type === ExpenseType.EXCLUSIVE)

  exclusiveTotal.value = exclusiveCategories.value.flatMap(x => x.items).reduce((acc, item) => Number(acc) + Number(item.value), 0)
  defaultTotal.value = defaultCategories.value.flatMap(x => x.items).reduce((acc, item) => Number(acc) + Number(item.value), 0)

  total.value = (exclusiveTotal.value + defaultTotal.value)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const values = calculate(store.genitorValue, store.genitoraValue, 0)

  genitorPaidValue.value = ((exclusiveTotal.value + defaultTotal.value) * values.genitorWeight)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace('R$', '')
  genitoraPaidValue.value = ((exclusiveTotal.value + defaultTotal.value) * values.genitoraWeight)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace('R$', '')

  genitorWeight.value = values.genitorWeight.toLocaleString('pt-BR', { style: 'percent', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  genitoraWeight.value = values.genitoraWeight.toLocaleString('pt-BR', { style: 'percent', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

const downloadPDF = () => {
  const elemento = document.getElementById('grid')
  html2canvas(elemento!).then(function(canvas) {
    const pdf = new jsPDF('landscape')
    const imagemURL = canvas.toDataURL('image/png')
    pdf.addImage(imagemURL, 'PNG', 0, 0, 0, 0)
    pdf.save('meu-arquivo.pdf')
  })
}



</script>

<template>
  <div class="main" id="grid">
    <div class="grid">
      <h3>DESPESAS COMUNS</h3>
      <h3>DESPESAS EXCLUSIVAS</h3>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="grid2">
      <div>
        <div v-for="(category, index) in defaultCategories" :key="index">
          <div v-if="category.items.length">
            <h2>{{ category.description }}</h2>
            <div v-for="(item, itemIndex) in category.items" :key="itemIndex">
              <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
                <div class="d-flex align-center">{{ item.description }}</div>
                <span class="d-flex align-center justify-space-between">
                  <div>R$</div>
                  <div>{{ item.value }}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(category, index) in exclusiveCategories" :key="index">
          <div v-if="category.items.length">
            <h2>{{ category.description }}</h2>
            <div v-for="(item, itemIndex) in category.items" :key="itemIndex">
              <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
                <div class="d-flex align-center">{{ item.description }}</div>
                <span class="d-flex align-center justify-space-between">
                  <div>R$</div>
                  <div>{{ item.value }}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="grid2 my-2">
      <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
        <h3 class="d-flex align-center"></h3>
        <span class="d-flex align-center justify-space-between">
          <div>R$</div>
          <div>{{ defaultTotal }}</div>
        </span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
        <h3 class="d-flex align-center"></h3>
        <span class="d-flex align-center justify-space-between">
          <div>R$</div>
          <div>{{ exclusiveTotal }}</div>
        </span>
      </div>
    </div> -->
    <div>Total de gastos por mês: {{ total }}</div>
    <div>
      <div class="grid2">
        <div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <h3 class="d-flex align-center">Genitor</h3>
            <span class="d-flex align-center justify-space-between">
              <div>R$</div>
              <div>{{ store.genitorValue }}</div>
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <div class="d-flex align-center">Percentual</div>
            <span class="d-flex align-center justify-space-between">
              <div></div>
              <div>{{ genitorWeight }}</div>
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <div class="d-flex align-center">Valor mensal</div>
            <span class="d-flex align-center justify-space-between">
              <div>R$</div>
              <div>{{ genitorPaidValue }}</div>
            </span>
          </div>
        </div>
        <div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <h3 class="d-flex align-center">Genitora</h3>
            <span class="d-flex align-center justify-space-between">
              <div>R$</div>
              <div>{{ store.genitoraValue }}</div>
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <div class="d-flex align-center">Percentual</div>
            <span class="d-flex align-center justify-space-between">
              <div></div>
              <div>{{ genitoraWeight }}</div>
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 120px; height: 40px;">
            <div class="d-flex align-center">Valor mensal</div>
            <span class="d-flex align-center justify-space-between">
              <div>R$</div>
              <div>{{ genitoraPaidValue }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 16px;
  padding: 8px;
  height: 90%;
  overflow: scroll;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  column-gap: 32px;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
}
</style>