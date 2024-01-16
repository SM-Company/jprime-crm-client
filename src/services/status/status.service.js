import axios from "../axios/axiosConfig";

const status = {
    get: async () => {
        try {
            const response = await axios.get('/status')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default status;

