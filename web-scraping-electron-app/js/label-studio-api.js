/**
 * API for interacting with a linked label studio organization project.
 */

const axios = require('axios').default;

var APITOKEN = '';
var BASEURL = ''
var PROJECTID = '1';

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

function formatProjectData(response) {
    var numProjects = response.count;
    var results = response.results;
    var formattedResults = [];
    var index = 0;

    results.forEach(project => {
        formattedResults[index] = {
            id: project.id,
            project_name: project.title
        };

        index += 1;
    });
    
    return formattedResults;
}

function getProjects() {
    if (APITOKEN === '') {
        return;
    }

    try {
        var request = {
            method: 'get',
            url: `${BASEURL}/api/projects`,
            headers: requestHeader()
        }

        return new Promise((resolve, reject) => {
            axios(request).then(function(res) {
                if (res.status >= 200 && res.status < 300) {

                    resolve({
                        ok: true,
                        message: "Project List Successfully Retrieved from Label Studio",
                        results: formatProjectData(res.data)
                    });
                } else {
                    reject({
                        ok: false,
                        message: "Error Attempting to Retrieve Project List from Label Studio"
                    });
                }
            }).catch(err => {
                reject({
                    ok: false,
                    stacktrace: err,
                    message: "Error Attempting to Retrieve Project List from Label Studio"
                });
            })
        });
    } catch (err) {
        return {
            ok: false,
            stacktrace: err,
            message: "Error Attempting to Retrieve Project List from Label Studio"
        }
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
            url: `${BASEURL}/api/projects/${PROJECTID}/import`,
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

function updateLinkedLSProject(url) {
    BASEURL = url;
    APITOKEN = '';
}

function updatedAPIToken(token) {
    APITOKEN = token;
    return getProjects();
}

function clearLinkedLSProject() {
    BASEURL = '';
    APITOKEN = '';
}

module.exports= { exportDataToLS, updateLinkedLSProject, updatedAPIToken, clearLinkedLSProject };