import { AnimatePresence, motion } from 'motion/react';

function Success({ onClose, resetCart, orderId, orderDate, orderAmount }) {
  const handleClose = () => {
    resetCart();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className='popup-holder active'
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <div className='popup-scroller'>
          <button className='popup-close' onClick={handleClose}>
            <svg>
              <use xlinkHref='#ico-close'></use>
            </svg>
          </button>

          <div className='modal-success' onClick={e => e.stopPropagation()}>
            <div className='modal-success__text'>
              <p className='h2'>Спасибо за&nbsp;доверие!</p>
              <p>
                Заказ №<strong>{orderId}</strong> на&nbsp;сумму{' '}
                <strong>{orderAmount}&nbsp;₽</strong> успешно оформлен.
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
      </motion.div>
    </AnimatePresence>
  );
}

export default Success;
