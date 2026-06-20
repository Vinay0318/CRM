import api from "./AxiosInterceptor";

const BASE_URL = "/user";

class UserService {

    // ======================
    // USERS
    // ======================

    getAllUsers() {

        return api.get(
            `${BASE_URL}/displayAll`
        );
    }

    getUserById(id) {

        return api.get(
            `${BASE_URL}/${id}`
        );
    }

    addUser(user) {

        return api.post(
            `${BASE_URL}/add`,
            user
        );
    }

    updateUser(id, user) {

        return api.put(
            `${BASE_URL}/update/${id}`,
            user
        );
    }

    deleteUser(id) {

        return api.delete(
            `${BASE_URL}/delete/${id}`
        );
    }

    // ======================
    // MANAGERS
    // ======================

    getManagers() {

        return api.get(
            `${BASE_URL}/managers`
        );
    }

    // ======================
    // AGENTS
    // ======================

    getAgents() {

        return api.get(
            `${BASE_URL}/agents`
        );
    }

    getAgentsByManager(managerId) {

        return api.get(
            `${BASE_URL}/manager/${managerId}`
        );
    }

    // ======================
    // PENDING REQUESTS
    // ======================

    getPendingAgents() {

        return api.get(
            `${BASE_URL}/pending-agents`
        );
    }

    approveAgent(agentId, managerId) {

        return api.put(
            `${BASE_URL}/approve/${agentId}/${managerId}`
        );
    }

    rejectAgent(id) {

        return api.put(
            `${BASE_URL}/reject/${id}`
        );
    }

    // ======================
    // AGENT REGISTRATION
    // ======================

    registerAgent(agent) {

        return api.post(
            `/auth/agent-register`,
            agent
        );
    }
    
}

export default new UserService();