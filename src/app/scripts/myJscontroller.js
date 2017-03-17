
(function () { //closure

    var myApp = angular.module('myApp', []);

    myApp.controller('VsmmController',//important to be in capitals and to use the word Controller
    //  function myCtrl1($scope) {
          function () {
          //$scope.modelProp1 = "pr1";
          this.modelProp1 = "pr1";
      });

}) ();//closure