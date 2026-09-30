/** Redondea al múltiplo de plaza popular (por defecto $500 COP). */
export function redondearPrecioPopular(valor: number, multiplo = 500): number {
  if (valor <= 0) {
    return 0;
  }
  return Math.ceil(valor / multiplo) * multiplo;
}

export function pesosEnteros(valor: number): number {
  return Math.round(valor);
}
