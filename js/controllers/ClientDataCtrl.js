projectsApp.controller('ClientDataCtrl', function ClientDataCtrl($scope, $routeParams, $window, clientData) {
	$scope.clientData;
	$scope.job;
	
	//Pull JSON for a specific client or load the main client JSON doc if one is not specified
	var clientId = $routeParams.clientId;
	if (clientId === undefined) clientId = 'clients';

	//Get the job ID from the URL if it exists
	var jobNumber = $routeParams.projectId;

	//Load data with promise object
	var Promise = clientData.getData(clientId);

	Promise.then(function(result) {
		$scope.clientData = result;

		//If the job number has been specified, find it after the main client data is loaded
		if (jobNumber != undefined) getJob(jobNumber);
	}, function(result) {
		//handle error
	});

	//Go through the jobs array in the JSON and find the correct one
	function getJob(jobNumber) {
		var job = $scope.clientData.clientJobs;

		for (var i = 0; i < job.length; i++) {
			if (job[i].number === jobNumber) {
				$scope.job = job[i];
				break;
			}
		}
	}
	
	$scope.go = function(path) {
		$window.location.href = path;
	};
	
	$scope.open = function(path) {
		$window.open(path, '_blank');
	}
});