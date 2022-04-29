/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import TrajetService from '../services/trajet.service'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment'
import TokenService from '../services/token.service'

export default function ReservationsListModal({ openModal, changeShowModalState, trajetId }) {
  const [open, setOpen] = useState(false)

  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  

  const cancelButtonRef = useRef(null)
 
  const removeReservation = (reservation) => {
    TrajetService.cancelReservationOwner(reservation)
        .then(res => {
            console.log(res)
            setRefresh(!refresh)
        }).catch(error => {
            console.log(error)
        })
    }

    const confirmReservation = (reservation) => {
        TrajetService.confirmReservationOwner(reservation)
            .then(res => {
                console.log(res)
                setRefresh(!refresh)
            }).catch(error => {
                console.log(error)
            })
        }

    
  const fetchData = () => {
    TrajetService.getTrajetUserReservationsList(trajetId)
    .then((res) => {
        console.log(res.data);
        setReservations(res.data.reservations)
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        setLoading(false)
    })
    }

  useEffect(()=> {
    if (openModal == true) {
      fetchData();
      console.log(reservations);
      setOpen(true)
    }

 
  }, [openModal, refresh])  
  
  return (
    <Transition.Root show={open} as={Fragment}
    onClose={() => changeShowModalState()}
    >
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
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
            <h3 className="mt-5 mb-5 text-gray-500 text-center">Liste des réservations</h3>
            <hr />
            {
                reservations.length > 0 ? 
                reservations.map((reservation, index) => {
                    return (
                        <div className="bg-white px-4 py-5 sm:p-6" key={index}>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <div className="flex">
                                    <img src={reservation.user[0].picture} className="w-14 h-14" style={{borderRadius:"50%"}}/>

                                    <div className="text-sm leading-5 mt-2 ml-3 font-medium text-gray-900">
                                    <NavLink to={`profile/${reservation.user[0]._id}`}>{reservation.user[0].firstName}  {reservation.user[0].lastName}</NavLink>
                                    
                                        <div className=" flex items-center text-sm leading-5 text-gray-500">
                                        
                                        <span>
                                            Statut de la réservation : {
                                                reservation.status == 'pending' ?
                                                'En cours' 
                                                : '' 
                                            } 
                                            {reservation.status == 'confirmed' ?
                                                'Confirmé' : ''}
                                                { reservation.status == 'canceled' ?
                                                'Annulé': ''
                                            }
                                        </span>
                                    </div>

                                    </div>    
                                            {  
                                              reservation.status == 'pending' ?
                                              <button className="mt-2 mb-2 ml-20 bg-gray-200 rounded-md shadow-md p-2 text-gray-600" onClick={() => confirmReservation(reservation._id)}>CONFIRMER</button>
                                                : ''
                                            } 
                                            {reservation.status == 'confirmed' ?
                                                <button className="mt-2 mb-2 ml-20 bg-gray-200 rounded-md shadow-md p-2 text-gray-600" onClick={() => removeReservation(reservation._id)}>ANNULER</button>     : 
                                                ''
                                            }
                                            {reservation.status == 'canceled' 
                                              
                                            ?
                                            <p className="ml-20 text-sm mt-3 text-gray-400">Réservation annulé</p> : 
                                                ''
                                            }
                                              
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    )
                }) : ''
            }
             

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                      setOpen(false)
                      changeShowModalState()
                    }}
                  ref={cancelButtonRef}
                >
                  Fermer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
