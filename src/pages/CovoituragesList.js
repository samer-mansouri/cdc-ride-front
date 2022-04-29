import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import ExclamationAlert from '../components/ExclamationAlert';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '../components/Navbar'
import SimpleSearchForm from '../components/SimpleSearchForm'

import TrajetService from '../services/trajet.service';
import DetailledSearchForm from '../components/DetailledSearchForm';
import TrajetAnnonce from '../components/TrajetAnnonce';
import AddCovoiturageForm from '../components/AddCovoiturageForm';
import CovoiturageAnnonce from '../components/CovoiturageAnonce';




function CovoituragesList() {

  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false)
  const [addCovoiturage, setAddCovoiturage] = useState(false)
  
  

  const changeDisplayedData = (newData) => {
    setData(newData);
  }

  const toggleReload = () => {
    reload ? setReload(false) : setReload(true);
  }

  const updateCovoiturgaeList = (covoiturage) => {
    setData(prevState => [covoiturage, ...prevState]);
  }
  
  const fetchData = () => {
    TrajetService.getAllCovoiturages()
    .then(res => { console.log(res); setData(res.data) })
    .catch(error => {console.log(error)})
  }


  

  const toggleAddCovoiturage = () => {
    setAddCovoiturage(!addCovoiturage)
  }

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 h-screen">
    <h1 className="font-bold text-center pt-8 mb-1  text-3xl text-gray-600">Liste des Trajets disponibles</h1>
    <div className={ addCovoiturage ? "flex justify-center mt-8" : 'flex justify-center mt-8 mb-5'}>

              <button
                onClick={() => toggleAddCovoiturage()}
                className="group relative w-48 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="ml-3">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                AJOUTER COVOITURAGE
                </span>
              </button>
    </div>
    
    {
      addCovoiturage   ?
      <AddCovoiturageForm 
      updateTrajetsList={updateCovoiturgaeList}
    />  : ''

    
    }
    {
      data.length > 0
      ? 
      <div className="grid lg:grid-cols-4 bg-gray-100 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-2 mr-10 ml-10 mb-4">
      {
        data.map((trajet, index) => {
          return <CovoiturageAnnonce covoiturage={trajet} key={index} />
        })
      }
    </div>
    : <ExclamationAlert message="Aucun covoiturage n'est trouvé !"/>
    }
    </div>
    </>
  )
}

export default CovoituragesList;