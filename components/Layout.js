import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import NavbarBackground from '../public/images/navbar.png';
import Image from 'next/image';



export default function Layout({ title, children }) {


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    if (cart.cartItems) {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }

  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Transcontinental Connections' : 'Transcontinental Connections'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.css. That's a common CDN URL for loading Font Awesome 4.7.0."></link>
      </Head>

      <ToastContainer position="bottom-center" limit={1} />


      <div className="flex min-h-screen flex-col justify-between">
        <header>


          <nav className="flex-col sticky-header flex items-center px-4 justify-content shadow-md">

            <Link legacyBehavior href="/" className="text-lg font-bold">
              <a className="flex items-center text-lg font-bold">
                <Image src={`/images/mainlogo.png`} width={190} height={120}></Image>
                <div className='ml-2'>
                  <h1 style={{fontSize:35, color:"#033570" }}>TRANSCONTINENTAL</h1>
                  <h1 className='ml-12' style={{fontSize:35, color:"#5786BD" }}>CONNECTIONS</h1>
                </div>
              </a>
            </Link>


          </nav>





          <nav className=" flex justify-center  bg-blue-900 border-blue-700 dark:bg-gray-900 dark:border-gray-700 flex-col " >



            <div className="max-w-screen-xl flex flex-wrap items-center justify-center  mx-auto p-4">

              <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-red-200 rounded-lg bg-blue-900 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-red dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>

                    <a href="#" class="block py-2 pl-3 pr-4 text-white  rounded  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-blue-600 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" style={{fontSize:23}}>Home</a>

                  </li>
                  <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-blue-600 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" style={{fontSize:23}}>About Us</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" style={{fontSize:23}}>Pricing</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" style={{fontSize:23}}>Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>


          <div className="flex items-center justify-center pr-4 ">
            
              <button  className="button1 flex items-center" onClick={toggleMenu}>
                <Image src={`/images/mainlogo4.png`} alt="catagoty" height={25} width={25} />
                <span className=" flex items-center ml-4 mr-4" style={{fontSize:25, color: 'white '}}>see all catagories</span>
  
              </button>
              <br/>
              <Link href="/cart" className="p-2">
                <span className="relative">
                  <p style={{color:"black", fontSize:25}}>Cart</p>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </span>
              </Link>
            

            {status === 'loading' ? (
              'Loading'
            ) : session?.user ? (
              <div className="relative ml-4">
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text" style={{color:"black", fontSize:25}}>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    {session.user.isExporter && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/exporter/dashboard"
                        >
                          Shop Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            ) : (
              <Link href="/login" className="p-2 ml-4" style={{color:"black", fontSize:25}}>
                Login
              </Link>
            )}
          </div>

          <br/>


          <form
            onSubmit={submitHandler}
            className="mx-auto mt-4 mb-2 flex flex-col items-center md:flex-row md:justify-center"
          >

            <div className="flex justify-center w-full">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0 w-full md:w-96"
                placeholder="Search your liking"
              />

              <button
                className="rounded rounded-tl-none rounded-bl-none bg-orange-400 p-1 text-sm dark:text-white"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-20"></SearchIcon>
              </button>
            </div>

          </form>
          <br/>
          <br/>
          
          
        </header>

        <div>
          <div className={`sliding-menu ${isOpen ? 'menu-open' : ''}`}>
            <div className="menu-content">
              <ul>
                <li>
                  <Link href={`search?query=&category=machine`}>machine</Link>
                </li>
                <li>
                  <Link href={`search?query=&category=car`}>Car</Link>
                </li>
                <li>
                  <Link href={`search?query=&category=excavator`}>Excavator</Link>
                </li>
                <li>
                  <Link href={`search?query=&category=vegetables`}>Vegetables</Link>
                </li>
                <button className="button1" onClick={toggleMenu}>
                  Close X
                </button>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex">




          <main className="container m-auto mt-4 px-4 w-full">



            {children}

          </main>
        </div>


        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © Afif Mansib Chowdhury</p>
        </footer>
      </div>

    </>
  );
}
