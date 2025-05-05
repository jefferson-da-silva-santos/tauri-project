import { updatePreco } from "./updatePreco";

// O evento onKeyDown para lidar com as teclas pressionadas no teclado do usuário e atualizar o preço conforme necessário de acordo com as teclas pressionadas.
export const handleOnKeyDown = (e, formik) => {
  if (e.key.match(/^[0-9]$/)) {
    const newDigits = (formik.values.rawDigits || "") + e.key;
    updatePreco(newDigits, formik);
    return;
  }

  if (e.key === "Backspace") {
    const newDigits = (formik.values.rawDigits || "").slice(0, -1);
    updatePreco(newDigits, formik);
    return;
  }

  if (
    !["ArrowLeft", "ArrowRight", "Tab", "Shift", "Control"].includes(e.key)
  ) {
    e.preventDefault();
  }

  return;
};