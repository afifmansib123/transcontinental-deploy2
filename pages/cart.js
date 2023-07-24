import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  const LC = cartItems.some((item)=>item.payment==="LC")
  const NotLC = cartItems.some((item)=>item.payment!=="LC")

  return (
    <Layout title="Shopping Cart">

      <h1 className="mb-4 text-xl" style={{color:"#072644"}}>Please varify Your Items of Selection Before Furter Inquiry</h1>
      
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go To Items</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
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
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">BDT{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="card p-5" style={{color:"#040742"}}> <p className='flex justify-center'>
                  ITEM PRICE  ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) <br/>TOTAL : (
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} taka) </p>
                </div>
              </li>
              <li>
                {LC && NotLC ? (<button style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
              className="ml-0 flex justify-center primary-button6 w-full flex-nowrap"
              onClick={()=>{return toast.error("You have LC and Direct Pay items together. Please inquire them seperately")}}
            >
              <Image src={`/images/rightside.webp`} width={40} height={40} className='mr-2'/> <p className='flex-nowrap' style={{ color: "black", fontSize: 25 }}>Cannot Proceed</p>
            </button>) : (<button style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="ml-0 flex justify-center primary-button6 w-full"
                ><Image src={`/images/rightside.webp`} width={40} height={40} className='mr-3'/> <p style={{ color: "black", fontSize: 25 }}>Proceed</p>
                  
                </button>)}
              </li>
            </ul>
            
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
