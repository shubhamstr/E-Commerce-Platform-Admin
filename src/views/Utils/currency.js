export const CONVERSION_RATE = 80;

export const convertUsdToInr = (usdAmount) => {
  const amount = parseFloat(usdAmount) || 0;
  return amount * CONVERSION_RATE;
};

export const formatPrice = (usdAmount) => {
  const inrAmount = convertUsdToInr(usdAmount);
  return `₹${inrAmount.toFixed(2)}`;
};
