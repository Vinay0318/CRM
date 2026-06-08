import axios from "axios";

const BASE_URL = "http://localhost:8080/user";

class UserService {

    getAllUsers() {
        return axios.get(`${BASE_URL}/displayAll`);
    }

    getManagers() {
        return axios.get(`${BASE_URL}/managers`);
    }

    getAgents() {
        return axios.get(`${BASE_URL}/agents`);
    }

    getUserById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    addUser(user) {
        return axios.post(`${BASE_URL}/add`, user);
    }

    updateUser(id, user) {
        return axios.put(`${BASE_URL}/update/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }

    getAgentsByManager(managerId) {
        return axios.get(`${BASE_URL}/manager/${managerId}`);
    }
}

export default new UserService();