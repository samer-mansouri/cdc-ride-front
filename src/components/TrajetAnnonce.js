import React from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import TokenService from '../services/token.service'
import TrajetService from '../services/trajet.service'


function TrajetAnnonce({ trajet }) {


    const createReservation = () => {
        TrajetService.postReservation({trajetId: trajet._id})
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

  return (
    <>
    <div 
            className="mt-2 mb-2 lg:ml-2 lg:mr-2 p-3 pt-5 pb-5 bg-white rounded-md shadow-xl" 
            >
              <div className="flex">
              <div className="flex flex-row">
                <img src={trajet.user[0].picture} className="w-14 h-14" style={{borderRadius:"50%"}}/>
                <div className="pt-2 ml-2">
                <h4 className=""><NavLink to={`profile/${trajet.user[0]._id}`}>{trajet.user[0].firstName} {trajet.user[0].lastName}</NavLink></h4>
                <h5 className="text-muted text-gray-400"><i>Publiée le <Moment format="DD/MM/YYYY">{trajet.createdAt}</Moment></i></h5>
                </div>
              </div>
                {
                    TokenService.getCurrentUserId() != trajet.user[0]._id ?
                    <div className="ml-auto">
                <button className="mt-2 mb-2 bg-gray-200 rounded-md shadow-md p-2 text-gray-600" onClick={() => createReservation()}>RÉSERVER</button>
    
                </div>: ''
                }
              </div>
              <div className="mt-4 ml-4">
                <p>Lieu de départ: {trajet.placeOfDeparture}</p>
                <p>Lieu de destination: {trajet.placeOfDestination}</p>
                <p>Heure de départ: {trajet.departureTime}</p>
                <p>Trajectoire effectué: {trajet.pathTaken}</p>
                <p>Places disponibles: {trajet.availableSeats}</p>
                <p>Prix: {trajet.price} DT</p>
                <p>Numéro de téléphone: {trajet.phoneNumber}</p>
              </div>
            </div>
    </>
  )
}

export default TrajetAnnonce