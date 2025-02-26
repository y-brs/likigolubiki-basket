function SkeletonProductList({ itemCount = 3 }) {
  return (
    <div className='basket-items'>
      {Array(itemCount)
        .fill()
        .map((_, index) => (
          <div key={index} className='basket-item'>
            <div className='basket-item__delete skeleton w-[24px] h-[24px]' />

            <div className='basket-item__image'>
              <div className='skeleton size-[157px] mr-5 lg:mr-0' />
              <div className='basket-item__title skeleton w-[50%] h-[60px]' />
            </div>

            <div className='basket-item__description'>
              <div className='basket-item__link skeleton w-full xs:w-[300px] h-[30px]' />

              <ul className='basket-item__properties'>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <li key={index} className='basket-item__property items-center'>
                      <div className='skeleton w-[80px] h-[14px]' />
                      <div className='skeleton w-[50px] h-[16px]' />
                    </li>
                  ))}
              </ul>
            </div>

            <div className='basket-item__add2cart'>
              <div className='skeleton w-[100px] h-[37px]' />
              <div className='skeleton w-[184px] h-[60px]' />
            </div>
          </div>
        ))}

      <div className='basket__delete-all skeleton ml-auto w-[160px] h-[24px]' />
    </div>
  );
}

export default SkeletonProductList;
