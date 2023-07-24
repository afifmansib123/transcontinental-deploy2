import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GoogleButton } from '../components/googlebutton';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl" style={{fontSize:30}}>Login</h1>
        <div className="mb-4">
          <label htmlFor="email" style={{fontSize:20}}>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" style={{fontSize:20}}>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="flex justify-center mb-2">
          <button className="primary-button1 w-full flex flex-nowrap justify-center " style={{fontSize:18,color:"black",border:"1px solid black",padding:"8px", borderRadius: "4px"}}>
          <Image src={`/images/login1.png`} alt="google logo" height={30} width={30} className='mr-4'/>
            Login</button>
        </div>
        
        <div className="flex justify-center mb-2">
        <GoogleButton />
        </div>
        

        <div className="flex justify-center mb-2" style={{ fontSize:20}}>
        <Link className="flex justify-center"  href={`/register?redirect=${redirect || '/'}`}>
          Don&apos;t have an account? &nbsp;
          <p style={{color:"green", fontSize:20}}>Register importer account</p>
          </Link>
        </div>

        
        <div className="flex flex-nowrap justify-center mb-4">
        <Link  href={`/registershop`} >
        <p style={{fontSize:20, color: "green"}} >Start selling?
Open a Shop/Exporter Account 
         
          
          
          </p>
          </Link>
          </div>
      </form>
    </Layout>
  );
}
