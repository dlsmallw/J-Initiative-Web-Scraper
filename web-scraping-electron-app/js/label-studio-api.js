/**
 * API for interacting with a linked label studio organization project.
 */

const axios = require('axios').default;

const APITOKEN = 'fd75d39be50497efc2992ba209a83c390c8688c5';
const URL = 'https://dlsmallw-test.hf.space'
const PROJECTID = '1';


function requestHeader() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Token ${APITOKEN}`
    }
}

function formatRawData(rawData) {
    var regex = /(?:\([^()]*\)|\d+\.\d+|[^.?!])+[.?!]/g;

    var trimmedRawData = rawData.trim();
    
    if (trimmedRawData !== '') {
        var currIndex = 0;
        var formattedData = [];

        var sentArr = trimmedRawData.match(regex);

        if (sentArr.length > 0) {
            sentArr.forEach(sent => {
                var sentStr = sent.trim();

                if (sentStr !== '') {
                    formattedData[currIndex] = {
                        'text': sentStr
                    }
    
                    currIndex += 1;
                }
            });
        }
        return formattedData;
    }

    return null;
}

function requestJSON(rawData) {
    var textData = formatRawData(rawData);

    if (textData !== null) {
        return {
            method: 'post',
            url: `${URL}/api/projects/${PROJECTID}/import`,
            headers: requestHeader(),
            data: textData
        }
    } else {
        throw new Error("Invalid Data Format From Null Data.");
    }
}

function exportDataToLS(rawData) {
    var request = requestJSON(rawData);

    return new Promise((resolve, reject) => {
        axios(request).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                resolve({
                    ok: true,
                    message: "Data Successfully Exported to Label Studio"
                });
            } else {
                reject({
                    ok: false,
                    message: "Error Exporting Scraped Data to Label Studio"
                });
            }
        }).catch(err => {
            reject({
                ok: false,
                stacktrace: err,
                message: "Error Attempting to Export Scraped Data to Label Studio"
            });
        })
    });
}

module.exports= { exportDataToLS };