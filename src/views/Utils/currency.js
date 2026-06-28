export const CONVERSION_RATE = 1;
export const CURRENCY_SYMBOL = '$';

export const convertUsdToInr = (usdAmount) => {
  const amount = parseFloat(usdAmount) || 0;
  return amount;
};

export const formatPrice = (usdAmount) => {
  const amount = parseFloat(usdAmount) || 0;
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
};

