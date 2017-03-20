//myApp.controller('VsmmController', function ($scope, $http, BaseURL, $routeParams, permitNotesService) {
//myApp.controller('VsmmController', ["$filter", "$scope", "$http", "$location", "permitService", function($filter, $scope, $http, $location, $permitService){

//myApp.service("permitNotesService", function () {
//    //console.log("myAppfred in the service =" + myApp.fred);
//    //var testing = "123";
//    return {
//        foo: "bar",
//        hello: "world",
//    }
//});






    

//myApp.controller('VsmmController', function VsmmController() {
//myApp.controller('VsmmController', ['$scope', 'permitNotesService', function VsmmController($scope, permitNotesService) {
//myApp.controller('VsmmController', ['$scope', 'clientId', function VsmmController($scope, clientId) {
myApp.controller('VsmmController', ['$scope', '$window', '$rootScope', function VsmmController($scope, $window, $rootScope) {

    //console.log("myAppfred in the ctlr =" + myApp.fred);
    //console.log("service's foo in the ctlr =" + permitNotesService.foo);this works
    //console.log("service's hello in the ctlr =" + permitNotesService.hello);this works
    //var testingCtrl = "abc";
    //console.log("testingCtrl=" + testingCtrl);



    //var initWatch = function ($scope, $window) {
    //    $scope.$watch(function (scope) { console.log("newValue="); return $window.globalVar1 },
    //        function (newValue) {
    //            //$scope.updateDisplayedVar(newValue);
    //            console.log("newValue=" + newValue);
    //        });
    //}

    //console.log("here3");
    //this.clientId = clientId;
    //console.log("here4");

    //console.log("root scope city=" + $rootScope.city);
    //console.log("here3window=" + $window.globalVar1);
    $scope.globalVar1 = $window.globalVar1;
    console.log("here4scope=" + $scope.globalVar1);
    //$rootScope.TriggerMePlease = function() {
    //    console.log("triggered");
    //};






    GetTranslations();

    $scope.totalOverallAverageReview2 = 110;

    $scope.UiLanguageSelectionChanged = function (uiLanguageSelected) {
        console.log("here4scope=" + $scope.globalVar1);
        userLanguageSelected = uiLanguageSelected;
        GetTranslations();
    };

    $scope.ShowTotalOverallAverageReview = function () {
        // try {
        //  var elem = document.getElementById('TotalOverallAverageReview');
        // var hdn = elem.getAttribute("hidden");
        //     if (hdn = "hidden") {
        if ($scope.totalOverallAverageReview2 > 0) {
            return true;
        }
        else {
            return false;
        };
        //  } catch (e) {
        //     CommonErrorHandler(e);
        //  }
    };

    function GetTranslations() {

        $scope.VsmmAverageReviewScore = GetTranslation("VsmmAverageReviewScore");
        $scope.VsmmAverageReviewScore_Lower = GetTranslation("VsmmAverageReviewScore_Lower");
        $scope.VsmmCopyTableToClipboard = GetTranslation("VsmmCopyTableToClipboard");
        $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText") + ".";
        $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText");
        $scope.VsmmDividedBy = GetTranslation("VsmmDividedBy");
        $scope.VsmmErrorOccuredPageText = GetTranslation("VsmmErrorOccuredPageText") + ".";
        $scope.VsmmExtension = GetTranslation("VsmmExtension");
        $scope.VsmmExtensions = GetTranslation("VsmmExtensions");
        $scope.VsmmFeedbackEmailsubject = GetTranslation("VsmmFeedbackEmailsubject");
        $scope.VsmmHere = GetTranslation("VsmmHere");
        $scope.VsmmIfYouSuspectSeeingIncorrectlyText = GetTranslation("VsmmIfYouSuspectSeeingIncorrectlyText") + " ";
        $scope.VsmmIndeterminateError = GetTranslation("VsmmIndeterminateError");
        $scope.VsmmInstall = GetTranslation("VsmmInstall");
        $scope.VsmmInstalls = GetTranslation("VsmmInstalls");
        $scope.VsmmManifestDefaultTitle = GetTranslation("VsmmManifestDefaultTitle");
        $scope.VsmmManifestDescription = GetTranslation("VsmmManifestDescription");
        $scope.VsmmManifestName = GetTranslation("VsmmManifestName");
        $scope.VsmmManifestShortName = GetTranslation("VsmmManifestShortName");
        $scope.VsmmNilSearchResultsText = GetTranslation("VsmmNilSearchResultsText") + ".";
        $scope.VsmmNoOfInstalls = GetTranslation("VsmmNoOfInstalls");
        $scope.VsmmNoOfReviews = GetTranslation("VsmmNoOfReviews");
        $scope.VsmmOnSlowerConnectionsText = GetTranslation("VsmmOnSlowerConnectionsText") + ".";
        $scope.VsmmPercentageOfInstallations = GetTranslation("VsmmPercentageOfInstallations");
        $scope.VsmmPleaseClick = GetTranslation("VsmmPleaseClick");
        $scope.VsmmPrice = GetTranslation("VsmmPrice");
        $scope.VsmmPublisher = GetTranslation("VsmmPublisher");
        $scope.VsmmReview = GetTranslation("VsmmReview");
        $scope.VsmmReviews = GetTranslation("VsmmReviews");
        $scope.VsmmReviewsAsPercentageOfInstalls = GetTranslation("VsmmReviewsAsPercentageOfInstalls");
        $scope.VsmmShown = GetTranslation("VsmmShown");
        $scope.VsmmThankYouForUsing = GetTranslation("VsmmThankYouForUsing");
        $scope.VsmmTitle_Grid = GetTranslation("VsmmTitle_Grid");
        $scope.VsmmTitle_Page = GetTranslation("VsmmTitle_Page");
        $scope.VsmmToNotifyAuthorText = GetTranslation("VsmmToNotifyAuthorText") + ":";
        $scope.VsmmUninitialised = GetTranslation("VsmmUninitialised");
        $scope.VsmmUnknown = GetTranslation("VsmmUnknown");
        $scope.VsmmVisualStudioHelpText = GetTranslation("VsmmVisualStudioHelpText") + ".";
    };
    
//});
}]);

//}]).factory('permitNotesService', function () {
//    //console.log("myAppfred in the service =" + myApp.fred);
//    var testingPermitNotesService = "123";
//    return {
//        foo: "bar",
//        hello: "world",
//    }
//});




function popUpCallBack2(vsmpDom) {
    console.log("yep");
};
