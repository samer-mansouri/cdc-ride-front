import React, { Component, useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PlusIcon } from '@heroicons/react/solid';
import TrajetService from '../services/trajet.service';

const CarSchema = Yup.object().shape({
  mark: Yup.string().required('Mark field is required'),
  model: Yup.string().required('Model field is required'),
  color: Yup.string().required('Color field is required'),
  year: Yup.string().required('Year field is required'),
  category: Yup.string().required('Category field is required'),
  motorization: Yup.string().required('Motorization field is required'),
  power: Yup.string().required('Power field is required'),
});


function AddCar({ getFormRef, updateUserGarage, type, car, updateUserGarageOnUpdate}) {

  const myForm = useRef(null);



  const sendData = (values) => {
    if(type === 'add'){
        TrajetService.addCar(values)
        .then(res => {
          updateUserGarage(res.data)
          myForm.current.resetForm();
          console.log(res)
        })
        .catch(err => console.log(err))
    } else if (type === 'update'){
        TrajetService.updateCar(car._id, values)
        .then(res => {
          updateUserGarageOnUpdate(values)
          console.log(res)
        })
        .catch(err => console.log(err))
    }
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
                  { 
                    type == "add" ?
                    'Ajouter une voiture'
                    : 'Mettre à jour votre voiture'
                  }
                </h2>
              <Formik
              initialValues={{
                    _id: car ? car._id : '',
                    mark: car ? car.mark : '',
                    model: car ? car.model : '',
                    color: car ? car.color : '',
                    year: car ? car.year : '',
                    category: car ? car.category : '',
                    motorization: car ? car.motorization : '',
                    power: car ? car.power : '',
                  }}
                  innerRef={f => (myForm.current = f)}
                  onSubmit={values => sendData(values)}
              >
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="mark" className="sr-only">
                        Marque
                      </label>
                      <Field
                        id="mark"
                        name="mark"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Marque"
                      />
                    </div>
                    <div>
                      <label htmlFor="model" className="sr-only">
                        Modèle
                      </label>
                      <Field
                        id="model"
                        name="model"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Modèle"
                      />
                    </div>
                  <div>
                      <label htmlFor="couleur" className="sr-only">
                        Couleur
                      </label>
                      <Field
                        id="color"
                        name="color"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Couleur"
                      />
                    </div>
  
                    <div>
                      <label htmlFor="year" className="sr-only">
                        Année
                      </label>
                      <Field
                        id="year"
                        name="year"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Année"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="sr-only">
                        Catégorie
                      </label>
                      <Field
                        id="category"
                        name="category"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Catégorie"
                      />
                    </div>
                    <div>
                      <label htmlFor="motorization" className="sr-only">
                        Motorisation
                      </label>
                      <Field
                        id="motorization"
                        name="motorization"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Motorisation"
                      />
                    </div>
                    <div>
                      <label htmlFor="puissance" className="sr-only">
                        Puissance
                      </label>
                      <Field
                        id="power"
                        name="power"
                        type="text"
                        required
                        className="rounded-b-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Puissance"
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


export default AddCar;