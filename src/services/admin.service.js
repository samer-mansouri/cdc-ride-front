import api from './api'

class AdminService {
    getUsers() {
        return api.get('/users');
    }

    deleteUser(id){
        return api.delete(`/admin_users/${id}`);
    }

    updateUser(id, data){
        return api.put(`/admin_users/${id}`, data);
    }

    getTrajets() {
        return api.get('/admin_trajets');
    }

    deleteTrajet(id){
        return api.delete(`/admin_trajets/${id}`);
    }

    getVehicules() {
        return api.get('/admin_vehicules');
    }

    deleteVehicule(id){
        return api.delete(`/admin_vehicules/${id}`);
    }
        
}

export default new AdminService();