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
import AddTrajet from '../components/AddTrajet';
import TokenService from '../services/token.service';




function TrajetsList() {

  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false)
  const [simpleS, setSimpleS] = useState(false)
  const [detSearch, setDetSearch] = useState(false)
  const [addTrajet, setAddTrajet] = useState(false)
  const [ cars, setCars ] = useState([])
  

  const changeDisplayedData = (newData) => {
    setData(newData);
  }

  const toggleReload = () => {
    reload ? setReload(false) : setReload(true);
  }

  const updateTrajetsList = (trajet) => {
    setData(prevState => [trajet, ...prevState]);
  }
  
  const fetchData = () => {
    if(TokenService.getUser()){
      TrajetService.getAllTrajets()
    .then(res => { console.log(res); setData(res.data) })
    .catch(error => {console.log(error)})
    } else {
      TrajetService.getAllTrajetsPublic()
    .then(res => { console.log(res); setData(res.data) })
    .catch(error => {console.log(error)})
    }
  }

  const fetchUserConnectedCars = () => {
    TrajetService.getUserCars()
    .then(res => { console.log(res); setCars(res.data) })
    .catch(error => {console.log(error)})
  }

  const showSimpleSearch = () => {
    setSimpleS(true)
    detSearch == true ? setDetSearch(false) : setDetSearch(false)
    addTrajet == true ? setAddTrajet(false) : setAddTrajet(false)
  }

  const showDetailledSearch = () => {
    setDetSearch(true)
    simpleS == true ? setSimpleS(false) : setSimpleS(false)
    addTrajet == true ? setAddTrajet(false) : setAddTrajet(false)
  }

  const showAddTrajet = () => {
    setAddTrajet(true)
    detSearch == true ? setDetSearch(false) : setDetSearch(false)
    simpleS == true ? setSimpleS(false) : setSimpleS(false)
  }

  useEffect(() => {
    fetchData();
    if(TokenService.getUser()){
      fetchUserConnectedCars();
    }
  }, [reload]);

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 h-screen">
    <h1 className="font-bold text-center pt-8 mb-1  text-3xl text-gray-600">Liste des Trajets disponibles</h1>
    <div className={simpleS || detSearch ? "flex justify-center mt-8" : 'flex justify-center mt-8 mb-5'}>
    <button
                onClick={() => showSimpleSearch()}
                className="group relative mr-3 w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="ml-3">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                RECHERCHE SIMPLE
                </span>
              </button>
              <button
                onClick={() => showDetailledSearch()}
                className="group relative w-48 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="ml-3">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                RECHERCHE DÉTAILLÉ
                </span>
              </button>
              {
                TokenService.getUser() && TokenService.getCurrentUserRole() === 'Driver' ?
                <button
                onClick={() => showAddTrajet()}
                className="group relative w-48 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="ml-3">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                AJOUTER TRAJET
                </span>
              </button> : ''
              }
    </div>
    {
      simpleS && !detSearch &&  !addTrajet ?
          <SimpleSearchForm onFetch={changeDisplayedData} reload={toggleReload}/>
      : 
      ''
    }

    {
      detSearch && !simpleS && !addTrajet ?
        <DetailledSearchForm onFetch={changeDisplayedData} reload={toggleReload}/>
        : ''
    }
    {
      addTrajet && !simpleS && !detSearch && TokenService.getUser()  ?
      <AddTrajet 
      vehicules={cars}
      updateTrajetsList={updateTrajetsList}
    />  : ''

    }
    {
      data.length > 0
      ? 
      <div className="grid lg:grid-cols-4 bg-gray-100 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-2 mr-10 ml-10 mb-4">
      {
        data.map((trajet, index) => {
          return <TrajetAnnonce trajet={trajet} key={index} />
        })
      }
    </div>
    : <ExclamationAlert message="Aucun trajet n'est trouvé !"/>
    }
    </div>
    </>
  )
}

export default TrajetsList