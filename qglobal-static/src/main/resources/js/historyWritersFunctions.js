var formValues = []; //array to store every changed value, most often a select, text, or check box.
var refFormValues = []; //array to store every changed value, most often a select, text, or check box.

var personalStrengthSelections = new Array(); //array to store selected personal strengths.
var personalWeaknessesSelections = []; //array to store selected personal weaknesses.
var peersStrengthSelections = []; //array to store selected peers strengths.
var peersWeaknessSelections = []; //array to store selected peers weaknesses.
var learningDisordersSelections = []; //array to store selected learning disorders.

var secondaryEducationValues = ["1-3 years college/technical school", 
								"vocational/certificate program", 
								"2-year college program", 
								"4-year college program", 
								"graduate school", 
								"masters program", 
								"doctoral program", 
								"other"];

var jobsWithPositionTitle = ["employed full-time", 
							 "employed part-time", 
							 "retired but working part-time", 
							 "retired but working full-time", 
							 "serving full-time in the military", 
							 "serving part-time in the military", 
							 "other"];

var othersCheckboxArray = ["Birth_Other", 
							 "Milestones_Other",
							 "StrengthPersonal_Other",
							 "WeaknessPersonal_Other",
							 "StrengthCompPeers_Other",
							 "WeaknessCompPeers_Other",
							 "VisionScreenResult_Other",
							 "HearingScreenResult_Other",
							 "Sensory_Other"];

var multiOthersCheckboxArray = [["Motor_OtherFM","strMotor_OtherFM"], 
                                ["Motor_OtherGM","strMotor_OtherGM"],
                                ["LearningDis_Other1","strLearningDis_Other1"],
                                ["LearningDis_Other2","strLearningDis_Other2"],
                                ["LearningDis_Other3","strLearningDis_Other3"]];

var medCndOthersCheckboxArray = ["MedConditionPast_Other",
                                 "MedConditionCurrent_Other",                                 
                                 "PsyConditionPast_Other",
                                 "PsyConditionCurrent_Other",
                                 "NeuroConditionPast_Other",
                                 "NeuroConditionCurrent_Other",
                                 "OtherConditionPast_Other",
                                 "OtherConditionCurrent_Other"];

var otherRowNameForMeds = "other";

var dropDownNoSelectionValue = "org.jboss.seam.ui.NoSelectionConverter.noSelectionValue";

function manageLoopedChkBoxRelatedOtherField(node, focus, relatedOtherField, otherChkBoxId, relatedOtherLblWrp) { //determines whether related other field should be enabled
	//console.log("...................................... relatedOtherField .. otherChkBoxId .. relatedOtherLblWrp : " + relatedOtherField + " ... " + otherChkBoxId + " ... " + relatedOtherLblWrp);
	var nodeSelected = false;
	if (othersCheckboxArray.indexOf(node.id) > -1) {
		if (node.checked) {
			nodeSelected = true;
		}
	}
	if (nodeSelected) {
		
		if (dijit.byId(relatedOtherField)) {
			//dojo.removeClass(dijit.byId(relatedOtherField), "hide");
			dijit.byId(relatedOtherField).attr("required", true);		
		}
//		dojo.byId(relatedOtherField).disabled = false;
		if (relatedOtherLblWrp) {
			dojo.removeClass(dojo.byId(relatedOtherLblWrp), "hide");
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
//		if (!dojo.byId(otherChkBoxId).checked) {
//			dojo.byId(relatedOtherField).disabled = true;
//			dojo.byId(relatedOtherField).value = "";
//		}
		if (!dojo.byId(otherChkBoxId).checked) {
			dojo.byId(relatedOtherField).value = "";

			if (dijit.byId(relatedOtherField)) {
				//dojo.addClass(dijit.byId(relatedOtherField), "hide");
				dijit.byId(relatedOtherField).attr("required", false);	
				dijit.byId(relatedOtherField).reset();
			}
			
			if (relatedOtherLblWrp) {
				dojo.addClass(dojo.byId(relatedOtherLblWrp), "hide");
			}
		}		
	}
}

function manageRelatedRadioOptions(node, relatedRadioField) { //determines whether related other field should be enabled

	queryString = '[name^="' + relatedRadioField + '"]';
	optionSelected = false;
	defaultOptionId = null;
	if (node.checked) {
		dojo.query(queryString).forEach(function(node) {
			node.disabled = false;
			if (node.checked) {
				optionSelected = true;
			}
			if (node.value == 0) {
				defaultOptionId = dojo.attr(node, 'id');
			}
		});
		if (!optionSelected && defaultOptionId != null) {
			dojo.byId(defaultOptionId).checked = true;
		}
	} else {
		dojo.query(queryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
	}
}

function manageChkBoxMultiRelatedOtherField(node, focus) { 
	var relatedOtherField; 
	for( var i = 0, len = multiOthersCheckboxArray.length; i < len; i++ ) {
	    if( multiOthersCheckboxArray[i][0] === node.id ) {
	    	relatedOtherField = multiOthersCheckboxArray[i][1];
	    	relatedOtherLblWrp = relatedOtherField + "Wrp";
	    	relatedOtherlBLWrpNode = dojo.byId(relatedOtherLblWrp);
			if (node.checked) {
				//dojo.byId(relatedOtherField).disabled = false;
				if (dijit.byId(relatedOtherField)) {
					//dojo.removeClass(dijit.byId(relatedOtherField), "hide");
					dijit.byId(relatedOtherField).attr("required", true);		
				}
//				dojo.byId(relatedOtherField).disabled = false;
				if (relatedOtherlBLWrpNode) {
					dojo.removeClass(relatedOtherlBLWrpNode, "hide");
				}
				if (focus) {
					dojo.byId(relatedOtherField).focus();
				}
			} else {
				dojo.byId(relatedOtherField).value = "";
				if (dijit.byId(relatedOtherField)) {
					//dojo.addClass(dijit.byId(relatedOtherField), "hide");
					dijit.byId(relatedOtherField).attr("required", false);
					dijit.byId(relatedOtherField).reset();
				}
				if (relatedOtherlBLWrpNode) {
					dojo.addClass(relatedOtherlBLWrpNode, "hide");
				}
//				dojo.byId(relatedOtherField).disabled = true;
//				dojo.byId(relatedOtherField).value = "";
			}
	        break;
	    }
	}
}

function manageChkBoxRelatedOtherField(node, focus, relatedOtherField, relatedOtherLbl) { //determines whether related other field should be enabled

	var nodeSelected = false;
	if (node.value == 77) {
		nodeSelected = true;
	}	
	
	if (nodeSelected) {
//		console.log("manageChkBoxRelatedOtherField ..................... nodeSelected");
//		dijit.byId(relatedOtherField).required = true;
		if (dijit.byId(relatedOtherField)) {
//			console.log("manageChkBoxRelatedOtherField ..................... relatedOtherField : " + relatedOtherField);
			//dojo.removeClass(dijit.byId(relatedOtherField), "hide");
			dijit.byId(relatedOtherField).attr("required", true);		
		}
//		console.log("manageChkBoxRelatedOtherField .................. relatedOtherLbl : " + relatedOtherLbl);
		if (relatedOtherLbl) {
			dojo.removeClass(dojo.byId(relatedOtherLbl), "hide");
//			console.log("manageChkBoxRelatedOtherField ..................removed hide class from relatedOtherLbl : " + relatedOtherLbl);
		}
		//dojo.byId(relatedOtherField).disabled = false;
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
//		console.log("manageChkBoxRelatedOtherField ..................... node not Selected");
		dojo.byId(relatedOtherField).value = "";
//		dijit.byId(relatedOtherField).required = false;
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).attr("required", false);
			dijit.byId(relatedOtherField).reset();
			//dojo.addClass(dijit.byId(relatedOtherField), "hide");
		}
		if (relatedOtherLbl) {
			dojo.addClass(dojo.byId(relatedOtherLbl), "hide");
		}
//		dojo.byId(relatedOtherField).disabled = true;
	}
}

function manageLoopRadioSelections(node, focus, relatedOtherField, isOther, relatedOtherFldWrp) {
	if (isOther) {
		var nodeName = dojo.attr(node, 'name');
		if (nodeName != null) {
			var nameAttribute = "[name=" + nodeName + "]";
		} else {
			var nameAttribute = "[name=" + dojo.attr(node, 'id') + "]";
		}

		//assume the field will be hidden
		if (relatedOtherFldWrp) {
			dojo.addClass(dojo.byId(relatedOtherFldWrp), "hide");
		}
		if (dijit.byId(relatedOtherField)) {
			//dojo.addClass(dojo.byId(relatedOtherField), "hide");
			dijit.byId(relatedOtherField).attr("required", false);
			//dijit.byId(relatedOtherField).reset();
		}
		//dojo.byId(relatedOtherField).disabled = true;
		var foundCheckedValue = false;
		//dojo.byId(relatedOtherField).value = "";

		dojo.query(nameAttribute).filter(function(radio){
			if (radio.checked) {
				//selection was made on 'other' field
				if (dijit.byId(relatedOtherField)) {
					//dojo.removeClass(dojo.byId(relatedOtherField), "hide");
					dijit.byId(relatedOtherField).attr("required", true);		
				}
				if (relatedOtherFldWrp) {
					dojo.removeClass(dojo.byId(relatedOtherFldWrp), "hide");
				}
				//dojo.byId(relatedOtherField).disabled = false;
				foundCheckedValue = true;
				if (focus) {
					dojo.byId(relatedOtherField).focus();
				}
			} 
		});
		if (!foundCheckedValue) {
			dojo.byId(relatedOtherField).value = "";
			dijit.byId(relatedOtherField).reset();
		}
	}
	
}

function initializeLoopRadioSelections(node, relatedOtherField, relatedOtherWrpLbl, zeroBased) {
	var nodeName = dojo.attr(node, 'name');
	if (nodeName != null) {
		var nameAttribute = "[name=" + nodeName + "]";
	} else {
		var nameAttribute = "[name=" + dojo.attr(node, 'id') + "]";
	}
	dojo.query(nameAttribute).filter(function(radio){
		if (radio.checked) {
			if (zeroBased) {
				manageChkBoxRelatedOtherFieldZeroBased(radio, false, relatedOtherField, relatedOtherWrpLbl);
			} else {
				manageChkBoxRelatedOtherField(radio, false, relatedOtherField, relatedOtherWrpLbl);			
			}
		} 
	});
	
}

function checkIfEducationCompletionRequired(node, completeChkBoxId) {
//	console.log("checkIfEducationCompletionRequired ...............................");
	var nameAttribute = "select[name=" + dojo.attr(node, 'name') + "]";
	var length = dojo.query(nameAttribute)[0].options.length;
	var options = dojo.query(nameAttribute)[0];
	for (var i = 0; i  < length; i++) {
		if (options[i].selected) {
			if (secondaryEducationValues.indexOf(options[i].text) > -1) {
//				console.log("checkIfEducationCompletionRequired ....................... found in secondaryEducationValues");
				dojo.byId(completeChkBoxId).disabled = false;
				//dojo.byId(completeChkBoxId).focus();
			}
			else {
				dojo.byId(completeChkBoxId).disabled = true;
				dojo.byId(completeChkBoxId).checked = false;
			}
			break;
		}
	}
}

function checkIfPositionTitleRequired(node, positionTextId, rltPosLblWrp) {
	var nameAttribute = "select[name=" + dojo.attr(node, 'name') + "]";
	var length = dojo.query(nameAttribute)[0].options.length;
	var options = dojo.query(nameAttribute)[0];
	for (var i = 0; i  < length; i++) {
		if (options[i].selected) {
			if (jobsWithPositionTitle.indexOf(options[i].text) > -1) {
				if (dijit.byId(positionTextId)) {
					dijit.byId(positionTextId).attr("required", true);		
				}
				if (rltPosLblWrp) {
					dojo.removeClass(dojo.byId(rltPosLblWrp), "hide");
				}
			}
			else {
				if (dijit.byId(positionTextId)) {
					dijit.byId(positionTextId).value = "";
					dijit.byId(positionTextId).attr("required", false);
					dijit.byId(positionTextId).reset();
				}
				if (rltPosLblWrp) {
					dojo.addClass(dojo.byId(rltPosLblWrp), "hide");
				}
			}
			break;
		}
	}
	
}

function setCorrespondingHealthCheckBox(node, checkBoxId, noMedCndId, unknownMedCndId, otherId, otherTextId, otherWrpId, relatedNodeId) {
	if (node.checked) {
		dojo.byId(checkBoxId).disabled = false;
		dojo.byId(noMedCndId).disabled = true;
		dojo.byId(unknownMedCndId).disabled = true;
		if (medCndOthersCheckboxArray.indexOf(otherId) > -1) {
//			console.log("............................................ relatedNodeId : " + relatedNodeId);
//			console.log("............................................ relatedNodeId.checked : " + dojo.byId(relatedNodeId).checked);
			if (!dojo.byId(relatedNodeId).checked) {
//				console.log("............................................ relatedNodeId not checked");
				if (dijit.byId(otherTextId)) {
					dijit.byId(otherTextId).attr("required", true);		
				}
//				dojo.removeClass(dojo.byId(otherWrpId), "hide");
//				console.log("............................................ setting focus to otherTextId : " + otherTextId);
				dijit.byId(otherTextId).focus();
			}
		}	
	} else {
		dojo.byId(checkBoxId).disabled = true;
		dojo.byId(checkBoxId).checked = false;

		if (medicalConditionsChecked('medCnd', 'psyCnd', 'neuroCnd', 'otherCnd') == false) {
			dojo.byId(noMedCndId).disabled = false;
			dojo.byId(unknownMedCndId).disabled = false;
		}
		if (medCndOthersCheckboxArray.indexOf(otherId) > -1) {
//			console.log("............................................ relatedNodeId : " + relatedNodeId);
//			console.log("............................................ relatedNodeId.checked : " + dojo.byId(relatedNodeId).checked);
			if (!dojo.byId(relatedNodeId).checked) {
//				console.log("............................................ relatedNodeId not checked");
				if (dijit.byId(otherTextId)) {
					dijit.byId(otherTextId).attr("required", false);
					dijit.byId(otherTextId).reset();
				}
//				dojo.addClass(dojo.byId(otherWrpId), "hide");
				console.log("............................................ clearing otherTextId : " + otherTextId.value);
//				dojo.byId(otherTextId).value = '';
			}
		}	
	}
}

function collectPersonalStrengthSelections(node, maxAllowed) {
	var searchResult = objectFindByKey(personalStrengthSelections, 'ID', node.id);
	var nodeId = node.id;
	var mutalFieldId=nodeId.replace("StrengthPersonal","WeaknessPersonal");
	var mutalArrayLength = personalWeaknessesSelections.length;
	if (node.checked) {
		if (searchResult == null) {
			personalStrengthSelections.push({ID: node.id});
			if (personalStrengthSelections.length >= maxAllowed) {
				disableCheckboxSelections("StrengthPersonal", personalStrengthSelections);
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=true;
			}
		}
	} else {
		if (searchResult != null) {
			index = personalStrengthSelections.indexOf(searchResult);
			personalStrengthSelections.splice(index, 1);
			if (personalStrengthSelections.length < maxAllowed) {
				enableCheckboxSelections("StrengthPersonal", personalStrengthSelections, "WeaknessPersonal");
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=false;
			}
		}
	}
}

function collectPersonalWeaknessesSelections(node, maxAllowed) {
	var searchResult = objectFindByKey(personalWeaknessesSelections, 'ID', node.id);
	var nodeId = node.id;
	var mutalFieldId=nodeId.replace("WeaknessPersonal","StrengthPersonal");
	var mutalArrayLength = personalStrengthSelections.length;
	if (node.checked) { 
		if (searchResult == null) {
			personalWeaknessesSelections.push({ID: node.id});
			if (personalWeaknessesSelections.length >= maxAllowed) {
				disableCheckboxSelections("WeaknessPersonal", personalWeaknessesSelections);
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=true;
			}
		}
	} else {
		if (searchResult != null) {
			index = personalWeaknessesSelections.indexOf(searchResult);
			personalWeaknessesSelections.splice(index, 1);
			if (personalWeaknessesSelections.length < maxAllowed) {
				enableCheckboxSelections("WeaknessPersonal", personalWeaknessesSelections, "StrengthPersonal");
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=false;
			}
		}
	}
}

function collectPeersStrengthSelections(node, maxAllowed) {
	var searchResult = objectFindByKey(peersStrengthSelections, 'ID', node.id);
	var nodeId = node.id;
	var mutalFieldId=nodeId.replace("StrengthCompPeers","WeaknessCompPeers");
	var mutalArrayLength = peersWeaknessSelections.length;
	if (node.checked) {
		if (searchResult == null) {
			peersStrengthSelections.push({ID: node.id});
			if (peersStrengthSelections.length >= maxAllowed) {
				disableCheckboxSelections("StrengthCompPeers", peersStrengthSelections);
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=true;
			}
		}
	} else {
		if (searchResult != null) {
			index = peersStrengthSelections.indexOf(searchResult);
			peersStrengthSelections.splice(index, 1);
			if (peersStrengthSelections.length < maxAllowed) {
				enableCheckboxSelections("StrengthCompPeers", peersStrengthSelections, "WeaknessCompPeers");
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=false;
			}
		}
	}
}

function collectPeersWeaknessesSelections(node, maxAllowed) {
	var searchResult = objectFindByKey(peersWeaknessSelections, 'ID', node.id);
	var nodeId = node.id;
	var mutalFieldId=nodeId.replace("WeaknessCompPeers","StrengthCompPeers");
	var mutalArrayLength = peersStrengthSelections.length;
	if (node.checked) {
		if (searchResult == null) {
			peersWeaknessSelections.push({ID: node.id});
			if (peersWeaknessSelections.length >= maxAllowed) {
				disableCheckboxSelections("WeaknessCompPeers", peersWeaknessSelections);
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=true;
			}
		}
	} else {
		if (searchResult != null) {
			index = peersWeaknessSelections.indexOf(searchResult);
			peersWeaknessSelections.splice(index, 1);
			if (peersWeaknessSelections.length < maxAllowed) {
				enableCheckboxSelections("WeaknessCompPeers", peersWeaknessSelections, "StrengthCompPeers");
			}
			if (mutalArrayLength < maxAllowed) {
				dojo.byId(mutalFieldId).disabled=false;
			}
		}
	}
}

function collectLearningDisordersSelections(node, maxAllowed) {
	var searchResult = objectFindByKey(learningDisordersSelections, 'ID', node.id);
	if (node.checked) {
		if (searchResult == null) {
			learningDisordersSelections.push({ID: node.id});
			if (learningDisordersSelections.length >= maxAllowed) {
				disableCheckboxSelections("LearningDis", learningDisordersSelections);
			}
		}
	} else {
		if (searchResult != null) {
			index = learningDisordersSelections.indexOf(searchResult);
			learningDisordersSelections.splice(index, 1);
			if (learningDisordersSelections.length < maxAllowed) {
				enableCheckboxSelectionsNoMutalList("LearningDis", learningDisordersSelections);
			}
		}
	}
}

function disableCheckboxSelections(selectionList, selectionArray) {
	dojo.query('[id^="' + selectionList + '"]').forEach(function(node){
		if (objectFindByKey(selectionArray, 'ID', node.id) == null){
	    	node.disabled = true;
		}
	});
}

function enableCheckboxSelections(selectionListId, selectionArray, mutualListId) {
	dojo.query('[id^="' + selectionListId + '"]').forEach(function(node){
		var nodeId = node.id;
		var mutalFieldId=nodeId.replace(selectionListId,mutualListId);
		if (!dojo.byId(mutalFieldId).checked) {
	    	node.disabled = false;
		}
	});
}

function enableCheckboxSelectionsNoMutalList(selectionListId, selectionArray) {
	dojo.query('[id^="' + selectionListId + '"]').forEach(function(node){
    	node.disabled = false;
	});
}

//array = [{key:value},{key:value}]
function objectFindByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function convertRadioSelectionIdToSlangValue(radioId) {
	var slang = radioId.split(":");
	return slang[0];
}

//the onchange event for all form elements, this adds the IDs of changed values to the array
function addToFormValues(node, slangVariable) { //this array contains the IDs of every element that has been changed on a page and nothing else. 
	console.log("addToFormValue ... : " + slangVariable);
	var formValsLocal = formValues; 
	try {
		var nodeId = node.getAttribute("id");
	} catch(e) {
		var nodeId = node.domNode.getAttribute("id"); //if it's a Dijit
	}

	if (nodeId) {  
		console.log("addToFormValue ... nodeId & node.value : " + nodeId + " ... " + node.value);
		var nodeValue;
		var nodeAttr;
		var existsInFormValues = false;
		var length = formValsLocal.length;
		for (var i = 0; i < length; i++) { 
			if (formValsLocal[i].ID == nodeId) { 
				existsInFormValues = true;
				var FVIndex = i;
			}
		} 
		if (existsInFormValues == false) { //if the element doesn't already exist
			console.log("addToFormValue ... does not exist in forms array");
			var nodeName = node.tagName; //the tag name for the current node, i.e. 'input' or 'select'
			if (!nodeName) { // nodeName is undefined, so it must be a dijit
				nodeName = node.domNode.tagName;
			}
			if (nodeName == 'SELECT') {
				nodeAttr = "selectBox";
			}
			else {
				nodeAttr = dojo.attr(node, "type");
			}
		}
		else {
			//the item already exists in the FormValues array
			console.log("addToFormValue ... updating array with new value : " + formValsLocal[FVIndex].ATTR);
			nodeAttr = formValsLocal[FVIndex].ATTR; 
		}
		if (nodeAttr == "checkbox") {
			if (node.checked) {
				nodeValue = "checked";
			}
			else {
				nodeValue = "unchecked";
			}
		}
		else {
			nodeValue = node.value;
		}
		if (existsInFormValues == false) {
			formValues.push({ID: nodeId, ATTR: nodeAttr, VALUE: nodeValue, SLANG: slangVariable}); //add it to the array that says it needs to be updated
			console.log("formValues.push : " +nodeId + " .. " + nodeAttr + " .. " + nodeValue + " .. " + slangVariable);
		}
		else {
			var oldValue = formValsLocal[FVIndex].VALUE; 
			if (nodeValue != oldValue){
				formValues[FVIndex].VALUE = nodeValue;
			}
		}
	}
}

function initializeHistoryWritersJSONString() {
	dojo.byId("addExaminee:historyWritersJsonFormData").value = "{ }";
//	dojo.byId("addExaminee:historyWritersJsonFormData").value = "";
//	dojo.byId("addExaminee:referralJsonFormData").value = "";
}

function updateHistoryWritersJSONString() { //fires upon save 
	console.log("updateHistoryWritersJSONString ........................... saving entered data");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:historyWritersJsonFormData")) {
//		console.log("updateHistoryWritersJSONString ........................... edit mode");
		formJsonData = dojo.byId("editExamineeForm:historyWritersJsonFormData");
	} else if (dojo.byId("addExaminee:historyWritersJsonFormData")) {
//		console.log("updateHistoryWritersJSONString ........................... add mode");
		formJsonData = dojo.byId("addExaminee:historyWritersJsonFormData");
	}
	if (formJsonData != null) {
		console.log("updateHistoryWritersJSONString ........................... updating JSON string!");
		JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 
		var formValsLocal = formValues; 
		for (i = 0; i < formValsLocal.length; i++) { //for each element of the formValues array [the IDs of elements that will be updated]
			var nodeId = formValsLocal[i].ID; 
			var nodeAttr = formValsLocal[i].ATTR; 
			var nodeVal = formValsLocal[i].VALUE;
			var nodeSlang = formValsLocal[i].SLANG;
			if (nodeSlang in JsonData) { //if the JSON string already includes this element
				if (nodeAttr == "checkbox"){ 
					if (nodeVal == "unchecked") { 
						if (nodeId != nodeSlang) {
							delete JsonData[nodeId]; 
						}
						delete JsonData[nodeSlang]; 
					}
				}
				else { //formValues is not a checkbox
					if (nodeVal == "" || nodeVal == null || nodeVal == dropDownNoSelectionValue) {  
						delete JsonData[nodeSlang]; //remove from the JSON
						//remove related date field if it exist
						var richDateId = nodeSlang + "InputDate";
						if (richDateId in JsonData) {
							delete JsonData[richDateId];
						}
					}
					else {
						JsonData[nodeSlang] = nodeVal; 
					}
				}
			} 
			else {  //if a JSON object is not defined for this current id
				if (nodeAttr == "checkbox") { 
					if (nodeVal == "checked") {
						if (nodeId != nodeSlang) {
							JsonData[nodeId] = nodeVal; 
						}
						JsonData[nodeSlang] = "1"; 
					}
				}
				else if (nodeAttr == "radio") {
					JsonData[nodeSlang] = nodeVal; 
				}
				else {
					if (!(nodeVal == "" || nodeVal == null || nodeVal == dropDownNoSelectionValue)) { 
						if (nodeId != nodeSlang) {
							JsonData[nodeId] = nodeVal; 
						}
						JsonData[nodeSlang] = nodeVal; 
					}
				}
			}
		}
		var revisedJson = dojo.toJson(JsonData);
		dojo.attr(formJsonData, "value", revisedJson);
		formValues = [];
		//console.log("AFTER: " + dojo.fromJson(dojo.byId("editAssessmentForm:manualEntryJsonFormData").value));
	}
//	console.log("updateHistoryWritersJSONString ........................... update complete");
}

function initializeSchoolStrengthsComparisonData(schoolData) {
//	var schoolNode = dojo.byId("schoolSelection");
//	if (schoolNode.checked) {
		var slang = schoolData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			collectPersonalStrengthSelections(dojo.byId(slang[i]), 3);
		}
//	}	
}

function initializeSchoolWeaknessesComparisonData(schoolData) {
//	var schoolNode = dojo.byId("schoolSelection");
//	if (schoolNode.checked) {
		var slang = schoolData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			collectPersonalWeaknessesSelections(dojo.byId(slang[i]), 3);
		}
//	}
}

function initializePeersStrengthsComparisonData(schoolData) {
//	var schoolNode = dojo.byId("schoolSelection");
//	if (schoolNode.checked) {
		var slang = schoolData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			collectPeersStrengthSelections(dojo.byId(slang[i]), 3);
		}
//	}
}

function initializePeersWeaknessesComparisonData(schoolData) {
//	var schoolNode = dojo.byId("schoolSelection");
//	if (schoolNode.checked) {
		var slang = schoolData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			collectPeersWeaknessesSelections(dojo.byId(slang[i]), 3);
		}
//	}
}

function initializeCollectLearningDisordersData(schoolData) {
//	var schoolNode = dojo.byId("schoolSelection");
//	if (schoolNode.checked) {
		var slang = schoolData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			collectLearningDisordersSelections(dojo.byId(slang[i]), 3);
		}
//	}
}

function initializeLanguageMilestones(languageData) {
//	var langSoc = dojo.byId("langSocSelection");
//	if (langSoc.checked) {
		var slang = languageData.split(",");
		var length = slang.length;
		for (var i = 0; i  < length; i++) {
			relatedRadioOption = slang[i] + "_option";
			manageRelatedRadioOptions(dojo.byId(slang[i]), relatedRadioOption);
		}
//	}
}

function fnConvertHistoryJsonToForm(dataElementId, htmlFormId) {
	try {
		var formJson = document.getElementById(dataElementId).value;
		if (formJson == '') {
			formJson = defaultJson; 	
		}
		var serverJson = dojo.fromJson(formJson);
		
		if (htmlFormId == null || htmlFormId == 'undefined') {
		    htmlFormId = bundleHTMLFormId;
		}
		var formEl = dojo.byId(htmlFormId);
		for (var i = 0; i<formEl.elements.length; i++) {
			var elName = '';
			try {
				elName = formEl.elements[i].attributes['name'].nodeValue;
				
			} catch (e) {}
			if(elName!='') {
				var element = formEl.elements[elName];
				var jsonValue = serverJson[elName];
				
				if(jsonValue == undefined || jsonValue == null) {
				} else {
					if (element.length) {
						if (element[0].type == 'radio') {
							$A(element).each(
									function(e, i) {
										if (e.value == jsonValue) {
											e.checked = true;
										}
									});
						} else {
							element.value = jsonValue;
						}
					} else if (element.type == 'checkbox') {
						if (serverJson.hasOwnProperty(elName)) {
							element.checked = true;
						} else {
							element.checked = false;
						}
					} else {
						var widget = dijit.byId(elName);
						if (widget && widget.declaredClass == 'dijit.form.Select') {
							widget.attr("value", jsonValue);
						} else {
							element.value = jsonValue;
						}
					}
				}
			}
		}

	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error while converting JSON to Form - '+e.message);
	}
}

function noMedicalConditionsChecked(node, relatedNodeId, medCnd, psyCnd, neuroCnd, otherCnd) { //determines whether medical conditions are enabled or disabled
	relatedQueryString = '[name^="' + relatedNodeId + '"]';
	medCndQueryString = '[name^="' + medCnd + '"]';
	psyCndQueryString = '[name^="' + psyCnd + '"]';
	neuroCndQueryString = '[name^="' + neuroCnd + '"]';
	otherCndQueryString = '[name^="' + otherCnd + '"]';
	
	otherInputFields = '[name$="Condition_Other"]';
	
	if (node.checked) {
		dojo.query(relatedQueryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
		dojo.query(medCndQueryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
		dojo.query(psyCndQueryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
		dojo.query(neuroCndQueryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
		dojo.query(otherCndQueryString).forEach(function(node) {
			node.disabled = true;
			if (node.checked) {
				node.checked = false;
			}
		});
		dojo.query(otherInputFields).forEach(function(node) {
			node.disabled = true;
			node.value = '';
		});
	} else {
		dojo.query(relatedQueryString).forEach(function(node) {
			node.disabled = false;
		});
		dojo.query(medCndQueryString).forEach(function(node) {
			var rowIdArray = node.getAttribute("id");
			prvRcvdId = rowIdArray.indexOf('prvRcvdDiagChk') != -1
			curRcvdId = rowIdArray.indexOf('curRcvdDiagChk') != -1
			if (!prvRcvdId && !curRcvdId)
				node.disabled = false;
		});
		dojo.query(psyCndQueryString).forEach(function(node) {
			var rowIdArray = node.getAttribute("id");
			prvRcvdId = rowIdArray.indexOf('pysPrvTrt') != -1
			curRcvdId = rowIdArray.indexOf('pysCurTrt') != -1
			if (!prvRcvdId && !curRcvdId)
				node.disabled = false;
		});
		dojo.query(neuroCndQueryString).forEach(function(node) {
			var rowIdArray = node.getAttribute("id");
			prvRcvdId = rowIdArray.indexOf('neuroPrvTrt') != -1
			curRcvdId = rowIdArray.indexOf('neuroCurTrt') != -1
			if (!prvRcvdId && !curRcvdId)
				node.disabled = false;
		});
		dojo.query(otherCndQueryString).forEach(function(node) {
			var rowIdArray = node.getAttribute("id");
			prvRcvdId = rowIdArray.indexOf('otherPrvTrt') != -1
			curRcvdId = rowIdArray.indexOf('otherCurTrt') != -1
			if (!prvRcvdId && !curRcvdId)
				node.disabled = false;
		});
		dojo.query(otherInputFields).forEach(function(node) {
			node.disabled = false;
		});
	}
}


function initializeMedicalConditions(medCondNoneNode, medCondUnknownNode) { //initializes medical conditions lists
	if (medCondNoneNode.checked) {
		noMedicalConditionsChecked(medCondNoneNode, medCondUnknownNode.getAttribute("id"), 'medCnd', 'psyCnd', 'neuroCnd', 'otherCnd');
	} else if (medCondUnknownNode.checked) {
		noMedicalConditionsChecked(medCondUnknownNode, medCondNoneNode.getAttribute("id"), 'medCnd', 'psyCnd', 'neuroCnd', 'otherCnd');
	} else {
		medCndQueryString = '[name^="medCnd"]';
		psyCndQueryString = '[name^="psyCnd"]';
		neuroCndQueryString = '[name^="neuroCnd"]';
		otherCndQueryString = '[name^="otherCnd"]';
		dojo.query(medCndQueryString).forEach(function(node) {
			initializeMedicalConditionsDataRows(node, 'prvDiagChk', 'curDiagChk', 'prvRcvdDiagChk', 'curRcvdDiagChk', medCondNoneNode.getAttribute("id"), medCondUnknownNode.getAttribute("id"));
		});
		dojo.query(psyCndQueryString).forEach(function(node) {
			initializeMedicalConditionsDataRows(node, 'pysPrvDgn', 'pysCurDgn', 'pysPrvTrt', 'pysCurTrt', medCondNoneNode.getAttribute("id"), medCondUnknownNode.getAttribute("id"));
		});
		dojo.query(neuroCndQueryString).forEach(function(node) {
			initializeMedicalConditionsDataRows(node, 'neuroPrvDgn', 'neuroCurDgn', 'neuroPrvTrt', 'neuroCurTrt', medCondNoneNode.getAttribute("id"), medCondUnknownNode.getAttribute("id"));
		});
		dojo.query(otherCndQueryString).forEach(function(node) {
			initializeMedicalConditionsDataRows(node, 'otherPrvDgn', 'otherCurDgn', 'otherPrvTrt', 'otherCurTrt', medCondNoneNode.getAttribute("id"), medCondUnknownNode.getAttribute("id"));
		});
	}
}

function initializeMedicalConditionsDataRows(node, prvDiagId, curDiagId, prvTrtId, curTrtId, medCondNoneId, medCondUnknownId) {
	//console.log("initializeMedicalConditionsDataRows ..................... : .. " + prvDiagId + " .. " + curTrtId + " .. " + prvTrtId + " .. " + curTrtId + " .. " + medCondNoneId + " .. " + medCondUnknownId);
	var rowIdArray = node.getAttribute("id");
	prvDiagIdFound = rowIdArray.indexOf(prvDiagId) != -1;
	curDiagIdFound = rowIdArray.indexOf(curDiagId) != -1;
	if (prvDiagIdFound) {
		if (node.checked) {
			dojo.byId(constructMedicalConditionsRowId(node, prvTrtId)).disabled = false;
			dojo.byId(medCondNoneId).disabled = true;
			dojo.byId(medCondUnknownId).disabled = true;
		} else {
			dojo.byId(constructMedicalConditionsRowId(node, prvTrtId)).disabled = true;
			dojo.byId(constructMedicalConditionsRowId(node, prvTrtId)).checked = false;
		}
	} else if (curDiagIdFound) {
		if (node.checked) {
			dojo.byId(constructMedicalConditionsRowId(node, curTrtId)).disabled = false;
			dojo.byId(medCondNoneId).disabled = true;
			dojo.byId(medCondUnknownId).disabled = true;
		} else {
			dojo.byId(constructMedicalConditionsRowId(node, curTrtId)).disabled = true;
			dojo.byId(constructMedicalConditionsRowId(node, curTrtId)).checked = false;
		}
		
	}
}

function medicalConditionsChecked(medCnd, psyCnd, neuroCnd, otherCnd) { //determines whether medical conditions are checked
	medCndQueryString = '[name^="' + medCnd + '"]';
	psyCndQueryString = '[name^="' + psyCnd + '"]';
	neuroCndQueryString = '[name^="' + neuroCnd + '"]';
	otherCndQueryString = '[name^="' + otherCnd + '"]';
	var medCndFound = false;
	dojo.query(medCndQueryString).forEach(function(node) {
		if (node.checked) {
			medCndFound = true;
		}
	});
	
	if (medCndFound) {
		return true;
	}
	
	var psyCndFound = false;
	dojo.query(psyCndQueryString).forEach(function(node) {
		if (node.checked) {
			psyCndFound = true;
		}
	});
	
	if (psyCndFound) {
		return true;
	}
	
	var neuroCndFound = false;
	dojo.query(neuroCndQueryString).forEach(function(node) {
		if (node.checked) {
			neuroCndFound = true;
		}
	});
	
	if (neuroCndFound) {
		return true;
	}
	
	var otherCndFound = false;
	dojo.query(otherCndQueryString).forEach(function(node) {
		if (node.checked) {
			otherCndFound = true;
		}
	});
	
	if (otherCndFound) {
		return true;
	}

	return false;
}

function constructMedicalConditionsRowId(node, newChkBoxId) { //construct id of related check box on the same row.

	var rowIdArray = node.getAttribute("id").split(":");
	
	var rowId = rowIdArray[0];
	var rowNo = rowIdArray[1];
	
	return rowId + ':' + rowNo + ':' + newChkBoxId;
	
}

function retrieveMedicalConditionSlang(slangVariable, slangPosition) { //construct id of related check box on the same row.
	var slangArray = slangVariable.split(";");
	return slangArray[slangPosition];
}

function initializeTabs() {
	reloadActiveTabs();
}	

function reloadActiveTabs() {
	
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:historyWritersJsonFormData")) {
		formJsonData = "editExamineeForm:historyWritersJsonFormData";
	} else if (dojo.byId("addExaminee:historyWritersJsonFormData")) {
		formJsonData = "addExaminee:historyWritersJsonFormData";
	}

	dojo.parser.parse("referralHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "referralHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("RefRel"), false, 'strRefRel_Other', 'strRefRelOthLblWrp');
	//enableOptOutSelection(dojo.byId("noReferral"), 'refPnlGrd');
	//addToRefFormValues(dojo.byId("noReferral"), "noReferral"); //place no referral selection into JSON string
	//checkIfRefButtonsShouldBeEnabled('addNew');
	initializeReferralReasonsOtherFlds();
	
	dojo.parser.parse("personalHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "personalHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("rel_stat"), false, "rel_statOther", "mrtOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("LivingArrangeType"), false, "strLivingArrangeType_Other", "curLivArngOthLblWrp");

	dojo.parser.parse("languageSocialHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "languageSocialHistInfo");
	initializeLoopRadioSelections(dojo.byId("TestBehav_LengthEnglishExposure"), "strTestBehav_LengthEnglishExposure_Other", "strTestBehav_LengthEnglishExposure_OtherWrp", false);
	initializeLoopRadioSelections(dojo.byId("TestBehav_LengthEnglishSpoken"), "strTestBehav_LengthEnglishSpoken_Other", "strTestBehav_LengthEnglishSpoken_OtherWrp", false);
//	initializeLoopRadioSelections(dojo.byId("MilestonesAccord"), "strMilestonesAccord_Other", "strMilestonesAccord_OtherWrp");
//	manageLoopRadioSelections(dojo.byId("Milestones_Other"), false, "strMilestones_Other", true, "strMilestones_Other_Wrp");
	initializeMilestonesToUnknown();
	initializeLoopRadioSelections(dojo.byId("Milestones_Other"), "strMilestones_Other", "strMilestones_Other_Wrp", true);
	manageChkBoxRelatedOtherField(dojo.byId("MilestonesAccord"), false, 'strMilestonesAccord_Other', 'strMilestonesAccord_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("Birth_Other"), false, 'strPregBirth_Other', 'Birth_Other', 'strPregBirth_OtherWrp');

	dojo.parser.parse("educationHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "educationHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("ed_level"), false, "ed_levelOther", "exmEduOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("EducMother"), false, "EducMotherOther", "mthEduOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("EducFather"), false, "EducFatherOther", "fthEduOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("SchoolPlacement"), false, "SchoolPlacement_Other", "schPlaceOthLblWrp");
	checkIfEducationCompletionRequired(dojo.byId("ed_level"), 'EducProgComp');
	checkIfEducationCompletionRequired(dojo.byId("EducMother"), 'EducProgCompMother');
	checkIfEducationCompletionRequired(dojo.byId("EducFather"), 'EducProgCompFather');

//	dojo.parser.parse("schoolHistInfo");
//	fnConvertHistoryJsonToTab(formJsonData, "schoolHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("SchoolAttendCurrent"), false, "SchoolAttendCurrent_Other", "schCurAtndOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("SchoolDiffCurrent"), false, "SchoolDiffCurrent_Other", "schDifOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("SchoolAttendPast"), false, "SchoolAttendPast_Other", "schPrvAtndOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("SchoolDiffPast"), false, "SchoolDiffPast_Other", "schPrvDifOthLblWrp");
	
	manageLoopRadioSelections(dojo.byId("AchieveTestRecent_Other"), false, "strAchieveTestRecent_Other", true, "strAchieveTestRecent_Other_Wrp");
	manageLoopRadioSelections(dojo.byId("AchieveTestPast_Other"), false, "strAchieveTestPast_Other", true, "strAchieveTestPast_Other_Wrp");
	
	manageChkBoxRelatedOtherField(dojo.byId("FreqSchoolChange"), false, "FreqSchoolChange_Other", "schChngOthLblWrp");
	manageChkBoxRelatedAcrdToOtherField(dojo.byId("EducAccord"), false, "EducAccord_Other", "schAcrdToOthLbl", "EducAccord_Other_Wrp");
	manageChkBoxRelatedOtherField(dojo.byId("EducPreKindergarten"), false, "EducPreKindergarten_Other", "schPreKndrOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("EducPreFirstGrade"), false, "EducPreFirstGrade_Other", "schPre1stOthLblWrp");
	manageLoopedChkBoxRelatedOtherField(dojo.byId("StrengthPersonal_Other"), false, 'strStrengthPersonal_Other', 'StrengthPersonal_Other', 'strStrengthPersonal_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("WeaknessPersonal_Other"), false, 'strWeaknessPersonal_Other', 'WeaknessPersonal_Other', 'strWeaknessPersonal_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("WeaknessCompPeers_Other"), false, 'strWeaknessCompPeers_Other', 'WeaknessCompPeers_Other', 'strWeaknessCompPeers_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("StrengthCompPeers_Other"), false, 'strStrengthCompPeers_Other', 'StrengthCompPeers_Other', 'strStrengthCompPeers_OtherWrp');
	manageChkBoxMultiRelatedOtherField(dojo.byId("LearningDis_Other1"), false);
	manageChkBoxMultiRelatedOtherField(dojo.byId("LearningDis_Other2"), false);
	manageChkBoxMultiRelatedOtherField(dojo.byId("LearningDis_Other3"), false);
	manageChkBoxRelatedOtherField(dojo.byId("SchoolAcadPerformCurrent"), false, "SchoolAcadPerformCurrent_Other", "schCurPerfOthLblWrp");  
	manageChkBoxRelatedOtherField(dojo.byId("SchoolAcadPerformPast"), false, "SchoolAcadPerformPast_Other", "schPastPerfOthLblWrp");  

	dojo.parser.parse("healthHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "healthHistInfo");
	manageChkBoxRelatedAcrdToOtherField(dojo.byId("HealthRef"), false, "HealthRef_Other", "hthAcrdToOthLbl", "HealthRef_Other_Wrp");
	manageLoopedChkBoxRelatedOtherField(dojo.byId("VisionScreenResult_Other"), false, 'strVisionScreenResult_Other', 'VisionScreenResult_Other', 'strVisionScreenResult_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("HearingScreenResult_Other"), false, 'strHearingScreenResult_Other', 'HearingScreenResult_Other', 'strHearingScreenResult_OtherWrp');
	manageLoopedChkBoxRelatedOtherField(dojo.byId("Sensory_Other"), false, 'strSensory_Other', 'Sensory_Other', 'strSensory_OtherWrp');
	manageChkBoxMultiRelatedOtherField(dojo.byId("Motor_OtherFM"), false);
	manageChkBoxMultiRelatedOtherField(dojo.byId("Motor_OtherGM"), false);
	initializeMedicalConditions(dojo.byId("MedCondition_None"), dojo.byId("MedCondition_Unknown"));

	dojo.parser.parse("employmentHistInfo");
	fnConvertHistoryJsonToTab(formJsonData, "employmentHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("CurrentEmployStatus"), false, "CurrentEmployStatus_Other", "empCurStsOthLblWrp");
	manageChkBoxRelatedOtherField(dojo.byId("PreviousEmployStatus"), false, "PreviousEmployStatus_Other", "empPrvStsOthLblWrp");
	checkIfPositionTitleRequired(dojo.byId("CurrentEmployStatus"), 'CurrentJobTitle', 'CurrentJobTitleWrp');
	checkIfPositionTitleRequired(dojo.byId("PreviousEmployStatus"), 'PreviousJobTitle', 'PreviousJobTitleWrp');
}

function fnConvertHistoryJsonToTab(dataElementId, tabId) {
	try {
		
		var formJson = document.getElementById(dataElementId).value;
		if (formJson == '') {
			formJson = defaultJson; 	
		}

		console.log("formJson ............... : " + formJson);
		queryString = '[id^="' + tabId + '"]';
		
		var nodeList = dojo.query(queryString).query("*");
		
		var serverJson = dojo.fromJson(formJson);
		
		for (var i = 0; i<nodeList.length; i++) {
			var elName = '';
			try {
				elName = nodeList[i].attributes['name'].nodeValue;
			} catch (e) {}
			
			if(elName!='') {

//				console.log("elName ............... : " + elName);
 
				var element = nodeList[i];

				var jsonValue = serverJson[elName];

				if(jsonValue == undefined || jsonValue == null) {
				} else {
//					console.log("filtered elName ............... : " + elName);
					if (element.type == 'radio') {
						if (element.value == jsonValue) {
							element.checked = true;
						}
					} else if (element.type == 'checkbox') {
						if (serverJson.hasOwnProperty(elName)) {
							element.checked = true;
						} else {
							element.checked = false;
						}
					} else {
						var widget = dijit.byId(elName);
						if (widget && widget.declaredClass == 'dijit.form.Select') {
//							console.log("widget elName ............... : " + elName);
							widget.attr("value", jsonValue);
						} else {
//							console.log("elName value ............... : " + elName + " . set to . " + jsonValue);
							element.value = jsonValue;
						}
					}
					
				}
			}
		}

	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error while converting JSON to Form - '+e.message);
	}
}

function removeTabElementsFromFormValues(node, tabId) { //this array contains the IDs of every element that has been changed on a page and nothing else. 
	
//	console.log("removeTabElementsFromFormValues ... : " + tabId);
	
	if (node.checked) {
		console.log("removeTabElementsFromFormValues .... node is still checked, no data to remove.");
	} else {

		var formJsonData = null;
		if (dojo.byId("editExamineeForm:historyWritersJsonFormData")) {
			formJsonData = dojo.byId("editExamineeForm:historyWritersJsonFormData");
		} else if (dojo.byId("addExaminee:historyWritersJsonFormData")) {
			formJsonData = dojo.byId("addExaminee:historyWritersJsonFormData");
		}
		if (formJsonData != null) {

			JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 

			queryString = '[id^="' + tabId + '"]';
			
			var nodeList = dojo.query(queryString).query("*");

//			console.log("removeTabElementsFromFormValues .... node is unchecked : " + nodeList.length);

			for (var i = 0; i<nodeList.length; i++) {

				var element = nodeList[i];
				
				try {
					var nodeId = element.getAttribute("id");
				} catch(e) {
					var nodeId = element.domNode.getAttribute("id"); //if it's a Dijit
				}

//				console.log("removeTabElementsFromFormValues ... nodeId : " + nodeId);
				
				if (nodeId) {  
					if (nodeId in JsonData) { //if the JSON string exists, remove it
						console.log("removeTabElementsFromFormValues ... found node in JSON string ");
						delete JsonData[nodeId]; 
					} 
				}
			}
			
			var revisedJson = dojo.toJson(JsonData);
			dojo.attr(formJsonData, "value", revisedJson);
			
		}		
	}
}

function errorsExistsOnTabs() {
	
	var referralTabErrors = isTabInvalid("referralHistPanel", "ref_lbl");
	console.log("...................................................... referralTabErrors : " + referralTabErrors);
	var personTabErrors = isTabInvalid("personalHistInfo", "personalTab_lbl");
	var langTabErrors = isTabInvalid("languageSocialHistInfo", "langSocialTab_lbl");
	var eduTabErrors = isTabInvalid("educationHistInfo", "edTab_lbl");
//	var schoolTabErrors = isTabInvalid("schoolHistInfo", "schoolTab_lbl");
	var healthTabErrors = isTabInvalid("healthHistInfo", "healthTab_lbl");
	var empTabErrors = isTabInvalid("employmentHistInfo", "emplTab_lbl"); 
	
	return referralTabErrors || personTabErrors || langTabErrors || eduTabErrors || healthTabErrors || empTabErrors;
}

function isTabInvalid(tabId, tabLabel) {
	try {
		queryString = '[id^="' + tabId + '"]';
		var errorsExist = false;
		var nodeList = dojo.query(queryString).query("*");
		for (var i = 0; i<nodeList.length; i++) {
			var elName = '';
			try {
				elName = nodeList[i].attributes['name'].nodeValue;
			} catch (e) {}
			
			if(elName!='') {
				var widget = dijit.byId(elName);
				if (widget && !widget.validate()) {
					errorsExist = true;
					break;
				} 
			}
		}
		
		if (errorsExist) {
			dojo.style(tabLabel, "color", "rgb(160,0,0)"); //#SMW 10/8
		} else {
			dojo.style(tabLabel, "color", "black"); //#SMW 10/8
		}
		
		return errorsExist;
		
	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error trying to validate tab information - '+e.message);
	}
}

function checkParentNode(node, parentNodeId, childList) { //determines whether related other field should be enabled
	var parentNode = dojo.byId(parentNodeId);
	if (node.checked) {
		if (parentNode && !parentNode.checked) {
			parentNode.checked = true;
			addToFormValues(parentNode, parentNodeId);
		}
	} else {
		if (!parentNode && childList != null) {
			var childrenSlangArray = childList.split(",");
			for( var i = 0, len = childrenSlangArray.length; i < len; i++ ) {
				dojo.byId(childrenSlangArray[i]).checked = false;
				addToFormValues(dojo.byId(childrenSlangArray[i]), childrenSlangArray[i]);
				if (childrenSlangArray[i].indexOf("_Other") > -1) {
					var otherInput = 'str' + childrenSlangArray[i];
					var otherWrp = otherInput + 'Wrp';
					manageRefReasonsChkBoxRelatedOtherField(dojo.byId(childrenSlangArray[i]), 'Other', false, otherInput, otherWrp);
				}
			}			
		}
	}
}


//the onchange event for all referral form elements, this adds the IDs of changed values to the array
/*
function addToRefFormValues(node, slangVariable) { //this array contains the IDs of every element that has been changed on a page and nothing else. 
	console.log("addToRefFormValue ... : " + slangVariable);
	var formValsLocal = refFormValues; 
	try {
		var nodeId = node.getAttribute("id");
	} catch(e) {
		node = dijit.byId(slangVariable);
		console.log("addToRefFormValue ... node is a dijit : " + node.domNode.getAttribute("name"));
		var nodeId = node.domNode.getAttribute("id");
//		var nodeId = node.domNode.getAttribute("id"); //if it's a Dijit
	}

	if (nodeId) {  
		console.log("addToRefFormValue ... nodeId & node.value : " + nodeId + " ... " + node.value);
		var nodeValue;
		var nodeAttr;
		var existsInFormValues = false;
		var length = formValsLocal.length;
		for (var i = 0; i < length; i++) { 
			if (formValsLocal[i].ID == nodeId) { 
				existsInFormValues = true;
				var FVIndex = i;
			}
		} 
		if (existsInFormValues == false) { //if the element doesn't already exist
			console.log("addToRefFormValue ... does not exist in forms array");
			var nodeName = node.tagName; //the tag name for the current node, i.e. 'input' or 'select'
			if (!nodeName) { // nodeName is undefined, so it must be a dijit
				nodeName = node.domNode.tagName;
			}
			if (nodeName == 'SELECT') {
				nodeAttr = "selectBox";
			}
			else {
				nodeAttr = dojo.attr(node, "type");
			}
		}
		else {
			//the item already exists in the FormValues array
			console.log("addToRefFormValue ... updating array with new value : " + formValsLocal[FVIndex].ATTR);
			nodeAttr = formValsLocal[FVIndex].ATTR; 
		}
		if (nodeAttr == "checkbox") {
			if (node.checked) {
				nodeValue = "checked";
			}
			else {
				nodeValue = "unchecked";
			}
		}
		else {
			nodeValue = node.value;
		}
		if (existsInFormValues == false) {
			refFormValues.push({ID: nodeId, ATTR: nodeAttr, VALUE: nodeValue, SLANG: slangVariable}); //add it to the array that says it needs to be updated
			console.log("refFormValues.push : " +nodeId + " .. " + nodeAttr + " .. " + nodeValue + " .. " + slangVariable);
		}
		else {
			var oldValue = formValsLocal[FVIndex].VALUE; 
			if (nodeValue != oldValue){
				refFormValues[FVIndex].VALUE = nodeValue;
			}
		}
	}
}
*/
/*
function updateRefJSONString() { //fires upon save 
	console.log("updateRefJSONString ........................... saving entered data");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:referralJsonFormData")) {
//		console.log("updateHistoryWritersJSONString ........................... edit mode");
		formJsonData = dojo.byId("editExamineeForm:referralJsonFormData");
	} else if (dojo.byId("addExaminee:referralJsonFormData")) {
//		console.log("updateHistoryWritersJSONString ........................... add mode");
		formJsonData = dojo.byId("addExaminee:referralJsonFormData");
	}
	
	try {
	
	if (formJsonData != null) {
		console.log("updateRefJSONString ........................... updating JSON string! : " + formJsonData.value);
		JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 
		console.log("updateRefJSONString ........................... beginning loop to add values! : " + refFormValues.value);
		var formValsLocal = refFormValues; 
		for (i = 0; i < formValsLocal.length; i++) { //for each element of the formValues array [the IDs of elements that will be updated]
			var nodeId = formValsLocal[i].ID; 
			var nodeAttr = formValsLocal[i].ATTR; 
			var nodeVal = formValsLocal[i].VALUE;
			var nodeSlang = formValsLocal[i].SLANG;
			console.log("updateRefJSONString ........................... nodeId, nodeAttr, nodeVal, nodeSlang: " + nodeId + " ... " + nodeAttr + " ... " + nodeVal + " ... " + nodeSlang);
			if (nodeSlang in JsonData) { //if the JSON string already includes this element
				console.log("updateRefJSONString ........................... nodeSlang in JsonData");
				if (nodeAttr == "checkbox"){ 
					if (nodeVal == "unchecked") { 
						if (nodeId != nodeSlang) {
							delete JsonData[nodeId]; 
						}
						delete JsonData[nodeSlang]; 
					}
				}
				else { //formValues is not a checkbox
					if (nodeVal == "" || nodeVal == null || nodeVal == dropDownNoSelectionValue) {  
						delete JsonData[nodeSlang]; //remove from the JSON
						//remove related date field if it exist
						var richDateId = nodeSlang + "InputDate";
						if (richDateId in JsonData) {
							delete JsonData[richDateId];
						}
					}
					else {
						JsonData[nodeSlang] = nodeVal; 
					}
				}
			} 
			else {  //if a JSON object is not defined for this current id
				console.log("updateRefJSONString ........................... nodeSlang NOT in JsonData");
				if (nodeAttr == "checkbox") { 
					if (nodeVal == "checked") {
						if (nodeId != nodeSlang) {
							JsonData[nodeId] = nodeVal; 
						}
						JsonData[nodeSlang] = "1"; 
					}
				}
				else {
					if (!(nodeVal == "" || nodeVal == null || nodeVal == dropDownNoSelectionValue)) { 
						if (nodeId != nodeSlang) {
							JsonData[nodeId] = nodeVal; 
						}
						JsonData[nodeSlang] = nodeVal; 
					}
				}
			}
		}
		var revisedJson = dojo.toJson(JsonData);
		console.log("updateRefJSONString ........................... setting hidden referral field : " + revisedJson);
		dojo.attr(formJsonData, "value", revisedJson);
		refFormValues = [];
//		console.log("AFTER: " + dojo.fromJson(dojo.byId("editAssessmentForm:manualEntryJsonFormData").value));
		console.log("updateRefJSONString ........................... update complete");
	}
	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error trying to save selected values to Referral JSON string - '+e.message);
	}
	
}
*/
/*
function retrieveReferralJsonData() { 
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:referralJsonFormData")) {
		formJsonData = dojo.byId("editExamineeForm:referralJsonFormData").value;
	} else if (dojo.byId("addExaminee:referralJsonFormData")) {
		formJsonData = dojo.byId("addExaminee:referralJsonFormData").value;
	}
	return formJsonData;
	
}
*/
/*
function resetReferralJsonData() { 

	if (dojo.byId("editExamineeForm:referralJsonFormData")) {
		dojo.byId("editExamineeForm:referralJsonFormData").value = "{ }";
		formJsonData = "editExamineeForm:referralJsonFormData";
	} else if (dojo.byId("addExaminee:referralJsonFormData")) {
		dojo.byId("addExaminee:referralJsonFormData").value = "{ }";
		formJsonData = "addExaminee:referralJsonFormData";
	}
	
	dojo.parser.parse("referralHistPanel");
	resetTabValues("referralHistPanel");
	fnConvertHistoryJsonToTab(formJsonData, "referralHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("RefRel"), false, 'strRefRel_Other', 'strRefRelOthLblWrp');
	initializeReferralReasonsOtherFlds();
	//resetTabValues("referralHistPanel");
}
*/
/*
function resetTabValues(tabId) {
	try {
		queryString = '[id^="' + tabId + '"]';
		
		var nodeList = dojo.query(queryString).query("*");
		
		for (var i = 0; i<nodeList.length; i++) {
			var elName = '';
			try {
				elName = nodeList[i].attributes['name'].nodeValue;
			} catch (e) {}
			
			if(elName!='') {
				var element = nodeList[i];
				if (element.type == 'radio') {
					element.checked = false;
				} else if (element.type == 'checkbox') {
					element.checked = false;
				} else if (element.type == 'select-one') {
					element.value = dropDownNoSelectionValue;
				} else {
					var widget = dijit.byId(elName);
					if (widget && widget.declaredClass == 'dijit.form.Select') {
						widget.attr("value", '');
					} else {
						element.value = '';
					}
				}
			}
		}

	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error while converting JSON to Form - '+e.message);
	}
}
*/
/*
function reloadReferralTabs() {
	console.log("reloadReferralTabs .......................................  ");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:referralJsonFormData")) {
		formJsonData = "editExamineeForm:referralJsonFormData";
	} else if (dojo.byId("addExaminee:referralJsonFormData")) {
		formJsonData = "addExaminee:referralJsonFormData";
	}
	dojo.parser.parse("referralHistPanel");
	resetTabValues("referralHistPanel");
	fnConvertHistoryJsonToTab(formJsonData, "referralHistInfo");
	manageChkBoxRelatedOtherField(dojo.byId("RefRel"), false, 'strRefRel_Other', 'strRefRelOthLblWrp');
	initializeReferralReasonsOtherFlds();
	console.log("reloadReferralTabs ....................................completed  ");

}
*/
/*
function enableOptOutSelection(optOutNode, pnlToHideId) {
	
	if (optOutNode.checked) {
		dojo.addClass(dojo.byId(pnlToHideId), "hidden"); //hide all raw scores sections
		
	} else {
		dojo.removeClass(dojo.byId(pnlToHideId), "hidden"); //hide all raw scores sections
	}
	
}
*/
/*
function isReferralJsonDataEntered() {
	console.log("isReferralJsonDataEntered() .............................");
	var formJsonData = null;
	var totRecs = null;
	if (dojo.byId("editExamineeForm:referralJsonFormData")) {
		formJsonData = dojo.byId("editExamineeForm:referralJsonFormData");
		var totRecs = dojo.byId('editExamineeForm:referralNoOfRecs');
	} else if (dojo.byId("addExaminee:referralJsonFormData")) {
		formJsonData = dojo.byId("addExaminee:referralJsonFormData");
		var totRecs = dojo.byId('addExaminee:referralNoOfRecs');
	}
	
	JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be tested here 

	console.log("isReferralJsonDataEntered() .......................entering loop to check for data : " + formJsonData.value);
	for(var i in JsonData) { 
		console.log("isReferralJsonDataEntered() ....................... found data");
		return true;
	}
	
	console.log("isReferralJsonDataEntered() .......................totRecs : " + totRecs.value);

	if (totRecs && !(totRecs.value.indexOf('0') > -1)) {
		return true;
	}
	
	return false;
}
*/
/*
function checkIfRefButtonsShouldBeEnabled(buttonId) {
	console.log("checkIfRefButtonsShouldBeEnabled(buttonId) ...................................");
	updateRefJSONString();
	var btn = dojo.byId(buttonId);
	if (btn) {
		console.log("checkIfRefButtonsShouldBeEnabled(buttonId) ..............................btn does exist");
		var dataEntered = false;
		for(var i in JsonData) { 
			dataEntered = true;
			break;
		}
		if (dataEntered) {
			console.log("checkIfRefButtonsShouldBeEnabled(buttonId) ..............................btn will be enabled : " + refFormValues[0]);
			btn.disabled = false;
		} else {
			console.log("checkIfRefButtonsShouldBeEnabled(buttonId) ..............................btn will be disabled");
			btn.disabled = true;
		}
	}
}
*/

function manageRefReasonsChkBoxRelatedOtherField(node, nodeName, focus, relatedOtherField, relatedOtherFieldWrp) { //determines whether related other field should be enabled
	var nodeSelected = false;
	if (node.checked && (nodeName == "Other" || nodeName == "other" )) {
		nodeSelected = true;
	}	
	if (nodeSelected) {
		if (dijit.byId(relatedOtherField)) {
			dojo.removeClass(dojo.byId(relatedOtherFieldWrp), "hide");
			dijit.byId(relatedOtherField).attr("required", true);
//			dijit.byId(relatedOtherField).attr("disabled", false);
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
		if (dijit.byId(relatedOtherField)) {
			dojo.byId(relatedOtherField).value = "";
			dojo.addClass(dojo.byId(relatedOtherFieldWrp), "hide");
			dijit.byId(relatedOtherField).attr("required", false);
			dijit.byId(relatedOtherField).reset();
//			dijit.byId(relatedOtherField).attr("disabled", true);
		}
	}
}

function initializeReferralReasonsOtherFlds() {
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonSchool_Other"), 'Other', false, 'strRefReasonSchool_Other', 'strRefReasonSchool_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonSpeech_Other"), 'Other', false, 'strRefReasonSpeech_Other', 'strRefReasonSpeech_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonLanguage_Other"), 'Other', false, 'strRefReasonLanguage_Other', 'strRefReasonLanguage_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonSocial_Other"), 'Other', false, 'strRefReasonSocial_Other', 'strRefReasonSocial_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonVocational_Other"), 'Other', false, 'strRefReasonVocational_Other', 'strRefReasonVocational_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonPhysical_Other"), 'Other', false, 'strRefReasonPhysical_Other', 'strRefReasonPhysical_OtherWrp');
	manageRefReasonsChkBoxRelatedOtherField(dojo.byId("RefReasonNeurological_Other"), 'Other', false, 'strRefReasonNeurological_Other', 'strRefReasonNeurological_OtherWrp');
}

function manageChkBoxRelatedAcrdToOtherField(node, focus, relatedOtherField, relatedOtherLbl, relatedOtherInpWrp) { //determines whether related other field should be enabled
	var nodeSelected = false;
	if (node.value == 77) {
		nodeSelected = true;
	}	
	if (nodeSelected) {
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).attr("required", true);		
		}
		if (relatedOtherLbl) {
			dojo.removeClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (relatedOtherInpWrp) {
			dojo.removeClass(dojo.byId(relatedOtherInpWrp), "hide");
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
		dojo.byId(relatedOtherField).value = "";
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).attr("required", false);
			dijit.byId(relatedOtherField).reset();
		}
		if (relatedOtherLbl) {
			dojo.addClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (relatedOtherInpWrp) {
			dojo.addClass(dojo.byId(relatedOtherInpWrp), "hide");
		}
	}
}

function manageChkBoxRelatedOtherFieldZeroBased(node, focus, relatedOtherField, relatedOtherLbl) { //determines whether related other field should be enabled

	var nodeSelected = false;
	if (node.value != 0) {
		nodeSelected = true;
	}	
	
	if (nodeSelected) {
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).attr("required", true);		
		}
		if (relatedOtherLbl) {
			dojo.removeClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
		dojo.byId(relatedOtherField).value = "";
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).attr("required", false);
			dijit.byId(relatedOtherField).reset();
		}
		if (relatedOtherLbl) {
			dojo.addClass(dojo.byId(relatedOtherLbl), "hide");
		}
	}
}

function manageLoopRadioSelectionsForMilestones(node, focus, relatedOtherField, isOther, relatedOtherFldWrp) {
	if (isOther) {
		var nodeName = dojo.attr(node, 'name');
		if (nodeName != null) {
			var nameAttribute = "[name=" + nodeName + "]";
		} else {
			var nameAttribute = "[name=" + dojo.attr(node, 'id') + "]";
		}

		//dojo.byId(relatedOtherField).disabled = true;
		var foundCheckedValue = false;
		//dojo.byId(relatedOtherField).value = "";

		dojo.query(nameAttribute).filter(function(radio){
			if (radio.checked && radio.value != 0) {
				//selection was made on 'other' field
				if (dijit.byId(relatedOtherField)) {
					//dojo.removeClass(dojo.byId(relatedOtherField), "hide");
					dijit.byId(relatedOtherField).attr("required", true);		
				}
				if (relatedOtherFldWrp) {
					dojo.removeClass(dojo.byId(relatedOtherFldWrp), "hide");
				}
				//dojo.byId(relatedOtherField).disabled = false;
				foundCheckedValue = true;
				if (focus) {
					dojo.byId(relatedOtherField).focus();
				}
			} 
		});
		if (!foundCheckedValue) {
			if (relatedOtherFldWrp) {
				dojo.addClass(dojo.byId(relatedOtherFldWrp), "hide");
			}
			if (dijit.byId(relatedOtherField)) {
				//dojo.addClass(dojo.byId(relatedOtherField), "hide");
				dijit.byId(relatedOtherField).attr("required", false);
				dijit.byId(relatedOtherField).reset();
			}
			dojo.byId(relatedOtherField).value = "";
		}
	}
	
}

function initializeMilestonesToUnknown() {
	var milestonesRadioIdArray = new Array(); //array to store selected personal strengths.
	queryString = '[id^="Milestones_"]';
	var nodeList = dojo.query(queryString).query("*");

	for (var i = 0; i<nodeList.length; i++) {

		var element = nodeList[i];

		if (element.type == 'radio') {
			var convertedId = convertRadioSelectionIdToSlangValue(element.id);
			var searchResult = objectFindByKey(milestonesRadioIdArray, 'ID', convertedId);
			if (searchResult == null) {
				milestonesRadioIdArray.push({ID: convertedId});
				initializeMilestonesRadioSelections(element);
			}			
		}
	}
}

function initializeMilestonesRadioSelections(node) {
	var nodeName = dojo.attr(node, 'name');
	if (nodeName != null) {
		var nameAttribute = "[name=" + nodeName + "]";
	} else {
		var nameAttribute = "[name=" + dojo.attr(node, 'id') + "]";
	}
	var radioChecked = false;
	dojo.query(nameAttribute).filter(function(radio){
		if (radio.checked) {
			radioChecked = true;
		} 
	});
	if (!radioChecked) {
		dojo.query(nameAttribute).filter(function(radio){
			if (radio.value == 0) {
				radio.checked = true;
			}
		});
	}
}