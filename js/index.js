/// </// <reference path="parsed.js" />
var app = angular.module('myapp',['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
app.controller('MyController', mainCtrl);

function mainCtrl($scope, $http){
	$scope.init = function(){
		//TODO: Initialize Here
        // console.log(data);
        $scope.start = false;
        $scope.review = false;
        $scope.submit = false;
        currChoice = []
        $scope.choices = choiceAssign(data);
        $scope.choices.push("All");
	};
    $scope.changeData = function() {
        console.log($scope.selected);
        if ($scope.selected == "All") {
            $scope.dataSet = data;
            $scope.num_question = $scope.dataSet.length;
        } else {
            $scope.dataSet = chooseCategory(data, $scope.selected);
            $scope.num_question = $scope.dataSet.length;
        }
    };
    $scope.startTest = function (){
        $scope.start = true;
        $scope.curr_question = 1;
        $scope.selection = new Array($scope.num_question);
        changeView($scope);
        // console.log($scope.curr_q.Description);
    };
    $scope.changeCurrSelection = function(index) {
        $scope.curr_select = index + 1;
    }
    $scope.changeCurrQuestion = function(q) {
        $scope.selection[$scope.curr_question -1] = $scope.curr_select;
        $scope.curr_question = q;
        changeView($scope);
        $scope.review = false;
    }
    $scope.submission = function() {
        $scope.submit = true;
        $scope.review = false;
        $scope.correct_num = calculateCorrect($scope.dataSet, $scope.selection);
    }
}

function calculateCorrect(dataSet, answers) {
    var correct = 0;
    for (var idx = 0; idx < dataSet.length; idx++) {
        if (dataSet[idx]["Ans"] == answers[idx]) {
            correct++;
        };
    }
    return correct;
}

function changeView($scope) {
    $scope.curr_q = $scope.dataSet[$scope.curr_question - 1];
    $scope.curr_q.Description = $scope.curr_q.Description.replace(/<br\s*[\/]?>/gi, "\n");
    $scope.curr_q.Description = $scope.curr_q.Description.replace(/&nbsp;/gi, " ");
    $scope.curr_select = $scope.selection[$scope.curr_question - 1];
}

function chooseCategory(data, type) {
    currchoices = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i]['Category'].valueOf() == type.valueOf()) {
            currchoices.push(data[i]);
        }
    }
    return currchoices;
}

function choiceAssign(data) {
    currChoice = []
    for (var i = 0; i < data.length; i++) {
        currChoice.push(data[i]['Category']);
    }
    return Array.from(new Set(currChoice));
}