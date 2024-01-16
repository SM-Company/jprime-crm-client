import axios from "../../../services/axios/axiosConfig";

const clientService = {
    get: async () => {
        try {
            const response = await axios.get('/client')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/client/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post('/client/store', data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/client/update`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    destroy: async (id) => {
        try {
            const response = await axios.delete(`/client/destroy/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    getStatuses: async () => {
        try {
            const response = await axios.get('/status')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

};

export default clientService;

