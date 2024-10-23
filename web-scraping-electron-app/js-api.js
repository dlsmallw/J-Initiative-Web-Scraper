const axios = require('axios').default;

const HOST_URL = 'http://127.0.0.1:7777/';

const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function stopPyBackend() {
    return new Promise((resolve, reject) => {
        console.log("Command To Shutdown Backend Sent")
        axios.get(HOST_URL + "kill")
            .then(function(res) {
                resolve(res.data);
            });
    });
}

function testCommWithPyAPI() {
    console.log("TEST API METHOD CALLED")

    return new Promise((resolve, reject) => {
        axios.get(HOST_URL)
            .then(function(res) {
                resolve(res.data);
            });
    });
}

module.exports = { testCommWithPyAPI, stopPyBackend };