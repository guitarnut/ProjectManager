projectsApp.factory('clientData', function($http, $q) {
	return {
	
		getData: function(clientID) {
			var deferred = $q.defer();
			
			$http({
						method: 'GET',
						url: 'content/'+clientID+'.json'
					}).
					success(function(data, status, headers, config) {
						deferred.resolve(data);
					}).
					error(function(data, status, headers, config) {
						deferred.reject(status);
					});
					
			return deferred.promise;
		}
	}
});