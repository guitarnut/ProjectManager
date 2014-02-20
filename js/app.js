var projectsApp = angular.module('projectsApp', [
    'ngRoute',
    'ngSanitize',
    'projectsFilters'
]);

projectsApp.run(['$rootScope', 'apigeeLoginManager', function ($rootScope, apigeeLoginManager) {
    $rootScope.loggedIn = false;
    $rootScope.admin = false;

    apigeeLoginManager.login('guest', 'Guest1000', function() {
        $rootScope.loggedIn = true;
    })
}]);

projectsApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/clients', {
                templateUrl: 'partials/client-list.html',
                controller: 'ClientDataCtrl'
            }).
            when('/projects', {
                templateUrl: 'partials/projects-list.html',
                controller: 'ProjectDataCtrl'
            }).
            when('/addclient', {
                templateUrl: 'partials/addClient.html',
                controller: 'ClientAdminCtrl'
            }).
            when('/addproject', {
                templateUrl: 'partials/addProject.html',
                controller: 'ProjectAdminCtrl'
            }).
            when('/clients/:clientId', {
                templateUrl: 'partials/client-detail.html',
                controller: 'ClientDataCtrl'
            }).
            when('/clients/:clientId/projects', {
                templateUrl: 'partials/client-detail.html',
                controller: 'ClientDataCtrl'
            }).
            when('/clients/:clientId/projects/:projectId', {
                templateUrl: 'partials/project-detail.html',
                controller: 'ClientDataCtrl'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            otherwise({
                redirectTo: '/clients'
            });
    }
]);
