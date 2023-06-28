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
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      
      <div className="flex min-h-screen flex-col justify-between ">
        <header>

          
          <nav className="flex h-20 items-center px-4 justify-content justify-between shadow-md" style={{ backgroundImage: `url(${NavbarBackground.src})`, backgroundSize: 'cover' }}>
            <Link legacyBehavior href="/" className="text-lg font-bold">
            <a className="flex items-center text-lg font-bold">
            BACK OFFICE 
           
          
        </a>
            </Link>

            <div className="flex items-center z-10">
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
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
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
          <form
            onSubmit={submitHandler}
            className="mx-auto mt-4 mb-2 flex flex-col items-center md:flex-row md:justify-center"
          >
            
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0 w-full md:w-96 mb-2 md:mb-0 md:mr-2"
              placeholder="Search your liking"
            />
            
            <button
              className="rounded rounded-tl-none rounded-bl-none bg-yellow-300 p-1 text-sm dark:text-white"
              type="submit"
              id="button-addon2"
            >
              <SearchIcon className=" h-5 w-20"></SearchIcon>
            </button>
            
          </form>
        </header>

        <div>
      <button className="button1" onClick={toggleMenu}>
        Categories
      </button>
      <div className={`sliding-menu ${isOpen ? 'menu-open' : ''}`}>
        <div className="menu-content">
          <Link href={`search?query=&category=machine`}>machine</Link>
          <div>My Panel Content</div>
          <div>My Panel Content</div>
          <div>My Panel Content</div>
          <div>My Panel Content</div>
          <div>My Panel Content</div>
          <button className="button1" onClick={toggleMenu}>
            Close X
          </button>
        </div>
      </div>
    </div>

        <div className="flex">
        
        
        
        
        <main className="container m-auto mt-4 px-4">

       
         
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
