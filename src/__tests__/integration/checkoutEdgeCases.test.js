/* Integration tests for checkout edge cases */

const path = require('path');

describe('Checkout edge cases', () => {
  beforeEach(() => {
    // reset modules so process.env changes are picked up by required modules
    jest.resetModules();
  });

  test('startPayment throws when no items provided', async () => {
    const { startPayment } = require('../../services/CheckoutService');

    await expect(startPayment({ items: [], email: 'test@example.com' })).rejects.toThrow('No items to pay for');
  });

  test('initializePaystackPayment returns early when Paystack key invalid', async () => {
    // set env to invalid key and re-require the module so the constant is re-evaluated
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY = 'invalid_key';
    jest.resetModules();
    const { initializePaystackPayment } = require('../../utils/paystack');

    // Spy on global alert to confirm user-friendly message path
    const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});

    const book = { title: 'Edge Case Book', price: 12.5, author: 'Tester' };
    const result = await initializePaystackPayment(book, 'a@b.com', () => {}, () => {});

    expect(alertSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();

    alertSpy.mockRestore();
  });
});
