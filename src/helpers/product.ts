export function title(text: string): string {
  if (text.length <= 30) return text;

  return text.slice(0, 30).concat("...");
}

export function price(usd: number, idr: number) {
  const multiple = 500;

  const result = usd * idr;

  const roundedPrice = Math.ceil(result / multiple) * multiple;

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(roundedPrice);

  return price;
}

export function sold(): string {
  const number = Math.floor(Math.random() * 20000 + 1);

  if (number <= 999) {
    const sold = Math.round(number / 50) * 50;

    return `${sold}+ terjual`;
  }

  if (number >= 1000) {
    const sold = Math.round(number / 1000);

    return `${sold}rb+ terjual`;
  }

  return "";
}
