import axios from 'axios';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  
  let itemsPrice = 0;
  
  if (cartItems && cartItems.length > 0) {
    itemsPrice = round2(
      cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
  }
  
  const shippingPrice = round2(itemsPrice * 0.30);
  const taxPrice = round2(itemsPrice * 0.20);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  const LC = cartItems.some((item)=>item.payment==="LC")
  const NotLC = cartItems.some((item)=>item.payment!=="LC")

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      {LC && <h1 className="mb-4 text-xl">Your inquiry Details</h1>}
      {NotLC && <h1 className="mb-4 text-xl">Place Order</h1>}
      
      {!cartItems || cartItems.length === 0 ? (
  <div>
    No items <Link href="/">Go Back</Link>
  </div>
) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg flex justify-center">Personal Info</h2>
              <div className='flex justify-center'>
                name :{shippingAddress.fullName}<br/>
                adress : {shippingAddress.address}<br/>
                city: {shippingAddress.city}<br/>
                contact: {shippingAddress.postalCode}<br/>
                country: {shippingAddress.country}<br/>
              </div>
              <div>
                <Link href="/shipping" style={{color:"#6688D2", fontSize:30}}>Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              {LC && (<h2 className="mb-2 text-lg">Inquiry Items</h2>)}
              {NotLC && (<h2 className="mb-2 text-lg">Order Items</h2>)}
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">ITEM-PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`} className="flex items-center">

                          <Image
                            src={item.image1}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: "100%",
                              height: "auto"
                            }}></Image>
                          {item.name}

                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">BDT{item.price}</td>
                      <td className="p-5 text-right">
                        BDT{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>BDT{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    {LC && (<div>To be Discussed</div>)}
                    {NotLC && (<div>BDT {itemsPrice*20/100}</div>)}
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    {LC && (<div>To be Discussed</div>)}
                    {NotLC && (<div>BDT {itemsPrice*25/100}</div>)}
                  </div>
                </li>
                
                <li>
                  
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="ml-0 flex justify-center primary-button7 w-full flex-nowrap" style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}
                  ><p style={{ color: "black", fontSize: 25 }}>Lets Deal</p><Image src={`/images/deal.png`} width={40} height={40} className='ml-2'/> 
                    
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
