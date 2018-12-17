
import axios from 'axios';

const baseURL = 'http://localhost:42000/api/autoparts/';

export const getAutoparts = () => {
    return axios.get(baseURL);
}

export const getAutopart = (id) => {
    return axios.get(baseURL+id);
}

export const postAutopart = (autopart) => {
    //return axios.post(baseURL, {autopart});
    return axios({
        method: 'post',
        url: baseURL,
        data: autopart
    });
}

export const putAutopart = (id, autopart) => {
    //return axios.put(baseURL, {autopart});
    return axios({
        method: 'put',
        url: baseURL+id,
        data: autopart
    });
}

export const deleteAutopart = (autopart) => {
    return axios({
        method: 'delete',
        url: baseURL+autopart.id
    });
}
