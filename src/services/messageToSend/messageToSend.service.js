import axios from "../axios/axiosConfig";

const messageToSendService = {
    get: async () => {
        try {
            const response = await axios.get('/message-to-send')
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default messageToSendService;

