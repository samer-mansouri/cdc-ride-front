import React from 'react'

function Garage(props) {
    console.log(props)
    const { vehicules } = props;
  return (
    <>
        {vehicules.map((vehicule, index) => {
            return (
                <div key={index} className="border shadow-xs pl-3 mb-2 pr-3 pt-2 pb-2">
                    <h1><span className="text-gray-600">Marque:</span> {vehicule.mark}</h1>
                    <h1><span className="text-gray-600">Modèle:</span> {vehicule.model}</h1>
                    <h1><span className="text-gray-600">Couleur:</span> {vehicule.color}</h1>
                    <h1><span className="text-gray-600">Année:</span> {vehicule.year}</h1>
                    <h1><span className="text-gray-600">Catégorie:</span> {vehicule.category}</h1>
                    <h1><span className="text-gray-600">Motorisation:</span> {vehicule.motorization}</h1>
                    <h1><span className="text-gray-600">Puissance:</span> {vehicule.power}</h1>
                </div>
            )
        })}
    </>
  )
}

export default Garage