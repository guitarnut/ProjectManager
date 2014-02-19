'use strict';

projectsApp.controller('ClientDataCtrl', function ClientDataCtrl($scope, $routeParams, $window, apigeeDataManager, dataStorage) {

    //Sets the header image
    $scope.clientData = {
        header: 'starz.jpg'
    }

    var clientId = $routeParams.clientId;
    var projectId = $routeParams.projectId;

    if (clientId === undefined) clientId = 'clients';

    $scope.client = clientId;
    $scope.clientList = {};
    $scope.clientJobList = {
        jobs: []
    };
    $scope.job = {};

    function loadClients() {
        apigeeDataManager.load('clients', clientsLoaded);
    }

    function clientsLoaded(d) {
        $scope.$apply(function () {
            for (var i = 0; i < d.length; i++) {
                var obj = d[i].get('data');
                $scope.clientList[obj.name] = obj;
            }
        })
    }

    function loadJobs() {
        //This should happen up front and be stored in a singleton...
        apigeeDataManager.load('jobs', jobsLoaded);
    }

    //Find the job object matching the selected client
    function jobsLoaded(d) {
        //Match the data to the client
        for (var i = 0; i < d.length; i++) {
            if (d[i].get('data')['name'] === clientId) {
                //Store the current list of jobs in a separate object
                $scope.clientJobList.jobs = d[i].get('data').clientJobs;
            }
        }

        //If a job number is specified in the URL, we'll grab it now.
        if (projectId != undefined) {
            for (var j = 0; j < $scope.clientJobList.jobs.length; j++) {
                if ($scope.clientJobList.jobs[j].number === projectId) {
                    $scope.job = $scope.clientJobList.jobs[j];
                }
            }
        }

        $scope.$apply();
    }

    //If a client is specified in the URL, we'll load it's jobs.
    //Otherwise, we load the client list.
    if(clientId === 'clients') {
        loadClients();
    } else {
        loadJobs();
    }
});