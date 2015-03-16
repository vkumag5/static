var ctrl = angular.module('dndCtrls', []);
var sourceList=[];
var targetList=[];
var id;
var value;
var postUrl;
var favourites=[];
var notFavourites=[];
var leftColumnIds=[];
var rightColumnIds=[];
var originalJSON = [];

ctrl.controller('dndCtrl', function($scope, $http) {
	
	$scope.model = [];
	$scope.source = [];
	$scope.ageGroup = [];
	$scope.rater = [];
	$scope.assmtList = [];
	$scope.itemTest = [];
	$scope.tagList = [];
	$scope.ImgTest = "star_blank.png";
	$scope.questionsOnRight = "";
	
	var url = wsUrl;
	var urlAgeGroup = urlAge;
	var urlRater = urlRate;
	var urlAssessment = urlAssmt;
	var urlForTagList = urlTagList;
	
	callGetForAgeGroup($scope, $http, urlAgeGroup);
	callGetForRater($scope, $http, urlRater);
	//callGetForAssessment($scope, $http, urlAssessment);
	callGetService($scope, $http, urlAssessment);
	callGetForTagList($scope, $http, urlForTagList);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("model", function(value) {
		rightColumnIds = [];
		if (value) {
			console.log("Model: " + value.map(function(e){rightColumnIds.push(e.identifier); return e.identifier}).join(','));			
			$scope.questionsOnRight = rightColumnIds.length;
		}
	},true);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("source", function(value) {	
		leftColumnIds = [];
		if (value) {
			console.log("Source: " + value.map(function(e){leftColumnIds.push(e.identifier); return e.identifier}).join(','));
			
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
		var params = "target=" + $scope.prepareJsonUtility(rightColumnIds) + "&source=" + $scope.prepareJsonUtility(leftColumnIds);
		alert(params);
		var postUrl = "dndDemoSendData.seam";
		callPostService($scope, $http, postUrl, params)
		
		/*var postUrl = "dndDemoSendData.seam";		
		//alert();
		var temp_source = angular.toJson(sourceList).replace(/hashKey/g,"").replace(/\$/g,"").replace(/\\/g,"").replace(/, "": "([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])"/g,"").replace(/"\[/g,"[").replace(/\]"/g,"]");
		var temp_target = angular.toJson(targetList).replace(/hashKey/g,"").replace(/\$/g,"").replace(/\\/g,"").replace(/, "": "([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])"/g,"").replace(/\]"/g,"]").replace(/"\[/g,"[");
		//alert(temp_target);
		var params = "id=" + id + "&target=" + temp_target + "&source=" + temp_source;
		callPostService($scope, $http, postUrl, params);*/
	}	
	
	$scope.toggleStarImage = function(idx) {
	
		var elem = document.getElementById(idx);
        console.log('clicked row', idx);
		var str = idx.src;
		var thumbnail = str.replace(str.substring(0, str.indexOf("star")), "");
		//alert(thumbnail);
		if (thumbnail=="star.png") {
			idx.src = idx.src.replace(thumbnail,"star_blank.png");
			notFavourites.push(idx.id);
			//alert(notFavourites);
			favourites.splice(favourites.indexOf(idx.id),1);
			//alert(idx.src);
		}
		else if (thumbnail=="star_blank.png") {
			idx.src = idx.src.replace(thumbnail,"star.png");
			favourites.push(idx.id);
			notFavourites.splice(notFavourites.indexOf(idx.id),1);
			//alert(favourites);
		}
	}
	
	$scope.prepareJsonUtility = function(idArray) {
		var jsonToSave=[];
		for(var i=0; i < idArray.length; i++) {
			var jsonData="";				
			jsonData = jsonData + "{\"identifier\":" + "\"" + idArray[i] + "\"" + ",";
			jsonData = jsonData + "\"favorite\":" + $scope.checkIfFavorite(idArray[i]) + "}";			
			jsonToSave.push(jsonData);			
		}
		var jsonString = "["+jsonToSave+"]";
		return jsonString;
	}
	
	$scope.checkIfFavorite = function(idToCheck) {
		var status = false;
		for(var i = 0; i < favourites.length; i++){			
			if(idToCheck==favourites[i]){
				status = true;
				break;
			}
		}
		return status;
	}
	
	$scope.showThumbnailImage = function(idToCheck) {
		if(favourites.indexOf(idToCheck)>-1){
			return "static/images/star.png";
		}
		else{
			return "static/images/star_blank.png";
		}
	
	}
	
	$scope.ifFavIsChecked = function(key) {		
		if(key.checked) {
			var test = [];			
			test = $scope.source;
			for(var i=0; i < test.length; ){
			var flag = false;
			console.log(test[i].identifier);
				for(var j=0;j < favourites.length; j++){
					if(test[i].identifier == favourites[j]){
						flag = true;
						break;
					}
				}
			if(!flag){
				test.splice(i,1);
			} else {
				i++;
			}
			}
			$scope.source = test;		
		}
		else if(!key.checked){
		//alert("unchecked");
		//alert(JSON.stringify(originalJSON));
		$scope.source = angular.copy(originalJSON);
		}
	}
	
});

function callGetService($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
			//alert(JSON.stringify(data).replace(/\\/g,""));
			if (data.items_list && data.items_list.length > 0) {
				$scope.source = data.items_list;
				originalJSON = angular.copy(data.items_list);
			}
			
			if (data.target && data.target.length > 0) {
				$scope.model = data.target;
			}			
			sourceList = angular.toJson(data.items_list);
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
		$scope.assmtList = data.items_list;
		alert($scope.assmtList);
		//$scope.itemTest = data.item_list;
	});
}

function callGetForTagList($scope, $http, urlForTagList) {
    $http.get(urlForTagList).success(function(data) {
		$scope.tagList = data;
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
