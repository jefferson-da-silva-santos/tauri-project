export function extrairValorNumerico(moeda) {
  if (typeof moeda !== 'string') return NaN;

  return parseFloat(
    moeda
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  );
}
