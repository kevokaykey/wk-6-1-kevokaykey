// Test data for early stage testing
export const testBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 1500,
    description: 'A classic novel of the Jazz Age',
    image: '/images/great-gatsby.jpg',
    currency: 'KES'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee', 
    price: 1800,
    description: 'A gripping tale of racial injustice',
    image: '/images/mockingbird.jpg',
    currency: 'KES'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    price: 1200,
    description: 'A dystopian social science fiction novel',
    image: '/images/1984.jpg',
    currency: 'KES'
  }
];

export const testUser = {
  email: 'test@example.com',
  address: '123 Test Street, Nairobi',
  currency: 'KES'
};

export const testPayment = {
  cardNumber: '5061 0600 0000 0000 08',
  expiry: '12/2030',
  cvv: '123',
  otp: '123456'
};

// Factory functions for creating test data
export const createBook = (overrides = {}) => ({
  id: Math.floor(Math.random() * 1000),
  title: 'Test Book',
  author: 'Test Author',
  price: 1000,
  description: 'Test description',
  image: '/test-image.jpg',
  currency: 'KES',
  ...overrides
});

export const createCartItem = (overrides = {}) => ({
  id: Math.floor(Math.random() * 1000),
  title: 'Test Book',
  price: 1000,
  quantity: 1,
  ...overrides
});
