import { LockClosedIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required'),
    password: Yup.string().required('Password field is required'),
  });
export default function Register() {
  return (
    <>
    <Navbar />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 lg:my-24 md:my-16">
          <div>
            <h1 className="text-[#ffc65e] font-bold text-2xl text-center">CDC-RIDE</h1>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Créer un nouveau compte</h2>
         
          </div>
        <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            phoneNumber: '',
            email: '',
            permis:'',
            password: '',
            password2: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={values => console.log(values)}
        >
          <Form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="firstName" className="sr-only">
                  Nom
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Prénom
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label htmlFor="date" className="sr-only">
                  Date de naissance
                </label>
                <Field
                  id="date"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Date de naissance"
                />
              </div>
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
              <div>
                <label htmlFor="permis" className="sr-only">
                  Permis
                </label>
                <Field
                  id="permis"
                  name="permis"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Permis"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confimer votre mote de passe
                </label>
                <Field
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Confirmer votre mot de passe"
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
                S'INSCRIRE
              </button>
            </div>
          </Form>
        </Formik>
        </div>
      </div>
    </>
  )
}
