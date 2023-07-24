import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Image from 'next/image';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl flex justify-center">In Case Of International Trades</h1>
        <h1 className="mb-4 text-xl flex justify-center">Please Make sure Once More Your Way Of Payment</h1>
        {['Direct Pay', 'LC/Bank Trasfer/TC International Payment Services'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="ml-0 flex justify-center primary-button6 " style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}
          > <Image src={`/images/lefty.png`} width={40} height={40} className='mr-2'/> <p style={{ color: "black", fontSize: 25 }}>Back</p>
           
          </button><br/>
          <button className="ml-0 flex justify-center primary-button6 " style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}><p style={{ color: "black", fontSize: 25 }}>Next</p><Image src={`/images/rightside.webp`} width={40} height={40} className='ml-2'/> </button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
