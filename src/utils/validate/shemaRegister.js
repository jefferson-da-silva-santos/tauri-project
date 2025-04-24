import * as Yup from 'yup';

export const shemaRegister = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  telefone: Yup.string()
    .matches(/^\d{10,11}$/, 'Digite um telefone válido (DDD + número)')
    .required('O telefone é obrigatório'),
  cpf: Yup.string()
    .test('cpf-valido', 'CPF inválido', (value) => {
      const cpf = value.replace(/\D/g, '');
      if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      let soma = 0;
      let peso = 10;
      for (let n = 0; n < 9; n++) {
        soma += cpf.charAt(n) * (peso - n);
      }
      let expoente = 11 - (soma % 11);
      if (expoente >= 10) expoente = 0;
      if (expoente !== Number(cpf.charAt(9))) return false;
      soma = 0;
      peso = 11;
      for (let n = 0; n < 10; n++) {
        soma += cpf.charAt(n) * (peso - n);
      }
      expoente = 11 - (soma % 11);
      if (expoente >= 10) expoente = 0;
      return expoente === Number(cpf.charAt(10));
    })
    .required('O CPF é obrigatório'),

  dataNascimento: Yup.date()
    .max(new Date(), 'A data de nascimento não pode ser no futuro')
    .required('A data de nascimento é obrigatória'),
});