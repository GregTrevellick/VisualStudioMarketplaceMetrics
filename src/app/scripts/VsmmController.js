myApp.controller('VsmmController',
  function VsmmController($scope) {

      this.TestingTesting123 = "2 b retrieved from xlation code";
      this.ngerrorOccuredPageTextInner = "xyz";


      $scope.ddlChangedFn = function (angUserLanguageSelected) {

          //if (angUserLanguageSelected == "en") {
          //    $scope.TestingTesting123 = "english";
          //}
          //else {
          //    if (angUserLanguageSelected == "fr") {
          //        $scope.TestingTesting123 = "francais";
          //    }
          //    else {
          //        $scope.TestingTesting123 = "deutsch";
          //    }
          //}

          userLanguageSelected = angUserLanguageSelected;

          $scope.ngdataUnavailableForPageTextInner = GetTranslation("VsmmDataUnavailableForPageText") + ".";

      }
  });