function Success({ onClose, resetCart }) {
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
            <p>Наш менеджер скоро свяжется с&nbsp;вами.</p>
          </div>
          <div className='modal-success__image'>
            <img
              class='image'
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
