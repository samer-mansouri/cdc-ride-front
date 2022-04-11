import api from './api';

class TrajetService {
  getAllTrajets() {
    return api.get('/trajetsres');
  }

  getTrajet(id){
      return api.get(`/trajet/${id}`);
  }

  createTrajet(data){
      return api.post('/trajet', data);
  }

  deleteTrajet(id){
      return api.post(`/trajet/${id}`);
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

  addCar(data){
    return api.post(`/vehicule`, data)
  }

  deleteCar(id){
    return api.delete(`/vehicule/${id}`)
  }

  updateCar(id, data){
    return api.put(`/vehicule/${id}`, data)
  }

  postReservation(data){
    return api.post(`/reservation`, data)
  }

  cancelReservation(id){
    return api.put(`/reservationcancel/${id}`)
  }
}

export default new TrajetService();