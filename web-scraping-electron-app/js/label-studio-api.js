/**
 * API for interacting with a linked label studio organization project.
 */

const axios = require('axios').default;

var APITOKEN = '';
var BASEURL = '';

const RequestType = {
    GetProjects: {
        id: 0,
        name: 'GetProjects',
        successMsg: 'Project List Successfully Retrieved from Label Studio',
        failMsg: 'Failed to Retrieve Project List from Label Studio'
    },
    ExportTasks: {
        id: 1,
        name: 'ExportTasks',
        successMsg: 'Data Successfully Exported to Label Studio',
        failMsg: 'Error Exporting Scraped Data to Label Studio'
    }
}

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
    var index = numProjects - 1;

    results.forEach(project => {
        formattedResults[index] = {
            id: project.id,
            project_name: project.title
        };

        index -= 1;
    });

    return formattedResults;
}

function getProjects() {
    var request = {
        method: 'get',
        url: `${BASEURL}/api/projects`,
        headers: requestHeader()
    }

    return makeRequestToLS(request, RequestType.GetProjects);
}

function makeRequestToLS(requestJSON, requestType) {
    // Used to define an informative response to be sent back to the renderer
    let jsonOBJ = {
        ok: null,
        requestType: requestType.name,
        data: null,
        resMsg: null,
        errType: null
    }

    return new Promise((resolve) => {
        if (APITOKEN === '' || BASEURL === '') {
            jsonOBJ.ok = false;
            jsonOBJ.resMsg = requestType.failMsg;
            jsonOBJ.errType = 'Token/URL Missing';

            resolve(jsonOBJ);
        } else {
            axios(requestJSON).then(function(res) {
                var status = res.status;
                var statusText = res.statusText;
    
                if (status >= 200 && status < 300) {
                    jsonOBJ.ok = true;
                    jsonOBJ.resMsg = requestType.successMsg;
                    jsonOBJ.errType = 'NONE';

                    if (requestType === RequestType.GetProjects) {
                        jsonOBJ.data = formatProjectData(res.data);
                    }
                } else {
                    jsonOBJ.ok = false;
                    jsonOBJ.resMsg = requestType.failMsg;
                    jsonOBJ.errType = statusText;
                }
    
                resolve(jsonOBJ);
            }).catch(err => {
                jsonOBJ.ok = false;
                jsonOBJ.errType = 'Request Failure';
                jsonOBJ.resMsg = 'Error Encountered Making Request to Label Studio Project';
    
                resolve(jsonOBJ);
            });
        }
    });
}

/**
 * Formats raw string data by splitting it into an array of individual sentences.
 * @param {*} textData       The data to be formatted.
 * @returns Array           An array split into individual sentences.
 */
function formatTextData(textData) {
    var regex = /(?:\([^()]*\)|\d+\.\d+|[^.?!])+[.?!]/g;

    var trimmedRawData = textData.trim();
    
    if (trimmedRawData !== '') {
        var formattedData = [];

        var sentArr = trimmedRawData.match(regex);

        if (sentArr.length > 0) {
            sentArr.forEach(sent => {
                var sentStr = sent.trim();

                if (sentStr !== '') {
                    formattedData.push({
                        text: sentStr
                    });
                }
            });
        }

        return formattedData;
    }

    return null;
}

/**
 * Processes the raw data received from the application into a format acceptable for Label Studio.
 * @param {*} dataArr       The raw data.
 * @returns                 A formatted array of all data to export.
 */
function formatDataArr(dataArr) {
    var formattedResult = null;

    if (dataArr !== null) {
        var formattedArr = [];

        for (var i = 0; i < dataArr.length; i++) {
            var data = formatTextData(dataArr[i].textData);

            for (var j = 0; j < data.length; j++) {
                formattedArr.push(data[j]);
            }
        }

        if (formattedArr.length !== 0) {
            formattedResult = formattedArr;
        }
    }

    return formattedResult;
}

/**
 * Generates a JSON request object for exporting data to Label Studio.
 * @param {*} rawData       The data to be exported.
 * @returns JSON            The request object.
 */
function requestJSON(rawData, projectID) {
    var formattedData = formatDataArr(rawData);

    if (formattedData !== null) {
        return {
            method: 'post',
            url: `${BASEURL}/api/projects/${projectID}/import`,
            headers: requestHeader(),
            data: formattedData
        }
    } else {
        throw new Error("Invalid Data Format From Null Data.");
    }
}

/**
* Makes a post request to export data to the linked LS project.
 * @param {*} rawData       The data to be exported.
 * @param {*} projectID     The ID of the project to export to.
 * @returns JSON            Object indicating success or failure.
 */
function exportDataToLS(rawData, projectID) {
    try {
        var request = requestJSON(rawData, projectID);

        return makeRequestToLS(request, RequestType.ExportTasks);
    } catch (err) {
        return new Promise(resolve => {
            resolve({
                ok: false,
                requestType: RequestType.ExportTasks,
                resMsg: RequestType.ExportTasks.failMsg,
                errType: err
            });
        });  
    }
}

function updateLinkedLSProject(url) {
    BASEURL = url;
    APITOKEN = '';
}

function updateAPIToken(token) {
    APITOKEN = token;
    return getProjects();
}

function clearLinkedLSProject() {
    BASEURL = '';
    APITOKEN = '';
}

module.exports= { exportDataToLS, updateLinkedLSProject, updateAPIToken, clearLinkedLSProject };