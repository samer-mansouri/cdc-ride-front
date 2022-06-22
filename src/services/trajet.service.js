import api from './api';

class TrajetService {
  getAllTrajets() {
    return api.get('/trajetsres');
  }
  
  getAllTrajetsPublic(){
    return api.get('/trajets');
  }

  getTrajet(id){
      return api.get(`/trajet/${id}`);
  }

  createTrajet(data){
      return api.post('/trajet', data);
  }

  deleteTrajet(id){
      return api.delete(`/trajet/${id}`);
  }

  updateTrajet(id, data){
    return api.put(`/trajet/${id}`, data)
  }

  trajetsSimpleSearch(data){
      return api.post(`/trajets/search`, data)
  }


  trajetDetailledSearch(data){
    return api.post(`/trajets/detsearch`, data)
  }


  getUserProfile(id){
    return api.get(`/user/${id}`)
  }

  updateUserProfile(data){
    return api.put(`/updateuser`, data)
  }

  getUserCars(){
    return api.get(`/vehicules`);
  }

  addCar(data){
    return api.post(`/vehicule`, data)
  }

  deleteCar(id){
    return api.delete(`/vehicule/${id}`)
  }

  updateCar(id, data){
    return api.put(`/vehicule/${id}`, data)
  }

  updateCarPic(id, data){
    return api.post(`/vehiculepic/${id}`, data)
  }

  postReservation(data){
    return api.post(`/reservation`, data)
  }

  cancelReservation(id){
    return api.put(`/reservationcancel/${id}`)
  }

  confirmReservationOwner(id){
    return api.put(`/reservationconfirmowner/${id}`)
  }

  cancelReservationOwner(id){
    return api.put(`/reservationcancelowner/${id}`)
  }

  getCurrentUserTrajets(){
    return api.get(`/mytrajets`)
  }

  getTrajetUserReservationsList(id){
    return api.get(`/trajteres/${id}`)
  }

  getAllCovoiturages(){
    return api.get(`/covoiturages`)
  }

  createCovoiturage(data){
    return api.post(`/covoiturage`, data)
  }

  noteUser(data, id){
    return api.post(`/note/${id}`, data)
  }

  getUserNote(id){
    return api.get(`/note/${id}`)
  }

  createDeclaration(data){
    return api.post(`/declaration`, data)
  }

}

export default new TrajetService();