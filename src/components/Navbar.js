/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  LogoutIcon,
  MapIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'
import TokenService from '../services/token.service'
import AddDeclarationModal from './AddDeclarationModal'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal(!showModal)
  

  return (
    <Popover className="sticky top-0 z-50 w-full bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <AddDeclarationModal
        openModal={showModal}
        toggleOpenModal={toggleShowModal}
      />
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to="/">
              <h1 className="text-[#ffc65e] font-bold text-2xl">RIDE</h1>
            </NavLink>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ffc65e]">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            
            <NavLink to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Accueil
            </NavLink>
            {
              !TokenService.getUser() || TokenService.getCurrentUserRole() !== 'admin' ?
              <NavLink to="/trajets" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Trajets
            </NavLink> : ''
            }

            
            {
           TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getUser().role != 'admin' 
           ? 
           <>
           

            <NavLink to="/covoiturages" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Covoiturages
            </NavLink> 
           {
              TokenService.getUser().role === 'Driver' 
              ?
              <NavLink to={'/usertrajets'} className="text-base font-medium text-gray-500 hover:text-gray-900">
             Vos Trajets
            </NavLink> : 
            ''
           }
            <a 
              onClick={() => setShowModal(true)}
            className="text-base font-medium text-gray-500 hover:text-black hover:cursor-pointer" >Déclarer</a>
            <NavLink to={'/profile/' + TokenService.getCurrentUserId()} className="text-base font-medium text-gray-500 hover:text-gray-900">
            <UserIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Profile
            </NavLink>
            <NavLink to="/logout" className="text-base font-medium text-gray-500 hover:text-gray-900">
            <LogoutIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Se déconnecter
            </NavLink>
            </>
  
           : 
           <>
            {
              !TokenService.getLocalAccessToken() || !TokenService.getLocalRefreshToken() || !TokenService.getUser()
              ?
              <>
           <a href="#valeurs" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Nos valeurs
          </a>
           <a href="#team" className="text-base font-medium text-gray-500 hover:text-gray-900">
           Équipe
          </a>
          <a href="#loc" className="text-base font-medium text-gray-500 hover:text-gray-900">
          Localisation
         </a>
           </> : ''
            }
           </>
         }

        {
           TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getUser().role === 'admin' 
           ? 
           <>
           <NavLink to={'/admin-users'} className="text-base font-medium text-gray-500 hover:text-gray-900">
             Utilisateurs
            </NavLink>
            <NavLink to="/admin-trajets" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Trajets
            </NavLink>
            <NavLink to="/admin-cars" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Vehicules
            </NavLink>
            <NavLink to="admin-declarations" className="text-base font-medium text-gray-500 hover:text-gray-900">Déclarations</NavLink>
            <NavLink to="/logout" className="text-base font-medium text-gray-500 hover:text-gray-900">
            <LogoutIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Se déconnecter
            </NavLink>
            </>
  
           : 
          ''
         }

          </Popover.Group>
        

          {
           TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser()
           ? 
          ''
           : 
           <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
           <NavLink to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
             Se connecter
           </NavLink>
           <NavLink
             to="/signup"
             className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#ffc65e] hover:bg-[#e0ae51]"
           >
             S'inscrire
           </NavLink>
         </div>
         }
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                <h1 className="text-[#ffc65e] font-bold text-2xl">RIDE</h1>

                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ffc65e]">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            
            
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-8">
              <NavLink to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Accueil
            </NavLink>
           

            
            {
           TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getUser().role != 'admin'
           ? 
           <>
           <NavLink to="/trajets" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Trajets
            </NavLink>

            <NavLink to="/covoiturages" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Covoiturages
            </NavLink> 
           {
              TokenService.getUser().role === 'Driver' 
              ?
              <NavLink to={'/usertrajets'} className="text-base font-medium text-gray-500 hover:text-gray-900">
             Vos Trajets
            </NavLink> : 
            ''
           }
            <a 
              onClick={() => setShowModal(true)}
            className="text-base font-medium text-gray-500 hover:text-black hover:cursor-pointer" >Déclarer</a>
            <hr className="shadow"/>
            <NavLink to={'/profile/' + TokenService.getCurrentUserId()} className="text-base font-medium text-gray-500 hover:text-gray-900">
            <UserIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Profile
            </NavLink>
            <NavLink to="/logout" className="text-base font-medium text-gray-500 hover:text-gray-900">
            <LogoutIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Se déconnecter
            </NavLink>
            </>
  
           : 
           <>
           <a href="#valeurs" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Nos valeurs
          </a>
           <a href="#team" className="text-base font-medium text-gray-500 hover:text-gray-900">
           Équipe
          </a>
          <a href="#loc" className="text-base font-medium text-gray-500 hover:text-gray-900">
          Localisation
         </a>
         <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
           <NavLink to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
             Se connecter
           </NavLink>
           <NavLink
             to="/signup"
             className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#ffc65e] hover:bg-[#e0ae51]"
           >
             S'inscrire
           </NavLink>
         </div>
           </>
         }

        {
           TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken() && TokenService.getUser() && TokenService.getUser().role === 'admin' 
           ? 
           <>
           <NavLink to={'/admin-users'} className="text-base font-medium text-gray-500 hover:text-gray-900">
             Utilisateurs
            </NavLink>
            <NavLink to="/admin-trajets" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Trajets
            </NavLink>
            <NavLink to="/admin-cars" className="text-base font-medium text-gray-500 hover:text-gray-900">
             Vehicules
            </NavLink>
            <NavLink to="admin-declarations" className="text-base font-medium text-gray-500 hover:text-gray-900">Déclarations</NavLink>

            <NavLink to="/logout" className="text-base font-medium text-gray-500 hover:text-gray-900">
            <LogoutIcon className="h-6 w-6 inline mb-1" aria-hidden="true" /> Se déconnecter
            </NavLink>
            </>
  
           : 
          ''
         }


              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}