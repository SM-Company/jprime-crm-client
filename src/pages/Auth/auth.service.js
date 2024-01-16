import axios from "../../services/axios/axiosConfig";

const authService = {
  login: async (credentials) => {
    try {
      return await axios.post('/auth/login', credentials)
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
    }
  },

  logOut: async (credentials) => {
    try {
      const response = await axios.get('/auth/logout', credentials)
      return response.data;
    } catch (error) {
      console.error('Error de cierre de sesión:', error);
      throw error;
    }
  },
};

export default authService;

