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
var jsonDataForComputeReliability = "";
var formStatus = "";
var modelHeight = "";
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
	$('#errorsWarningsMessageDiv').hide();
	$scope.errorsWarnings=[];
	var urlForEntireJSON = "fetchAllDetailsJson.seam";
	$scope.viewLoading = true;
	$('#savePublishButton').attr('disabled','disabled');
	$scope.formOpenModeVar = formOpenMode;
	callGetService($scope, $http, urlForEntireJSON);		

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("model", function(value) {
		rightColumnIds = [];
		if (value) {
			console.log("Model: " + value.map(function(e){rightColumnIds.push(e.itemId); return e.itemId}).join(','));			
			$scope.questionsOnRight = rightColumnIds.length;
			if($scope.questionsOnRight==0){
				$("#dragDropMsgDiv").show();
				$("#computeReliability").attr("disabled", "disabled");
			}
			else {
				if($scope.questionsOnRight<6) {
				modelHeight = modelHeight+20;
				var targetHeight = (modelHeight) + "px";
				$('#targetList').css("height",targetHeight);
				} else {
					modelHeight = 300;
					$('#targetList').css("height","");
				}
				$("#dragDropMsgDiv").hide();
				$("#computeReliability").removeAttr("disabled");
			}
		}
	},true);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("source", function(value) {	
		leftColumnIds = [];
		if (value) {
			console.log("Source: " + value.map(function(e){leftColumnIds.push(e.itemId); return e.itemId}).join(','));
			
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
		var params = "target=" + $scope.prepareJSONToSave(rightColumnIds) + "&formName=" +$scope.formName + "&saveOption=" + flag + "&flexFormItemsIdList=" + jsonDataForComputeReliability + "&flexFormItemsFavouritesList=" + $scope.prepareJSONToSave(favourites);
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
		if (thumbnail=="star.png") {
			idx.src = idx.src.replace(thumbnail,"star_blank.png");
			notFavourites.push(idx.id);
			favourites.splice(favourites.indexOf(idx.id),1);
		}
		else if (thumbnail=="star_blank.png") {
			idx.src = idx.src.replace(thumbnail,"star.png");
			favourites.push(idx.id);
			notFavourites.splice(notFavourites.indexOf(idx.id),1);
		}
		console.log(favourites);
	}
	
	$scope.prepareJSONToSave = function(idArray) {
		var jsonData="";
		for(var i=0; i < idArray.length; i++) {			
			jsonData = jsonData + "\"" + idArray[i] + "\""
			if(i<idArray.length-1) {
				jsonData = jsonData + ",";
			}
		}
		return "[" + jsonData + "]";
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
		if ($.inArray(items.itemId, favourites)>=0){
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
		if ($.inArray(whichRadioSelected, items.category)>=0){
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
		var ageGroupId = items.ageGroup[0]; 
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
		if (eventTarget.id == 'sourceList' && uiItem[0].parentNode.id == 'targetList'
			&& $scope.questionsOnRight >= $scope.ngMaxItemRestrictCount) {
			$('#sourceList').sortable('cancel');
		}
	}
	
	$scope.computeReliability = function() {
		$('#loadingMessage').show();
		jsonDataForComputeReliability = "";
		if(rightColumnIds.length>0) {
			jsonDataForComputeReliability = jsonDataForComputeReliability + "{";
			for(var i=0; i < rightColumnIds.length; i++) {				
				jsonDataForComputeReliability = jsonDataForComputeReliability + "\"" + rightColumnIds[i] + "\"" + ":" + "\"1\"";
			if(!(i==rightColumnIds.length-1)) {
				jsonDataForComputeReliability = jsonDataForComputeReliability + ",";
				}
			}
		jsonDataForComputeReliability = jsonDataForComputeReliability + ",\"program_call\":\"5\"}";
		}
		var flexformIdsToSendForValidation = "flexFormItemsIdList=" + jsonDataForComputeReliability;
		var computeReliabilityServiceURL = "sendFlexFormItemsForValidation.seam"
		callComputeValidationService($scope, $http, computeReliabilityServiceURL, flexformIdsToSendForValidation);
	}
	
});

function callGetService($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
			//alert(JSON.stringify(data).replace(/\\/g,""));
			modelHeight = 300;
			var flexFormItems = data.flexFormItems;
			if(data.flexFormItemsFavorites) {
				favourites = data.flexFormItemsFavorites;
			} else {
				favourites = [];
			}
			if (flexFormItems.itemSet && flexFormItems.itemSet.length > 0) {				
				$scope.ageGroup = flexFormItems.metaData.ageGroup;
				$scope.rater = flexFormItems.metaData.category;				
				$scope.source = flexFormItems.itemSet;
				originalJSON = angular.copy(flexFormItems.itemSet);
				tagList = flexFormItems.metaData.tags;				
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
	$scope.errorsWarnings = [];
	if(data.error) {		
		$scope.errorsWarnings.push(data.error);
		$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");		
		$('#errorsWarningsMessageDiv').show();
		$('#loadingMessage').hide();
	} else {
		$('#errorsWarningsMessageDiv').hide();
		var redirectUrl = "redirectToManageFlexForm.seam";
		callRedirectService($window, $scope, $http, redirectUrl);
		$scope.viewLoading = false;
		$('#loadingMessage').hide();
	}
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
	var targetItemsOnRight = [];
	formStatus = data.formStatus;
	if(formStatus != 'Draft'){
		$('#savePublishButton').attr('disabled','disabled');
		$('#saveDraftButton').attr('disabled','disabled');
	}
	targetItemsOnRight = data.rightItem;
	var testSource = $scope.source;	
	angular.forEach(targetItemsOnRight, function(item) {
		for(var j = 0; j < testSource.length; j++) {
			if (item == testSource[j].itemId) {
				rightItems.push(testSource[j]);
				testSource.splice(j,1);
				break;
			}
		}

	});
	$scope.source = testSource;
	$scope.model = rightItems;
	if($scope.formOpenModeVar=="true") {
		$scope.formName = "Copy of " + data.formName;
	} else {
		$scope.formName = data.formName;
	}
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
      var item = items[i].tags;
	  var name = showTagNames(item);
      if (letterMatch.test(name.substring(0, name.length))) {
        filtered.push(items[i]);
      }
    }
    return filtered;
  };
});

function callComputeValidationService($scope, $http, computeReliabilityServiceURL, flexformIdsToSendForValidation) {
    $http({
    method: 'POST',
    url: computeReliabilityServiceURL,
    data: flexformIdsToSendForValidation,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {
	$scope.errorsWarnings = [];
	if(data.error) {		
		$scope.errorsWarnings.push(data.error);
		$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");
		$('#errorsWarningsMessageDiv').show();
		$('#loadingMessage').hide();	
	} else {		
		$scope.errorsWarnings.push(data.response.validityStatus);
		if(data.response.validityStatus.toLowerCase()=="success"){
			$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivSuccess");
			if(formStatus == 'Draft' || formStatus == "") {
				$('#savePublishButton').removeAttr('disabled');
			}
			$('#errorsWarningsMessageDiv').show();
		}
		else {
			$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");
			$('#errorsWarningsMessageDiv').show();			
		}
		$('#loadingMessage').hide();		
	}	
	
});	
}