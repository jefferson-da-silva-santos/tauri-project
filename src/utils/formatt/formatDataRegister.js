import { dataFormat } from "./dataFormat"

export const formatDataRegister = (data) => {
  return {
    name: data.nome,
    email: data.email,
    password: data.password,
    phone: data.telefone,
    cpf: data.cpf,
    birthDate: dataFormat(data.dataNascimento)
  }
}