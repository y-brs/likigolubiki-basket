import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Cart from '@/components/Cart';
import ProductList from '@/components/ProductList';

import '@/style.css';

function App() {
  const [basket, setBasket] = useState([]);
  const [cart, setCart] = useState({});
  // const [cartCountItems, setCartCountItems] = useState('');
  // const [cartTotalSummary, setCartTotalSummary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingRemoval, setPendingRemoval] = useState({});
  const [removalWarning, setRemovalWarning] = useState({});
  const removalTimers = useRef({});
  const warningTimers = useRef({});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const baseURL =
    process.env.NODE_ENV === 'development' ? '/ajax/basket.json' : '/ajax/basket.json';

  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then(response => {
        if (response.data.status === 'success') {
          const basketData = response.data.BASKET || [];
          setBasket(basketData);

          const initialCart = basketData.reduce((acc, item) => {
            acc[item.ID] = item.QUANTITY;
            return acc;
          }, {});
          setCart(initialCart);

          // setCartTotalSummary(response.data.BASKET_SUM || '');
          // setCartCountItems(response.data.BASKET_NUM || '');
        } else if (response.data.status === 'error') {
          setErrorMessage(response.data.message || 'Произошла ошибка');
        }
      })
      .catch(error => console.error('Ошибка загрузки данных', error));
  }, []);

  const updateCart = (id, quantity) => {
    if (quantity === 0) {
      setPendingRemoval(prev => ({ ...prev, [id]: true }));
      warningTimers.current[id] = setTimeout(() => {
        setRemovalWarning(prev => ({ ...prev, [id]: true }));
      }, 5000);
      removalTimers.current[id] = setTimeout(() => {
        setBasket(prevBasket => prevBasket.filter(product => product.ID !== id));
        setPendingRemoval(prev => {
          const newRemoval = { ...prev };
          delete newRemoval[id];
          return newRemoval;
        });
        setRemovalWarning(prev => {
          const newWarning = { ...prev };
          delete newWarning[id];
          return newWarning;
        });
        setCart(prevCart => {
          const newCart = { ...prevCart };
          delete newCart[id];
          sendCartUpdate(newCart);
          return newCart;
        });
        delete removalTimers.current[id];
        delete warningTimers.current[id];
      }, 7000);
    } else {
      setCart(prevCart => {
        const newCart = { ...prevCart, [id]: quantity };
        sendCartUpdate(newCart);
        return newCart;
      });
    }
  };

  const removeAllItems = () => {
    setCart({});
    setBasket([]);
    sendCartUpdate({});
  };

  const restoreItem = id => {
    if (removalTimers.current[id]) {
      clearTimeout(removalTimers.current[id]);
      delete removalTimers.current[id];
    }
    if (warningTimers.current[id]) {
      clearTimeout(warningTimers.current[id]);
      delete warningTimers.current[id];
    }
    setPendingRemoval(prev => {
      const newRemoval = { ...prev };
      delete newRemoval[id];
      return newRemoval;
    });
    setRemovalWarning(prev => {
      const newWarning = { ...prev };
      delete newWarning[id];
      return newWarning;
    });
  };

  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
  const totalPrice = basket.reduce(
    (acc, product) => acc + product.PRICE * (cart[product.ID] || product.QUANTITY),
    0
  );

  const sendCartUpdate = updatedCart => {
    axios
      .post('/api/update-cart', updatedCart)
      .catch(error => console.error('Ошибка обновления корзины', error));
  };

  const onSubmit = async data => {
    const orderData = { ...data, cart };
    console.log(orderData);

    axios
      .post('/api/submit-order', orderData)
      .then(response => alert('Заказ отправлен!'))
      .catch(error => console.error('Ошибка отправки заказа', error));
  };

  return (
    <>
      <h1>Корзина</h1>

      <div className='basket'>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        {basket.length > 0 ? (
          <>
            <ProductList
              products={basket}
              cart={cart}
              updateCart={updateCart}
              pendingRemoval={pendingRemoval}
              removalWarning={removalWarning}
              restoreItem={restoreItem}
              removeAllItems={removeAllItems}
            />

            <Cart
              cartCountItems={totalItems}
              cartTotalSummary={totalPrice}
              name={name}
              phone={phone}
              setName={setName}
              setPhone={setPhone}
              onSubmit={onSubmit}
            />
          </>
        ) : (
          <>
            <p>Ваша корзина пуста</p>
            <p>
              Нажмите <a href='/'>здесь</a>, чтобы продолжить покупки
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
