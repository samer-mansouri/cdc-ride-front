import React, { Component, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PlusIcon } from '@heroicons/react/solid';
import TrajetService from '../services/trajet.service';

const CarSchema = Yup.object().shape({
  title: Yup.string().required('Title field is required'),
  description: Yup.string().required('Description field is required'),
});


function AddDeclaration({ getFormRef }) {

  const myForm = useRef(null);

  const [success, setSuccess] = useState(false);
  

  const sendData = (values) => {
        TrajetService.createDeclaration(values)
        .then(res => {
          console.log(values)
          console.log(res)
          myForm.current.resetForm();
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000);
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
                 Ajouter votre déclaration
                 {
                  success ? <div className="text-center text-green-500 text-sm mt-1">Votre déclaration a été ajoutée avec succès</div> : null
                }
                </h2>
                
              <Formik
              initialValues={{
                    title: '',
                    description: '',
                  }}
                  innerRef={f => (myForm.current = f)}
                  onSubmit={values => sendData(values)}
              >
                <Form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="mark" className="sr-only">
                        Objet de la déclaration
                      </label>
                      <Field
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Objet de la déclaration"
                      />
                    </div>
                   
                    <div>
                      <label htmlFor="puissance" className="sr-only">
                        Description
                      </label>
                      <Field
                        id="description"
                        name="description"
                        type="text"
                        required
                        className="rounded-b-md pb-28 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Description"
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


export default AddDeclaration;