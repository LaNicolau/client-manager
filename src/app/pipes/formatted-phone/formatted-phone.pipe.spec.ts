import { FormattedPhonePipe } from './formatted-phone.pipe';

describe('FormattedPhonePipe', () => {
  it('create an instance', () => {
    const pipe = new FormattedPhonePipe();
    expect(pipe).toBeTruthy();
  });
});
