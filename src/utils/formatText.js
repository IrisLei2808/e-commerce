export function formatText(text) {
  if (text.length > 38) {
    const result = text.substring(0, 36) + "...";
    return result;
  } else {
    return text;
  }
}

export function formatMoney(price) {
  const result = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return result;
}
