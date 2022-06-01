/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
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
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
    <div className="relative bg-gray-50">
      <Navbar /> 
      <main className="lg:relative background">
        <div className="mx-auto w-full pt-10 pb-10 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-full sm:px-8 xl:pr-12 pt-12 pb-12 test my-40">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Ici vous pouvez trouver</span>{' '}
              <span className="block text-[#ffc65e] xl:inline">le bon chemin</span>
            </h1>
            <p className="mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 ">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>  
        </div>
      </main>
    </div>
  )
}
