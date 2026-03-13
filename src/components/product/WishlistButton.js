import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlistActions';

const WishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const items = useSelector(state => state.wishlistData?.items || []);
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
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #ccc', padding: '8px 14px', cursor: 'pointer', fontSize: '14px' }}
    >
      {isWishlisted ? '♥' : '♡'} Wishlist
    </button>
  );
};

export default WishlistButton;
