import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlistActions';

const WishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const items = useSelector(state => state.wishlistData.items);
  const isWishlisted = items.some(item => item.productId === productId);

  const handleClick = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId, addToast));
    } else {
      dispatch(addToWishlist(productId, addToast));
    }
  };

  return (
    <button
      className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      onClick={handleClick}
    >
      <i className={isWishlisted ? 'fa fa-heart' : 'fa fa-heart-o'} />
    </button>
  );
};

export default WishlistButton;
