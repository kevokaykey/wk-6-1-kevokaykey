describe('Currency formatting', () => {
  const ORIGINAL_ENV = process.env.REACT_APP_CURRENCY;

  afterEach(() => {
    process.env.REACT_APP_CURRENCY = ORIGINAL_ENV;
    jest.resetModules();
  });

  test('formats currency with default when env is unsupported', () => {
    process.env.REACT_APP_CURRENCY = 'UNKNOWN';
    const { formatCurrency, APP_CURRENCY } = require('../config/currency');
    expect(APP_CURRENCY).toBe('ZAR');
    const out = formatCurrency(123.45);
    expect(typeof out).toBe('string');
    expect(out).toMatch(/\d/);
  });

  test('formats currency when env is USD', () => {
    process.env.REACT_APP_CURRENCY = 'USD';
    const { formatCurrency, APP_CURRENCY } = require('../config/currency');
    expect(APP_CURRENCY).toBe('USD');
    const out = formatCurrency(10);
    expect(out).toContain('$');
  });
});
