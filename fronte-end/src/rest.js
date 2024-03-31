import axios from "./axios.js";

export const singin = (data) => {

   return axios.post('/register', data)
      .then(response => {
          return response.data
          })
      .catch(error => {
          console.error('Error:', error);
          throw error
          });
}

export const login = (data) => {
  return axios.post('/login', data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export const profile = async () => {
  return axios.get('/profile')
}

export const logout = () => {
  return axios.post('/logout')
}