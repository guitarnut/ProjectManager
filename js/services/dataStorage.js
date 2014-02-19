'use strict';

projectsApp.factory('dataStorage', ['$log', function ($log) {

    //Rather than call the API everytime we need data, we'll store it here and update it
    //only when necessary (when a project has been added or deleted, for example).

    var clientList;
    var clientJobs;

    //Store all client data
    function saveClients(d) {
        clientList = d;
    }

    //Change an object within the client list
    function saveClient(d, k) {
        clientList = d;
        $log.info('Saving client');
    }

    //Return a single client object
    function getClient(k) {
        $log.info('Getting client');
        return clientList;
    }

    //Return all client data
    function getClients() {
        return clientList;
    }

    //Store all job data
    function saveJobs(d) {
        $log.info('Saving jobs');
    }

    //Update a single job object
    function saveJob(d, k) {
        $log.info('Saving job');
    }

    //Return a single job object for a client
    function getJobs() {
        $log.info('Getting jobs');
        return clientJobs;
    }

    //Return job data for every client
    function getJob(k) {
        $log.info('Getting job');
        return clientJobs;
    }

    //Use these to check if either object has been populated with data
    function clientsStored() {
        if (clientList) {
            return true
        } else {
            return false
        }
    }

    function jobsStored() {
        if (clientJobs) {
            return true
        } else {
            return false
        }
    }

    return {
        saveClients: saveClients,
        saveClient: saveClient,
        clients: getClients,
        client: getClient,
        saveJobs: saveJobs,
        saveJob: saveJob,
        job: getJob,
        jobs: getJobs,
        clientsStored: clientsStored,
        jobsStored: jobsStored
    }

}]);