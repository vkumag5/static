var ctrl = angular.module('dndCtrls', []);
var value;
var postUrl;
var favourites=[];
var notFavourites=[];
var leftColumnIds=[];
var rightColumnIds=[];
var originalJSON = [];
var tagList = [];
var whichRadioSelected = "";
var ageGroupCheckboxSelected = [];
var favFlag = false;
ctrl.controller('dndCtrl', function($window, $scope, $http) {
	$scope.alerts = [];
	$scope.model = [];
	$scope.source = [];
	$scope.ageGroup = [];
	$scope.rater = [];
	$scope.assmtList = [];
	$scope.itemTest = [];
	$scope.ImgTest = "star_blank.png";
	$scope.questionsOnRight = "";
	$scope.testVar = formId;
	$scope.formName = "";
	$scope.ngMaxItemRestrictCount = maxItemRestrictCount;
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
			if($scope.questionsOnRight==0){
				$("#dragDropMsgDiv").show();
			}
			else {
				$("#dragDropMsgDiv").hide();
			}
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
	
	$scope.saveOption = function(flag) {
		sourceList = $scope.source;
		targetList = $scope.model;	
		var params = "target=" + $scope.prepareJsonUtility(rightColumnIds) + "&source=" + $scope.prepareJsonUtility(leftColumnIds) + "&formName=" +$scope.formName + "&saveOption=" + flag;
		if($scope.testVar != 0) {		
		params = params + "&formId=" + $scope.testVar;
		}
		var postUrl = "sendJSONDataToSave.seam";
		if($scope.formName==""){
			alert("Please enter the form name.");
		}
		else {
			callPostService($window, $scope, $http, postUrl, params);
		}
		
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
	
	$scope.returnTagNames = function(ids) {
		return showTagNames(ids);
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
			favFlag = true;			
		}
		else if(!key.checked){
		favFlag = false;		
		}
	}
	
	$scope.ifRadioIsChecked = function(val) {
		whichRadioSelected = val;
	}
	$scope.whichAgeGroupSelected = function(val){
		if ($.inArray(val, ageGroupCheckboxSelected)>=0){
			ageGroupCheckboxSelected.splice(ageGroupCheckboxSelected.indexOf(val),1);
		}
		else {
			ageGroupCheckboxSelected.push(val);
		}		
	}
	
	$scope.checkFavouriteFilter = function(items){
		if(favFlag){
		if ($.inArray(items.identifier, favourites)>=0){
		return items;
		}
		else{
			return;
		}
		}
		else{
		return items;
		}
	}
	
	$scope.radioCheckFilter = function(items){
		if(whichRadioSelected != "") {
		if ($.inArray(whichRadioSelected, items.raterIds)>=0){
		return items;
		}
		else{
			return;
		}
		}
		else{
			return items;
		}
	}
	
	$scope.checkAgeGroupFilter = function(items) {
		var ageGroupId = items.ageGroupIds[0]; 
		if(ageGroupCheckboxSelected.length != 0){
		if ($.inArray(ageGroupId, ageGroupCheckboxSelected) > -1){
			return items;
		}
		else{
			return;
		}
		}
		else{
			return;
		}
	}

	$scope.updateFormName = function() {
				 rater = "Student";
				 ages = "All Ages";
				 var today = new Date();
				 var dd = today.getDate();
				 var mm = today.getMonth()+1; //January is 0!
				 var yyyy = today.getFullYear();
	
				 if(dd < 10) {
				     dd='0'+dd;
				 } 

				 if(mm < 10) {
				     mm='0'+mm;
				 } 

				 today = mm+'-'+dd+'-'+yyyy;
				 
				 $scope.formName = "Basc-3 Custom " + rater + " Monitor " + ages + " " + today;
			}
			
	$scope.updateCallback = function(uiItem, eventTarget) {
	//$scope.alerts.splice(0, $scope.alerts.length);
		if (eventTarget.id == 'sourceList' && uiItem[0].parentNode.id == 'targetList'
			&& $scope.questionsOnRight >= $scope.ngMaxItemRestrictCount) {
			$('#sourceList').sortable('cancel');
		}
	}
	
});

function callGetService($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
			//alert(JSON.stringify(data).replace(/\\/g,""));
			if (data.items_list && data.items_list.length > 0) {
				$scope.source = data.items_list;
				originalJSON = angular.copy(data.items_list);
				tagList = data.tag_list;
				$scope.ageGroup = data.ageGroup_list;
				$scope.rater = data.rater_list;
				$scope.updateFormName();
				ageGroupCheckboxSelected = [];
				for(var i=0;i<$scope.ageGroup.length;i++){
					ageGroupCheckboxSelected.push($scope.ageGroup[i].identifier);
				}
			}
			
			if (data.target && data.target.length > 0) {
				//$scope.model = data.target;
			}
			if($scope.testVar && $scope.testVar.length > 0) {
				var urlForEntireJSON = "fetchSavedJson.seam";
				var params = "ID="+$scope.testVar;
				callGetForSavedForm($scope, $http, urlForEntireJSON, params);
			} else {
				$scope.viewLoading = false;
				$('#loadingMessage').hide();
			}
        });
}

function callPostService($window, $scope, $http, postUrl, params) {
	$('#loadingMessage').show();
	$scope.viewLoading = true;

   $http({
    method: 'POST',
    url: postUrl,
    data: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data) {
		var redirectUrl = "redirectToManageFlexForm.seam";
		callRedirectService($window, $scope, $http, redirectUrl);

		$scope.viewLoading = false;
		$('#loadingMessage').hide();
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
	var formStatus = data.formStatus;
	if(formStatus != 'Draft'){
		$('#savePublishButton').attr('disabled','disabled');
		$('#saveDraftButton').attr('disabled','disabled');
	}
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
	$scope.formName = data.formName;
	
	$scope.viewLoading = false;
	$('#loadingMessage').hide();

});	
}

function showTagNames(ids) {
		var showNames="";
		for(var i=0; i < ids.length; i++){
		for(var j=0; j < tagList.length; j++){
			if(ids[i] == tagList[j].identifier){							
				showNames = showNames + tagList[j].name;
				break;
				}
			}
			if(i != (ids.length)-1){
				showNames = showNames +", ";
			}
			
		}
		return showNames;
}

ctrl.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i].tagIds;
	  var name = showTagNames(item);
      if (letterMatch.test(name.substring(0, name.length))) {
        filtered.push(items[i]);
      }
    }
    return filtered;
  };
});

