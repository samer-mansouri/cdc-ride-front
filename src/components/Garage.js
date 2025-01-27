import React, { useState } from 'react'
import TrajetService from '../services/trajet.service';
import AddCarModal from './AddCarModal';
import TokenService from '../services/token.service';
import PictureModal from './PictureModal';
import UpdateCarPic from './UpdateCarPic';

function Garage(props) {
    console.log(props)
    const { vehicules, updateUserGarage, updateUserGarageOnUpdate, userId } = props;

    const [openModal, setOpenModal] = useState(false)

    const [showUpdatePicForm, setShowUpdatePicForm] = useState(false)

    const [carToUpdate, setCarToUpdate] = useState(null)

    const toggleShowUpdatePicForm = () => {
        setShowUpdatePicForm(!showUpdatePicForm)
    }

    


    const toggleOpenModal = () => {
        openModal ? setOpenModal(false) : setOpenModal(true)
    }

    const [ showPic, setshowPic ] = useState(false)
    const [ currentCarId, setCurrentCarId ] = useState(null)

    const toggleshowPic = () => {
        showPic ? setshowPic(false) : setshowPic(true)
    }

    const [ currentVehicule, setCurrentVehicule ] = useState(null)

    const deleteCar = (id) => {
        TrajetService.deleteCar(id)
        .then(res => {
            console.log(res);
            updateUserGarage(vehicules.filter(item => item._id !== id))
        }).catch(err => console.log(err))
    }
    if(vehicules.length <=0){
        return <h3 className="text-center text-gray-500 mt-3">Votre garage est vide</h3>
    } else {
        return (
            <>
                <AddCarModal 
                            openModal={openModal}
                            toggleOpenModal={toggleOpenModal}
                            updateUserGarage={updateUserGarage}
                            type="update"
                            car={currentVehicule}
                            updateUserGarageOnUpdate={updateUserGarageOnUpdate}
                            />
                {vehicules.map((vehicule, index) => {
                    return (
                        
                        <div key={index} className="border shadow-lg pl-3 mb-2 pr-3 pt-2 pb-2">
                        {
                            userId === TokenService.getCurrentUserId() ?
                            <div className="flex justify-end mb-3">
                           <button
                            onClick={() => deleteCar(vehicule._id)}
                            className="group relative w-28  justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>SUPPRIMER 
                      </button>   
                      <button
                        type="submit"
                        onClick={() =>  {
                            setCurrentVehicule(vehicule)
                            setOpenModal(true)
                        }}

                        className="group relative w-28 ml-2 justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>MODIFIER 
                      </button>    
                        </div> : ''
                        }
                            
                            <h1><span className="text-gray-600">Marque:</span> {vehicule.mark}</h1>
                            <h1><span className="text-gray-600">Modèle:</span> {vehicule.model}</h1>
                            <h1><span className="text-gray-600">Couleur:</span> {vehicule.color}</h1>
                            <h1><span className="text-gray-600">Année:</span> {vehicule.year}</h1>
                            <h1><span className="text-gray-600">Catégorie:</span> {vehicule.category}</h1>
                            <h1><span className="text-gray-600">Motorisation:</span> {vehicule.motorization}</h1>
                            <h1><span className="text-gray-600">Puissance:</span> {vehicule.power}</h1>
                            <div class="flex justify-end">
                            {
                            userId === TokenService.getCurrentUserId() ?
                            <button
                                onClick={() =>{
                                    setCarToUpdate(vehicule._id)
                                    toggleShowUpdatePicForm()
                                }}
                                className="group relative w-30 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
                            >
                            {
                                vehicule.vehiculePic?
                                'MÀJ Photo'
                                : 'Ajouter Photo'

                            }    
                            </button> 
                            : '' }
                            <button
                            onClick={() =>{
                                setCurrentCarId(vehicule._id)
                                setshowPic(true)
                            }}
                                className="group relative w-24 ml-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
                            >Photo</button>
                            </div>


                            {
                                showUpdatePicForm && carToUpdate === vehicule._id ?
                                <UpdateCarPic 
                                    vehiculeId={vehicule._id}
                                />
                                : ''
                            }
                            
                            
                            {
                                showPic && currentCarId == vehicule._id ? 
                                <PictureModal 
                                image={vehicule.vehiculePic}
                                openModal={showPic}
                                toggleShowPic={toggleshowPic}    
                            /> : ''
                            }
                           
                        </div>
                    )
                })}
            </>
          )
    }
}

export default Garage