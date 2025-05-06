import { extrairValorNumerico } from "./extrairValorNumerico"

export const formatDataItemRegister = (data) => {
  return {
    name: data.nome,
    description: data.descricao,
    category: data.categoria,
    price: extrairValorNumerico(data.preco),
    quantity: data.quantidade,
    unity: data.unidade
  }
}