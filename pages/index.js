import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home({ products, featuredProducts }) {

  const pageSize = 8; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // ... (existing code)

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the start and end index for products to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToShow = products.slice(startIndex, endIndex);

  //saving coebase before shop

  const { state, dispatch } = useContext(Store);
  const { cart } = state;


  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems && cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };


  return (
    <Layout title="Home Page">

      <div className='welcome-header'>
        <h1 className='flex justify-center' style={{ fontSize: 35, color: "white", whiteSpace: "nowrap" }}>NO.1 BUSINESS PORTAL OF ASIA</h1>
        <h1 className='flex justify-center' style={{ fontSize: 20, color: "white", whiteSpace: "nowrap" }}>IMPORT EXPORT & TRADE</h1>
      </div>

      <Carousel showThumbs={false} autoPlay interval={1500} className="full-screen object-fill" style={{ width: '100%', height: '100%' }}>
        {featuredProducts.map((product, index) => (
          <div key={product._id}>
            <Link href={`#`} passHref className="flex">
              <img src={product.banner} alt={product.name} className="carousel-image" />
              
              {index === 1 && <div className="overlay-text" style={{color:"#072644",  fontSize: 30, top:200}}> IMPORT EXPORT & TRADE WORLDWIDE <br/>Meet & Close deals with <br></br>Hundreds of Vendors in global Market</div>}
            </Link>
          </div>
        ))}
      </Carousel>

      <br></br>
      <br />

      <Link href="search?query=">
        <h1 className='flex justify-center' style={{ fontSize: 25, color: "#10539D", whiteSpace: "nowrap" }}>SEARCH WITH EASE<Image src={`/images/y.png`} alt="hello" height={10} width={40} className='ml-3'/></h1>
        <br />
         <div className="full-spanning-row" style={{ height: 80 }}> 
          <button className="full-width-button" style={{ fontSize:25, color:"Black", backgroundColor: "#2567B5" }}>Catagories</button>
          <button className="full-width-button" style={{ fontSize:25, color:"Black",backgroundColor: "#6790C0" }}>Brands</button>
          <button className="full-width-button" style={{ fontSize:25, color:"Black",backgroundColor: "#A8C2DF" }}>Prices</button>
          <button className="full-width-button" style={{ fontSize:25, color:"Black",backgroundColor: "#CEDDEE" }}>Featured</button>
        </div>
      </Link>






      <h2 className="h2 my-4 flex justify-center" style={{color: "#0C3B7E", fontSize:30}}>Latest Arrivals</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsToShow.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>


      <div style={{ position: "relative"}}>
      <Image src={`/images/background4.gif`} width={100} height={100} className="full-screen"></Image>
      <div className="image-overlay mb-0 mt-0">
        <p className='flex justify-center mb-0 mt-0' style = {{fontSize:21, color: "#1C448C"}}>WHO ARE WE?</p>
    <p className="image-overlay-text" style={{color: "#15336A"}}>TC is the leading import-export trade hub in Bangladesh, with HQ in both Thailand. Our platform facilitates import-export operations across diverse industries personalizing virtual storefronts,robust logistics networks, and dedicated support in smooth transactions. Committed to sustainability,trade and ethical sourcing.<Link style={{color:"#D14343"}} href={`/aboutus`}>...see more</Link></p>
  </div>
      </div>




      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / pageSize) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
