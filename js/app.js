(function () {

    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunch = "";
        $scope.result = "";

        $scope.displayResult = function () {
            var resultString = determineIsTooMuch($scope.lunch);
            $scope.result = resultString;
        }

    }

    function determineIsTooMuch(lunchString) {
        
        // check if there is nothing in the box
        if (lunchString == "") {
            return "Please enter data first.";
        }

        //var numCommas = 0;
        var numWords = 0;
        var extraWhitespace = 0;
        var splitString = lunchString.split(",")

        // check case for empty commas
        for (var i = 0; i < splitString.length; i++) {
            
            if (splitString[i].trim() == '') {
                extraWhitespace += 1;
            } else {
                numWords += 1;
            }
        }

        // return that empty answers don't count
        if (extraWhitespace > 0) {
            return 'Empty answers do not count (answers with ,, or ,   , or trailing commas). Please make sure that you check to make sure there are words between your commas.';
        }

        // return too much 
        if (numWords > 3 && extraWhitespace == 0) {
            return "Too Much!";
        }

        // return enjoy
        if (numWords <= 3 && extraWhitespace == 0) {
            return "Enjoy!";
        }


    }

})();