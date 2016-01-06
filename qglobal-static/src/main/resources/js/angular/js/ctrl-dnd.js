var ctrl = angular.module('dndCtrls', []);
var value;
var postUrl;
var favourites=[];
var notFavourites=[];
var leftColumnIds=[];
var rightColumnIds=[];
var originalJSON = [];
var tagList = [];
var favFlag = false;
var jsonDataForComputeReliability = {};
var formStatus = "";
var flexFormRaterAgeGroupHandler = new FlexFormRaterAgeGroupHandler();
var changeFormName = true;
var selectedRaterName = "";
var valueChangedAfterCR = false;
var reliabilityVariablesJSON = {};
var isStandardFlexForm = false;
ctrl.controller('dndCtrl', function($window, $scope, $http) {
	$scope.prefixFormName = "";
	$scope.prefixCustomFormName = "BASC-3 Custom Flex";
	$scope.prefixStandardFormName = "BASC-3 Standard Flex";
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
	$scope.whichScoringRadioSelected = "";
	$scope.ngMaxItemRestrictCount = maxItemRestrictCount;
	$scope.ngMinItemRestrictCount = minItemRestrictCount;
	$('#loadingMessage').show();
	$('#errorsWarningsMessageDiv').hide();
	$scope.errorsWarnings=[];
	var urlForEntireJSON = "fetchAllDetailsJson.seam";
	$scope.viewLoading = true;
	disableSaveNPublishFlag = true;
	disableSaveDraftFlag = false;
	$scope.formOpenModeVar = formOpenMode;	
	$scope.whichRadioSelected = "";
	$scope.ageGroupCheckboxSelected = [];
	$scope.sharableFlag = false;
	disableComputeReliabilityFlag = false; //flag added to disable compute reliability button.	
	$(searchByCategory).attr('placeholder', searchByScalePlaceholder);
	
	callGetService($scope, $http, urlForEntireJSON);		

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	//modified to show 'Compute Reliability' button as active when minimum 5 questions will be on right window pane.
    //and dotted div will be visible only when no question will be on right window pane.
	$scope.$watch("model", function(value) {
		rightColumnIds = [];
		if (value) {
			console.log("Model: " + value.map(function(e){rightColumnIds.push(e.itemId); return e.ageGroup}).join(','));			
			$scope.questionsOnRight = rightColumnIds.length;
			 
			if ($scope.questionsOnRight == 0) {
				$("#dragDropMsgDiv").show();
				$("#computeReliability").attr("disabled", "disabled");
			} else {
				$("#dragDropMsgDiv").hide();
				  
				if ($scope.questionsOnRight < $scope.ngMinItemRestrictCount) {
					  $("#computeReliability").attr("disabled", "disabled");
				} else {
					  if(($scope.whichScoringRadioSelected != "") && (!disableComputeReliabilityFlag)) {
						$("#computeReliability").removeAttr("disabled");
					  }
				}
			}
        }
		// Watch for model variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.
		valueChangedAfterCR = true;
	},true);

	// watch, use 'true' to also receive updates when values
	// change, instead of just the reference
	$scope.$watch("source", function(value) {	
		leftColumnIds = [];
		if (value) {
			console.log("Source: " + value.map(function(e){leftColumnIds.push(e.itemId); return e.itemId}).join(','));
			
		}
		
	},true);
	
	$scope.$watch("whichRadioSelected", function(value) {
		// Watch for whichRadioSelected variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.
		valueChangedAfterCR = true;
	},true);
	
	$scope.$watch("ageGroupCheckboxSelected", function(value) {	
		// Watch for ageGroupCheckboxSelected variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.
		valueChangedAfterCR = true;
	},true);
	
	$scope.$watch("whichScoringRadioSelected", function(value) {	
		// Watch for whichScoringRadioSelected variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.
		if ($scope.questionsOnRight < $scope.ngMinItemRestrictCount) {
					  $("#computeReliability").attr("disabled", "disabled");
		} else {
				if((value != "") && (!disableComputeReliabilityFlag)) {
					  $("#computeReliability").removeAttr("disabled");
				}
				else {
				$("#computeReliability").attr("disabled","disabled");
				}
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
		var paramsObj = {
			"target" : $scope.prepareJSONToSave(rightColumnIds),
			"formName" : $scope.prefixFormName + " " + $scope.formName,
			"saveOption" : flag,
			"flexFormItemsIdList" : JSON.stringify(jsonDataForComputeReliability),
			"flexFormItemsFavouritesList" : $scope.prepareJSONToSave(favourites),
			"selectedRater" : $scope.whichRadioSelected,
			"selectedAgeGroup" : $scope.prepareJSONToSave($scope.ageGroupCheckboxSelected),
			"sharableFlag" : $scope.sharableFlag,
			"scoringRadioValue" : $scope.whichScoringRadioSelected,
			"reliabilityVariablesJSON" : JSON.stringify(reliabilityVariablesJSON)
		};
		if($scope.testVar != 0) {		
			$.extend(paramsObj, { "formId" : $scope.testVar });
		}
		var params = $.param(paramsObj);		
		var postUrl = "sendJSONDataToSave.seam";
		
		callPostService($window, $scope, $http, postUrl, params, flag);		
	}
	
	$scope.toggleStarImage = function($event) {
		var elem = $event.target;
		console.log('clicked row', elem);
		var str = elem.src;
		var thumbnail = str.replace(str.substring(0, str.indexOf("star")), "");
		if (thumbnail === "star.png") {
			elem.src = elem.src.replace(thumbnail, "star_blank.png");
			notFavourites.push(elem.id);
			favourites.splice(favourites.indexOf(elem.id), 1);
		} else if (thumbnail === "star_blank.png") {
			elem.src = elem.src.replace(thumbnail, "star.png");
			favourites.push(elem.id);
			notFavourites.splice(notFavourites.indexOf(elem.id), 1);
		}
		console.log(favourites);
		$event.preventDefault();
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
	
	$scope.returnTagNames = function(tagsList) {
		if(tagsList){
			return tagsList.join(", ");
		} else {
			return;
		}
	}
	
	$scope.showThumbnailImage = function(idToCheck) {
		if(favourites.indexOf(idToCheck) > -1) {
			return "static/images/star.png";
		} else {
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
		$scope.whichRadioSelected = raterItem.identifier;
		selectedRaterName = raterItem.name;
		$scope.ageGroupCheckboxSelected = [];
		$scope.autoPopulateFormName();
	}
	
	 $scope.ifScoringRadioChecked = function(scoringValue) {
		$scope.whichScoringRadioSelected = scoringValue;		
	}
	
	$scope.ifScoringValueChecked = function(scoringValue) {
		if($scope.whichScoringRadioSelected == scoringValue) {
			return true;
		} else {
			return false;
        }		
	}
	
	
	$scope.isAgeGroupChecked = function(ageGroupId) {
		if ($.inArray(ageGroupId, $scope.ageGroupCheckboxSelected) >= 0) {
			return true;
		}	
		return false;
	};
	
	$scope.isRaterSelected = function(raterId) {
		if (raterId == $scope.whichRadioSelected) {
			return true;
		}
		return false;
	};
	
	$scope.whichAgeGroupSelected = function(val){
		if ($.inArray(val, $scope.ageGroupCheckboxSelected)>=0){
			$scope.ageGroupCheckboxSelected.splice($scope.ageGroupCheckboxSelected.indexOf(val),1);
		}
		else {
			$scope.ageGroupCheckboxSelected.push(val);
		}
		$scope.autoPopulateFormName();
	}
	
	$scope.checkFavouriteFilter = function(items) {
		if(favFlag) {
			if ($.inArray(items.itemId, favourites) >= 0) {
				return items;
			} else {
				return;
			}
		} else {
			return items;
		}
	}
	
	$scope.raterFilterLeftPane = function(items){
		if($scope.whichRadioSelected != "") {
		if ($.inArray($scope.whichRadioSelected, items.category)>=0){
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
	
	$scope.raterFilterRightPane = function(items){
		if($scope.whichRadioSelected != "") {
		if ($.inArray($scope.whichRadioSelected, items.category)>=0){
			return items;
		}
		else{
			$scope.source.push(items);
			$scope.model.splice($scope.model.indexOf(items),1);
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
		var isSubsetFlag = $scope.ageGroupCheckboxSelected.every(function(val) {
			var ageGroupIDToCheck = val.toLowerCase();
		  return itemAgeGroupMap.indexOf(ageGroupIDToCheck) >= 0;
		});
		if(isSubsetFlag) {
			return items;
		} else {
			return;
		}
	}
	
	$scope.ageGroupFilterRightPane = function(items) {
		var itemAgeGroupArray = items.ageGroup;
		var itemAgeGroupMap = itemAgeGroupArray.map(function(obj) { 
		  return obj; 
		});	
		var isSubsetFlag = $scope.ageGroupCheckboxSelected.every(function(val) { 
		  var ageGroupIDToCheck = val.toLowerCase();
		  return itemAgeGroupMap.indexOf(ageGroupIDToCheck) >= 0;
		});
		if(isSubsetFlag) {
			return items;
		} else {			
			$scope.source.push(items);
			$scope.model.splice($scope.model.indexOf(items),1);
			return;
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
	
	$scope.ageGroupBasedOnRaterFilter = function(ageGroupVal) {		
		var ageGroupIdListBasedOnRater = flexFormRaterAgeGroupHandler.getAgeGroupIdListBasedOnRater(originalJSON, $scope.whichRadioSelected);			
		if ($.inArray(ageGroupVal.identifier.toLowerCase(), ageGroupIdListBasedOnRater) > -1) {			
			return ageGroupVal;
		} else {			
			return;
		}
	}
	
	$scope.autoPopulateFormName = function() {
		if(changeFormName) {
			$scope.formName = selectedRaterName + FlexFormBuilderUtil.getAgeGroupRelatedName($scope.ageGroupCheckboxSelected.sort(), $scope.ageGroup);
		}
	}	
	
	$scope.updateCallback = function(uiItem, eventTarget) {
		if (eventTarget.id == 'sourceList' && uiItem[0].parentNode.id == 'targetList'
			&& $scope.questionsOnRight >= $scope.ngMaxItemRestrictCount) {
			$('#sourceList').sortable('cancel');
		}
	}
	
	$scope.computeReliability = function() {
		$('#loadingMessage').show();		
		if(rightColumnIds.length>0) {
			for(var i=0; i < rightColumnIds.length; i++) {
				jsonDataForComputeReliability[rightColumnIds[i]] = "1";
			}
			jsonDataForComputeReliability["program_call"] = "5";
			jsonDataForComputeReliability["norm_country"] = "US";			
			jsonDataForComputeReliability["basc3_flex_formtype"] = $scope.whichRadioSelected;
			jsonDataForComputeReliability["basc3_flex_agegrp"] = $scope.ageGroupCheckboxSelected.toString();
			jsonDataForComputeReliability["basc3_flex_direction"] = $scope.whichScoringRadioSelected;	
		}

		var paramsObj = {
			"flexFormItemsIdList" : JSON.stringify(jsonDataForComputeReliability),
			"ageGroup" : $scope.ageGroupCheckboxSelected.toString(),
			"selectedRaterName" : selectedRaterName
		};
		var params = $.param(paramsObj);
		var computeReliabilityServiceURL = "sendFlexFormItemsForValidation.seam";
		callComputeValidationService($scope, $http, computeReliabilityServiceURL, params);
	}
	
	$scope.toggleFormNameFlag = function() {
		changeFormName = false;
	}
	$scope.callAngularErrorPopup = function() {
		var maskHeight = $(document).height();  
		var maskWidth = $(window).width();			
		// calculate the values for center alignment
		var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());  
		var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);			
		// assign values to the overlay and dialog box		
		$('#error-dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
		$('#error-dialog-box').css({top:dialogTop, left:dialogLeft}).show();
	}
	

	$scope.isSaveDraftDisabled = function() {
		if (FlexFormBuilderUtil.isFormNamePresent($scope.formName)) {
			if (disableSaveDraftFlag) {
				return true;
			}
			return false;
		}
		return true;
	};

	$scope.isSaveNPublishDisabled = function() {
		if (FlexFormBuilderUtil.isFormNamePresent($scope.formName)) {
			if (disableSaveNPublishFlag) {
				return true;
			} else if (valueChangedAfterCR) {
				$scope.computeReliabilityResult = "";
				$('#computeReliabilitySection').hide();
				return true;
			}
			return false;
		}
		return true;
	};
	
	$scope.isSharableFlagChecked = function() {
		if ($scope.sharableFlag == true) {
			return true;
		}
		return false;
	};
	
	$scope.setSharableFlagCheckedOnClick = function() {
		$scope.sharableFlag = !$scope.sharableFlag;
	};
	
	$scope.getAlphaVariable = function(id) {
		if(reliabilityVariablesJSON.reliability) {
			if(reliabilityVariablesJSON.reliability[id] != "") {	
				return reliabilityVariablesJSON.reliability[id];
			} else {
				return "-";
			}
		} else {
		  return "-";
		}		
	};
	
	$scope.prefixFormNameHandler = function(textToPrefix, textToSubstr, tempFormName) {
		$scope.prefixFormName = textToPrefix;
		$scope.formName = tempFormName.substr(textToSubstr.length + 1);
	};
	
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
				var studentRater = flexFormRaterAgeGroupHandler.getStudentRater($scope.rater);
				$scope.whichRadioSelected = studentRater.identifier;
				selectedRaterName = studentRater.name;
				$scope.prefixFormName = $scope.prefixCustomFormName;
				$scope.autoPopulateFormName();	
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

function callPostService($window, $scope, $http, postUrl, params, saveOptionFlag) {
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
		$('#loadingMessage').hide();
		$scope.callAngularErrorPopup($scope.errorMsgFormNameExists);		
		$('#errorsWarningsMessageDiv').hide();		
		$scope.viewLoading = false;
		$('#loadingMessage').hide();
		$scope.callAngularErrorPopup();		
	} else {
		$scope.errorsWarnings.push(data.response.message);
		$scope.testVar = data.response.formId;
		$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivSuccess");
		$('#errorsWarningsMessageDiv').show();
		if (saveOptionFlag == 'yes') {
			disableSaveNPublishFlag = true;
			disableSaveDraftFlag = true;
			disableComputeReliabilityFlag = true;
			$("#computeReliability").attr("disabled", "disabled");
		}
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
	$scope.whichRadioSelected = data.selectedRater;
	$scope.whichScoringRadioSelected = (data.scoringValue);
	$scope.ageGroupCheckboxSelected = data.rightItem.ageGroup;
	if(data.alphaVariables) {
		reliabilityVariablesJSON["reliability"] = JSON.parse(data.alphaVariables).reliability;			
		reliabilityVariablesJSON["sasResponse"] = JSON.parse(data.alphaVariables).sasResponse;
	}	
	if (formStatus != 'Draft') {
		disableSaveNPublishFlag = true;
		disableSaveDraftFlag = true;
		disableComputeReliabilityFlag = true;
		$('#computeReliabilitySection').show();
	}
	targetItemsOnRight = data.rightItem.items;
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
	
	$scope.sharableFlag = data.sharableFlag;
	
	// Add copy string if Create a copy is selected.
	var tempFormName = data.formName;
	if($scope.formOpenModeVar === "true") {
		disableSaveDraftFlag = false;
		disableComputeReliabilityFlag = false;
		tempFormName = FlexFormBuilderUtil.getFormNameOfCopy(data.formName);
	}
	if(String.fromCharCode(data.isGlobal) == 'Y') {
		isStandardFlexForm = true;
		$scope.prefixFormNameHandler($scope.prefixStandardFormName, $scope.prefixStandardFormName, tempFormName);
		if((isStandardFlexForm) && ($scope.formOpenModeVar === "true")) {
			$scope.prefixFormNameHandler($scope.prefixCustomFormName, $scope.prefixStandardFormName, data.formName);
		}
	} else {
		$scope.prefixFormNameHandler($scope.prefixCustomFormName, $scope.prefixCustomFormName, tempFormName);		
	}	
	$scope.viewLoading = false;
	$('#loadingMessage').hide();

});	
}

ctrl.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {      
	  var tagsString = "";
	  if(items[i].tags){
	    tagsString = items[i].tags.join(", ");
	  }	  
      if (letterMatch.test(tagsString.substring(0, tagsString.length))) {
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
	$('#errorsWarningsMessageDiv').hide();
	$scope.errorsWarnings = [];
	reliabilityVariablesJSON = {};
	if(data.error) {
		$scope.errorsWarnings.push(data.error);
		$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");
		$('#errorsWarningsMessageDiv').show();
		$('#loadingMessage').hide();	
	} else {
		if(data.response.validationStatus.toLowerCase() == "success") {
			reliabilityVariablesJSON["reliability"] = data.response.reliability;			
			reliabilityVariablesJSON["sasResponse"] = data.response.sasResponse;			
			if (formStatus == 'Draft' || formStatus == "" || $scope.formOpenModeVar=="true") {
				disableSaveNPublishFlag = false;
			}
			$scope.computeReliabilityResult = data.response.validationStatus;
			$('#computeReliabilitySection').show();
			valueChangedAfterCR = false;
		} else {
			$scope.errorsWarnings.push(data.response.validationStatus);
			$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivError");
			$('#errorsWarningsMessageDiv').show();			
		}
		$('#loadingMessage').hide();		
	}	
	
});
}