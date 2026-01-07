import {Math} from './Math'

describe.skip('Testing Math library', () => {

  beforeEach(() => {});
  afterEach(() => {});
  beforeAll(() => {});
  afterAll(() => {});

  it('should sum two numbers correctly', () => {
  const response = Math.sum(10, 5);
  expect(response).toBe(15);
  });

  it('should subtract two numbers correctly', () => {
    const response = Math.sub(4, 2);
    expect(response).toBe(2);
  });

  it('should multiply two numbers correctly', () => {
    const response = Math.mut(3, 5);
    expect(response).toBe(15);
  });

  it('should divide two numbers correctly', () => {
    const response = Math.div(15, 5);
    expect(response).toBe(3);

    const response2 = Math.div(3, 0);
    expect(response2).toBeFalsy();
    expect(response2).toBe(false);
    //expect(response2).not.toThrow(new Error('Cannot divide by zero'));
  });

  /*it.only('contar quantos caracteres tem na string', () => {
    const response = 'thiago';
    expect(response).toHaveLength(6);
  });*/

  it('se possui a propridade EMAIL', () => {
    const response = {
      name: 'thiago',
      email: 'thiago@email.com'
    }
    //expect(response).toHaveProperty('email');
    expect(response).not.toBeUndefined();
    //expect(response).toBeGreaterThanOrEqual(10);
    //expect(response).toBeLessThanOrEqual(10);

  });



});

