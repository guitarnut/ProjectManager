'use strict';

projectsApp.controller('ClientAdminCtrl', ['$scope', '$route', 'apigeeDataManager', 'dataStorage', '$log', function ($scope, $route, apigeeDataManager, dataStorage, log) {

    var clientName = '';

    $scope.clientData = {
        header: 'starz.jpg'
    };

    $scope.client = {};
    $scope.clientList = {};

    function loadClients() {
        apigeeDataManager.load('clients', clientsLoaded);
    }

    function clientsLoaded(d) {
        $scope.$apply(function () {
            for (var i = 0; i < d.length; i++) {
                var obj = d[i].get('data');

                //Unique id used to update and delete records
                var id = d[i].get('uuid');
                obj.uuid = id;

                $scope.clientList[obj.name] = obj;
            }
        })
    }

    $scope.saveClient = function () {
        if (($scope.client.data.name) && ($scope.client.data.type)) {
            apigeeDataManager.save('client', $scope.client, saveComplete);
        } else {
            alert("You must provide a client name and a client type.");
        }
    }

    //After storing the client info in a record, we need to create an empty json object to hold jobs for this client.

    function saveComplete() {
        createClientJoblist();
    }

    //Setup the client's job json data.

    function createClientJoblist() {

        //The ID, assets folder, and header image are all based off the client name.
        var id = String($scope.client.data.name).toLowerCase();
        //Remove spaces
        id = id.replace(/\s/g,'');

        var c = {
            data: {
                id: id,
                name: $scope.client.data.name,
                header: $scope.client.data.header,
                imageFolder: $scope.client.data.imageFolder + '/',
                clientJobs: []
            }
        };

        apigeeDataManager.save('job', c, listSaveComplete);

    }

    function listSaveComplete() {
        $scope.$apply(function () {
            $scope.client = {};
        });
        alert('Client saved');
        $route.reload();
    }

    $scope.delete = function (id, name) {
        var c = confirm('Are you sure? This cannot be undone.');

        if(c) {
            clientName = name;

            //Delete client record from database
            apigeeDataManager.remove('client', id, deleteClientComplete);

            //Remove the object from the scope
            delete $scope.clientList.name;
        }
    }

    function deleteClientComplete() {
        //Find the job list entity associated with this client
        apigeeDataManager.load('jobs', deleteClientJobs);
    }

    function deleteClientJobs(d) {
        //Match the data to the client
        for (var i = 0; i < d.length; i++) {
            if (d[i].get('data')['name'] === clientName) {
                var Entity = d[i];
                apigeeDataManager.remove('job', Entity.get('uuid'), clientDataDeleteComplete);

            }
        }
    }

    function clientDataDeleteComplete() {
        alert('Client deleted');
        $route.reload();
    }

    loadClients();

}]);