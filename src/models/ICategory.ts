export type Item = { description: string, value: number }

export enum ExpenseType { DEFAULT, EXCLUSIVE }

export interface ICategory {
  description: string;
  totalValue: number;
  order: number;
  type: ExpenseType;
  items: Item[];
}