import { type ICategory } from '@/models/ICategory'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', () => {
  let categories: ICategory[] = []

  let genitorValue = 0
  let genitoraValue = 0

  function addCategory (category: ICategory) {
    categories.push(category)
  }

  function setGenitorValue (isGenitor: boolean, value: number) {
    if (isGenitor) genitorValue = value
    else genitoraValue = value
  }

  function clear () {
    categories = []
    genitorValue = 0
    genitoraValue = 0
  }

  return { categories, genitorValue, genitoraValue, addCategory, setGenitorValue, clear }
})
