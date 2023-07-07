import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
////
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
        <div className="flex justify-center mb-4 ">
          <button className="primary-button w-full" style={{fontSize:20}}>Login</button>
        </div>
        
        <div className="flex justify-center mb-4 ">
        <GoogleButton />
        </div>
        <br/>

        <div className="flex justify-center mb-4 " style={{fontSize:20}}>
          Don&apos;t have an account? &nbsp;
          <Link className="flex justify-center mb-4" style={{color:"green"}} href={`/register?redirect=${redirect || '/'}`}>Register importer account</Link>
          
        </div>

        
        <div className="flex justify-center mb-4">
        <p style={{fontSize:20}}>Start selling?

        <Link style={{color:"green"}} href={`/registeshop`}>
          
         Open a Shop/Exporter Account 
         
          
          </Link>
          </p>
          </div>
      </form>
    </Layout>
  );
}
