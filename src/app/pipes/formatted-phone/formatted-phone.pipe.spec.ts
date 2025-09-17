import { FormattedPhonePipe } from './formatted-phone.pipe';

describe('FormattedPhonePipe', () => {
  it('create an instance', () => {
    const pipe = new FormattedPhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('deve formatar um telefone completo corretamente', () => {
    const pipe = new FormattedPhonePipe();
    const result = pipe.transform('12345678911');

    expect(result).toBe('(12) 34567-8911');
  });
});
