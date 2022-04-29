import React from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import TokenService from '../services/token.service'
import TrajetService from '../services/trajet.service'
import SingleTrajetModal from './SingleTrajetModal'


function CovoiturageAnnonce({ covoiturage }) {


    const [ showModal, setShowModal ] = React.useState(false)

    const changeShowModalState = () => {
        setShowModal(!showModal)
    }

    



  return (
    <>
    <div 
            className="mt-2 mb-2 lg:ml-2 lg:mr-2 p-3 pt-5 pb-5 bg-white rounded-md shadow-xl" 
            >

              <div className="flex">
              <div className="flex flex-row ">
                <img src={covoiturage.user[0].picture} className="w-14 h-14" style={{borderRadius:"50%"}}/>
                <div className="pt-2 ml-2">
                <h4 className=""><NavLink to={`profile/${covoiturage.user[0]._id}`}>{covoiturage.user[0].firstName} {covoiturage.user[0].lastName}</NavLink></h4>
                <h5 className="text-muted text-gray-400"><i>Publiée le <Moment format="DD/MM/YYYY">{covoiturage.createdAt}</Moment></i></h5>
                </div>
              </div>
                <div className="ml-auto">
                 
                    
                   
                      <div className="ml-auto">
      
                  </div> 
                  
                </div>
              </div>
              <div className="mt-5 ml-4">
                <p>Lieu de départ: {covoiturage.lieuDepart}</p>
                <p>Lieu de destination: {covoiturage.lieuArrivee}</p>
                <p>Heure de départ: {covoiturage.heureDepart}</p>
                <p>Cause: {covoiturage.cause}</p>
           
              </div>
            </div>
    </>
  )
}

export default CovoiturageAnnonce