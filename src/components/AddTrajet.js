import { BackspaceIcon, PlusIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import TrajetService from '../services/trajet.service';
import { useEffect, useRef, useState } from 'react';


export default function AddTrajet({ vehicules, updateTrajetsList }) {

  const [show, setShow] = useState(false)
  const myForm = useRef(null);
    


  const toggleShow = () => {
    show ? setShow(false) : setShow(true)
  }

  const searchTrajet = (values) => {
    TrajetService.createTrajet(values)
    .then(res => {
      console.log(res.data)
      updateTrajetsList(res.data.trajet)
        myForm.current.resetForm()
    })
    .catch(error => console.log(error))
  }
  

  useEffect(() => {
      console.log(vehicules)
  })

  if(vehicules.length > 0) {
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
                availableSeats: '',
                price: '',
                phoneNumber: '',
                vehiculeId: '',
                }}
                innerRef={f => (myForm.current = f)}
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
                    <Field
                    id="availableSeats"
                    name="availableSeats"
                    type="text"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Places disponibles"
                    />
                </div>
                <div>
                    <Field
                    id="price"
                    name="price"
                    type="text"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Prix"
                    />
                </div>
                <div>
                    <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Numéro de téléphone"
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="sr-only">
                    Vehicule
                    </label>
                    <Field
                    id="vehicule"
                    as="select"
                    name="vehiculeId"
                    required
                    className="appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Vehicule"
                    >
                    <option value="" className="text-gray-500">Vehicule</option>
                    { vehicules 
                        ? vehicules.map(vehicule => (
                            <option key={vehicule._id} value={vehicule._id}>{vehicule.mark} - {vehicule.model}</option>
                        ))
                        : ''
                    }
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
                    <PlusIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />
                    </span>
                    AJOUTER
                    </span>
                </button>
                </div>
            </Form>
            </Formik>
            {
            show ? 
            <button 
                onClick={() => console.log("Hi")}
            className="text-white border-0 py-2 px-4 bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e] rounded">
            <BackspaceIcon className="inline-block h-5 w-5 mb-1 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" /> TOUT LES TRAJETS</button> : ''
            }
            </div>
        </div>
        </>
    )
  } else {
    return <p className="text-center text-red-500 mb-3">Pour ajouter un Trajet vous devez avoir au moins une voiture.</p>
  }
}
