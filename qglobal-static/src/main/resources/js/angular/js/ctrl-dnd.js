var ctrl = angular.module('dndCtrls', []);
var sourceList=[];
var targetList=[];
var id;
var value;
var postUrl;
ctrl.controller('dndCtrl', function($scope, $http) {
	
	$scope.model = [];
	$scope.source = [];
	$scope.ageGroup = [];
	$scope.rater = [];
	$scope.assmtList = [];
	
	var url = wsUrl;
	var urlAgeGroup = urlAge;
	var urlRater = urlRate;
	var urlAssessment = urlAssmt;
	
	callGetService($scope, $http, url);
	callGetForAgeGroup($scope, $http, urlAgeGroup);
	callGetForRater($scope, $http, urlRater);
	callGetForAssessment($scope, $http, urlAssessment);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("model", function(value) {
		if (value) {
			console.log("Model: " + value.map(function(e){return e.id}).join(','));
		}
	},true);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("source", function(value) {
		
		if (value) {
			console.log("Source: " + value.map(function(e){return e.id}).join(','));
		}
		
	},true);

	if ($scope) {
		$scope.sourceEmpty = function() {
			if ($scope && $scope.source) {
				return $scope.source.length == 0;
			}
			 return false;
		}

		$scope.modelEmpty = function() {
			if ($scope && $scope.model) {
				return $scope.model.length == 0;
			}
			return false;
		}
	}
	
	$scope.saveOption = function() {	
		
		sourceList = $scope.source;
		targetList = $scope.model;
		var postUrl = "dndDemoSendData.seam";		
		//alert();
		var temp_source = angular.toJson(sourceList).replace(/hashKey/g,"").replace(/\$/g,"").replace(/\\/g,"").replace(/, "": "([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])"/g,"").replace(/"\[/g,"[").replace(/\]"/g,"]");
		var temp_target = angular.toJson(targetList).replace(/hashKey/g,"").replace(/\$/g,"").replace(/\\/g,"").replace(/, "": "([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])"/g,"").replace(/\]"/g,"]").replace(/"\[/g,"[");
		alert(temp_target);
		var params = "id=" + id + "&target=" + temp_target + "&source=" + temp_source;
		callPostService($scope, $http, postUrl, params);
	}
	
});

function callGetService($scope, $http, url) {
    $http.get(url).success(function(data) {
			alert(JSON.stringify(data).replace(/\\/g,""));
			if (data.source && data.source.length > 0) {
				$scope.source = data.source;
			}
			
			if (data.target && data.target.length > 0) {
				$scope.model = data.target;
			}			
			sourceList = angular.toJson(data.source);
			targetList = angular.toJson(data.target);
			id = data.id;
			
        });
}

function callGetForAgeGroup($scope, $http, urlAgeGroup) {
    $http.get(urlAgeGroup).success(function(data) {
		$scope.ageGroup = data;
	});
}

function callGetForRater($scope, $http, urlRater) {
    $http.get(urlRater).success(function(data) {
		$scope.rater = data;
	});
}

function callGetForAssessment($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
		$scope.assmtList = data;
		alert('hi');
	});
}

function callPostService($scope, $http, postUrl, params) {
   $http({
    method: 'POST',
    url: postUrl,
    data: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {});
}
