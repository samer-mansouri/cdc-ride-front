/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import TrajetService from '../services/trajet.service'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment'
import TokenService from '../services/token.service'

export default function SingleTrajetModal({ openModal, changeShowModalState, trajetId }) {
  const [open, setOpen] = useState(false)

  const [ localTrajetStatus, setLocalTrajetStatus ] = useState('')


  const [ loading, setLoading ] = useState(true)
  const cancelButtonRef = useRef(null)

  const [trajet, setTrajet] = useState({})

  const createReservation = () => {
    TrajetService.postReservation({trajetId: trajet._id})
        .then(res => {
            console.log(res)
            setLocalTrajetStatus("pending")
        })
        .catch(error => {
            console.log(error)
        })
    }

    const removeReservation = () => {
        TrajetService.cancelReservation(trajet._id)
            .then(res => {
                console.log(res)
                setLocalTrajetStatus("")
            }).catch(error => {
                console.log(error)
            })
    }

  useEffect(()=> {
    if (openModal == true) {
      setOpen(true)
      TrajetService.getTrajet(trajetId)
      .then((res) => {
          console.log(res.data);
        setTrajet(res.data)
        setLocalTrajetStatus(res.data.reservationStatus)
        console.log(trajet)
      }).catch((err) => {
        console.log(err) 
      }).finally(() => {
        setLoading(false)
      })
    }

 
  }, [openModal])  
  
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
           {
                loading ? 
                <h2 className="mt-4 ml-4 font-bold">En cours de chargement...</h2>
                :
                <>
                <div className="flex">
                <div className="flex flex-row mt-5 ml-4">
                <img src={trajet.user[0].picture} className="w-14 h-14" style={{borderRadius:"50%"}}/>
                <div className="pt-2 ml-2">
                <h4 className=""><NavLink to={`profile/${trajet.user[0]._id}`}>{trajet.user[0].firstName} {trajet.user[0].lastName}</NavLink></h4>
                <h5 className="text-muted text-gray-400"><i>Publiée le <Moment format="DD/MM/YYYY">{trajet.createdAt}</Moment></i></h5>
                </div>
                
              </div>
              {
                    localTrajetStatus != "pending" ?
                    
                    <>
                    {
                      TokenService.getCurrentUserId() != trajet.user[0]._id ?
                      <div className="ml-auto">
                  <button className="mt-7 mb-2 mr-5 bg-gray-200 rounded-md shadow-md p-2 text-gray-600" onClick={() => createReservation()}>RÉSERVER</button>
      
                  </div> : ''
                  } 
                    </>
                    : 
                    localTrajetStatus == "pending"
                    ? <>
                    {
                      TokenService.getCurrentUserId() != trajet.user[0]._id ?
                      <div className="ml-auto">
                  <button className="mt-7 mb-2 mr-5 bg-gray-200 rounded-md shadow-md p-2 text-gray-600" onClick={() => removeReservation()}>ANNULER</button>
      
                  </div> : ''
                  } 
                    </> : ''
                  }    
                </div>
              <div className="mt-5 ml-4">
                <p>Lieu de départ: {trajet.placeOfDeparture}</p>
                <p>Lieu de destination: {trajet.placeOfDestination}</p>
                <p>Heure de départ: {trajet.departureTime}</p>
                <p>Trajectoire effectué: {trajet.pathTaken}</p>
                <p>Places disponibles: {trajet.availableSeats}</p>
                <p>Numéro de téléphone: {trajet.phoneNumber}</p>
                <p>Prix: {trajet.price}DT</p>
                <hr  className="mt-2"/>
                <p className="mt-2">Vehicule:</p>
                <div className="ml-3">
                    <p>Marque: {trajet.vehicule[0].mark}</p>    
                    <p>Modèle: {trajet.vehicule[0].model}</p>    
                    <p>Année: {trajet.vehicule[0].year}</p>    
                </div>
              </div>
                </>
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
