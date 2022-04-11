import React from 'react'
import api from '../services/api';

function UpdateProfilePic({ updateProfilePicture }) {

    const [image, setImage] = React.useState(null);

    const [disabled, setDisabled] = React.useState(false);
    

    const handleSubmit = (e) => {
        setDisabled(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', image);
        api.put('/uploadprofilepicture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res);
            updateProfilePicture(res.data.picture);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setDisabled(false);
        });
    }

    const handleImageSelected = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

          
    
  return (
    <>
        <form onSubmit={handleSubmit} className="flex items-center ml-28">
            <input type="file"
            accept="image/jpg, image/jpeg, image/png"
            className="appearance-none mb-2 rounded-none block w-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
            onChange={handleImageSelected}
            />
            <button type="submit"
            disabled={disabled}
            className="ml-2 py-2.5 mb-1.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
            >
            {
                disabled ?
                <>
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                    En cours...
                </>
                :
                <>
                    Changer
                </>
            }
            </button>
        </form>
    </>
  )
}

export default UpdateProfilePic