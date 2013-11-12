var formValues = []; //array to store every changed value, most often a select, text, or check box.

function otherSourceRole(node, focus) { //determines whether other source role should be enabled
	if (node.value == 77) {
		dojo.byId("strRefRel_Other").disabled = false;
		if (focus) {
			dojo.byId("strRefRel_Other").focus();
		}
	}
	else {
		dojo.byId("strRefRel_Other").disabled = true;
		dojo.byId("strRefRel_Other").value = "";
	}
}

function otherMarital(node, focus) { //determines whether other Marital Status should be enabled
	if (node.value == 77) {
		dojo.byId("rel_statOther").disabled = false;
		if (focus) {
			dojo.byId("rel_statOther").focus();
		}
	}
	else {
		dojo.byId("rel_statOther").disabled = true;
		dojo.byId("rel_statOther").value = "";
	}
}

function otherCurrentLiving(node, focus) { //determines whether other Living arrangements should be enabled
	if (node.value == 77) {
		dojo.byId("strLivingArrangeType_Other").disabled = false;
		if (focus) {
			dojo.byId("strLivingArrangeType_Other").focus();
		}
	}
	else {
		dojo.byId("strLivingArrangeType_Other").disabled = true;
		dojo.byId("strLivingArrangeType_Other").value = "";
	}
}

function otherReferralReasons(slngVariable, focus, node) { //determines whether other referral reasons should be enabled
	if (slngVariable == slngSchoolOther) { // school other
		if (node.checked) {
			dojo.byId("strRefReasonSchool_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonSchool_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonSchool_Other").disabled = true;
			dojo.byId("strRefReasonSchool_Other").value = "";
		}
	}

	if (slngVariable == slngSpeechOther) { // speech other
		if (node.checked) {
			dojo.byId("strRefReasonSpeech_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonSpeech_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonSpeech_Other").disabled = true;
			dojo.byId("strRefReasonSpeech_Other").value = "";
		}

	}

	if (slngVariable == slngLanguageOther) { // language other
		if (node.checked) {
			dojo.byId("strRefReasonLanguage_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonLanguage_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonLanguage_Other").disabled = true;
			dojo.byId("strRefReasonLanguage_Other").value = "";
		}
	}

	if (slngVariable == slngSocEmotOther) { // social emotional other
		if (node.checked) {
			dojo.byId("strRefReasonSocial_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonSocial_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonSocial_Other").disabled = true;
			dojo.byId("strRefReasonSocial_Other").value = "";
		}
	}

	if (slngVariable == slngVocationalOther) { // vocational other
		if (node.checked) {
			dojo.byId("strRefReasonVocational_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonVocational_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonVocational_Other").disabled = true;
			dojo.byId("strRefReasonVocational_Other").value = "";
		}
	}

	if (slngVariable == slngPhysicalOther) { // physical other
		if (node.checked) {
			dojo.byId("strRefReasonPhysical_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonPhysical_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonPhysical_Other").disabled = true;
			dojo.byId("strRefReasonPhysical_Other").value = "";
		}
	}

	if (slngVariable == slngNeurologicalOther) { // neurological other
		if (node.checked) {
			dojo.byId("strRefReasonNeurological_Other").disabled = false;
			if (focus) {
				dojo.byId("strRefReasonNeurological_Other").focus();
			}
		} else {
			dojo.byId("strRefReasonNeurological_Other").disabled = true;
			dojo.byId("strRefReasonNeurological_Other").value = "";
		}
	}
}

function initializeOtherReferralReasons(slngVariable) { //determines whether other referral reasons should be enabled
	if (slngVariable == slngSchoolOther) { // school other
		dojo.byId("strRefReasonSchool_Other").disabled = false;
	}

	if (slngVariable == slngSpeechOther) { // speech other
		dojo.byId("strRefReasonSpeech_Other").disabled = false;
	}

	if (slngVariable == slngLanguageOther) { // language other
		dojo.byId("strRefReasonLanguage_Other").disabled = false;
	}

	if (slngVariable == slngSocEmotOther) { // social emotional other
		dojo.byId("strRefReasonSocial_Other").disabled = false;
	}

	if (slngVariable == slngVocationalOther) { // vocational other
		dojo.byId("strRefReasonVocational_Other").disabled = false;
	}

	if (slngVariable == slngPhysicalOther) { // physical other
		dojo.byId("strRefReasonPhysical_Other").disabled = false;
	}

	if (slngVariable == slngNeurologicalOther) { // neurological other
		dojo.byId("strRefReasonNeurological_Other").disabled = false;
	}
}

function initializeReferralReasonsOtherFields() { 
	dojo.byId("strRefReasonSchool_Other").disabled = true;
	dojo.byId("strRefReasonSpeech_Other").disabled = true;
	dojo.byId("strRefReasonLanguage_Other").disabled = true;
	dojo.byId("strRefReasonSocial_Other").disabled = true;
	dojo.byId("strRefReasonVocational_Other").disabled = true;
	dojo.byId("strRefReasonPhysical_Other").disabled = true;
	dojo.byId("strRefReasonNeurological_Other").disabled = true;
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:historyWritersJsonFormData")) {
		formJsonData = dojo.byId("editExamineeForm:historyWritersJsonFormData");
	} else if (dojo.byId("addExaminee:historyWritersJsonFormData")) {
		formJsonData = dojo.byId("addExaminee:historyWritersJsonFormData");
	}
	var JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object
	for (property in JsonData) {
		initializeOtherReferralReasons(property);
	}
}	

//the onchange event for all form elements, this adds the IDs of changed values to the array
function addToFormValues(node, slangVariable) { //this array contains the IDs of every element that has been changed on a page and nothing else. 
	//console.log("addToFormValue ... : " + slangVariable);
	var formValsLocal = formValues; 
	try {
		var nodeId = node.getAttribute("id");
	} catch(e) {
		var nodeId = node.domNode.getAttribute("id"); //if it's a Dijit
	}
	if (nodeId) {  
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
			//console.log("formValues.push : " +nodeId + " .. " + nodeAttr + " .. " + nodeValue + " .. " + slangVariable);
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
}


function updateHistoryWritersJSONString() { //fires upon save 
	console.log("updateHistoryWritersJSONString .... ");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:historyWritersJsonFormData")) {
		formJsonData = dojo.byId("editExamineeForm:historyWritersJsonFormData");
	} else if (dojo.byId("addExaminee:historyWritersJsonFormData")) {
		formJsonData = dojo.byId("addExaminee:historyWritersJsonFormData");
	}
	if (formJsonData != null) {
		JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 
		console.log("got JSON string .... ");
		var formValsLocal = formValues; 
		for (i = 0; i < formValsLocal.length; i++) { //for each element of the formValues array [the IDs of elements that will be updated]
			var nodeId = formValsLocal[i].ID; 
			var nodeAttr = formValsLocal[i].ATTR; 
			var nodeVal = formValsLocal[i].VALUE;
			var nodeSlang = formValsLocal[i].SLANG;
			if (nodeSlang in JsonData) { //if the JSON string already includes this element
				console.log("Element " + nodeSlang + " exists in JsonData");
				if (nodeAttr == "checkbox"){ 
					console.log("Element " + nodeSlang + " is a checkbox");
					if (nodeVal == "unchecked") { 
						delete JsonData[nodeSlang]; 
						console.log("Element " + nodeSlang + " has been blanked and will be deleted");
					}
				}
				else { //formValues is not a checkbox
					if (nodeVal == "" || nodeVal == null) {  
						console.log("Element " + nodeSlang + " has been blanked and will be deleted");
						delete JsonData[nodeSlang]; //remove from the JSON
					}
					else {
						JsonData[nodeSlang] = nodeVal; 
						console.log("JsonData." + nodeSlang + "=" + JsonData[nodeSlang]);
					}
				}
			} 
			else {  //if a JSON object is not defined for this current id
				console.log("Element" + i + " does not yet exist in JsonData.");
				console.log("Element " + nodeSlang + " does not yet exist in JsonData.");
				if (nodeAttr == "checkbox") { 
					console.log("Element " + nodeSlang + " is a check box");
					if (nodeVal == "checked") {
						if (nodeId != nodeSlang) {
							JsonData[nodeId] = nodeVal; 
							console.log("JsonData." + nodeId + "=" + JsonData[nodeId]);
						}
						JsonData[nodeSlang] = "1"; 
						console.log("JsonData." + nodeSlang + "=" + JsonData[nodeSlang]);
					}
				}
				else {
					console.log("Element " + nodeSlang + " is not a check box");
					if (!(nodeVal == "" || nodeVal == null)) { 
						JsonData[nodeSlang] = nodeVal; 
						console.log("JsonData." + nodeSlang + "=" + JsonData[nodeSlang]);
					}
				}
			}
		}
		var revisedJson = dojo.toJson(JsonData);
		dojo.attr(formJsonData, "value", revisedJson);
		formValues = [];
		////console.log("AFTER: " + dojo.fromJson(dojo.byId("editAssessmentForm:manualEntryJsonFormData").value));
	}
}
