import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя'),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]{7,15}$/, 'Введите корректный номер телефона')
    .required('Введите телефон'),
  contact: yup.string().required('Выберите способ связи'),
});

function CartForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = data => {
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='basket-information__bottom'>
          <div className='basket-information__question'>Как удобнее связаться?</div>

          <div className='basket__radio'>
            {['Звонок', 'Telegram', 'WhatsApp'].map(option => (
              <label key={option} className='basket__radio-item'>
                <input
                  type='radio'
                  value={option}
                  {...register('contact')}
                  className='radio peer'
                />
                {option}
              </label>
            ))}
            {errors.contact && <p className='error'>{errors.contact.message}</p>}
          </div>

          <div className='basket__input'>
            <div className='form__item'>
              <input
                className='input'
                type='text'
                placeholder='Как вас зовут?'
                {...register('name')}
              />
              {errors.name && <p className='error'>{errors.name.message}</p>}
            </div>

            <div className='form__item'>
              <input className='input' type='tel' placeholder='Телефон' {...register('phone')} />
              {errors.phone && <p className='error'>{errors.phone.message}</p>}
            </div>
          </div>

          <div className='basket__buttons'>
            <button className='button button--green' type='submit'>
              Оформить заказ
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
