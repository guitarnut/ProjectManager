'use strict';

projectsApp.controller('LoginCtrl', ['$rootScope', '$scope', '$window', 'apigeeLoginManager', function LoginCtrl($rootScope, $scope, $window, apigeeLoginManager) {

    $scope.username;
    $scope.password;
    $scope.failed = false;

    $scope.login = function () {
        apigeeLoginManager.admin($scope.username, $scope.password, checkLogin);
    }

    function checkLogin() {
        if ($rootScope.admin) {
            $scope.failed = false;
            go('#/clients')
        } else {
            $scope.$apply(function() {
                $scope.failed = true;
            });
        }

    }

    function go(path) {
        $window.location.href = path;
    };

}]);