/**
* @file label-studio-api.js
* @fileoverview Provides utility functions for interacting with a linked Label Studio project.
* Supports task export, project retrieval, and API credential management.
*
* @module LabelStudioAPI
* @requires axios
*/


const axios = require('axios').default;
var APITOKEN = '';
var BASEURL = '';

    /**
    * Enum for Label Studio API request types.
    *
    * @readonly
    * @enum {Object}
    * @memberof module:LabelStudioAPI
    */
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
    * Generate request headers for authenticated Label Studio API calls.
    *
    * @function requestHeader
    * @memberof module:LabelStudioAPI
    * @returns {Object} Header object with Content-Type and Authorization.
    */
    function requestHeader() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Token ${APITOKEN}`
        }
    }

    /**
    * Format the response data from Label Studio's projects API.
    *
    * @function formatProjectData
    * @memberof module:LabelStudioAPI
    * @param {Object} response - Raw response object from Label Studio API.
    * @returns {Array<Object>} Formatted array of project info with `id` and `project_name`.
    */
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

    /**
    * Retrieve all Label Studio projects linked via current API token and URL.
    *
    * @function getProjects
    * @memberof module:LabelStudioAPI
    * @returns {Promise<Object>} JSON response with project list or error.
    */
    function getProjects() {
        var request = {
            method: 'get',
            url: `${BASEURL}/api/projects`,
            headers: requestHeader()
        }

        return makeRequestToLS(request, RequestType.GetProjects);
    }

    /**
    * Make an HTTP request to the Label Studio API.
    *
    * @function makeRequestToLS
    * @memberof module:LabelStudioAPI
    * @param {Object} requestJSON - Axios request configuration.
    * @param {Object} requestType - Type of request from `RequestType` enum.
    * @returns {Promise<Object>} JSON response with status, message, and data.
    */
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
                }).catch((err) => {
                    var response = err.response;
                    jsonOBJ.ok = false;
                    jsonOBJ.errType = `${response.status}`;
                    jsonOBJ.resMsg = `Failed to make request to linked LS project - ${response.statusText}`;

                    resolve(jsonOBJ);
                });
            }
        });
    }

    /**
    * Format raw text into an array of sentences for task export.
    *
    * @function formatTextData
    * @memberof module:LabelStudioAPI
    * @param {string} textData - Raw text to be split and formatted.
    * @returns {Array<Object>|null} Array of { text: sentence } objects or null if input is empty.
    */
    function formatTextData(textData) {
        var regex = /(?:\([^()]*\)|\d+\.\d+|[^.?!])+[.?!]/g;
        // can be used to check for ascii valid characters but this may not be what we want
        // var asciiRegex = /^[\x00-\x7F]+$/;

        var trimmedRawData = textData.trim();

        if (trimmedRawData && trimmedRawData !== '') {
            var formattedData = [];
            var sentArr = trimmedRawData.match(regex);

            if (sentArr && sentArr.length > 0) {
                sentArr.forEach(sent => {
                    var sentStr = sent.trim();

                    if (sentStr !== '') {
                        formattedData.push({
                            text: sentStr
                        });
                    }
                });
            } else {
                formattedData.push({
                    text: trimmedRawData
                });
            }

            return formattedData;
        }

        return null;
    }

    /**
    * Format an array of raw data objects for Label Studio import.
    *
    * @function formatDataArr
    * @memberof module:LabelStudioAPI
    * @param {Array<Object>} dataArr - Array with `textData` fields.
    * @returns {Array<Object>|null} Array of formatted { text: sentence } objects or null.
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
    * Create a POST request object for importing tasks into Label Studio.
    *
    * @function requestJSON
    * @memberof module:LabelStudioAPI
    * @param {Array<Object>} rawData - Formatted data array.
    * @param {string} projectID - Target Label Studio project ID.
    * @returns {Object} Axios-compatible request object.
    * @throws {Error} If rawData is null or invalid.
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
    * Export task data to a specific Label Studio project.
    *
    * @function exportDataToLS
    * @memberof module:LabelStudioAPI
    * @param {Array<Object>} rawData - Raw task data with `textData`.
    * @param {string} projectID - Target project ID.
    * @returns {Promise<Object>} JSON response indicating success or failure.
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

    /**
    * Update the base URL for the linked Label Studio instance.
    *
    * @function updateLinkedLSProject
    * @memberof module:LabelStudioAPI
    * @param {string} url - New Label Studio base URL.
    * @returns {void}
    */
    function updateLinkedLSProject(url) {
        BASEURL = url;
        APITOKEN = '';
    }

    /**
    * Update the API token for authenticated requests and fetch available projects.
    *
    * @function updateAPIToken
    * @memberof module:LabelStudioAPI
    * @param {string} token - New API token.
    * @returns {Promise<Object>} JSON response with updated project list.
    */
    function updateAPIToken(token) {
        APITOKEN = token;
        return getProjects();
    }

    /**
    * Clear the stored base URL and API token for the Label Studio instance.
    *
    * @function clearLinkedLSProject
    * @memberof module:LabelStudioAPI
    * @returns {Object} JSON object with `ok: true` and `data: null`.
    */
    function clearLinkedLSProject() {
        BASEURL = '';
        APITOKEN = '';

        return {
            ok: true,
            data: null
        }
    }

module.exports= { exportDataToLS, updateLinkedLSProject, updateAPIToken, clearLinkedLSProject };