/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from 'react'
import {
  PlusIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Navbar from '../components/Navbar'
import Garage from '../components/Garage'
import { useParams } from 'react-router-dom'
import TrajetService from '../services/trajet.service'
import Moment from 'react-moment';
import TokenService from '../services/token.service'
import AddCarModal from '../components/AddCarModal'
import UpdateProfilePic from '../components/UpdateProfilePic'
import api from '../services/api';
import FormUpdateUser from '../components/FormUpdateUser'
import UpdatePermisPic from '../components/UpdatePermisPic'
import PictureModal from '../components/PictureModal'
import RatingComp from '../components/RatingComp'
import DeleteAccountComp from '../components/DeleteAccountComp'





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfile(props) {

  const [user, setUser] = useState([])
  const [userGarage, setUserGarage] = useState([])
  const [load, setLoad] = useState(true)
  const [profilePicture, setProfilePicture] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [ updatePermisPic, setShowUpdatePermisPic ] = useState(false)

  const toggleUpdatePermisPic = () => {
    setShowUpdatePermisPic(!updatePermisPic)
  }

  const updateUserGarage = (car) => {
    setUserGarage(prevState => [...prevState, car])
    console.log(userGarage)
  }

  const updateUserGarageOnDelete = (garage) => {
    setUserGarage(garage)
    console.log(userGarage)
  }

  const updateProfilePicture = (picture) => {
    setProfilePicture(picture)
  }

  const updateUser = (user) => {
    setUser(user)
  }

  const updateUserGarageOnUpdate = (car) => {
    const index = userGarage.findIndex(x => x._id === car._id);
    
    const newArr = [...userGarage];
    newArr[index] = car;
    console.log(index)
    console.log(newArr);
    setUserGarage(newArr);
  }

  const showImage = (image) => {
    console.log(image)
    api.get(`/${image}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      //log error status code
      console.log(err.data);
    })
  }


  const [openModal, setOpenModal] = useState(false)

  const toggleOpenModal = () => {
    openModal ? setOpenModal(false) : setOpenModal(true)
  }

  const { id } = useParams();
  

  const [ permisPicModal, setPermisPicModal ] = useState(false)
  
  const togglePermisPicModal = () => {
    permisPicModal ? setPermisPicModal(false) : setPermisPicModal(true)
  }


  

  const getUser = () =>{
    TrajetService.getUserProfile(id)
    .then(res => {
      console.log(res.data)
      setUser(res.data)
      setUserGarage(res.data.garage)
      setProfilePicture(res.data.picture)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => setLoad(false))
  }

  useEffect(() => {
    getUser();
    console.log(user.garage)
  }, [id])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <AddCarModal 
      openModal={openModal}
      toggleOpenModal={toggleOpenModal}
      updateUserGarage={updateUserGarage}
      type="add"
      car={null}
      updateUserGarageOnUpdate={updateUserGarageOnUpdate}
      />
      
      {
        permisPicModal ?
        <PictureModal
        image={user.permisPic}
        openModal={permisPicModal}
        toggleShowPic={togglePermisPicModal}
      /> : ''
      }
      <div className="h-full bg-gray-100 h-screen bg-profile">
        <Navbar />
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-48 w-48 rounded-full"
                    crossOrigin
                    src={profilePicture}
                    alt=""
                    	                    
                  />
                  <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                </div>
                   
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                <p className="text-sm font-medium text-gray-500">
                  Inscrit le {' '} 
                  <Moment format="DD/MM/YYYY">
                    {user.createdAt}
                  </Moment>
                </p>
              </div>
            </div>
            {
              id === TokenService.getCurrentUserId() ?
              <div className="bg-white rounded shadow py-3 px-4">
                <DeleteAccountComp />
              </div>

              
              : 
              <div className="bg-white rounded shadow py-3 px-4">
              <h5 className="text-gray-500">Noter l'utilisateur</h5>
            <RatingComp 
              profileId={id}
            />
            </div>
            }
          </div>
         {
           id === TokenService.getCurrentUserId()
           ?
           <div className="max-w-3xl flex justify-center ml-44 px-4 sm:px-6 md:px-8 mt-5">
           <UpdateProfilePic 
                 updateProfilePicture={updateProfilePicture}
           />
   
           </div>
           : ''
         }

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="flex px-4 py-5 sm:px-6" >
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900 mr-48">
                      Informations
                    </h2>
                    {
                  TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getCurrentUserId() == id
                  ?
                  <button
                type="submit"
                onClick={showForm ? () => setShowForm(false) : () => setShowForm(true)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UsersIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />{''}
                </span>MODIFIER LE PROFILE
              </button>
                  :
                  ''
                }
                  </div>
                  {
                    showForm
                    ?
                    <FormUpdateUser user={user} updateUser={updateUser}/>
                    :
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Adresse Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Numéro de téléphone</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.address}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Permis</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.permis}
                          {
                            user.permisPic && user.role == 'Driver' ? 
                            <p className='text-gray-500 underline hover:cursor-pointer'
                            onClick={() => togglePermisPicModal()}
                          >Afficher Image</p> : ''
                          }
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                        <dd className="mt-1 text-sm text-gray-900"><Moment format="DD/MM/YYYY">{user.dateOfBirth}</Moment></dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Genre</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.gender == "Male" ? "Homme" : "Femme"}</dd>
                      </div>
                      {
                        id === TokenService.getCurrentUserId() && TokenService.getCurrentUserRole() == "Driver"
                        ?
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            onClick={() => toggleUpdatePermisPic()}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
                          >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            </span>{
                              user.permisPic ? 'Mettre à jour la photo du permis' : 'Ajouter une photo du permis'
                            }
                          </button>  
                        </div>
                        : ''
                      }

                      
                     
                    
                    </dl>
                    {
                        updatePermisPic ?
                        <div className="mt-2 w-80">
                          <UpdatePermisPic />
                        </div>
                        : ''
                      }
                  </div>
                  }
                </div>
                
              </section>
              
              {/* Comments*/}
           
            </div>

            {
              
              user.role == 'Driver'
              ?
              <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            


              <div className="bg-white px-4 py-5 shadow-md sm:rounded-lg sm:px-6">
                <div className="flex">
                <h2 id="timeline-title" className="mr-24 text-lg font-medium text-gray-900">
                  Garage
                </h2>
                {
                  TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getCurrentUserId() == id
                  ?
                  <button
                type="submit"
                onClick={() =>  setOpenModal(true)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="ml-4">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusIcon className="h-5 w-5 text-[#fdf2c5] group-hover:text-[#ffc65e]" aria-hidden="true" />{''}
                </span>AJOUTER VOITURE
                </span>
              </button>
                  :
                  ''
                }
              </div>
                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                {!load ? <Garage vehicules={userGarage}
                updateUserGarage={updateUserGarageOnDelete}
                updateUserGarageOnUpdate={updateUserGarageOnUpdate}
                userId={id}
                /> : '' } 
                </div>
              </div>

              
            </section> : ''
            }
          </div>
        </main>
      </div>
    </>
  )
}