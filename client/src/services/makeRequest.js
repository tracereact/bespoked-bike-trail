import axios from 'axios';

// To prevent redundant usage of server url
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,

  // Using cookies to store user information
  withCredentials: true,
});

/**
 * Helper function to make all axios requests
 * @param {*} url
 * @param {*} options
 * @returns axios instance
 */
const makeRequest = (url, options) => {
  return api(url, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // Either return a custom message or 'Error' depending on if data is found
      return Promise.reject(err?.response?.data?.message ?? 'Error');
    });
};

export default makeRequest;
