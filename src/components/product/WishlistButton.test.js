import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import WishlistButton from './WishlistButton';
import * as wishlistActions from '../../redux/actions/wishlistActions';

jest.mock('react-toast-notifications', () => ({
  useToasts: () => ({ addToast: jest.fn() })
}));

// Mock webService to prevent window._env_ issues in action imports
jest.mock('../../util/webService', () => ({
  get: jest.fn().mockResolvedValue({ wishlistItems: [] }),
  post: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({})
}));

const makeStore = (items = []) => createStore(
  (state = { wishlistData: { items } }) => state,
  applyMiddleware(thunk.default || thunk)
);

const renderWithStore = (items = []) => {
  const store = makeStore(items);
  return { store, ...render(
    <Provider store={store}>
      <WishlistButton productId={10} />
    </Provider>
  )};
};

describe('WishlistButton', () => {
  test('renders heart-o icon when product not in wishlist', () => {
    renderWithStore([]);
    expect(document.querySelector('.fa-heart-o')).toBeTruthy();
  });

  test('renders filled heart when product is in wishlist', () => {
    renderWithStore([{ productId: 10 }]);
    expect(document.querySelector('.fa-heart')).toBeTruthy();
  });

  test('button has active class when wishlisted', () => {
    renderWithStore([{ productId: 10 }]);
    expect(document.querySelector('.wishlist-btn.active')).toBeTruthy();
  });

  test('calls addToWishlist on click when not wishlisted', () => {
    const spy = jest.spyOn(wishlistActions, 'addToWishlist');
    renderWithStore([]);
    fireEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalledWith(10, expect.any(Function));
    spy.mockRestore();
  });

  test('calls removeFromWishlist on click when wishlisted', () => {
    const spy = jest.spyOn(wishlistActions, 'removeFromWishlist');
    renderWithStore([{ productId: 10 }]);
    fireEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalledWith(10, expect.any(Function));
    spy.mockRestore();
  });
});
