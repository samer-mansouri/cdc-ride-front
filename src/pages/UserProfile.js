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
import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
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


const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]
const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfile(props) {

  const [user, setUser] = useState([])
  const [userGarage, setUserGarage] = useState([])
  const [load, setLoad] = useState(true)

  const updateUserGarage = (car) => {
    setUserGarage(prevState => [...prevState, car])
    console.log(userGarage)
  }

  const updateUserGarageOnDelete = (garage) => {
    setUserGarage(garage)
    console.log(userGarage)
  }

  const updateUserGarageOnUpdate = (car) => {
    const index = userGarage.findIndex(x => x._id === car._id);
    
    const newArr = [...userGarage];
    newArr[index] = car;
    console.log(index)
    console.log(newArr);
    setUserGarage(newArr);
  }


  const [openModal, setOpenModal] = useState(false)

  const toggleOpenModal = () => {
    openModal ? setOpenModal(false) : setOpenModal(true)
  }

  const { id } = useParams();
  

  const link = process.env.REACT_APP_BACKEND_URL;

  const getUser = () =>{
    TrajetService.getUserProfile(id)
    .then(res => {
      console.log(res.data)
      setUser(res.data)
      setUserGarage(res.data.garage)
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
      <div className="min-h-full bg-gray-100 h-screen">
        <Navbar />
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={`${link}${user.picture}`}
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

          </div>
         {
           id === TokenService.getCurrentUserId()
           ?
           <div className="max-w-3xl flex justify-center ml-20 px-4 sm:px-6 md:px-8 mt-5">
           <UpdateProfilePic />
   
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
                        <dt className="text-sm font-medium text-gray-500">Permis</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.permis}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                        <dd className="mt-1 text-sm text-gray-900"><Moment format="DD/MM/YYYY">{user.dateOfBirth}</Moment></dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Genre</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.gender == "Male" ? "Homme" : "Femme"}</dd>
                      </div>
                     
                    
                    </dl>
                  </div>
                </div>
              </section>
              
              {/* Comments*/}
           
            </div>

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
            </section>
          </div>
        </main>
      </div>
    </>
  )
}