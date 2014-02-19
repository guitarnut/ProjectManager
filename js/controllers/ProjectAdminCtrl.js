projectsApp.controller('ProjectAdminCtrl', ['$scope', '$route', 'apigeeDataManager', 'dataStorage', function ($scope, $route, apigeeDataManager, dataStorage) {
    //ISSUES:

    //Sets the header image
    $scope.clientData = {
        header: 'starz.jpg'
    }

    //Determines when the data has loaded
    $scope.ready = false;
    //Determines whether in preview mode
    $scope.preview = false;
    //A list of all clients available in the system
    $scope.clientList = {};
    //The current selected client
    $scope.client = {};
    //Stores a temporary list of assets for the current job the user is creating.
    $scope.assets = {};
    //The job list for the selected client
    $scope.jobEntity = {};
    //List of all client jobs
    $scope.clientJobList = {
        jobs: []
    };
    //The details for the current job being created
    $scope.job = {
        images: [],
        links: [],
        videos: [],
        swfs: [],
        downloads: []
    };

    //Store the base path for assets here
    $scope.assetPath = {};

    //Temporary objects to hold the values for each asset the user creates
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

        //Save the data so we don't have to reload it later
        if (!dataStorage.clientsStored()) dataStorage.saveClients($scope.clientList);

        $scope.$apply();

    }

    //Find the job object matching the selected client
    function jobsLoaded(d) {
        //Match the data to the client
        for (var i = 0; i < d.length; i++) {
            if (d[i].get('data')['name'] === $scope.client.name) {
                $scope.jobEntity = d[i];
                //Store the current list of jobs in a separate object
                $scope.clientJobList.jobs = $scope.jobEntity.get('data').clientJobs;
                $scope.ready = true;
            }
        }

        $scope.$apply();
    }

    function saveComplete() {
        $scope.reset();
    }

    function deleteComplete() {

    }

    $scope.saveJob = function () {
        //Store our new JSON job data in the entity
        $scope.jobEntity.get('data').clientJobs.push($scope.job);
        apigeeDataManager.update('job', 'uuid', $scope.jobEntity.get('uuid'), $scope.jobEntity, saveComplete);
    }

    $scope.deleteJob = function (n) {
        for (var i = 0; i < $scope.jobEntity.get('data').clientJobs.length; i++) {
            if ($scope.jobEntity.get('data').clientJobs[i] != null) {
                if ($scope.jobEntity.get('data').clientJobs[i].number === n) {
                    $scope.jobEntity.get('data').clientJobs.splice(i, 1);
                    apigeeDataManager.update('job', 'uuid', $scope.jobEntity.get('uuid'), $scope.jobEntity, deleteComplete);
                    break;
                }
            }
        }
    }

    $scope.loadClient = function () {
        //This should happen up front and be stored in a singleton...
        apigeeDataManager.load('jobs', jobsLoaded);
        //$scope.ready = true;
    };

    $scope.addAsset = function (asset) {
        switch (asset) {
            case 'image':
                //Append the base path to the image
                $scope.image.file = $scope.assetPath.path + $scope.image.file;
                //Add the asset to the job
                $scope.job.images.push($scope.image);
                //Add the asset to the UI asset list
                $scope.assets[$scope.image.file] = $scope.image.file;
                //Reset the object's values
                $scope.image = {};
                break;
            case 'download':
                //Add the asset to the job
                $scope.job.downloads.push($scope.download);
                //Add the asset to the UI asset list
                $scope.assets[$scope.download.file] = $scope.download.file;
                //Reset the object's values
                $scope.download = {};
                break;
        }
    }

    $scope.viewJob = function (p) {
        $scope.preview = p;
    }

    $scope.reset = function () {
        $route.reload();
    }

    loadClients();
}
])
;