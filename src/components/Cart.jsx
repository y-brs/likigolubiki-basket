import { useScrollPadding } from '@/hooks/useScrollPadding';

import CartForm from '@/components/CartForm';
import CartInfo from '@/components/CartInfo';

function Cart({ cartCountItems, cartTotalSummary, name, phone, setName, setPhone, onSubmit, errorMessage, isLoading, isError }) {
  const scrollBlockRef = useScrollPadding({ threshold: 100, initialPadding: false });

  return (
    <div className='basket-information --scroll' ref={scrollBlockRef}>
      <CartInfo countItems={cartCountItems} totalSummary={cartTotalSummary} />

      <CartForm
        name={name}
        phone={phone}
        setName={setName}
        setPhone={setPhone}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default Cart;
