import { IsLoginPipe } from './is-login.pipe';

describe('IsLoginPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLoginPipe();
    expect(pipe).toBeTruthy();
  });
});
