// Global test setup — mock window._env_ used by webService.js
window._env_ = {
  APP_BASE_URL: 'http://localhost:8080',
  APP_API_VERSION: '/api/v1/',
  APP_MERCHANT: 'DEFAULT',
  APP_PAYMENT_TYPE: 'stripe',
  APP_STRIPE_KEY: 'test_key',
  APP_THEME_COLOR: '#000000'
};
