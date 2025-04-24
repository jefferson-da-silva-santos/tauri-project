import * as Yup from 'yup';

export const shemaEmailConfim = Yup.object().shape({
  initEmail: Yup.string()
    .required('O e-mail é obrigatório'),
});