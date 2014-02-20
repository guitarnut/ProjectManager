'use strict';

projectsApp.controller('ProjectDataCtrl', function ProjectDataCtrl($scope, $window, apigeeDataManager) {

    $scope.data = {
        clients: []
    }

    function loadProjects() {
        apigeeDataManager.load('jobs', jobsLoaded);
    }

    //Find the job object matching the selected client
    function jobsLoaded(d) {
        //Match the data to the client
        for (var i = 0; i < d.length; i++) {
            //Create the client object
            var client = {
                name: d[i].get('data')['name'],
                jobs: []
            }

            //Grab the array of jobs from the data call and push it to each client
            client.jobs = d[i].get('data').clientJobs;
            $scope.data.clients.push(client);
        }

        //Refresh the view
        $scope.$apply();
    }

    $scope.go = function (path) {
        $window.location.href = path;
    };

    $scope.open = function (path) {
        $window.open(path, '_blank');
    }

    loadProjects();

});