import axios from 'axios';
import { useContext , useState} from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

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
      
      <Carousel showThumbs={false} autoPlay interval={700} className="full-screen" style={{ width: '100%', height: '100%' }}>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`#`} passHref className="flex">
              <img src={product.banner} alt={product.name} className="carousel-image" />
            </Link>
            </div>
        ))}
      </Carousel>









      
      <div className="welcome-header">
  <h1>Welcome To Transcontinental Connections</h1>
</div>
      
      <h2 className="h2 my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {productsToShow.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
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
