import axios from "../../../services/axios/axiosConfig";
const user = JSON.parse(localStorage.getItem("user"));

const customerService = {
    get: async () => {
        try {
            const response = await axios.get(`/customer/${user.id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/customer/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post(`/customer/${user.id}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/customer/${user.id}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`/customer/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    getStatuses: async () => {
        try {
            const response = await axios.get('/customer/statuses')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

};

export default customerService;

