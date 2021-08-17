const importsPromise = import("coreapi").then((coreapi) => {
    window.coreapi = coreapi;
    return import("./schema.js");
});

const apiClientPromise = importsPromise.then(initApiClient);

function initApiClient() {
    return new Promise((resolve, reject) => {
        window.apiAuth = new window.coreapi.auth.SessionAuthentication({
            csrfCookieName: "csrftoken",
            csrfHeaderName: "X-CSRFToken",
        });
        window.apiClient = new window.coreapi.Client({ auth: window.apiAuth });
        resolve(true);
    });
}

export default apiClientPromise;