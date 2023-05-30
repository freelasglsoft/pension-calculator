import { ExpenseType, type ICategory } from "@/models/ICategory"
import type { IResults } from "@/models/IResults"

export class PensionCalculator {
  private categories: ICategory[] = []
  private genitor: number = 0
  private genitora: number = 0
  private quantity: number = 0

  private results: IResults = {
    defaultTotalValue: 0,
    exclusiveTotalValue: 0,
    totalFedValue: 0,
    totalValue: 0,
    totalGenitorsValue: 0,
    genitorValue: 0,
    genitorWeight: 0,
    genitoraValue: 0,
    genitoraWeight: 0
  }

  public constructor (categories: ICategory[], genitor: number, genitora: number, quantity: number) {
    this.categories = categories
    this.genitor = genitor
    this.genitora = genitora
    this.quantity = quantity
    return this
  }

  public Calculate () {
    this.results.defaultTotalValue = this.categories
      .filter(x => x.type === ExpenseType.DEFAULT)
      .flatMap(x => x.items)
      .reduce((acc, item) => Number(acc) + Number(item.value), 0)

    this.results.totalFedValue = this.results.defaultTotalValue / this.quantity

    this.results.exclusiveTotalValue = this.categories
      .filter(x => x.type === ExpenseType.EXCLUSIVE)
      .flatMap(x => x.items)
      .reduce((acc, item) => Number(acc) + Number(item.value), 0)
    
    this.results.totalValue = this.results.defaultTotalValue + this.results.exclusiveTotalValue

    this.results.totalGenitorsValue = Number(this.genitor) + Number(this.genitora)

    this.results.genitorWeight = this.genitor / this.results.totalGenitorsValue 

    this.results.genitorValue = this.results.totalValue * this.results.genitorWeight
    
    this.results.genitoraWeight = this.genitora / this.results.totalGenitorsValue 

    this.results.genitoraValue = this.results.totalValue * this.results.genitoraWeight

    return this
  }

  public GetResults () {
    return this.results
  }
}