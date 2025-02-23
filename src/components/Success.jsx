function Success({ onClose, resetCart }) {
  const handleClose = () => {
    resetCart(); // Очистка данных при закрытии
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
          <p className='h2'>Спасибо за доверие!</p>
          <p>Наш менеджер скоро свяжется с вами.</p>
        </div>
      </div>
    </div>
  );
}

export default Success;
