import axios from 'axios';

const EventoAxios = axios.create({
    baseURL: 'http://localhost:8888'
});

export default EventoAxios;