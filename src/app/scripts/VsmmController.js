myApp.controller('VsmmController',
  function VsmmController($scope) {

      SetTranslations();

      $scope.ddlChangedFn = function (uiLanguageSelected) {

          userLanguageSelected = uiLanguageSelected;
          SetTranslations();
      };

      function SetTranslations() {

          console.log("SetTranslations called");

          //////$scope.dataUnavailableForPageTextInner = GetTranslation("VsmmDataUnavailableForPageText") + ".";
          $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText") + ".";

          $scope.VsmmAverageReviewScore = GetTranslation("VsmmAverageReviewScore");
          $scope.VsmmAverageReviewScore_Lower = GetTranslation("VsmmAverageReviewScore_Lower");
          $scope.VsmmCopyTableToClipboard = GetTranslation("VsmmCopyTableToClipboard");
          $scope.VsmmDataUnavailableForPageText = GetTranslation("VsmmDataUnavailableForPageText");
          $scope.VsmmDividedBy = GetTranslation("VsmmDividedBy");
          $scope.VsmmErrorOccuredPageText = GetTranslation("VsmmErrorOccuredPageText");
          $scope.VsmmExtension = GetTranslation("VsmmExtension");
          $scope.VsmmExtensions = GetTranslation("VsmmExtensions");
          $scope.VsmmFeedbackEmailsubject = GetTranslation("VsmmFeedbackEmailsubject");
          $scope.VsmmHere = GetTranslation("VsmmHere");
          $scope.VsmmIfYouSuspectSeeingIncorrectlyText = GetTranslation("VsmmIfYouSuspectSeeingIncorrectlyText");
          $scope.VsmmIndeterminateError = GetTranslation("VsmmIndeterminateError");
          $scope.VsmmInstall = GetTranslation("VsmmInstall");
          $scope.VsmmInstalls = GetTranslation("VsmmInstalls");
          $scope.VsmmManifestDefaultTitle = GetTranslation("VsmmManifestDefaultTitle");
          $scope.VsmmManifestDescription = GetTranslation("VsmmManifestDescription");
          $scope.VsmmManifestName = GetTranslation("VsmmManifestName");
          $scope.VsmmManifestShortName = GetTranslation("VsmmManifestShortName");
          $scope.VsmmNilSearchResultsText = GetTranslation("VsmmNilSearchResultsText");
          $scope.VsmmNoOfInstalls = GetTranslation("VsmmNoOfInstalls");
          $scope.VsmmNoOfReviews = GetTranslation("VsmmNoOfReviews");
          $scope.VsmmOnSlowerConnectionsText = GetTranslation("VsmmOnSlowerConnectionsText");
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
          $scope.VsmmToNotifyAuthorText = GetTranslation("VsmmToNotifyAuthorText");
          $scope.VsmmUninitialised = GetTranslation("VsmmUninitialised");
          $scope.VsmmUnknown = GetTranslation("VsmmUnknown");
          $scope.VsmmVisualStudioHelpText = GetTranslation("VsmmVisualStudioHelpText");
      };
  });