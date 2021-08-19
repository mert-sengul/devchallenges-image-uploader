import axios from 'axios';
const csrfCookieName = "csrftoken";
const csrfHeaderName = "X-CSRFToken";
const apiUrl = "http://127.0.0.1:8000/api/images/";

export default async function uploadImage(form) {
    return axios.post(
        apiUrl, new FormData(form), 
        {
            xsrfCookieName: csrfCookieName,
            xsrfHeaderName: csrfHeaderName,
        }
    )
}