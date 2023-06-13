import { type ICategory, ExpenseType } from "@/models/ICategory";

export const categoriesMock: ICategory[] = [
  {
    description: 'Moradia',
    items: [
      { description: 'Aluguel ou financiamento do imóvel', value: 0.00 },
      { description: 'IPTU', value: 0.00 },
      { description: 'Energia', value: 0.00 },
      { description: 'Condomínio', value: 0.00 },
      { description: 'Água', value: 0.00 },
      { description: 'Gás', value: 0.00 },
      { description: 'Internet', value: 0.00 },
      { description: 'Netflix ou similar', value: 0.00 },
      { description: 'Serviços (empregada doméstica, babá, jardineiro, etc)', value: 0.00 },
      { description: 'Animal de Estimação', value: 0.00 },
      { description: 'Produtos de limpeza', value: 0.00 }
    ],
    totalValue: 0,
    order: 0,
    type: ExpenseType.DEFAULT
  },
  {
    description: 'Alimentação',
    items: [
      { description: 'Supermercado', value: 0.00 },
      { description: 'Feira', value: 0.00 },
      { description: 'Padaria', value: 0.00 },
      { description: 'Açougue', value: 0.00 },
      { description: 'Lanches', value: 0.00 },
      { description: 'Ifood', value: 0.00 }
    ],
    totalValue: 0,
    order: 1,
    type: ExpenseType.DEFAULT
  },
  {
    description: 'Higiene',
    items: [
      { description: 'Pomadas', value: 0.00 },
      { description: 'Fraldas', value: 0.00 },
      { description: 'Lenço umedecido', value: 0.00 },
      { description: 'Corte de cabelo', value: 0.00 },
      { description: 'Shampoo, condicionador, sabonetes, pasta e escova de dente', value: 0.00 }
    ],
    totalValue: 0,
    order: 2,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Alimentação',
    items: [
      { description: 'Lanche da escola', value: 0.00 },
      { description: 'Leite especial', value: 0.00 }
    ],
    totalValue: 0,
    order: 3,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Saúde',
    items: [
      { description: 'Plano de saúde', value: 0.00 },
      { description: 'Medicamentos', value: 0.00 },
      { description: 'Dentista', value: 0.00 },
      { description: 'Consultas', value: 0.00 }
    ],
    totalValue: 0,
    order: 4,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Educação',
    items: [
      { description: 'Escola', value: 0.00 },
      { description: 'Transporte escolar', value: 0.00 },
      { description: 'Curso de línguas', value: 0.00 },
      { description: 'Outros cursos', value: 0.00 }
    ],
    totalValue: 0,
    order: 5,
    type: ExpenseType.EXCLUSIVE
  },
  {
    description: 'Outros',
    items: [
      { description: 'Mensalidade de esportes, música, etc', value: 0.00 },
      { description: 'Vestuário (fazer uma média de compra de roupas)', value: 0.00 },
      { description: 'Passeios, shopping, gastos com lazer, entre outros.', value: 0.00 },
      { description: 'Uber', value: 0.00 }
    ],
    totalValue: 0,
    order: 6,
    type: ExpenseType.EXCLUSIVE
  }
]
