import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedPhone',
})
export class FormattedPhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const p1 = value.slice(0, 2);
    const p2 = value.slice(2, 6);
    const p3 = value.slice(6, 10);

    let result = `(${p1}) `;
    if (p2) result += `${p2}-`;
    if (p3) result += `${p3}`;
    return result;
  }
}
