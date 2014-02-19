'use strict';

projectsApp.controller('ClientAdminCtrl', ['$scope', '$log', 'apigeeDataManager', function ($scope, $log, apigeeDataManager) {

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
        var lcName = String($scope.client.data.name).toLowerCase();
        lcName.replace(/ /g, '');

        var c = {
            data: {
                id: lcName,
                name: $scope.client.data.name,
                header: lcName + '.jpg',
                imageFolder: lcName + '/',
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
    }

    $scope.delete = function (id, name) {
        //Delete record from database
        apigeeDataManager.remove('client', id, deleteComplete);

        delete $scope.clientList.name;
    }

    function deleteComplete() {
        alert('Deleted');
    }

    loadClients();

}]);