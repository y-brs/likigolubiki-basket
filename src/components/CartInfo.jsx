import AnimatedNumber from '@/components/AnimatedNumber';
import { getDeclension } from '@/utils/utils';

function CartInfo({ countItems, totalSummary }) {
  const productWord = getDeclension(countItems, 'товар', 'товара', 'товаров');

  return (
    <>
      <div className='basket-information__top'>
        <div className='basket-information__count'>
          <span className='basket-information__label'>В корзине:</span>
          <span className='basket-information__value'>
            <AnimatedNumber number={Number(countItems)} /> {productWord}
          </span>
        </div>

        <div className='basket-information__total'>
          <span className='basket-information__label'>Итого:</span>
          <span className='basket-information__value'>
            <AnimatedNumber number={Number(totalSummary)} /> ₽
          </span>
        </div>
      </div>
    </>
  );
}

export default CartInfo;
