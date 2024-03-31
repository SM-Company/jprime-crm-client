import axios from "../../../../services/axios/axiosConfig";
const user = JSON.parse(localStorage.getItem("user"));
const product = {
    get: async () => {
        try {
            const response = await axios.get(`/product/${user.userable.code}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/product/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post(`/product/${user.userable.code}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/product/${user.userable.code}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`/product/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    statuses: async () => {
        try {
            const response = await axios.get('/product/statuses')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

};

export default product;

