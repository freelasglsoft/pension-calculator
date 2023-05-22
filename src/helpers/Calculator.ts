export function calculate (genitorValue: number, genitoraValue: number, totalValue: number) {
  const totalGenitorValue = Number(genitorValue) + Number(genitoraValue)
  const genitorWeight = Number(genitorValue) / totalGenitorValue
  const genitoraWeight = Number(genitoraValue) / totalGenitorValue

  return { genitorWeight, genitoraWeight }
}