function DeleteAll({ onConfirm, onCancel }) {
  return (
    <div className='popup-holder active'>
      <div className='popup-scroller'>
        <div className='popup-close'>
          <svg onClick={onCancel}>
            <use xlinkHref='#ico-close'></use>
          </svg>
        </div>

        <div className='modal-delete'>
          <p>Вы уверены, что хотите удалить все товары из корзины?</p>

          <div className='modal-delete__buttons'>
            <button className='button button--red' onClick={onConfirm}>
              Да
            </button>

            <button className='button button--green' onClick={onCancel}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAll;
