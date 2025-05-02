export function formatNumber(number) {
  const numberFormat = number.replace(/[.,]/g, '');
  return parseFloat(numberFormat);
}