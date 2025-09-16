import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedCpf',
})
/**
 * Pipe que formata uma string numérica como CPF brasileiro.
 * Exemplo: '12345678901' → '123.456.789-01'
 * @param {string} value - CPF como string.
 * @returns {string} CPF formatado com pontos e traço.
 */
export class FormattedCpfPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const p1 = value.slice(0, 3);
    const p2 = value.slice(3, 6);
    const p3 = value.slice(6, 9);
    const p4 = value.slice(9, 11);

    let result = p1;
    if (p2) result += `.${p2}`;
    if (p3) result += `.${p3}`;
    if (p4) result += `-${p4}`;
    return result;
  }
}
