import { AnimatePresence, motion } from 'motion/react';

function DeleteAll({ onConfirm, onCancel, isDeleteAll }) {
  return (
    <AnimatePresence>
      <motion.div
        className='popup-holder active'
        onClick={onCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <div className='popup-scroller'>
          <button className='popup-close' onClick={onCancel}>
            <svg>
              <use xlinkHref='#ico-close'></use>
            </svg>
          </button>

          <div className='modal-delete' onClick={e => e.stopPropagation()}>
            <p>Вы уверены, что хотите удалить все товары из корзины?</p>

            <div className='modal-delete__buttons'>
              <button
                className={`button ${isDeleteAll ? 'button--process button--green' : ''}`}
                onClick={onConfirm}>
                <span>Да</span>
              </button>

              <button className='button button--green' onClick={onCancel}>
                Нет
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteAll;
