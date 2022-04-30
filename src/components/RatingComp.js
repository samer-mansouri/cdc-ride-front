import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import TrajetService from '../services/trajet.service';

export default function RatingComp({ profileId }) {



    const [note, setNote] = useState(0);
    const [fetchNote, setFetchNote] = useState(false);

    const sendUserNote = (note) => {
        TrajetService.noteUser({ note: note }, profileId)
        .then(res => {
            console.log(res)
        })
        .catch(error => console.log(error))

    }


    const fetchUserNote = () => {
        TrajetService.getUserNote(profileId)
        .then(res => {
            console.log(res.data.note)
            setNote(res.data.note)
        })
        .catch(error => console.log(error))
        .finally(() => setFetchNote(true))
    } 

    useEffect(() => {
        fetchUserNote()
    }, [])




  return (
    <>
         {
                fetchNote ?
                <ReactStars
                      count={5}
                      onChange={(value) => sendUserNote(value)}
                      value={note}
                      size={30}
                      activeColor="#ffd700"
         /> : ''
         }
         
    </>
  )
}
