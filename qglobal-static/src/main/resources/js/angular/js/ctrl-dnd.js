var ctrl = angular.module('dndCtrls', []);
var source;
var target;
var id;
ctrl.controller('dndCtrl', function($scope, $http) {
	
	$scope.model = [];
	$scope.source = [];
	var url = wsUrl;
	//alert('URL: ' + wsUrl);
	callService($scope, $http, url);

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
	$scope.checkValues = function() {
	alert("hello"+" "+source+" "+target+" "+id);
	console.log($scope);
}
	});

function callService($scope, $http, url) {
    $http.get(url).success(function(data) {
			//alert(JSON.stringify(data));
            $scope.source = data.source;
			$scope.model = data.target;
			source = data.source;
			target = data.target;
			id = data.id;
        });
}
function Test(){
alert("Hi Anshul");
}
