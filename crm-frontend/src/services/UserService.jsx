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

    addManager(manager){

    return api.post(
        "/user/add-manager",
        manager
    );

}

addAgent(agent){

    return api.post(
        "/user/add-agent",
        agent
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



    // ======================
    // AGENT REGISTRATION
    // ======================

    

    getAgentsByManager(managerId) {

    return api.get(
        `${BASE_URL}/manager/${managerId}`
    );

}
    
}

export default new UserService();