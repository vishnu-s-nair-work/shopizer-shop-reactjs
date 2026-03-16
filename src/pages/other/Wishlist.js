import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { fetchWishlist, removeFromWishlist } from '../../redux/actions/wishlistActions';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { items } = useSelector(state => state.wishlistData);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="wishlist-main-area pt-90 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="cart-page-title">My Wishlist</h3>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <p>Your wishlist is empty. <Link to="/shop">Continue Shopping</Link></p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              <div className="table-content table-responsive cart-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.productId}>
                        <td className="product-thumbnail">
                          {item.image && (
                            <Link to={`/product/${item.sku}`}>
                              <img src={item.image} alt={item.productName} style={{ width: 80 }} />
                            </Link>
                          )}
                        </td>
                        <td className="product-name">
                          <Link to={`/product/${item.sku}`}>{item.productName}</Link>
                        </td>
                        <td className="product-price-cart">
                          <span className="amount">{item.price ? item.price.finalPrice : '-'}</span>
                        </td>
                        <td className="product-remove">
                          <button onClick={() => dispatch(removeFromWishlist(item.productId, addToast))}>
                            <i className="fa fa-times" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
