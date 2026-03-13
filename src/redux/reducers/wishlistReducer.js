import { FETCH_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_ERROR } from '../actions/wishlistActions';

const initialState = {
  items: [],
  error: false
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return { ...state, items: action.payload, error: false };
    case ADD_TO_WISHLIST:
    case REMOVE_FROM_WISHLIST:
      return state; // fetchWishlist will update items
    case WISHLIST_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default wishlistReducer;
