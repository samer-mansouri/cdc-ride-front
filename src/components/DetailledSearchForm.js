import { BackspaceIcon, SearchIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import TrajetService from '../services/trajet.service';
import { useState } from 'react';


export default function DetailledSearchForm({ onFetch, reload }) {

  const [show, setShow] = useState(false)



  const toggleShow = () => {
    show ? setShow(false) : setShow(true)
  }

  const searchTrajet = (values) => {
    TrajetService.trajetDetailledSearch(values)
    .then(res => {
      console.log(res.data)
      onFetch(res.data)
      toggleShow()
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
         
        <Formik
        initialValues={{
            placeOfDeparture: '',
            placeOfDestination: '',
            departureTime: '',
            pathTaken: '',
            userGender: '',
            }}
            onSubmit={values => searchTrajet(values)}
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
                  id="pathTaken"
                  name="pathTaken"
                  type="text"
                  required
                  className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Trajectoire effectué"
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
              <div>
                <label htmlFor="gender" className="sr-only">
                  Genre
                </label>
                <Field
                  id="gender"
                  as="select"
                  name="userGender"
                  required
                  className="appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                  placeholder="Sexe du conducteur"
                >
                  <option value="" className="text-gray-500">Sexe du conducteur</option>
                  <option value="Male" className="text-gray-500">Homme</option>
                 <option value="Female" className="text-gray-500">Femme</option>
                </Field>
              </div>
            </div>

           
            <div>
              <button
                type="submit"
                className="group relative w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />
                </span>
                CHERCHER
                </span>
              </button>
            </div>
          </Form>
        </Formik>
        {
          show ? 
          <button 
            onClick={() => {reload(); toggleShow();}}
          className="text-white border-0 py-2 px-4 bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e] rounded">
          <BackspaceIcon className="inline-block h-5 w-5 mb-1 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" /> TOUT LES TRAJETS</button> : ''
        }
        </div>
      </div>
    </>
  )
}
