import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Cart from '@/components/Cart';
import ProductList from '@/components/ProductList';
import SkeletonCart from '@/components/Skeleton/SkeletonCart';
import SkeletonProductList from '@/components/Skeleton/SkeletonProductList';
import DeleteAll from './components/DeleteAll';
import Success from './components/Success';

import '@/style.css';

function App() {
  const [basket, setBasket] = useState([]);
  const [cart, setCart] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCartMessage, setErrorCartMessage] = useState('');
  const [pendingRemoval, setPendingRemoval] = useState({});
  const [removalWarning, setRemovalWarning] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const removalTimers = useRef({});
  const warningTimers = useRef({});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const SESSID = window?.AppSettings?.SESSID;
  const [orderId, setOrderId] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const baseURL = process.env.NODE_ENV === 'development' ? '/ajax/basket.json' : '/ajax/basket.json';

  useEffect(() => {
    setIsDataLoading(true);
    axios
      .get(`${baseURL}`)
      .then(response => {
        return new Promise(resolve => {
          setTimeout(() => resolve(response), 500);
        });
      })
      .then(response => {
        if (response.data?.status === 'success') {
          const basketData = response.data?.BASKET || [];
          setBasket(basketData);

          const initialCart = basketData.reduce((acc, item) => {
            acc[item.ID] = item.QUANTITY;
            return acc;
          }, {});
          setCart(initialCart);
        } else if (response.data?.status === 'error') {
          setErrorMessage(response.data?.message || 'Произошла ошибка');
        }
      })
      .catch(error => console.error('Ошибка загрузки данных', error))
      .finally(() => setIsDataLoading(false));
  }, []);

  const updateCart = (id, quantity) => {
    if (quantity === 0) {
      setPendingRemoval(prev => ({ ...prev, [id]: true }));
      warningTimers.current[id] = setTimeout(() => {
        setRemovalWarning(prev => ({ ...prev, [id]: true }));
      }, 2000);
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
      }, 4000);
    } else {
      setCart(prevCart => {
        const newCart = { ...prevCart, [id]: quantity };
        sendCartUpdate(newCart);
        return newCart;
      });
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAll = () => {
    setIsDeleteAll(true);

    setTimeout(() => {
      setShowDeleteConfirm(false);
      setCart({});
      setBasket([]);
      sendCartUpdate({});

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
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
  const totalPrice = basket.reduce((acc, product) => acc + product.PRICE * (cart[product.ID] || product.QUANTITY), 0);

  const showError = message => {
    setErrorCartMessage(message);

    setTimeout(() => {
      setErrorCartMessage('');
    }, 5000);
  };

  useEffect(() => {
    const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    window.updateBasketCount(totalItems);
  }, [cart]);

  const sendCartUpdate = updatedCart => {
    axios.post('/ajax/basket-delete.json', updatedCart).catch(error => console.error('Ошибка обновления корзины', error));
  };

  const onSubmit = async data => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    const orderData = { ...data, cart };

    try {
      const response = await axios.post('/ajax/basket-send.json', orderData);

      if (response.data.status === 'success') {
        setOrderId(response?.data?.ORDER.ID);
        setOrderAmount(response?.data?.ORDER.AMOUNT);
        setOrderDate(response?.data?.ORDER.DATE);

        setTimeout(() => {
          setIsSuccess(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsError(true);
        }, 1000);

        setTimeout(() => {
          showError(response?.data?.message || 'Ошибка отправки заказа.');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setIsError(true);
      }, 1000);

      setTimeout(() => {
        showError(error?.response?.data?.message || 'Ошибка соединения с сервером.');
      }, 1000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const resetCart = () => {
    setName('');
    setPhone('');
    setCart({});
    setBasket([]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <h1>Корзина</h1>

      <div className='basket'>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        {isDataLoading ? (
          <>
            <SkeletonProductList itemCount={3} />
            <SkeletonCart />
          </>
        ) : basket?.length > 0 ? (
          <>
            <ProductList
              products={basket}
              cart={cart}
              updateCart={updateCart}
              pendingRemoval={pendingRemoval}
              removalWarning={removalWarning}
              restoreItem={restoreItem}
              removeAllItems={handleDeleteAll}
            />

            <Cart
              cartCountItems={totalItems}
              cartTotalSummary={totalPrice}
              name={name}
              phone={phone}
              setName={setName}
              setPhone={setPhone}
              onSubmit={onSubmit}
              errorMessage={errorCartMessage}
              isLoading={isLoading}
              isError={isError}
            />
          </>
        ) : (
          <>
            <div className='basket-empty'>
              <p>Ваша корзина пуста.</p>
              <p>
                Нажмите <a href='/'>здесь</a>, чтобы продолжить покупки.
              </p>
            </div>
          </>
        )}
      </div>

      {isSuccess && (
        <Success onClose={() => setIsSuccess(false)} resetCart={resetCart} orderId={orderId} orderDate={orderDate} orderAmount={orderAmount} />
      )}

      {showDeleteConfirm && <DeleteAll onCancel={() => setShowDeleteConfirm(false)} onConfirm={confirmDeleteAll} isDeleteAll={isDeleteAll} />}
    </>
  );
}

export default App;
