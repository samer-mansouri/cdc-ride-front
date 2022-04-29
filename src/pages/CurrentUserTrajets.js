/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReservationsListModal from "../components/ReservationListModal";
import UpdateTrajetModal from "../components/UpdateTrajetModal";
import TrajetService from "../services/trajet.service"
import ReservationsList from "./ReservationsList";


  
  export default function CurrentUserTrajets() {

    const [data, setData] = useState([]);

    const [currentTrajet, setCurrentTrajet] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const toggleShowModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
    }
    
    const toggleCurrentTrajet = (trajet = null) => {
        setCurrentTrajet(trajet);
    }

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

    const updateUserTrajets = (trajet) => {
        setData(prevState => [trajet, ...prevState]);
    }

    const updateUserTrajetsOnUpdate = (trajet) => {
      const index = data.findIndex(t => t._id === trajet._id);
      const newArr = [...data];
      newArr[index] = trajet;
      console.log(index);
      console.log(newArr);
      setData(newArr);
    }

    const deleteTrajetSelected = (trajet) => {
        TrajetService.deleteTrajet(trajet)
        .then(res => {
            console.log(res);
            setData(data.filter(item => item.id !== trajet))
        }).catch(err => {
            console.log(err);
    })
  }
    

    useEffect(() => {
        fetchData();
    }, [])
    return (
      <>
      <Navbar />
      <div className="h-full bg-gray-100 h-screen">
      <div className="flex flex-col pt-8 h-screen mx-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <h3 className="ml-8 text-gray-600 font-bold mb-4">Liste de mes trajets</h3>
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre de réservations  
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((trajet, index) => (
                    <tr key={trajet.index}>
                      {
                        showModal && currentTrajet == trajet._id? 
                        <ReservationsListModal 
                        openModal={showModal}
                        changeShowModalState={toggleShowModal}
                        trajetId={trajet._id}
                      /> : ''
                      }

                      {
                        showModalUpdate && currentTrajet == trajet._id?
                        <UpdateTrajetModal 
                          openModal={showModalUpdate}
                          toggleOpenModal={toggleShowModalUpdate}
                          updateUserGarageOnUpdate={updateUserTrajetsOnUpdate}
                          trajet={trajet}
                        /> : ''
                      }
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trajet.placeOfDeparture}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.placeOfDestination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.pathTaken}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.departureTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.availableSeats}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.price}DT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trajet.reservationsNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {
                            trajet.reservationsNumber > 0 ?
                            <><a 
                              onClick={() => 
                                {
                                  toggleCurrentTrajet(trajet._id);
                                  toggleShowModal()
                                }}
                            href="#" className="text-indigo-600 hover:text-indigo-900">
                          Afficher La lise des réservations
                        </a><>{' | '}</></> : ''
                        }
                        <a href="#" className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            toggleCurrentTrajet(trajet._id);
                            toggleShowModalUpdate()
                          }}
                        >
                          Éditer
                        </a>{' | '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => deleteTrajetSelected(trajet._id)}>
                          Supprimer
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
        </div>
      </>
    )
  }