import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/storage';

describe('Storage Utilities', () => {
    beforeEach(() => {
        // Reset localStorage before each test
        window.localStorage.clear();
    });

    test('safeSetItem and safeGetItem persist and retrieve objects', () => {
        const key = 'cart';
        const value = [{ id: '1', qty: 2 }];
        const saved = safeSetItem(key, value);
        expect(saved).toBe(true);

        const loaded = safeGetItem(key, []);
        expect(loaded).toEqual(value);
    });

    test('safeGetItem returns fallback when key missing', () => {
        const missing = safeGetItem('nope', { a: 1 });
        expect(missing).toEqual({ a: 1 });
    });

    test('safeRemoveItem removes key', () => {
        safeSetItem('temp', { x: 1 });
        expect(safeGetItem('temp')).toBeTruthy();
        const removed = safeRemoveItem('temp');
        expect(removed).toBe(true);
        expect(safeGetItem('temp', null)).toBeNull();
    });
});
