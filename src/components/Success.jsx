function Success({ onClose, resetCart, orderId, orderDate, orderAmount }) {
  const handleClose = () => {
    resetCart();
    onClose();
  };

  return (
    <div className='popup-holder active' onClick={handleClose}>
      <div className='popup-scroller'>
        <div className='popup-close'>
          <svg>
            <use xlinkHref='#ico-close'></use>
          </svg>
        </div>

        <div className='modal-success'>
          <div className='modal-success__text'>
            <p className='h2'>Спасибо за&nbsp;доверие!</p>
            <p>
              Заказ №<strong>{orderId}</strong> на&nbsp;сумму <strong>{orderAmount}&nbsp;₽</strong>{' '}
              успешно оформлен.
            </p>
            <p>Наш менеджер скоро свяжется с&nbsp;вами.</p>
          </div>
          <div className='modal-success__image'>
            <img
              className='image'
              src='/assets/img/form-result.webp'
              loading='lazy'
              decoding='async'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
