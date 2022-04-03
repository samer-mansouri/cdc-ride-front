import api from './api';

class TrajetService {
  getAllTrajets() {
    return api.get('/trajets');
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
      return api.put(`/trajets/search`, data)
  }

  getUserPorfile(id){
    return api.get(`/users/profile/${id}`)
  }


  getUserQuestions(id){
    return api.get(`/forum/userquest/${id}`)
  }
}

export default new TrajetService();