export const updatePreco = (rawDigits, formik) => {
  if (rawDigits.length > 13) return;

  const numericValue = Number(rawDigits) / 100;
  const formatted = numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  formik.setFieldValue("preco", formatted);
  formik.setFieldValue("rawDigits", rawDigits);
};