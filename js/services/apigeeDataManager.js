'use strict';

projectsApp.factory('apigeeDataManager', ['$rootScope', '$log', function ($rootScope, $log) {

    var _k;

    //Find way to persist loaded data. Service loads every time the controller is refreshed.

    return {
        load: function (t, f) {
            //message.show('loading');

            var _d = {
                type: t,
                client: $rootScope.client
            };

            var _c = new Apigee.Collection(_d);

            _c.fetch(function () {
                    var a = new Array();

                    while (_c.hasNextEntity()) {
                        a.push(_c.getNextEntity());
                    }
                    //Callback function
                    //message.hide(f(a));
                    f(a);
                },
                function () {
                    //Error
                }
            );

        },
        save: function (t, r, f) {
            //message.show('saving');

            //Send the type of record to save, the record, and a callback
            var timestamp = new Date();
            var g = new Apigee.Collection({ "client": $rootScope.client, "type": t });

            //Each record will have a name equal to the timestamp
            r.name = timestamp;

            g.addEntity(r, function (e, r) {
                if (e) {
                    //Error
                } else {
                    //Callback function
                    //message.hide(f());
                    f();
                }
            })
        },
        remove: function (t, i, f) {

            //Specify entity properties
            var p = {
                client: $rootScope.client,
                data: {
                    type: t,
                    uuid: i
                }
            };

            var e = new Apigee.Entity(p);

            e.destroy(function (e, r) {
                if (e) {
                    //Error
                } else {
                    f();
                }
            });
        },
        update: function (t, k, i, r, f) {

            r.save(function(e) {
                if(e) {
                    //error
                } else {
                    //callback function
                    f();
                }
            });
        }
    }
}]);