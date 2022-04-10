import React from 'react'
import api from '../services/api';

function UpdateProfilePic() {

    const [image, setImage] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', image);
        api.put('/uploadprofilepicture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleImageSelected = (e) => {
        setImage(e.target.files[0])
    }

          
    
  return (
    <>
        <form onSubmit={handleSubmit} className="d-flex">
            <input type="file"
            accept="image/jpg, image/jpeg, image/png"
            className="appearance-none mb-2 rounded-none block w-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"
            onChange={handleImageSelected}
            />
            <button type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffc65e] hover:bg-[#e0ae51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc65e]"
            >Changer</button>
        </form>
    </>
  )
}

export default UpdateProfilePic