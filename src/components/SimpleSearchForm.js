import { SearchIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';


export default function SimpleSearchForm() {


  return (
    <>
      <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">

        <Formik
        initialValues={{
            placeOfDeparture: '',
            placeOfDestination: '',
            departureTime: '',
            }}
            onSubmit={values => console.log(values)}
        >
            
          <Form className="grid xl:grid-cols-2 lg:grid-cols-1 mt-2 xl:ml-80" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 rounded-md shadow-sm ">
              <div>
                <Field
                  id="depart"
                  name="placeOfDeparture"
                  type="text"
                  required
                  className="appearance-none mb-2 rounded-none mr-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Lieu de départ"
                />
              </div>
              <div>
                <Field
                  id="destination"
                  name="placeOfDestination"
                  type="text"
                  required
                  className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Lieu de destination"
                />
              </div>
              <div>
                <Field
                  id="hour"
                  name="departureTime"
                  type="time"
                  required
                  className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Heure de départ"
                />
              </div>
            </div>

           
            <div>
              <button
                type="submit"
                className="group relative w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />
                </span>
                CHERCHER
              </button>
            </div>
          </Form>
        </Formik>

        </div>
      </div>
    </>
  )
}
