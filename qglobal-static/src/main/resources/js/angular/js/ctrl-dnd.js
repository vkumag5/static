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

ctrl.controller('dndCtrl', function($window, $scope, $http) {
	$scope.prefixFormName = "";
	$scope.prefixCustomFormName = "BASC-3 Custom Flex";
	$scope.prefixStandardFormName = "BASC-3 Standard Flex";
	$scope.model = [];
	$scope.tagList = tagList;
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
	$scope.previousScoringValue = "";
	$scope.ngMaxItemRestrictCount = maxItemRestrictCount;
	$scope.ngMinItemRestrictCount = minItemRestrictCount;
	$scope.savedFormName = defaultTitleForPage;
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
	$scope.previousSelectedAgeGroupLength = "";
	$scope.prevQuestionsOnRight="";
	$scope.prevRaterValue="";
	$scope.sharableFlag = false;
	$scope.isSavedAndPulishedForm = false;
	disableComputeReliabilityFlag = false; //flag added to disable compute reliability button.	
	$("#searchByCategory").attr('placeholder', searchByScalePlaceholder);
	var ieVersion = getInternetExplorerVersion();
	if(ieVersion >= 6 && ieVersion <= 9){
		// Calls browser incompatibility message pop up.
		callAngularErrorPopup('ie-error-dialog-overlay', 'ie-error-dialog-box');
	} else {
		callGetService($scope, $http, urlForEntireJSON);
	}
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
			} else {
				$("#dragDropMsgDiv").hide();
			}
        }
		//hide Compute reliability section if model is changed after form is loaded.  
		if($('#computeReliabilitySection').is(':visible') && (!disableSaveNPublishFlag||$scope.prevQuestionsOnRight!=""))
		{
			$('#computeReliabilitySection').hide();
			$scope.computeReliabilityResult = "";
		}
		$scope.prevQuestionsOnRight=$scope.questionsOnRight;
		
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
		//hide Compute reliability section if whichRadioSelected is changed after form is loaded.  
		if($('#computeReliabilitySection').is(':visible') && (!disableSaveNPublishFlag||$scope.prevRaterValue!=""))
		{
			$('#computeReliabilitySection').hide();
			$scope.computeReliabilityResult = "";
		}
		$scope.prevRaterValue=$scope.whichRadioSelected;
	},true);
	
	$scope.$watch("ageGroupCheckboxSelected", function(value) {	
		// Watch for ageGroupCheckboxSelected variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.
		valueChangedAfterCR = true;
		//hide Compute reliability section if ageGroupCheckboxSelected is changed after form is loaded.  
		if($('#computeReliabilitySection').is(':visible') && (!disableSaveNPublishFlag||$scope.previousSelectedAgeGroupLength!=0))
		{
			$('#computeReliabilitySection').hide();
			$scope.computeReliabilityResult = "";
		}
		$scope.previousSelectedAgeGroupLength=$scope.ageGroupCheckboxSelected.length;
	},true);
	
	$scope.$watch("whichScoringRadioSelected", function(value) {	
		// Watch for whichScoringRadioSelected variable and change the valueChangedAfterCR to identify whether
		// any value is changed after compute reliability.		
		valueChangedAfterCR = true;
		//hide Compute reliability section if whichScoringRadioSelected is changed after form is loaded.  
		if($('#computeReliabilitySection').is(':visible') && (!disableSaveNPublishFlag||$scope.previousScoringValue!=""))
		{
			$('#computeReliabilitySection').hide();
			$scope.computeReliabilityResult = "";
		}
		$scope.previousScoringValue=$scope.whichScoringRadioSelected;
	},true);
	
	$scope.getItems = function() {
		return $scope.tagList;
	}
	
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
			"selectedRater" : $scope.whichRadioSelected,
			"selectedAgeGroup" : $scope.prepareJSONToSave($scope.ageGroupCheckboxSelected),
			"sharableFlag" : $scope.sharableFlag,
			"scoringRadioValue" : $scope.whichScoringRadioSelected,
			"reliabilityVariablesJSON" : JSON.stringify(reliabilityVariablesJSON),
			"ageGroup" : $scope.ageGroupCheckboxSelected.toString(),
			"selectedRaterName" : selectedRaterName
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
		var paramsObj = {
			"flexFormFavouritesList" : $scope.prepareJSONToSave(favourites)
		};
		var params = $.param(paramsObj);
		var saveFavoritesServiceURL = "sendFlexFormFavoritesForSave.seam";
		$('#loadingMessage').show();
		callSaveFavoritesService($scope, $http, saveFavoritesServiceURL, params);
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
		ageGroupId = flexFormRaterAgeGroupHandler.getOriginalAgeGroupIdBasedOnRater(ageGroupId, $scope.whichRadioSelected);
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
		val = flexFormRaterAgeGroupHandler.getOriginalAgeGroupIdBasedOnRater(val, $scope.whichRadioSelected);
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
			$scope.formName = selectedRaterName + FlexFormBuilderUtil.getAgeGroupRelatedName($scope.ageGroupCheckboxSelected.sort(), $scope.ageGroup, $scope.whichRadioSelected);
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
		jsonDataForComputeReliability = {};		
		if(rightColumnIds.length>0) {
			for(var i=0; i < rightColumnIds.length; i++) {
				jsonDataForComputeReliability[rightColumnIds[i]] = "1";
			}					
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

	$scope.isSaveDraftDisabled = function() {
		if (FlexFormBuilderUtil.isFormNamePresent($scope.formName)) {
			if (disableSaveDraftFlag) {
				return true;
			} else if($scope.questionsOnRight < $scope.ngMinItemRestrictCount) {
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
				return true;
			}
			return false;
		}
		return true;
	};
	
	$scope.isComputeReliabilityButtonDisabled = function() {
		if($scope.questionsOnRight < $scope.ngMinItemRestrictCount) {
			return true;
		} else {
			if(disableComputeReliabilityFlag) {
				return true;
			} else {
				if($scope.ageGroupCheckboxSelected.length==0 || $scope.whichScoringRadioSelected == "") {
					return true;
				}
				return false;
			}
			return false;
		}		
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
	
	$scope.isAgeGroupDisabled = function(identifier) {
		if(identifier.toLowerCase() === flexFormRaterAgeGroupHandler.ageGroupIdsJson.psId) {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.getAgeGroupCssStyle = function(identifier) {
		if(identifier.toLowerCase() === flexFormRaterAgeGroupHandler.ageGroupIdsJson.psId) {
			return {"color" : "#A3A3A3"
			};
		} else {
			return;
		}
	};
	
	$scope.sortAgeGroupByOrder = function(ageGroupJsonArray){
		var sortedAgeGroupJsonArray = [];		
		for(var i = 0; i<flexFormRaterAgeGroupHandler.ageGroupSortOrder.length; i++) {
			angular.forEach(ageGroupJsonArray, function(ageGroup){
				if((ageGroup.identifier).toLowerCase() === flexFormRaterAgeGroupHandler.ageGroupSortOrder[i]) {
					sortedAgeGroupJsonArray.push(ageGroup);
				}
			});
		}		
		return sortedAgeGroupJsonArray;
	};
	
	$scope.disableDragAndDrop = function() {
		$('#targetList').sortable( "disable" );
		$('#sourceList').sortable( "disable" );
	};
	
	$scope.enableDragAndDrop = function() {
		$('#targetList').sortable( "enable" );
		$('#sourceList').sortable( "enable" );
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
				for (var i = 0; i < ($scope.source).length; i++) {      
					if(($scope.source)[i].tags){
						for (var j = 0; j < (($scope.source)[i].tags).length; j++) {
							if ($scope.tagList.indexOf((($scope.source)[i].tags)[j]) == -1) {
								$scope.tagList.push((($scope.source)[i].tags)[j]);
							}
						}
					}
				}
				// we are sorting the ageGroup json array coming from IBAAS in order of increasing age group values, so that age group can be populated sequentially on UI.
				$scope.ageGroup = $scope.sortAgeGroupByOrder($scope.ageGroup);
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
			createCopyOfOrignalFormValues($scope);
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
		$('#errorsWarningsMessageDiv').hide();		
		$scope.viewLoading = false;
		$('#loadingMessage').hide();
		callAngularErrorPopup('error-dialog-overlay', 'error-dialog-box');
	} else {
		$scope.errorsWarnings.push(data.response.message);
		$scope.testVar = data.response.formId;
		$("#errorsWarningsMessageDiv").addClass("errorsWarningsMessageDivSuccess");
		$('#errorsWarningsMessageDiv').show();
		if (saveOptionFlag == 'yes') {
			disableSaveNPublishFlag = true;
			disableSaveDraftFlag = true;
			disableComputeReliabilityFlag = true;
			$scope.isSavedAndPulishedForm = true;
			$scope.disableDragAndDrop();
		}
		createCopyOfOrignalFormValues($scope);
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
	$scope.savedFormName = data.formName;
	var rightItems = [];
	var leftItems = [];
	var targetItemsOnRight = [];
	formStatus = data.formStatus;
	$scope.whichRadioSelected = data.selectedRater;
	$scope.whichScoringRadioSelected = (data.scoringValue);
	$scope.ageGroupCheckboxSelected = data.rightItem.ageGroup;
	angular.forEach($scope.rater, function(raterObject) {
		if(raterObject.identifier === data.selectedRater) {
			selectedRaterName = raterObject.name;
		}
	});
	if(data.alphaVariables) {
		reliabilityVariablesJSON["reliability"] = JSON.parse(data.alphaVariables).reliability;			
		reliabilityVariablesJSON["sasResponse"] = JSON.parse(data.alphaVariables).sasResponse;
	}	
	if (formStatus != 'Draft') {
		disableSaveNPublishFlag = true;
		disableSaveDraftFlag = true;
		disableComputeReliabilityFlag = true;
		$('#computeReliabilitySection').show();
		$scope.isSavedAndPulishedForm = true;
		$scope.disableDragAndDrop();
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
		$scope.isSavedAndPulishedForm = false;
		$scope.enableDragAndDrop();
	}
	if(String.fromCharCode(data.isGlobal) == 'Y') {
		$scope.prefixFormNameHandler($scope.prefixStandardFormName, $scope.prefixStandardFormName, tempFormName);
		if(($scope.formOpenModeVar === "true")) {
			$scope.prefixFormNameHandler($scope.prefixCustomFormName, $scope.prefixStandardFormName, data.formName);
		}
	} else {
		$scope.prefixFormNameHandler($scope.prefixCustomFormName, $scope.prefixCustomFormName, tempFormName);		
	}
	$scope.viewLoading = false;
	$('#loadingMessage').hide();
	createCopyOfOrignalFormValues($scope);
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
function callSaveFavoritesService($scope, $http, saveFavoritesServiceURL, params) {
    $http({
    method: 'POST',
    url: saveFavoritesServiceURL,
    data: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data) {	
		$('#loadingMessage').hide();
	
});
}

// This is a generic method which takes overlayId and dialogBoxId, and uses them to show
// different pop ups created for flex form builder page.
function callAngularErrorPopup(overlayId, dialogBoxId) {
		// popup section.
		var maskHeight = $(document).height();  
		var maskWidth = $(window).width();			
		// calculate the values for center alignment
		var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());  
		var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);			
		// assign values to the overlay and dialog box		
		$('#' + overlayId).css({height:maskHeight, width:maskWidth}).show();
		$('#' + dialogBoxId).css({top:dialogTop, left:dialogLeft}).show();
		// popup section ends
}

// Returns the version of Internet Explorer or a -1
// indicating the use of another browser.
function getInternetExplorerVersion() {
  var rv = -1; // This return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer'){
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
