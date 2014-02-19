projectsApp.controller('ProjectDataCtrl', function ProjectDataCtrl($scope, $window, clientData) {
	$scope.clientData;
	$scope.job;
	$scope.jobList = {"jobs": []};
	
	//Load the main client list
	var clientId = 'clients';
	
	//Load data with promise object
	var Promise = clientData.getData(clientId);
	
	Promise.then(function(result) {
		$scope.clientData = result;
		loadClientJSON();
	}, function(result) {
		//handle error
	});
	
	//Load each client and grab all their projects
	function loadClientJSON() {
		for(var i = 0; i < $scope.clientData.clients.length; i++) {
			var clientName = $scope.clientData.clients[i].id;
			var ClientPromise = clientData.getData(clientName);
			
			ClientPromise.then(function(result) {
				$scope.jobList.jobs.push(result);
			}, function(result) {
				//handle error
			});
		}
	}
	
	$scope.go = function(path) {
		$window.location.href = path;
	};
	
	$scope.open = function(path) {
		$window.open(path, '_blank');
	}
});