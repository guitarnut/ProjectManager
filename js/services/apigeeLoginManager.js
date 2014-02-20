'use strict';

projectsApp.factory('apigeeLoginManager', function ($rootScope) {

    $rootScope.client = new Apigee.Client({
        orgName: 'guitarnut',
        appName: 'starz-review'
    });

    function login(u, p, f) {
        //Check login status
        if($rootScope.loggedIn) {
            //Run the callback if already logged in
            f();
        } else {
            $rootScope.client.login(u, p, function (e, r) {
                if (e) {
                    //Take second callback for failure?
                    f();
                } else {
                    f();
                }
            });
        }
    }

    function adminLogin(u, p, f) {
        //Check admin status
        if($rootScope.admin) {
            //Run the callback if already logged in as admin
            f();
        } else {
            $rootScope.client.login(u, p, function (e, r) {
                if (e) {
                    //Take second callback for failure?
                    f();
                } else {
                    $rootScope.admin = true;
                    f();
                }
            });
        }
    }

    return {
        login: login,
        admin: adminLogin
    }

});