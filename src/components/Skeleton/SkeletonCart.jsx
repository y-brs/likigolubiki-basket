function SkeletonCart() {
  return (
    <div className='basket-information'>
      <div className='basket-information__top'>
        <div className='basket-information__count'>
          <span className='skeleton w-[160px] h-[36px]' />
          <span className='skeleton w-[90px] h-[28px]' />
        </div>

        <div className='basket-information__total'>
          <span className='skeleton w-[60px] h-[28px]' />
          <span className='skeleton w-[100px] h-[36px]' />
        </div>
      </div>

      <div className='basket-information__bottom'>
        <div className='basket-information__question skeleton w-[200px] h-[24px]'></div>

        <div className='basket__radio'>
          <div className='skeleton w-[90px] h-[20px]' />
          <div className='skeleton w-[90px] h-[20px]' />
          <div className='skeleton w-[90px] h-[20px]' />
        </div>

        <div className='basket__input'>
          <div className='form__item'>
            <div className='skeleton w-full h-[60px]' />
          </div>

          <div className='form__item'>
            <div className='skeleton w-full h-[60px]' />
          </div>
        </div>

        <div className='basket__buttons'>
          <div className='skeleton w-[185px] h-[60px]' />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCart;
