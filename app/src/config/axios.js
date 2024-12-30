// Create a new file src/config/axios.js
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'http://localhost:5004'

});

export default instance;