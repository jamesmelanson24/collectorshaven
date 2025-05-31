export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
}