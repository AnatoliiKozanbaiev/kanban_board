function initiateLocalStorage() {

    // create the storage service module
    // create getLocalStorage service to access UpdateItems and getItems | getComments method
    var storageService = angular.module('storageService', [])
        .service('getLocalStorage', function () {
            var models = {};

            return {
                list: models,
                updateItems: function (ItemsArr) {
                    if (window.localStorage && ItemsArr) {
                        // Local storage to add data
                        localStorage.setItem("models", angular.toJson(ItemsArr));
                    }
                    models = ItemsArr;
                },
                getItems: function () {
                    // get data from local storage
                    models = angular.fromJson(localStorage.getItem("models"));
                    return models ? models : {
                        lists: {
                            "Do It": [
                                {label: "Fix car", priority: "hight", time: '2017-07-22 at 19:16'},
                                {label: "Fix fence", priority: "normal", time: '2017-07-22 at 19:16'},
                                {label: "Get dog food", priority: "low", time: '2017-07-22 at 19:17'},
                                {label: "Walk dog", priority: "low", time: '2017-07-22 at 19:15'},
                                {label: "Buy eggs", priority: "low", time: '2017-07-22 at 19:15'}
                            ],
                            "In Progress": [{label: "Read book", priority: "low", time: '2017-07-22 at 19:18'}],
                            "Done": [],
                            "Aborted": []
                        }
                    };
                }
            };

        });
}

initiateLocalStorage();