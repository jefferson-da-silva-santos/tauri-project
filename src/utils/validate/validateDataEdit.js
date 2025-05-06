import * as Yup from "yup";

export const validateDataEdit = Yup.object({
  id: Yup.number().required("ID é obrigatório"),
  nome: Yup.string().required("Nome é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  categoria: Yup.string().required("Categoria é obrigatória"),
  preco: Yup.string().required("Preço é obrigatório"),
  quantidade: Yup.number().required("Quantidade é obrigatória").min(1),
  unidade: Yup.string().required("Unidade é obrigatória"),
})