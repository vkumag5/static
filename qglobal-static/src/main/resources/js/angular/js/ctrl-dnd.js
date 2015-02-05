var ctrl = angular.module('dndCtrls', []);
var sourceList=[];
var targetList=[];
var id;
var value;
var postUrl;
ctrl.controller('dndCtrl', function($scope, $http) {
	
	$scope.model = [];
	$scope.source = [];
	var url = wsUrl;
	
	//alert('URL: ' + wsUrl);
	callGetService($scope, $http, url);

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
		callPostService($scope, $http, postUrl);
	}
	
});

function callGetService($scope, $http, url) {
    $http.get(url).success(function(data) {
			//alert(JSON.stringify(data));
            $scope.source = data.source;
			$scope.model = data.target;
			sourceList = angular.toJson(data.source);
			targetList = angular.toJson(data.target);
			id = data.id;
			postUrl = "dndDemoSendData.seam?id="+id+"&target="+targetList+"&source="+sourceList;
			
			
        });
}

function callPostService($scope, $http, postUrl) {
   $http({
    method: 'POST',
    url: postUrl,
    data: value,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {});
}
/* '{"id": ' + id + ',"source": ' + source + ', "target": ' + target + '}' */
