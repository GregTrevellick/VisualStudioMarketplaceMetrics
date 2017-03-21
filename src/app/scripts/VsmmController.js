myApp.controller('VsmmController', ['$scope', '$window', '$rootScope', function VsmmController($scope, $window, $rootScope) {
    
    var unbind = myVarWatch.watch(function (newVal) {

        console.log("the value changed!", newVal);
        var totalInstallCount = 0;
        var totalReviewCount = 0;
        var numericAverageReviewSum = 0;
        var DaRows = [];
        for (var i = 0; i < newVal.vdom.length; i++) {
            AddRowsToTable(i);
        }

        var totalExtensionsCount = newVal.vdom.length;
        var overallAverageReview = (numericAverageReviewSum / totalExtensionsCount);
        $scope.totalExtensionsCount = totalExtensionsCount;
        $scope.TotalInstallCount = totalInstallCount;
        $scope.TotalReviewCount = totalReviewCount;
        $scope.totalOverallAverageReview = overallAverageReview.toFixed(2).toLocaleString();
        $scope.DaRows = DaRows;
        $scope.$apply();

        function AddRowsToTable(i) {

            var numericAverageReview = parseInt(newVal.vdom[i]["AverageReview"]);
            numericAverageReviewSum += numericAverageReview;

            var numericInstallCount = parseInt(newVal.vdom[i]["InstallCount"]);
            totalInstallCount += numericInstallCount;

            var numericReviewCount = parseInt(newVal.vdom[i]["ReviewCount"]);
            totalReviewCount += numericReviewCount;

            var numericReviewsAsPercentageOfInstalls = 0;
            if (numericInstallCount > 0) {
                numericReviewsAsPercentageOfInstalls = (numericReviewCount / numericInstallCount) * 100;
            }

            //var colItemTitle = "<td>"
            //    + "<div title=\"" + newVal.vdom[i]["FullDescription"] + "\">"
            //    + "<a href=\"" + newVal.vdom[i]["URL"] + "\" target=\"_blank\">"
            //    + "<img src=\"" + newVal.vdom[i]["Icon"] + "\" style=\"width: 18%; height: 18%;\">"
            //    + "&nbsp;"
            //    + newVal.vdom[i]["ItemTitle"]
            //    + "</a></div></td>";
            var colItemTitle = 
                 "<div title=\"" + newVal.vdom[i]["FullDescription"] + "\">"
                + "<a href=\"" + newVal.vdom[i]["URL"] + "\" target=\"_blank\">"
                + "<img src=\"" + newVal.vdom[i]["Icon"] + "\" style=\"width: 18%; height: 18%;\">"
                + "&nbsp;"
                + newVal.vdom[i]["ItemTitle"]
                + "</a></div>";

            var colReviewsAsPercentageOfInstalls = "<td class='numeric'><div title=\""
               + numericReviewsAsPercentageOfInstalls.toFixed(9) + "\">"
               + numericReviewsAsPercentageOfInstalls.toFixed(2) + "</div></td>";
            
            //var colPublisher = "<td>"
            //    + "<a href=\""
            //    + "https://marketplace.visualstudio.com/search?term=publisher%3A%22"
            //    + newVal.vdom[i]["Publisher"]
            //    + "%22&target=VS&sortBy=Relevance"
            //    + "\" target=\"_blank\">"
            //    + newVal.vdom[i]["Publisher"]
            //    + "</a></td>";
            var colPublisher = 
               + "<a href=\""
               + "https://marketplace.visualstudio.com/search?term=publisher%3A%22"
               + newVal.vdom[i]["Publisher"]
               + "%22&target=VS&sortBy=Relevance"
               + "\" target=\"_blank\">"
               + newVal.vdom[i]["Publisher"]
               + "</a>";

            if (newVal.vdom[i]["Price"] == undefined) {
                var colPrice = GetTranslation("VsmmUnknown");
            }
            else {
                var colPriceLower = newVal.vdom[i]["Price"].toLowerCase();
                var colPrice = colPriceLower.charAt(0).toUpperCase() + colPriceLower.slice(1);
            }

            var daRow = {};
            daRow.NoOfInstalls = numericInstallCount;
            daRow.Title_Grid = colItemTitle;
            daRow.NoOfReviews = numericReviewCount;
            daRow.ReviewsAsPercentageOfInstalls = "4";//colReviewsAsPercentageOfInstalls
            daRow.Publisher = colPublisher;
            daRow.Price = colPrice;
            daRow.AverageReviewScore = newVal.vdom[i]["AverageReview"];

            DaRows.push(daRow);

            console.log(DaRows);
        };
    });
    // Unbind the listener when the scope is destroyed
    $scope.$on('$destroy', unbind);

    


    GetTranslations();

    $scope.UiLanguageSelectionChanged = function (uiLanguageSelected) {
        userLanguageSelected = uiLanguageSelected;
        GetTranslations();
    };

    $scope.ShowTotalOverallAverageReview = function () {
        // try {
        if ($scope.totalOverallAverageReview > 0) {
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

}]);
