import {
  FETCH_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  WISHLIST_ERROR,
  fetchWishlist,
  addToWishlist,
  removeFromWishlist
} from './wishlistActions';
import WebService from '../../util/webService';

jest.mock('../../util/webService');

describe('wishlistActions', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    WebService.get.mockClear();
    WebService.post.mockClear();
    WebService.delete.mockClear();
  });

  test('fetchWishlist dispatches FETCH_WISHLIST on success', async () => {
    WebService.get.mockResolvedValue({ wishlistItems: [{ productId: 1 }] });
    await fetchWishlist()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_WISHLIST,
      payload: [{ productId: 1 }]
    });
  });

  test('fetchWishlist dispatches WISHLIST_ERROR on failure', async () => {
    WebService.get.mockRejectedValue(new Error('Network error'));
    await fetchWishlist()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: WISHLIST_ERROR });
  });

  test('addToWishlist dispatches ADD_TO_WISHLIST and then fetchWishlist', async () => {
    WebService.post.mockResolvedValue({});
    WebService.get.mockResolvedValue({ wishlistItems: [] });
    await addToWishlist(10)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: ADD_TO_WISHLIST, payload: 10 });
  });

  test('removeFromWishlist dispatches REMOVE_FROM_WISHLIST and then fetchWishlist', async () => {
    WebService.delete.mockResolvedValue({});
    WebService.get.mockResolvedValue({ wishlistItems: [] });
    await removeFromWishlist(10)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: REMOVE_FROM_WISHLIST, payload: 10 });
  });
});
