const csrfCookieName = "csrftoken";
const csrfHeaderName = "X-CSRFToken";

async function getCookie(cookieName) {
    return (
        document.cookie
            .split('; ')
            .find(row => row.startsWith(csrfCookieName))
            .split('=')[1]
    );
}

window.csrfCookie = getCookie(csrfCookieName);
import('axios').then(mdl => {window.axios = mdl;});