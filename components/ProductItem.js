/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card mt-2">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image1}
          alt={product.name}
          className="rounded shadow object-cover h-64 w-full"
        /><br/>
        <span className="ml-0 flex justify-center" style={{color: "#205995", fontWeight: "bold", fontSize:22}}>{product.name}<br/></span>
      </Link>
      <div className='card mb-0 mt-3' style={{backgroundColor:"#A3BEE4"}}>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
        
        </Link>
        <p className="mb-2" style={{color: "#071C42"}}>BRAND : {product.brand}</p>
        <p style={{color: "#071C42"}}>PRICE : BDT{product.price}</p><br/>

        
        <div className="seedetails mb-0 w-full object-cover shadow-2xl flex items-center justify-center pr-4" >
        <Link href={`/product/${product.slug}`}>

          
        <button className="w-full rounded flex justify-center hover:backdrop-blur-10xl" style={{fontSize:20}}>
        <p className="ml-2 mb-0 flex justify-center" style={{color: "white"}}>See Details</p>
        <Image className='ml-2' src={`/images/slideright.png`} alt="google logo" height={25} width={25}/>
        </button>
        </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
