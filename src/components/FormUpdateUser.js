import { LockClosedIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TrajetService from '../services/trajet.service';
import { useState } from 'react';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required'),
  });
export default function FormUpdateUser({ user, updateUser }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (values) => {
        setIsLoading(true);
        TrajetService.updateUserProfile(values)
            .then(response => {
                setIsLoading(false);
                console.log(response.data);
                updateUser(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.response.data);
            });
    }
    

  return (
    <>
      <div className="min-h-full flex items-center justify-center pb-8 px-1 sm:px-1 lg:px-8">
        <div className="max-w-md w-full ">
          
        <Formik
        initialValues={{
            address: user.address,
            phoneNumber: user.phoneNumber,
            email: user.email,
            }}
            validationSchema={SignUpSchema}
            onSubmit={values => handleSubmit(values)}
        >
          <Form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            
              
              <div>
                <label htmlFor="address" className="sr-only">
                  Adresse
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Adresse"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Numéro de téléphone
                </label>
                <Field
                  id="phone"
                  name="phoneNumber"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Numéro de téléphone"
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Adresse email"
                />
              </div>
              
            </div>

           
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                MODIFIER
              </button>
            </div>
          </Form>
        </Formik>
        </div>
      </div>
    </>
  )
}
