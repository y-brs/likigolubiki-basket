import CartForm from '@/components/CartForm';
import CartInfo from '@/components/CartInfo';

function Cart({
  cartCountItems,
  cartTotalSummary,
  name,
  phone,
  setName,
  setPhone,
  onSubmit,
  errorMessage,
  isLoading,
  isError,
}) {
  return (
    <div className='basket-information'>
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
