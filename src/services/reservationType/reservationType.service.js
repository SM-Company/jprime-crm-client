import axios from "../axios/axiosConfig";

const reservationTypeServie = {
    get: async () => {
        try {
            const response = await axios.get('/reservation-type')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default reservationTypeServie;

