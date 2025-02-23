import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import * as yup from 'yup';

const schema = yup.object().shape({
  contact: yup.string().required('Выберите способ связи'),
  name: yup.string().required('Введите ваше имя'),
  phone: yup
    .string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона')
    .required('Введите телефон'),
});

function CartForm({ onSubmit, errorMessage, isLoading }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmitForm = data => {
    setShowError(false);
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='basket-information__bottom'>
          <div className='basket-information__question'>Как удобнее связаться?</div>

          <div className='basket__radio'>
            {['Звонок', 'Telegram', 'WhatsApp'].map(option => (
              <label
                key={option}
                className={`basket__radio-item ${errors.contact ? 'radio--error' : ''}`}>
                <input
                  type='radio'
                  value={option}
                  {...register('contact')}
                  className='radio peer'
                />
                {option}
              </label>
            ))}

            {/* {errors.contact && <p className='error'>{errors.contact.message}</p>} */}
          </div>

          <div className='basket__input'>
            <div className='form__item'>
              <input
                className={`input ${errors.name ? 'input--error' : ''}`}
                type='text'
                placeholder='Как вас зовут?'
                {...register('name')}
              />

              {/* {errors.name && <p className='error'>{errors.name.message}</p>} */}
            </div>

            <div className='form__item'>
              <Controller
                name='phone'
                control={control}
                render={({ field: { onChange, value, ref } }) => {
                  const [isLazy, setIsLazy] = useState(true);

                  return (
                    <IMaskInput
                      mask='+7 (000) 000-00-00'
                      lazy={isLazy}
                      value={value || ''}
                      className={`input ${errors.phone ? 'input--error' : ''}`}
                      placeholder='Телефон'
                      onAccept={value => onChange(value)}
                      onClick={() => setIsLazy(false)}
                      inputRef={ref}
                    />
                  );
                }}
              />

              {/* {errors.phone && <p className='error'>{errors.phone.message}</p>} */}
            </div>
          </div>

          {showError && (
            <div className='form__error --active'>
              <span className='icon-animate --red'>
                <span className='icon-animate__ping'></span>
                <span className='icon-animate__circle'></span>
              </span>
              <div className='form__error--text'>Заполните все обязательные поля</div>
            </div>
          )}

          {errorMessage && <p className='error'>{errorMessage}</p>}

          <div className='basket__buttons'>
            <button
              className={`button button--green ${isLoading ? 'button--process' : ''}`}
              type='submit'>
              <span>Оформить заказ</span>
            </button>

            <div className='basket__buttons-information'>
              Нажимая на&nbsp;кнопку, вы&nbsp;соглашаетесь на&nbsp;
              <a href='/' data-popup='personal'>
                обработку персональных данных
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CartForm;
