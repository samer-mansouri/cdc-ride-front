import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PlusIcon } from '@heroicons/react/solid';
import AdminService from '../../services/admin.service';

import Moment from 'react-moment';


export default function UpdateUserModal({ user, toggleRefresh }) {
  const [open, setOpen] = useState(false)

  const sendData = (values) => {
    AdminService.updateUser(user._id, values)
      .then(res => {
        console.log(res)
        setOpen(false)
        toggleRefresh()
      })
      .catch(err => console.log(err))
  }


  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }
    
  return (
     <>
      <button onClick={() => setOpen(true)}
      className="bg-orange-600 text-white py-2 px-4 rounded"
      >
          MODIFIER 
        </button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={() => setOpen(false)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                
                <Formik
                initialValues={{
                  _id: user ? user._id : '',
                  firstName: user ? user.firstName : '',
                  lastName: user ? user.lastName : '',
                  dateOfBirth: user ? formatDate(new Date(user.dateOfBirth)): '',
                  address: user ? user.address : '',
                  phoneNumber: user ? user.phoneNumber : '',
                  email: user ? user.email : '',
                  permis: user ? user.permis : '',
                }}
                onSubmit={values => sendData(values)}
                >
                  <Form className="mt-8 space-y-6 mx-4" action="#" method="POST">
                  <div className="rounded-md shadow-sm -space-y-px">
                    <h1 className="text-center mb-5 ">Modifier un utilisateur</h1>
                  <div>
                      <label htmlFor="firstName" className="sr-only">
                        Nom
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
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
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Prénom"
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
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Adresse"
                      />
                  </div>

                  

                  <div>
                      <label htmlFor="dateOfBirth" className="sr-only">
                        Date de naissance
                      </label>
                      <Field
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Date de naissance"
                      />
                  </div>

                  <div>
                      <label htmlFor="phoneNumber" className="sr-only">
                      Numéro de téléphone
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Numéro de téléphone"
                      />
                  </div>

                  <div>
                      <label htmlFor="email" className="sr-only">
                      Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Email"
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
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
                        placeholder="Permis"
                      />
                  </div>
                    
                    
                  </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e] sm:ml-3 sm:w-auto sm:text-sm"
               
                >
                 Modifier
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() =>{ 
                    setOpen(false)
                  }}
                >
                  Annuler
                </button>
              </div>
              </Form>
                </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}