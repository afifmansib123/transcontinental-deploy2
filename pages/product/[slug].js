import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import SimpleImageSlider from "react-simple-image-slider";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems && state.cart.cartItems.find((x) => x.slug === product.slug);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  const sliderImages = [
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTdUmK6fRPfPQIMyOxUOjiTnR2VYizvkkWUxLhGoVJNobm5Id3fpRhsIGtPj3H06ujPb4&usqp=CAU",
    },
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcQduUpBWhSdgkWqqIrSmw5MMU697Xlx3SCjlB4eZSv0Q&s",
    },
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTnzApyh1ZmbXLBUg_iFRio23hzRyAJfwBRfnVozXdEnu-NK4jFt2_gsYujKf-CbT6Cr_A&usqp=CAU",
    },
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTDnfOIY9gjVyoT4ulMp55roiV5KefqaDByUc0HdD8p3tdpXuwxTaXjhLdyUFeQzZ2ZwE&usqp=CAU",
    },
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcR3IVlvufXIDZXxq0O8SVqwU2HeO6y7as0OXJl-YT55BA&s",
    },
    {
      url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcQs_7aafRRY4vEbWz2wydowaogMmGI7mRVG6MQfZVtKDFXUGqt5iF-Mu0AYMQBEeznPkU&usqp=CAU",
    },
    {
      url: "https://smartslider3.com/wpcontent/uploads/2019/01/photo_slideshow.jpg",
    },
  ];



  return (
    <Layout title={product.name}>
      <h1 className='flex items-center justify-center' style={{ backgroundColor: "#203F9F", fontSize: 25, color: "white" }}>BROUGHT TO YOU BY -{product.uploader}'S SHOP</h1>
      <div className="flex justify-start flex-nowrap">
        <Link href="/"> <Image src={`/images/back1.png`} width={30} height={30} /> back to products  </Link>
      </div>
      <div className="grid md:grid-cols-5 md:gap-3">
        <div className="md:col-span-3">
          <SimpleImageSlider
            width={300}
            height={300}
            images={[
              { url: product.image1 },
              { url: product.image2 },
              { url: product.image3 },
              { url: product.image4 },
              { url: product.image5 },
            ]}
            showNavs={true}

          />
        </div>
        <div>
          <ol >
            <li>
              <h1 className="text-lg" style={{ color: "#0B2A81" }}>{product.name}</h1>
            </li>
            <li style={{ color: "#0B183D" }}>Category: {product.category}</li>
            <li style={{ color: "#0B183D" }}>Brand: {product.brand}</li>
            <li style={{ color: "#0B183D" }}>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li style={{ color: "#0B183D" }}>Description: {product.description}</li>
          </ol>
        </div>
        <div><br />
          <div className="card p-5" style={{ color: "#091E5F", backgroundColor: "#D5D9E8" }}>
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>BDT{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div><br/>

            <p className='flex justify-center flex-nowrap' style={{color: "#741F0F"}}>* Please Note* </p>
            <p className='flex justify-center flex-nowrap'>This is only Item Price</p>
            <p className='flex justify-center flex-nowrap'>Shipping And Import Prices</p>
            <p className='flex justify-center flex-nowrap'>will be specified later</p><br/>
            
            { product.payment !== "LC"?(
            <button
              className="ml-0 flex justify-center primary-button w-full"
              onClick={addToCartHandler} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/cartmain2.png`} width={40} height={40} className='mr-3' /> <p style={{ color: "white", fontSize: 25 }}>Add Item</p>
            </button>) : (<div><button
              className="ml-0 flex justify-center primary-button6 w-full"
              onClick={addToCartHandler} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/rightside.webp`} width={40} height={40} className='mr-3'/> <p style={{ color: "black", fontSize: 25 }} >Proceed</p>
            </button><br></br>
            <p className='flex justify-center flex-nowrap'>This is an Import Item</p>
            <p className='flex justify-center flex-nowrap'>Cant be bought directly</p>
            <p className='flex justify-center flex-nowrap'>Proceed Above Or</p>
            <p className='flex justify-center flex-nowrap'>Contact Us Directly</p>
            </div>
          
            )
            }


            <br />
            <p className=' flex justify-center' style={{ color: "Blue", fontSize: 25, whiteSpace: "nowrap" }}>Contact And Inspect</p><br />
            <button
              className="ml-0 flex justify-center primary-button4 w-full" style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
              onClick={()=>{window.location.href=`tel:${+660932503470}`}}
            >
              <Image src={`/images/call2.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "white", fontSize: 22 }}>Call</p><br />
            </button> <br />
            <button
              className="ml-0 flex justify-center primary-button2 w-full"
              onClick={()=>{window.location.href=`https://wa.me/+66932503470`}} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/wasap.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "White", fontSize: 22 }}>Whatsapp</p><br />
            </button> <br />

            <button
              className="ml-0 flex justify-center primary-button3 w-full"
              onClick={()=>{window.location.href=`https://m.me/afif.mansib`}} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/ms1.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "black", fontSize: 22 }}
              >Messenger</p><br />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
