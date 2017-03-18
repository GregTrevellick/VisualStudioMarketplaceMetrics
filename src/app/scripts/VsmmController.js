myApp.controller('VsmmController',
  function VsmmController($scope) {

      this.TestingTesting123 = "2 b retrieved from xlation code";

      $scope.ddlChangedFn = function (orderByField) {

          if (orderByField == "en") {
              $scope.TestingTesting123 = "english";
          }
          else {
              if (orderByField == "fr") {
                  $scope.TestingTesting123 = "francais";
              }
              else {
                  $scope.TestingTesting123 = "deutsch";
              }
          }
      }
  });