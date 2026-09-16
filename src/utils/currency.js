const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRLFromCents(cents) {
  if (!Number.isInteger(cents)) return null;
  return brlFormatter.format(cents / 100);
}

export function formatServicePrice(service) {
  if (!service) return '';

  if (service.priceType === 'quote') return 'Sob orçamento';
  if (service.priceType === 'technical_visit' && service.priceCents == null) {
    return 'Agendar visita técnica';
  }

  const formatted = formatBRLFromCents(service.priceCents);
  if (!formatted) return 'Consultar valor';

  switch (service.priceType) {
    case 'starting_at':
      return `A partir de ${formatted}`;
    case 'hourly':
      return `${formatted}/hora`;
    case 'per_square_meter':
      return `${formatted}/m²`;
    default:
      return formatted;
  }
}
