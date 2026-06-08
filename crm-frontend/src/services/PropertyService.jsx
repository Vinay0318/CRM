import axios from "axios";

const BASE_URL = "http://localhost:8080/property";

class PropertyService {

    getAllProperties() {
        return axios.get(`${BASE_URL}/displayAll`);
    }

    getPropertyById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    addProperty(property) {
        return axios.post(`${BASE_URL}/add`, property);
    }

    updateProperty(id, property) {
        return axios.put(`${BASE_URL}/update/${id}`, property);
    }

    deleteProperty(id) {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }

    getByStatus(status) {
        return axios.get(`${BASE_URL}/status/${status}`);
    }

    getByType(type) {
        return axios.get(`${BASE_URL}/type/${type}`);
    }
}

export default new PropertyService();