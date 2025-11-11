// Paystack payment integration
// Read from environment variable
export const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_65bd9bec2c6cfcb3d95cd640b0b55fc399fbad94';
import { APP_CURRENCY, SUPPORTED_CURRENCIES } from '../config/currency';

const isValidPublicKey = (key) => /^pk_(test|live)_/.test(key);

export const toMinorUnits = (amountMajor) => {
  // Avoid float errors: handle to cents precisely
  return Math.round(Number((amountMajor * 100).toFixed(2)));
};

// Load Paystack script dynamically
const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
};

// Try to use npm package first, fallback to window script
const getPaystackInterface = async () => {
  try {
    const mod = await import('@paystack/inline-js');
    return { kind: 'module', PaystackPop: mod.default };
  } catch (_err) {
    // Fallback to window script
    await loadPaystackScript();
    return { kind: 'window', PaystackPop: window.PaystackPop };
  }
};

export const initializePaystackPayment = async (book, email, onSuccess, onCancel, opts = {}) => {
  if (!isValidPublicKey(PAYSTACK_PUBLIC_KEY)) {
    alert('Paystack public key is missing or invalid. Please set REACT_APP_PAYSTACK_PUBLIC_KEY in your .env and restart the dev server.');
    console.error('Invalid Paystack key. Set REACT_APP_PAYSTACK_PUBLIC_KEY to a valid pk_test_ or pk_live_ key.');
    return;
  }
  // Ensure Paystack interface is available
  let iface;
  try {
    iface = await getPaystackInterface();
  } catch (error) {
    alert('Failed to load payment service. Please refresh the page.');
    return;
  }

  const currency = opts.currency || APP_CURRENCY || 'KES';
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    alert(`Currency ${currency} is not supported by Paystack. Use one of: ${SUPPORTED_CURRENCIES.join(', ')}. Set REACT_APP_CURRENCY accordingly.`);
    console.error('Unsupported currency for Paystack:', currency);
    return;
  }
  const commonMeta = {
    custom_fields: [
      { display_name: 'Book', variable_name: 'book_title', value: book.title },
      { display_name: 'Author', variable_name: 'book_author', value: book.author },
    ],
  };

  if (iface.kind === 'module' && iface.PaystackPop) {
    const pop = new iface.PaystackPop();
    pop.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: email || 'customer@example.com',
      amount: toMinorUnits(book.price),
      currency,
      reference: `${Date.now()}${Math.random().toString(36).substring(7)}`,
      metadata: commonMeta,
      onSuccess: (response) => onSuccess(response, book),
      onCancel: () => onCancel && onCancel(),
    });
    return;
  }

  if (iface.kind === 'window' && iface.PaystackPop && iface.PaystackPop.setup) {
    const handler = iface.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email || 'customer@example.com',
      amount: toMinorUnits(book.price),
      currency,
      ref: `${Date.now()}${Math.random().toString(36).substring(7)}`,
      metadata: commonMeta,
      callback: function(response) {
        onSuccess(response, book);
      },
      onClose: function() {
        onCancel && onCancel();
      }
    });
    handler.openIframe();
    return;
  }

  alert('Payment service is not available. Please refresh the page.');
};

// This function would typically be called from your backend
export const verifyPayment = async (reference) => {
  // In a real app, this would call your backend API to verify the payment
  // Your backend would then call Paystack's verification API
  console.log('Verifying payment:', reference);
  return { status: 'success', reference };
};
