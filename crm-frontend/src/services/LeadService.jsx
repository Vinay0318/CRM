import axios from "axios";

const API_URL =
"http://localhost:8080/Lead";

class LeadService {

  addLead(lead) {
    return axios.post(
      `${API_URL}/add`,
      lead
    );
  }

  getAllLeads() {
    return axios.get(
      `${API_URL}/displayAll`
    );
  }

  getLeadById(id) {
    return axios.get(
      `${API_URL}/${id}`
    );
  }

  updateLead(id, lead) {
    return axios.put(
        `${API_URL}/update/${id}`,
        lead
    );
}

deleteLead(id) {
    return axios.delete(
        `${API_URL}/delete/${id}`
    );
}
}

export default new LeadService();