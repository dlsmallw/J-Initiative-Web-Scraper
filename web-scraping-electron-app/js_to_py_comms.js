import * as axios from './node_modules/axios/dist/axios.js';

const HOST_URL = 'http://127.0.0.1:7777/';

const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export function testCommWithPyAPI() {

    axios.get(HOST_URL)
        .then(function(res) {
            console.log(res);
        });
}