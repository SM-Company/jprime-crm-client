import axios from "../../../../services/axios/axiosConfig";
const user = JSON.parse(localStorage.getItem("user"));
const supplierService = {
    get: async () => {
        try {
            const response = await axios.get(`/supplier/${user.userable.code}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/supplier/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post(`/supplier/${user.userable.code}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/supplier`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`/supplier/${id}`)
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

export default supplierService;

