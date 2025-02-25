function DeleteAll({ onConfirm, onCancel, isDeleteAll }) {
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
    </div>
  );
}

export default DeleteAll;
