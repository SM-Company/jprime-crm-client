import axios from "../../../services/axios/axiosConfig";
const user = JSON.parse(localStorage.getItem("user"));

const saleService = {
    get: async () => {
        try {
            const response = await axios.get(`/sale/${user.userable.code}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/sale/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post(`/sale/${user.userable.code}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/sale`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`/sale/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    statuses: async () => {
        try {
            const response = await axios.get('/sale/statuses')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    getSaleCreationData: async () => {
        try {
            const response = await axios.get(`/sale/getSaleCreationData/${user.userable.code}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default saleService;

