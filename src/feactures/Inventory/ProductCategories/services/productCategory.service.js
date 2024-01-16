import axios from "../../../../services/axios/axiosConfig";
const user = JSON.parse(localStorage.getItem("user"));
const productCategory = {
    get: async () => {
        try {
            const response = await axios.get(`/product-category/${user.id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    show: async (id) => {
        try {
            const response = await axios.get(`/product-category/show/${id}`)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    store: async (data) => {
        try {
            const response = await axios.post(`/product-category/${user.id}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },


    update: async (data) => {
        try {
            const response = await axios.put(`/product-category/${user.id}`, data)
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`/product-category/${id}`)
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

export default productCategory;

