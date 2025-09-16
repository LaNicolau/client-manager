import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedPhone',
})
/**
 * Pipe que formata uma string numérica como número de telefone brasileiro.
 * Exemplo: '21987654321' → '(21) 98765-4321'
 * @param {string} value - Número de telefone como string.
 * @returns {string} Número formatado com DDD e traço.
 */
export class FormattedPhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const p1 = value.slice(0, 2);
    const p2 = value.slice(2, 7);
    const p3 = value.slice(7, 11);

    let result = `(${p1}) `;
    if (p2) result += `${p2}-`;
    if (p3) result += `${p3}`;
    return result;
  }
}
