<script setup lang="ts">
import VueHighcharts from 'vue3-highcharts'
import { useCategoriesStore } from '@/stores/categories'
import { ref, type Ref } from 'vue'
import { ExpenseType, type ICategory } from '@/models/ICategory'
import CurrencyFormatter from '@/components/CurrencyFormatter.vue'
import { useDisplay } from 'vuetify'
import html2canvas from 'html2canvas'

const store = useCategoriesStore()

const { mobile } = useDisplay()

const options: Ref<any> = ref({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    animation: true,
    width: 550,
    height: 350
  },
  title: { text: '' },
  tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>', style: { fontFamily: 'Montserrat' } },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: { fontFamily: 'Montserrat' }
      }
    }
  },
  series: [{
    name: 'Percentual',
    data: [{ name: 'Genitor', y: store.results.genitorWeight, color: '#404040' },  { name: 'Genitora', y: store.results.genitoraWeight, color: '#399B53' }]
  }]
})

const downloadScreenshot = () => {
  const divElement = document.getElementById('result-main')!

  html2canvas(divElement, { scale: 2, logging: true }).then(function(canvas) {
    const link = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    link.href = canvas.toDataURL('image/png')
    link.download = `Simulador de Pensão - (${date})`
    link.click()
  });
}

const getCategoryTotalValue = (category: ICategory) => category.items.reduce((acc, item) => Number(acc) + Number(item.value), 0)
</script>

<template>
  <div id="result-main" style="padding: 16px;">
    <div class="title-grid" style="margin: 32px 0;">
      <div class="content" style="border-right: 1px solid rgb(200, 200, 200);">
        <span class="title text-center font-weight-bold">DESPESAS COMUNS DE TODOS OS MORADORES DA CASA</span>
        <div v-for="(category, index) in store.categories.filter(x => x.type === ExpenseType.DEFAULT)" :key="index">
          <div class="info font-weight-bold">{{ category.description }}<CurrencyFormatter :number="getCategoryTotalValue(category)" /></div>
          <div class="info pl-4" v-for="(item, itemIndex) in category.items" :key="itemIndex">
            {{ item.description }}<CurrencyFormatter :number="item.value" />
          </div>
        </div>
        <div class="info" style="font-weight: bold;">
          Quantidade de moradores<span>{{ store.quantity }}</span>
        </div>
        <div class="info" style="font-weight: bold;">
          Total referente ao alimentado<CurrencyFormatter :number="store.results.totalFedValue" />
        </div>
      </div>
      <div class="content">
        <span class="title text-center font-weight-bold">DESPESAS EXCLUSIVAS DA CRIANÇA</span>
        <div v-for="(category, index) in store.categories.filter(x => x.type === ExpenseType.EXCLUSIVE)" :key="index">
          <div class="info font-weight-bold">{{ category.description }}<CurrencyFormatter :number="getCategoryTotalValue(category)" /></div>
          <div class="info pl-4" v-for="(item, itemIndex) in category.items" :key="itemIndex">
            {{ item.description }}<CurrencyFormatter :number="item.value" />
          </div>
        </div>
        <div class="info" style="font-weight: bold;">
          Total<CurrencyFormatter :number="store.results.exclusiveTotalValue" />
        </div>
      </div>
    </div>
    <div class="title-grid" style="margin-bottom: 32px;">
      <div class="content" style="border-right: 1px solid rgb(200, 200, 200);">
        <span class="title text-center font-weight-bold">GENITORES</span>
        <div class="info">
          Total de despesas<CurrencyFormatter :number="store.results.totalValue" />
        </div>
        <div class="info">
          Renda líquida (Genitor)<CurrencyFormatter :number="store.genitor" />
        </div>
        <div class="info">
          Renda líquida (Genitora)<CurrencyFormatter :number="store.genitora" />
        </div>
        <div class="info">
          Valor referente ao Genitor<CurrencyFormatter :number="store.results.genitorValue" />
        </div>
        <div class="info">
          Valor referente a Genitora<CurrencyFormatter :number="store.results.genitoraValue" />
        </div>
        <div class="info" style="font-weight: bold;">
          Pensão sugerida<CurrencyFormatter :number="store.results.suggestedPension" />
        </div>
      </div>
      <div v-if="!mobile" class="content d-flex align-center justify-center">
        <VueHighcharts :options="options"></VueHighcharts>
      </div>
    </div>
  </div>
  <v-btn class="fixed-btn" color="#399B53" @click="downloadScreenshot" icon="mdi-download"></v-btn>
</template>

<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.title-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 600px) {
  .title-grid {
    grid-template-columns: 1fr;
    row-gap: 24px;
  }
}

.title-grid .content {
  padding: 0 24px;
}

.title-grid div .title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  flex-direction: column;
}

.title-grid div .info {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(200, 200, 200);
  line-height: 1;
  height: 48px;
  justify-content: space-between;
}
</style>