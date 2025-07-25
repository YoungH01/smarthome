
import api from './api';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });


    localStorage.setItem('token', response.data.token);
    localStorage.setItem('idUser',response.data.id);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async ({ username, password }) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      // Nếu response có message thì lấy ra để throw
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  };

export const getProfile = async (userId, token) => {
  try {
     const response = await axios.get(`/profile/get/${userId}`, {
      headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateProfile = async (userId, formData, token) => {
  const res = await axios.put(`/profile/update/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};