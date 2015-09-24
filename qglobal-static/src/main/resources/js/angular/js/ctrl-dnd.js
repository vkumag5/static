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
var changeFormName = true;
var selectedRaterName = "";
var prefixFormName = "BASC-3 Custom Flex";
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
	$scope.ngMinItemRestrictCount = minItemRestrictCount;
	$('#loadingMessage').show();
	$('#errorsWarningsMessageDiv').hide();
	$scope.errorsWarnings=[];
	var urlForEntireJSON = "fetchAllDetailsJson.seam";
	$scope.viewLoading = true;
	$('#savePublishButton').attr('disabled','disabled');
	$scope.formOpenModeVar = formOpenMode;	
	$scope.errorMsgFormNameBlank = errorMsgFormNameBlank;
	$scope.errorMsgFormNameExists = errorMsgFormNameExists;
	callGetService($scope, $http, urlForEntireJSON);		

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	//modified to show 'Compute Reliability' button as active when minimum 5 questions will be on right window pane.
    //and dotted div will be visible only when no question will be on right window pane.
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
				      $("#dragDropMsgDiv").hide();
					  
				if ($scope.questionsOnRight<5) {
					  $("#computeReliability").attr("disabled", "disabled");
				} else {
					  $("#computeReliability").removeAttr("disabled");
				}
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
		var params = "target=" + $scope.prepareJSONToSave(rightColumnIds) + "&formName=" + prefixFormName + " " + $scope.formName + "&saveOption=" + flag + "&flexFormItemsIdList=" + jsonDataForComputeReliability + "&flexFormItemsFavouritesList=" + $scope.prepareJSONToSave(favourites);
		if($scope.testVar != 0) {		
		params = params + "&formId=" + $scope.testVar;
		}
		var postUrl = "sendJSONDataToSave.seam";
		if($scope.formName==""){	
			$scope.callAngularErrorPopup($scope.errorMsgFormNameBlank);
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
	
	$scope.ifRadioIsChecked = function(raterItem) {
		whichRadioSelected = raterItem.identifier;
		selectedRaterName = raterItem.name;
		$scope.autoPopulateFormName();
	}
	$scope.whichAgeGroupSelected = function(val){
		if ($.inArray(val, ageGroupCheckboxSelected)>=0){
			ageGroupCheckboxSelected.splice(ageGroupCheckboxSelected.indexOf(val),1);
		}
		else {
			ageGroupCheckboxSelected.push(val);
		}
		$scope.autoPopulateFormName();
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
	
	$scope.ageGroupFilterLeftPane = function(items) {
		var itemAgeGroupArray = items.ageGroup;
		var itemAgeGroupMap = itemAgeGroupArray.map(function(obj) { 
		  return obj; 
		});
		var isSubsetFlag = ageGroupCheckboxSelected.every(function(val) { 
		  return itemAgeGroupMap.indexOf(val) >= 0;
		});
		if(isSubsetFlag) {
			return items;
		} else {
			return;
		}
	}
	$scope.autoPopulateFormName = function() {				
		if(changeFormName) {
			$scope.formName = selectedRaterName + $scope.getAgeGroupNameSection(ageGroupCheckboxSelected.sort());
		}
	}
	
	$scope.getAgeGroupNameSection = function(selectedAgeGroupIds) {
		var ageGroupNameSection = "";
		angular.forEach(selectedAgeGroupIds, function(id) {
		for(var j = 0; j < $scope.ageGroup.length; j++) {
			if (id ==  $scope.ageGroup[j].identifier) {
				ageGroupNameSection = ageGroupNameSection + " " +  $scope.ageGroup[j].name;
				break;
			}
		}
		});
		return ageGroupNameSection;
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
	
	$scope.toggleFormNameFlag = function() {
		changeFormName = false;
	}
	$scope.callAngularErrorPopup = function(msg) {
		var maskHeight = $(document).height();  
		var maskWidth = $(window).width();			
		// calculate the values for center alignment
		var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());  
		var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);			
		// assign values to the overlay and dialog box		
		$('#errorMessageSection').text(msg);
		$('#error-dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
		$('#error-dialog-box').css({top:dialogTop, left:dialogLeft}).show();
	}
	
});

function callGetService($scope, $http, urlAssessment) {
    $http.get(urlAssessment).success(function(data) {
			//alert(JSON.stringify(data).replace(/\\/g,""));
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
				$scope.autoPopulateFormName();				
			}
			
			if (data.target && data.target.length > 0) {
				//$scope.model = data.target;
			}
			if($scope.testVar && $scope.testVar.length > 0) {
				var urlForEntireJSON = "fetchSavedJson.seam";
				var params = "ID="+$scope.testVar;
				$scope.toggleFormNameFlag();
				callGetForSavedForm($scope, $http, urlForEntireJSON, params);
			} else {
				$scope.viewLoading = false;
				$('#loadingMessage').hide();
			}
			if(data.error) {		
				$scope.errorsWarnings.push(data.error);
				$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");
				$('#errorsWarningsMessageDiv').show();
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
	} else if(data.formExists) {
		$('#errorsWarningsMessageDiv').hide();		
		$scope.viewLoading = false;
		$('#loadingMessage').hide();
		$scope.callAngularErrorPopup($scope.errorMsgFormNameExists);		
	} else {
		$('#errorsWarningsMessageDiv').hide();		
		$scope.viewLoading = false;
		$('#loadingMessage').hide();
	}
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
	if(targetItemsOnRight.length != 0) {
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
	}
	if($scope.formOpenModeVar=="true") {
		$('#saveDraftButton').removeAttr('disabled');
		$scope.formName = "Copy of " + data.formName;
	} else {
		$scope.formName = data.formName.substr(19);
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
			if(formStatus == 'Draft' || formStatus == "" || $scope.formOpenModeVar=="true") {
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
