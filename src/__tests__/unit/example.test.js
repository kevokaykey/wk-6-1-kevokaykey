// Example unit test (ES Modules)
import { describe, test, expect } from '@jest/globals';

describe('Basic Unit Tests', () => {
  test('should perform basic math operations', () => {
    expect(1 + 1).toBe(2);
    expect(5 * 5).toBe(25);
  });

  test('should handle string operations', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
    expect('test'.length).toBe(4);
  });

  test('should work with arrays', () => {
    const numbers = [1, 2, 3];
    expect(numbers).toHaveLength(3);
    expect(numbers).toContain(2);
  });
});

describe('Business Logic Tests', () => {
  test('should validate email format', () => {
    const email = 'test@example.com';
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('should calculate total price', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ];
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(total).toBe(25);
  });
});
