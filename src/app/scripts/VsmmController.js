myApp.controller('VsmmController', ['$scope', '$window', '$rootScope', function VsmmController($scope, $window, $rootScope) {
    
    var unbind = myVarWatch.watch(function (newVal) {

        //console.log("the value changed!", newVal);
        var totalExtensionsCount = newVal.vdom.length;

        var totalInstallCount = 0;
        var totalReviewCount = 0;
        var numericAverageReviewSum = 0;
        var totalReviewsAsPercentageOfTotalInstalls = 0;
        var totalOverallAverageReview = 0;

        var DaRows = [];
        var DaRowsLabels = [];
        var DaRowsNoOfInstalls = [];
        for (var i = 0; i < newVal.vdom.length; i++) {
            AddRowsToTable(i);
        }
        var overallAverageReview = (numericAverageReviewSum / totalExtensionsCount);
        SetHeaders();
        $scope.totalExtensionsCount = totalExtensionsCount;
        $scope.TotalInstallCount = totalInstallCount;
        $scope.TotalReviewCount = totalReviewCount;
        $scope.totalOverallAverageReview = overallAverageReview.toFixed(2).toLocaleString();

        $scope.DaRows = DaRows;
        $scope.DaRowsLabels = DaRowsLabels;
        $scope.DaRowsNoOfInstalls = DaRowsNoOfInstalls;

        var FooterGridTotalInstallCount = "";
        var FooterGridTotalReviewCount = "";
        var FooterReviewsAsPercentageOfInstalls = "";
        var FooterOverallAverageReview = "";
        SetFooters();
        $scope.FooterGridTotalInstallCount = FooterGridTotalInstallCount;
        $scope.FooterGridTotalReviewCount = FooterGridTotalReviewCount;
        $scope.FooterReviewsAsPercentageOfInstalls = FooterReviewsAsPercentageOfInstalls;
        $scope.FooterOverallAverageReview = FooterOverallAverageReview;

        PopulateChart(DaRowsNoOfInstalls, DaRowsLabels);

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
            
            if (newVal.vdom[i]["Price"] == undefined) {
                var colPrice = GetTranslation("VsmmUnknown");
            }
            else {
                var colPriceLower = newVal.vdom[i]["Price"].toLowerCase();
                var colPrice = colPriceLower.charAt(0).toUpperCase() + colPriceLower.slice(1);
            }

            var daRow = {};
            daRow.NoOfInstalls = numericInstallCount;
            daRow.ExtnDescriptionFull = newVal.vdom[i]["FullDescription"];
            daRow.ExtnUrl = newVal.vdom[i]["URL"];
            daRow.ExtnIconUrl = newVal.vdom[i]["Icon"];
            daRow.ExtnNameShort = newVal.vdom[i]["ItemTitle"];
            daRow.NoOfReviews = numericReviewCount;
            daRow.ReviewsAsPercentageOfInstalls = numericReviewsAsPercentageOfInstalls.toFixed(2);
            daRow.ReviewsAsPercentageOfInstallsTitle = numericReviewsAsPercentageOfInstalls.toFixed(9);
            daRow.Publisher = newVal.vdom[i]["Publisher"];
            daRow.PublisherUrl = "https://marketplace.visualstudio.com/search?term=publisher%3A%22" + newVal.vdom[i]["Publisher"] + "%22&target=VS&sortBy=Relevance";
            daRow.Price = colPrice;
            daRow.AverageReviewScore = newVal.vdom[i]["AverageReview"];

            DaRows.push(daRow);
            DaRowsLabels.push(daRow.ExtnNameShort);
            DaRowsNoOfInstalls.push(daRow.NoOfInstalls);
        };

        function SetHeaders() {

            if (totalInstallCount > 0) {
                totalReviewsAsPercentageOfTotalInstalls = (totalReviewCount / totalInstallCount) * 100;
            }

            var overallAverageReview = (numericAverageReviewSum / totalExtensionsCount);
            totalOverallAverageReview = overallAverageReview.toFixed(2).toLocaleString();

            //////////////////////////////////////if (totalReviewsAsPercentageOfTotalInstalls > 0) {
            //////////////////////////////////////    document.getElementById('TotalReviewCount').innerHTML += " ("
            //////////////////////////////////////    + totalReviewsAsPercentageOfTotalInstalls.toFixed(3).toLocaleString()
            //////////////////////////////////////    + GetTranslation("VsmmPercentageOfInstallations")
            //////////////////////////////////////    + ")";
            //////////////////////////////////////};
            //gregt:  remove VsmmPercentageOfInstallations from the .json files

            showVsmmAverageReviewScore_Lower = false;
        };

        function SetFooters() {
            FooterGridTotalInstallCount = totalInstallCount.toLocaleString();
            FooterGridTotalReviewCount = totalReviewCount.toLocaleString();
            FooterReviewsAsPercentageOfInstalls = totalReviewsAsPercentageOfTotalInstalls.toFixed(2).toLocaleString();
            FooterOverallAverageReview = totalOverallAverageReview;
        };
    });
    // Unbind the listener when the scope is destroyed
    $scope.$on('$destroy', unbind);


    var masterAvailableOptions = [
        { id: 'bg', name: GetTranslation("VsmmLangBulgarian") },
        { id: 'ca', name: GetTranslation("VsmmLangCatalan") },
        { id: 'de', name: GetTranslation("VsmmLangGerman") },
        { id: 'en', name: GetTranslation("VsmmLangEnglish") },
        { id: 'es', name: GetTranslation("VsmmLangSpanish") },
        { id: 'fr', name: GetTranslation("VsmmLangFrench") },
        { id: 'it', name: GetTranslation("VsmmLangItalian") },
        { id: 'nl', name: GetTranslation("VsmmLangDutch") },
        { id: 'pl', name: GetTranslation("VsmmLangPolish") },
        { id: 'pt', name: GetTranslation("VsmmLangPortuguese") },
        { id: 'ro', name: GetTranslation("VsmmLangRomanian") },
        { id: 'sv', name: GetTranslation("VsmmLangSwedish") },
        { id: 'uk', name: GetTranslation("VsmmLangUkranian") }
    ];

    var browserLanguage = chrome.i18n.getMessage("@@ui_locale").substring(0, 2);

    $scope.uiLanguageModel = {
        selectedLang: browserLanguage, 
        availableOptions: masterAvailableOptions
    };

    GetTranslations();

    $scope.UiLanguageSelectionChanged = function (uiLanguageModel) {
        GetTranslations();
    };

    $scope.ShowTotalOverallAverageReview = function () { 
        try {
            if ($scope.totalOverallAverageReview > 0) {
                return true;
            }
            else {
                return false;
            };
        } catch (e) {
            CommonErrorHandler(e);
        }
    };

    function GetTranslations() {
        userLanguageSelected = $scope.uiLanguageModel.selectedLang;

        $scope.uiLanguageModel.availableOptions = masterAvailableOptions;

        $scope.VsmmAverageReviewScore = GetTranslation("VsmmAverageReviewScore");
        $scope.VsmmAverageReviewScore_Lower = GetTranslation("VsmmAverageReviewScore_Lower");
        $scope.VsmmCopyTableToClipboard = GetTranslation("VsmmCopyTableToClipboard");
        $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText") + ".";
        $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText");
        $scope.VsmmDividedBy = GetTranslation("VsmmDividedBy");
        $scope.VsmmErrorOccuredPageText = GetTranslation("VsmmErrorOccuredPageText") + ".";
        $scope.VsmmExtension = GetTranslation("VsmmExtension");
        $scope.VsmmExtensions = GetTranslation("VsmmExtensions");
        $scope.VsmmFeedbackEmailSubject = GetTranslation("VsmmFeedbackEmailSubject");
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

    function PopulateChart(daRowsNoOfInstalls, daRowsLabels) {

        var backgroundColors =
            [
                'red',
                'blue',
                'green',
                'black',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];


        var chartData = [];
        var chartDataElement = {};
        chartData.push(chartDataElement);
        var ctx = document.getElementById("vsmmChart").getContext('2d');

        var vsmmChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: daRowsLabels,
                datasets: [{
                    label: '# of Votes',
                    data: daRowsNoOfInstalls,
                    backgroundColor: backgroundColors.slice(daRowsNoOfInstalls.length)
                }]
            }
        });
    };

}]);
