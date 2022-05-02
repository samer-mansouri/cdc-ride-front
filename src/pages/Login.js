import { LockClosedIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import ExclamationAlertNew from '../components/ExclamationAlertNew';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required'),
    password: Yup.string().required('Password field is required'),
  });
export default function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [notUser, setNotUser] = useState(false);

    const sendData = (data) => {
        AuthService.login(data)
        .then(res => {
          console.log(res)
          setLoggedIn(true)
        })
        .catch(err => {
          console.log(err)
          if(err.response.status === 404) {
            setNotUser(true)
            setTimeout(() => {
              setNotUser(false)
            }, 5000);
          }
        })    
    }

    if(loggedIn){
     return <Redirect to="/trajets" />
    } else {
      return (
        <>
        <Navbar />
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 my-40">
              <div>
                <h1 className="text-[#ffc65e] font-bold text-2xl text-center">RIDE</h1>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Se connecter à votre compte</h2>
                {
                  notUser ? 
                    <div className="mt-3">
                      <ExclamationAlertNew 
                      title="Ce compte n'existe pas"
                      message="Veuillez vérifier vos identifiants"
                    />  
                    </div>
                  : ''
                }
              </div>
            <Formik
            initialValues={{
                email: '',
                password: '',
                }}
                validationSchema={SignInSchema}
                onSubmit={values => sendData(values)}
            >
              <Form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <Field
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                      placeholder="Adresse email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Mot de passe
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                      placeholder="Mot de passe"
                    />
                  </div>
                </div>
    
               
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />
                    </span>
                    SE CONNECTER
                  </button>
                </div>
              </Form>
            </Formik>
            </div>
          </div>
        </>
      )
    }
  
}
