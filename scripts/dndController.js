(function (angular) {

    angular
        .module('app')
        .controller('dndController', function dndController($scope, getLocalStorage) {

            // read the item list from LocalStorage
            $scope.models = getLocalStorage.getItems();
            // console.log($scope.models);

            $scope.kanbanCardPriorityArr = [
                {priority: "low"}, {priority: "normal"}, {priority: "hight"}
            ];

            function getFormData($form) {

                var unindexed_array = $form.serializeArray();
                // console.log(unindexed_array);
                var indexed_array = {};

                $.map(unindexed_array, function (n, i) {
                    indexed_array[n['name']] = n['value'];
                });
                // console.log(indexed_array);
                // return JSON.stringify(indexed_array);
                return indexed_array;
            }

            $scope.addTasks = function (modal) {

                var data = getFormData($(modal));
                var date = new Date();

                var fromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
                    '-' + ('0' + date.getDate()).slice(-2) +
                    ' at ' + date.getHours() + ':' + date.getMinutes();
                // console.log(fromDate);

                $scope.models.lists['Do It'].push({
                    label: data.kanban_card_name,
                    priority: data.kanban_card_priority,
                    time: fromDate
                });

                getLocalStorage.updateItems($scope.models);

                $scope.kanban_card_name = '';
                $('#addNewTaskModal').modal('toggle');
            };

            $scope.cleanAddTaskModal = function () {
                $scope.addNewTaskForm.$setPristine();
                $scope.addNewTaskForm.$setUntouched();

                $scope.kanban_card_name = '';
            };


            $scope.preloadEditTask = function ($index, item, list, models) {

                if (models["Do It"] == list) {
                    $scope.toggleTaskName = true;
                    $('#mdEditTask').modal('toggle');
                }
                else if (models["In Progress"] == list) {
                    $scope.toggleTaskName = false;
                    $('#mdEditTask').modal('toggle');
                }

                $scope.currentDataItem = item;
                // console.log($scope.currentDataItem);

            };

            $scope.updateLocalStorage = function () {
                getLocalStorage.updateItems($scope.models);
            };

            $scope.toggleGeneratedModel = function () {

                var toggleBtnElem = angular.element(document.querySelector(".pull-right"));
                var kanbanBoard = angular.element(document.querySelector("#kanbanBoard"));
                var generatedModel = document.getElementById("generatedModel");

                if (toggleBtnElem.text() == 'Hide Model') {
                    toggleBtnElem.text('Show Model');
                    toggleBtnElem.toggleClass('btn-danger');
                    kanbanBoard.toggleClass('col-md-12');
                    generatedModel.style.visibility = 'hidden';
                } else {
                    toggleBtnElem.text('Hide Model')
                    toggleBtnElem.toggleClass('btn-danger');
                    kanbanBoard.toggleClass('col-md-12');
                    generatedModel.style.visibility = 'visible';
                }
            };


            $scope.deleteItem = function () {
                $scope.currentDeleteList.splice($scope.currentDeleteIndex, 1);

                getLocalStorage.updateItems($scope.models);
                $scope.models = getLocalStorage.getItems();
            };


            $scope.preloadDeleteItem = function ($index, item, list) {

                $scope.currentDeleteItem = item;
                $scope.currentDeleteList = list;
                $scope.currentDeleteIndex = $index;

                $('#confirmDeleteItem').modal('toggle');

                event.stopPropagation();
            };

            // Model to JSON for demo purpose
            $scope.$watch("models.lists", function (model) {
                $scope.updateLocalStorage();
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);

        });

})(window.angular);