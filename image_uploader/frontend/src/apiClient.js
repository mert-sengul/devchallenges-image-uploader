import axios from 'axios';
const csrfCookieName = "csrftoken";
const csrfHeaderName = "X-CSRFToken";
const apiUrl = "/api/images/";

export default async function uploadImage(form) {
    return axios.post(
        apiUrl, new FormData(form), 
        {
            xsrfCookieName: csrfCookieName,
            xsrfHeaderName: csrfHeaderName,
        }
    )
}
