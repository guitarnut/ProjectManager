projectsApp.controller('ProjectAdminCtrl', ['$scope', '$log', 'apigeeDataManager', function ($scope, $log, apigeeDataManager) {
    $scope.clientData = {
        header: 'starz.jpg'
    }

    $scope.ready = false;
    $scope.clientList = {};
    $scope.client = {};
    $scope.assets = {};
    $scope.jobEntity = {};
    $scope.job = {};
    $scope.asset = {};
    $scope.image = {};
    $scope.link = {};
    $scope.swf = {};
    $scope.download = {};
    $scope.video = {};

    function loadClients() {
        apigeeDataManager.load('clients', clientsLoaded);
    }

    //Load clients to populate the select menu
    function clientsLoaded(d) {
        for (var i = 0; i < d.length; i++) {
            var obj = d[i].get('data');
            $scope.clientList[obj.name] = obj;
        }
        $scope.$apply();

    }

    //Find the job object matching the selected client
    function jobsLoaded(d) {
        //Match the data to the client
        for (var i = 0; i < d.length; i++) {
            if (d[i].get('data')['name'] === $scope.client.name) {
                $scope.jobEntity = d[i];
                $scope.ready = true;
            }
        }

        $scope.$apply();
    }

    $scope.saveJob = function () {
        //Save our new JSON job data in the entity using it's number as the key
        //$scope.jobEntity.get('data')['clientJobs'][$scope.job.jobNumber] = $scope.job;
        $log.info($scope.job);
    }

    $scope.loadClient = function () {
        //This should happen up front and be stored in a singleton...
        apigeeDataManager.load('jobs', jobsLoaded);
        //$scope.ready = true;
    };

    $scope.addAsset = function(asset) {
        $log.info($scope.image);
        switch(asset) {
            case 'image':
                alert($scope.image);
                break;
        }

        //Add the asset to the list of assets added to this job
        //$scope.assets[$scope.image.imageName]['name'] = $scope.image.imageName;
    }

    loadClients();

}]);