import axios from "../axios/axiosConfig";

const reservationHourServie = {
    get: async () => {
        try {
            const response = await axios.get('/reservation-hour')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default reservationHourServie;

