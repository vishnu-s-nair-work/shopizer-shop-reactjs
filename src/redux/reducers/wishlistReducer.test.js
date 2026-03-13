import { FETCH_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_ERROR } from '../actions/wishlistActions';
import wishlistReducer from './wishlistReducer';

describe('wishlistReducer', () => {
  const initialState = { items: [], error: false };

  test('returns initial state', () => {
    expect(wishlistReducer(undefined, {})).toEqual(initialState);
  });

  test('FETCH_WISHLIST sets items', () => {
    const items = [{ productId: 1, productName: 'Test' }];
    const state = wishlistReducer(initialState, { type: FETCH_WISHLIST, payload: items });
    expect(state.items).toEqual(items);
    expect(state.error).toBe(false);
  });

  test('WISHLIST_ERROR sets error flag', () => {
    const state = wishlistReducer(initialState, { type: WISHLIST_ERROR });
    expect(state.error).toBe(true);
  });

  test('REMOVE_FROM_WISHLIST does not mutate items (fetchWishlist handles it)', () => {
    const state = wishlistReducer(
      { items: [{ productId: 1 }], error: false },
      { type: REMOVE_FROM_WISHLIST, payload: 1 }
    );
    expect(state.items).toEqual([{ productId: 1 }]);
  });
});
