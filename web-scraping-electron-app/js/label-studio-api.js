/**
 * API for interacting with a linked label studio organization project.
 */

const axios = require('axios').default;

const APITOKEN = 'fd75d39be50497efc2992ba209a83c390c8688c5';
const URL = 'https://dlsmallw-test.hf.space'
const PROJECTID = '1';

/**
 * Generates a request header for making requests to a specified Label Studio project.
 * @returns JSON        The request header.
 */
function requestHeader() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Token ${APITOKEN}`
    }
}

/**
 * Formats raw string data by splitting it into an array of individual sentences.
 * @param {*} rawData       The data to be formatted.
 * @returns Array           An array split into individual sentences.
 */
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

/**
 * Generates a JSON request object for exporting data to Label Studio.
 * @param {*} rawData       The data to be exported.
 * @returns JSON            The request object.
 */
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

/**
 * Makes a post request to export data to the linked LS project.
 * @param {*} rawData       The data to be exported.
 * @returns JSON            Object indicating success or failure.
 */
function exportDataToLS(rawData) {
    try {
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
    } catch (err) {
        return {
            ok: false,
            stacktrace: err,
            message: "Error Attempting to Export Scraped Data to Label Studio"
        }
    }
}

module.exports= { exportDataToLS };