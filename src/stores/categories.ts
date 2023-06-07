import { defineStore } from 'pinia'
import { categoriesMock } from '@/mocks/Categories'
import type { ICategory, Item } from '@/models/ICategory'
import { PensionCalculator } from '@/helpers/PensionCalculator'
import type { IResults } from '@/models/IResults'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({ categories: [ ...categoriesMock ], genitor: 0, genitora: 0, quantity: 0, gender: 'Genitor', results: {} as IResults }),
  actions: {
    findCategory (order: number): ICategory {
      return this.categories.find(x => order === x.order)!
    },
    addItem (order: number, item: Item) {
      this.categories.find(x => order === x.order)?.items.push(item)
    },
    editItem (order: number, itemIndex: number, newItem: Item) {
      const item = this.categories.find(x => order === x.order)?.items[itemIndex]
      if (item) {
        item.description = newItem.description
        item.value = newItem.value
      }
    },
    removeItem (order: number, itemIndex: number) {
      this.categories.find(x => order === x.order)?.items.splice(itemIndex, 1)
    },
    generateResults () {
      this.results = new PensionCalculator(this.categories, this.genitor, this.genitora, this.quantity, this.gender)
        .Calculate()
        .GetResults()
    },
    clearData () {
      this.categories = [ ...categoriesMock ]
      this.genitor = 0
      this.genitora = 0
      this.quantity = 0
      this.gender = ''
      this.results = {} as IResults
    }
  }
})
