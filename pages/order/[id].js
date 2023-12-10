import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    
    
  } = order;

  

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: Math.ceil(totalPrice/113) },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successgully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

   

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
          <div className="card1  p-5 flex justify-center items-center" style={{backgroundColor:"#B4F2D5"}}><p style={{color:"green"}}>Your Order Has Been Recieved. Please wait For Our Customer Service to Contact You.</p></div>
            

            <div className="card p-5">
            
              <div className='flex justify-center'>You Chose To Do {paymentMethod}</div>
              {paymentMethod === "Direct Pay" && (<div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error flex justify-center">Payment Not Recieved Yet</div>
              )}</div>)}
              {paymentMethod !== "Direct Pay" &&( <div className="alert-error flex justify-center">SHIPPING AND TAXATION details will be specified by our Team soon.If You are not an Importer already, our TC Shipping Services will give you a quotation on These fees as well. Thank You For Choosing TC.</div>)}
              <div className="alert-success flex justify-center"><Link href="https://www.searates.com/shipping/request?utm_source=google&utm_medium=cpc&utm_campaign=20043541860&utm_content=147782309519&utm_term=freight%20to&gad=1&gclid=Cj0KCQjw9fqnBhDSARIsAHlcQYQsR8mS-PLMm4_1mk6ZOAFCZl3BQof5tepeKUMA0dsDFqqsj9Rui1YaAm05EALw_wcB" style={{color:"#069460", backgroundColor: "white"}}>CLICK HERE TO GET AN ESTIMATED QUOTE</Link></div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image1}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          ></Image>
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
            </div>
          </div>
          <div>
            {paymentMethod === "Direct Pay" && (<div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>BDT{itemsPrice}</div>
                  </div>
                </li>{' '}
                
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping & Tax</div>
                    <div>BDT{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>BDT{totalPrice}</div>
                  </div>
                </li>
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="primary-button w-full"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>

            </div>)}

            {paymentMethod !=="Direct Pay" && (<div className="card  p-5">
            <p className=' flex justify-center' style={{ color: "Blue", fontSize: 25, whiteSpace: "nowrap" }}>Contact And Inspect</p><br />
            <button style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}
              className="ml-0 flex justify-center primary-button4 w-full"
              onClick={()=>{window.location.href=`tel:${+660932503470}`}}
            >
              <Image src={`/images/call2.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "white", fontSize: 22 }}>Call</p><br />
            </button> <br />
            <button style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}
              className="ml-0 flex justify-center primary-button2 w-full"
              onClick={()=>{window.location.href=`https://wa.me/+66932503470`}}
            >
              <Image src={`/images/wasap.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "White", fontSize: 22 }}>Whatsapp</p><br />
            </button> <br />

            <button style={{border:"1px solid black",padding:"10px", borderRadius: "4px", fontSize:20}}
              className="ml-0 flex justify-center primary-button3 w-full"
              onClick={()=>{window.location.href=`https://m.me/afif.mansib`}}
            >
              <Image src={`/images/ms1.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "black", fontSize: 22 }}
              >Messenger</p><br />
            </button>
            </div>)}


          </div>
        </div>
      )}
    </Layout>
  );
}

export default OrderScreen;
