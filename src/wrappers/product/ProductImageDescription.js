import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
// import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  stock,
  strings
  // currency,
  // cartItems,
  // wishlistItems,
  // compareItems
}) => {
  // const wishlistItem = wishlistItems.filter(
  //   wishlistItem => wishlistItem.id === product.id
  // )[0];
  // const compareItem = compareItems.filter(
  //   compareItem => compareItem.id === product.id
  // )[0];
  const { addToast } = useToasts();
  const finalProductPrice = product.originalPrice;
  const finalDiscountedPrice = product.finalPrice;

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {/* {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) :
             ( */}
            <ProductImageGallery product={product} />
            {/* )} */}
            {stock && (
              <div className="product-stock mt-10">
                {stock.inStock
                  ? <span style={{color: 'green'}}>&#10003; In Stock ({stock.quantity})</span>
                  : <span style={{color: 'red'}}>&#10007; Out of Stock</span>}
              </div>
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              strings={strings}
              // discountedPrice={discountedPrice}
              // currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              // cartItems={cartItems}
              // wishlistItem={wishlistItem}
              // compareItem={compareItem}
              addToast={addToast}
              stock={stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  // cartItems: PropTypes.array,
  // compareItems: PropTypes.array,
  // currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  // wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    // currency: state.currencyData,
    // cartItems: state.cartData,
    // wishlistItems: state.wishlistData,
    // compareItems: state.compareData
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
