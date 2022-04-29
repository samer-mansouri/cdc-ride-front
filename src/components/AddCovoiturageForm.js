import { BackspaceIcon, PlusIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import TrajetService from '../services/trajet.service';
import { useEffect, useRef, useState } from 'react';


export default function AddCovoiturageForm({ vehicules, updateTrajetsList }) {

  const [show, setShow] = useState(false)
  const myForm = useRef(null);
    


  const toggleShow = () => {
    show ? setShow(false) : setShow(true)
  }

  const searchTrajet = (values) => {
    TrajetService.createCovoiturage(values)
    .then(res => {
      console.log(res.data)
      updateTrajetsList(res.data.covoiturage)
        myForm.current.resetForm()
    })
    .catch(error => console.log(error))
  }
  

  useEffect(() => {
      console.log(vehicules)
  })


    return (
        <>
        <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
            
            <Formik
            initialValues={{
                lieuDepart: '',
                lieuArrivee: '',
                heureDepart: '',
                cause: '',
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
                    name="lieuDepart"
                    type="text"
                    required
                    className="appearance-none mb-2 rounded-none mr-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Lieu de départ"
                    />
                </div>
                <div>
                    <Field
                    id="destination"
                    name="lieuArrivee"
                    type="text"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Lieu de destination"
                    />
                </div>
                <div>
                    <Field
                    id="hour"
                    name="heureDepart"
                    type="time"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Heure de départ"
                    />
                </div>
                <div>
                    <Field
                    id="cause"
                    name="cause"
                    type="text"
                    required
                    className="appearance-none rounded-none mb-2 block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                    placeholder="Cause"
                    />
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
  
}
