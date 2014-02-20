projectsApp.directive('appHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/appHeader.html',
		replace: true
	}
});

projectsApp.directive('client', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/client.html',
		replace: true
	}
});

projectsApp.directive('projectJob', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectJob.html',
		replace: true
	}
});

projectsApp.directive('projectDetails', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectDetails.html',
		replace: true,
        scope: {
            job: '=job'
        }
	}
});

projectsApp.directive('projectDownload', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectDownload.html',
		replace: true,
        scope: {
            download: '=download'
        }
	}
});

projectsApp.directive('projectImage', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectImage.html',
		replace: true,
        scope: {
            image: '=image'
        }
	}
});

projectsApp.directive('projectLink', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectLink.html',
		replace: true,
        scope: {
            link: '=link'
        }
	}
});

projectsApp.directive('projectFlash', function() {
	return {
		restrict: 'E',
		templateUrl: 'lib/templates/projectFlash.html',
		replace: true,
        scope: {
            flash: '=flash'
        }
	}
});