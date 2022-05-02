import React from 'react'
import DeleteAccountModal from './DeleteAccountModal'

export default function 
() {

    const [openModal, setOpenModal] = React.useState(false);

  return (
    <div>
        <DeleteAccountModal 
        openModal={openModal}
        toggleOpenModal={() => setOpenModal(!openModal)}
        />
            <button
                onClick={() => setOpenModal(!openModal)}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                
                </span>SUPPRIMER MON COMPTE
            </button>
    
    </div>
  )
}
