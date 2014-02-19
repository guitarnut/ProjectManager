angular.module('projectsFilters', []).filter('properNoun', function() {
	return function(input) {
		return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
	};
});