const axios = require('axios').default;

const HOST_URL = 'http://127.0.0.1:7777/';

const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function pingBackend() {
    return new Promise((resolve, reject) => {
        axios.get(HOST_URL + "ping")
            .then(function(res) {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

function stopPyBackend() {
    return new Promise((resolve, reject) => {
        axios.get(HOST_URL + "kill")
            .then(function(res) {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

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
                console.log(err);
            })
    });
}

module.exports = { stopPyBackend, pingBackend, scrapeRequest };