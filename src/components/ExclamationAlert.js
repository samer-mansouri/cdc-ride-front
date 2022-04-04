/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from '@heroicons/react/solid'

export default function ExclamationAlert({ message }) {
  return (
    <div className="bg-yellow-50 mt-5 xl:ml-20 xl:mr-20 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <a href="#" className="font-medium underline text-yellow-700 hover:text-yellow-600">
              {message}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}