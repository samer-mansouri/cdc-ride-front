/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import TrajetService from "../services/trajet.service"

const people = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    // More people...
  ]
  
  export default function CurrentUserTrajets() {

    const [data, setData] = useState([]);
    

    const fetchData = () => {
        TrajetService.getCurrentUserTrajets()
        .then(res => {
            console.log(res);
            setData(res.data)
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    

    useEffect(() => {
        fetchData();
    }, [])
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <h3 className="ml-8 text-gray-500 font-bold">Liste de mes trajets</h3>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lieu de départ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lieu de destination
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trajectoire effectué
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Heure de départ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Places disponibles
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prix
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Numéro de téléphone
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((trajet) => (
                    <tr key={trajet._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trajet.placeOfDeparture}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.placeOfDestination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.pathTaken}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.departureTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.availableSeats}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.price}DT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.phoneNumber}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }