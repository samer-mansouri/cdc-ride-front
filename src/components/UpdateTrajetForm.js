import React, { Component, useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PlusIcon } from '@heroicons/react/solid';
import TrajetService from '../services/trajet.service';

const CarSchema = Yup.object().shape({
  placeOfDeparture: Yup.string().required('Mark field is required'),
  placeOfDestination: Yup.string().required('Model field is required'),
  departureTime: Yup.string().required('Color field is required'),
  pathTaken: Yup.string().required('Year field is required'),
  availableSeats: Yup.string().required('Category field is required'),
  motorization: Yup.string().required('Motorization field is required'),
  power: Yup.string().required('Power field is required'),
});


function UpdateTrajetForm({ getFormRef, updateUserGarage, trajet, updateUserGarageOnUpdate}) {

  const myForm = useRef(null);



  const sendData = (values) => {
        TrajetService.updateTrajet(trajet._id, values)
        .then(res => {
          console.log(values)
          updateUserGarageOnUpdate(res.data.trajet)
          console.log(res)
        })
        .catch(err => console.log(err))
  }
  

  useEffect(() => {
    getFormRef(myForm);
    console.log(myForm);
  }, [])


    return (  
      <>
       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
              <h2 className="mt-2 text-center text-xl font-extrabold text-gray-900">
                 Mettre à jour le trajet
                </h2>
              <Formik
              initialValues={{
                    _id: trajet ? trajet._id : '',
                    placeOfDeparture: trajet ? trajet.placeOfDeparture : '',
                    placeOfDestination: trajet ? trajet.placeOfDestination : '',
                    departureTime: trajet ? trajet.departureTime : '',
                    pathTaken: trajet ? trajet.pathTaken : '',
                    availableSeats: trajet ? trajet.availableSeats : '',
                    price: trajet ? trajet.price : '',
                    phoneNumber: trajet ? trajet.phoneNumber : '',
                    vehiculeId: trajet ? trajet.vehiculeId : '',
                  }}
                  innerRef={f => (myForm.current = f)}
                  onSubmit={values => sendData(values)}
              >
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="mark" className="sr-only">
                        Lieu de départ
                      </label>
                      <Field
                        id="placeOfDeparture"
                        name="placeOfDeparture"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Lieu de départ"
                      />
                    </div>
                    <div>
                      <label htmlFor="model" className="sr-only">
                        Lieu de destination
                      </label>
                      <Field
                        id="placeOfDestination"
                        name="placeOfDestination"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Lieu de destination"
                      />
                    </div>
                  <div>
                      <label htmlFor="couleur" className="sr-only">
                        Temps de départ
                      </label>
                      <Field
                        id="departureTime"
                        name="departureTime"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Temps de départ"
                      />
                    </div>
  
                    <div>
                      <label htmlFor="year" className="sr-only">
                        Trajectoire effectué
                      </label>
                      <Field
                        id="pathTaken"
                        name="pathTaken"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Trajectoire effectué"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="sr-only">
                        Places disponibles
                      </label>
                      <Field
                        id="availableSeats"
                        name="availableSeats"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Places disponibles"
                      />
                    </div>
                    <div>
                      <label htmlFor="motorization" className="sr-only">
                        Prix
                      </label>
                      <Field
                        id="price"
                        name="price"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Prix"
                      />
                    </div>
                    <div>
                      <label htmlFor="puissance" className="sr-only">
                        Numéro de téléphone
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        required
                        className="rounded-b-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Numéro de téléphone"
                      />
                    </div>
  
                  </div>
      
                 
                  
                </Form>
              </Formik>
              </div>
            </div>
      </>
    )
  }


export default UpdateTrajetForm;