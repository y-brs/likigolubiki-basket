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
              <svg className='add2cart--minus' onClick={() => updateCart(product.ID, (cart[product.ID] || product.QUANTITY) - 1)}>
                <use xlinkHref='#ico-minus'></use>
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
                onClick={() => !isMaxReached && updateCart(product.ID, currentQuantity + 1)}>
                <use xlinkHref='#ico-plus'></use>
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
