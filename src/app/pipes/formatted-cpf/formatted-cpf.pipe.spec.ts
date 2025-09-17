import { FormattedCpfPipe } from './formatted-cpf.pipe';

describe('FormattedCpfPipe', () => {
  it('create an instance', () => {
    const pipe = new FormattedCpfPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve formatar um CPF completo corretamente', () => {
    const pipe = new FormattedCpfPipe();
    const result = pipe.transform('12345678911');

    expect(result).toBe('123.456.789-11');
  });
});
