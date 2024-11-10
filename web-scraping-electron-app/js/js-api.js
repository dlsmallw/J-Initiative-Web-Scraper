const axios = require('axios').default;

const HOST_URL = 'http://127.0.0.1:7777/';

const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};

/**
 * Method for pinging the Python backend server to validate it is up.
 * @returns JSON        A JSON object containing information about the success or failure.
 */
function pingBackend() {
    return new Promise((resolve, reject) => {
        axios.get(HOST_URL + "ping")
            .then(function(res) {
                resolve(res);
            })
            .catch((err) => {
                reject({
                    ok: false,
                    stacktrace: err,
                    message: "Failed to ping the backend API"
                });
            });
    });
}

/**
 * Method for sending a shutdown signal to the backend.
 * @returns JSON        A JSON object containing information about the success or failure.
 */
function stopPyBackend() {
    return new Promise((resolve, reject) => {
        axios.get(HOST_URL + "kill")
            .then(function(res) {
                resolve(res);
            })
            .catch((err) => {
                reject({
                    ok: false,
                    stacktrace: err,
                    message: "Failed to send request to backend API"
                });
            });
    });
}

/**
 * Method for sending a scrape request to the backend.
 * @param {*} urlToScrape   The URL to be scraped.
 * @returns JSON            A JSON object containing information about the success or failure.
 */
function scrapeRequest(urlToScrape) {
    console.log("Scrape Request Made");

    return new Promise((resolve, reject) => {
        axios.post(HOST_URL + "url", 
            {
                url: urlToScrape
            }
        ).then(function(res) {
                resolve(res);
            }).catch(err => {
                reject({
                    ok: false,
                    stacktrace: err,
                    message: "Failed to send scrape request to backend API"
                });
            })
    });
}

module.exports = { stopPyBackend, pingBackend, scrapeRequest };