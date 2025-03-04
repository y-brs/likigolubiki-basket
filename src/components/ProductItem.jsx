import PropertyList from '@/components/PropertyList';

function ProductItem({ product, cart, updateCart, pendingRemoval, removalWarning, restoreItem, maxQuantities }) {
  const handleQuantityChange = (id, newQuantity) => {
    const maxQty = maxQuantities[id] || Infinity;
    const quantity = Math.max(0, Math.min(newQuantity, maxQty));
    updateCart(id, quantity);
  };

  const currentQuantity = cart[product.ID] || product.QUANTITY;
  const maxQty = maxQuantities[product.ID] || Infinity;
  const isMaxReached = currentQuantity >= maxQty;

  return (
    <div className={`basket-item ${pendingRemoval[product.ID] ? 'basket-item--pending' : ''}`}>
      <button className='basket-item__delete' onClick={() => updateCart(product.ID, 0)}>
        <svg>
          <use xlinkHref='#ico-close'></use>
        </svg>
      </button>
      <div className='basket-item__image'>
        {product.IMAGE && (
          <a href={product.DETAIL_PAGE_URL}>
            <img src={product.IMAGE} loading='lazy' decoding='async' alt='' />
          </a>
        )}

        <a href={product.DETAIL_PAGE_URL} className='basket-item__title'>
          {product.NAME}
        </a>
      </div>
      <div className='basket-item__description'>
        <a href={product.DETAIL_PAGE_URL} className='basket-item__link'>
          {product.NAME}
        </a>

        {product.PROPERTY.length > 0 && <PropertyList property={product.PROPERTY} />}
      </div>
      <div className='basket-item__add2cart'>
        <div className='basket-item__price'>
          {product.PRICE} <small>₽</small>
        </div>

        <div className='catalog-item__count'>
          {!pendingRemoval[product.ID] ? (
            <>
              <svg
                className='add2cart--minus'
                onClick={() => updateCart(product.ID, (cart[product.ID] || product.QUANTITY) - 1)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M7.44141 12.7198V11.2798H16.5614V12.7198H7.44141Z' fill='currentColor' />
                <path d='M7.44141 12.7198V11.2798H16.5614V12.7198H7.44141Z' fill='currentColor' />
              </svg>

              <input
                className='catalog-item__count-input'
                type='text'
                value={cart[product.ID] || product.QUANTITY}
                onChange={e => handleQuantityChange(product.ID, parseInt(e.target.value) || 0)}
                placeholder='0'
              />

              <svg
                className={`add2cart--plus ${isMaxReached ? 'disabled' : ''}`}
                onClick={() => !isMaxReached && updateCart(product.ID, currentQuantity + 1)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M11.2794 18.96V12.72H5.35938V11.28H11.2794V5.04004H12.7194V11.28H18.6394V12.72H12.7194V18.96H11.2794Z' fill='currentColor' />
                <path d='M11.2794 18.96V12.72H5.35938V11.28H11.2794V5.04004H12.7194V11.28H18.6394V12.72H12.7194V18.96H11.2794Z' fill='currentColor' />
              </svg>
            </>
          ) : (
            <button className={`button--pending ${removalWarning[product.ID] ? 'button--removal' : ''}`} onClick={() => restoreItem(product.ID)}>
              <span />
              <span>Вернуть</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
