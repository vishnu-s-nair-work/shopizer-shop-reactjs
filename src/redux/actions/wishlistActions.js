import WebService from '../../util/webService';
import constant from '../../util/constant';

export const FETCH_WISHLIST = 'FETCH_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const WISHLIST_ERROR = 'WISHLIST_ERROR';

export const fetchWishlist = () => async dispatch => {
  try {
    const response = await WebService.get(constant.ACTION.AUTH + constant.ACTION.WISHLIST);
    dispatch({ type: FETCH_WISHLIST, payload: response.wishlistItems || [] });
  } catch (error) {
    dispatch({ type: WISHLIST_ERROR });
  }
};

export const addToWishlist = (productId, addToast) => async dispatch => {
  try {
    await WebService.post(constant.ACTION.AUTH + constant.ACTION.WISHLIST + productId);
    dispatch({ type: ADD_TO_WISHLIST, payload: productId });
    dispatch(fetchWishlist());
    if (addToast) addToast('Added to Wishlist', { appearance: 'success', autoDismiss: true });
  } catch (error) {
    if (addToast) addToast('Please login to add to wishlist', { appearance: 'error', autoDismiss: true });
  }
};

export const removeFromWishlist = (productId, addToast) => async dispatch => {
  try {
    await WebService.delete(constant.ACTION.AUTH + constant.ACTION.WISHLIST + productId);
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: productId });
    dispatch(fetchWishlist());
    if (addToast) addToast('Removed from Wishlist', { appearance: 'warning', autoDismiss: true });
  } catch (error) {
    console.error('Error removing from wishlist', error);
  }
};
