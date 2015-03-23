var ctrl = angular.module('dndCtrls', []);
var value;
var postUrl;
var favourites=[];
var notFavourites=[];
var leftColumnIds=[];
var rightColumnIds=[];
var originalJSON = [];
var masterJSON = [];

ctrl.controller('dndCtrl', function($window, $scope, $http) {	
	
	$scope.model = [];
	$scope.source = [];
	$scope.ageGroup = [];
	$scope.rater = [];
	$scope.assmtList = [];
	$scope.itemTest = [];
	$scope.tagList = [];
	$scope.ImgTest = "star_blank.png";
	$scope.questionsOnRight = "";
	$scope.testVar = formId;
	$('#loadingMessage').show();
	var urlForEntireJSON = "fetchAllDetailsJson.seam";
	$scope.viewLoading = true;
	callGetService($scope, $http, urlForEntireJSON);		

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
		var postUrl = "sendJSONDataToSave.seam";
		callPostService($window, $scope, $http, postUrl, params);		
		//callRedirectService($window, $scope, $http, redirectUrl);
		
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
	
	$scope.showTagNames = function(ids) {
		var showNames="";
		for(var i=0; i < ids.length; i++){
		for(var j=0; j < $scope.tagList.length; j++){
			if(ids[i] == $scope.tagList[j].identifier){							
				showNames = showNames + $scope.tagList[j].name;
				break;
				}
			}
			if(i != (ids.length)-1){
				showNames = showNames +", ";
			}
			
		}
		return showNames;
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
		/*var test = [];
		test = $scope.model;
		//var testSource = [];
		var testSource = untouchedOriginalJSON[0];
		//testSource = angular.copy(originalJSON);
		for(var i=0;i<testSource.length;){
		for(var j=0;j<test.length;j++){
			if(test[j].identifier==testSource[i].identifier){
				testSource.splice(i,1);
			}
			else{
				i++;
			}
		}
		}
		//testSource = angular.copy(originalJSON);
		$scope.source = testSource;
		//alert(untouchedOriginalJSON);*/
		$scope.source = angular.copy(originalJSON);		
		
		}
	}
	
	$scope.ifRadioIsChecked = function(key) {
	if(key.checked) {
		console.log(key)
		/*if(key.value=="Teacher"){
			$scope.source = untouchedOriginalJSON;			
		}
		else if(key.value=="Parent"){
			var test = $scope.source;
			for(var i =0;i>test.length;i++){
				if(test.raterIds==)
			}
		}
		else if(key.value=="Student"){
		
		}*/
		var test = [];
		test = $scope.source;
		for(var i=0;i<test.length;){			
			var raterIds = [];
			raterIds = test[i].raterIds;
			for(var j=0;j<raterIds.length;j++) {
			if(raterIds[j]!=key.id)
				test.splice(i,1);
			else
				i++;
			}
			
		}
		$scope.source = test;
	}

	}	
	
});

function callGetService($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
			//alert(JSON.stringify(data).replace(/\\/g,""));
			masterJSON = data;			
			if (data.items_list && data.items_list.length > 0) {
				$scope.source = data.items_list;
				originalJSON = angular.copy(data.items_list);
				$scope.tagList = data.tag_list;
				$scope.ageGroup = data.ageGroup_list;
				$scope.rater = data.rater_list;				
			}
			
			if (data.target && data.target.length > 0) {
				//$scope.model = data.target;
			}
			if($scope.testVar!=null) {
				var urlForEntireJSON = "fetchSavedJson.seam";
				var params = "ID="+$scope.testVar;
				callGetForSavedForm($scope, $http, urlForEntireJSON, params);
			}
			$scope.viewLoading = false;
			$('#loadingMessage').hide();
        });
}

function callPostService($window, $scope, $http, postUrl, params) {
   $http({
    method: 'POST',
    url: postUrl,
    data: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {
	var redirectUrl = "redirectToManageFlexForm.seam";
	callRedirectService($window, $scope, $http, redirectUrl);
});	
}

function callRedirectService($window, $scope, $http, redirectUrl) {
    $http.get(redirectUrl).success(function(data) {					
		$window.location.href='/qg/manageFlexForms.seam';
	});
}

function callGetForSavedForm($scope, $http, urlForEntireJSON, params) {
    $http({
    method: 'POST',
    url: urlForEntireJSON,
    data: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {
	var rightItems = [];
	var leftItems = [];
	var flag = "";
	var sourceItemsOnLeft = [];
	var targetItemsOnRight = [];
	sourceItemsOnLeft = data.leftItem;
	targetItemsOnRight = data.rightItem;
	var testSource = $scope.source;
	
	angular.forEach(sourceItemsOnLeft, function(item) {
		if (item.favorite) {
			favourites.push(item.identifier);
		} else {
			notFavourites.push(item.identifier);
		}
		for(var j = 0; j < testSource.length; j++) {
			if (item.identifier == testSource[j].identifier) {
				leftItems.push(testSource[j]);
				break;
			}
		}

	});
	
	angular.forEach(targetItemsOnRight, function(item) {
		if (item.favorite) {
			favourites.push(item.identifier);
		} else {
			notFavourites.push(item.identifier);
		}
		for(var j = 0; j < testSource.length; j++) {
			if (item.identifier == testSource[j].identifier) {
				rightItems.push(testSource[j]);
				break;
			}
		}

	});
	$scope.source = leftItems;
	$scope.model = rightItems;
	
});	
}
