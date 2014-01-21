/*
 * This JavaScript file is intended to be used with the Research tab under the History information.  
 *  
 * Refer to the BASC 2 PDD and Next Gen Export.xlsx files for details on SLANG variable ID's, etc.
 */

var resFormValues = []; //array to store every changed value, most often a select, text, or check box.

function manageRschChkBoxRelatedOtherField(node, focus, relatedOtherField, relatedOtherLbl) { //determines whether related other field should be enabled

	if (node.checked) {
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).required = true;
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
			dijit.byId(relatedOtherField).required = false;
			dijit.byId(relatedOtherField).reset();
		}
		if (relatedOtherLbl) {
			dojo.addClass(dojo.byId(relatedOtherLbl), "hide");
		}
	}
}

function manageRschIdeaChkBoxFields(node, focus, relatedOtherField, relatedOtherLbl, relatedFieldWrp) { //determines whether related other field should be enabled

	if (node.checked) {
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).required = true;
		}
		if (relatedOtherLbl) {
			dojo.removeClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (relatedFieldWrp) {
			dojo.removeClass(dojo.byId(relatedFieldWrp), "hide");
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();			
		}
	}
	else {
		dojo.byId(relatedOtherField).value = "";
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).required = false;
			dijit.byId(relatedOtherField).reset();
		}
		if (relatedOtherLbl) {
			dojo.addClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (relatedFieldWrp) {
			dojo.addClass(dojo.byId(relatedFieldWrp), "hide");
		}
	}
}

function addAdditionalDSMInputFields() {
	
	if(dojo.style(dojo.byId('ng_diag_dsm05_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm05_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec05_Wrp'), "hide");
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm05'), 'ng_diag_dsm05');
		addToResFormValues(dojo.byId('ng_diag_dsmspec05'), 'ng_diag_dsmspec05');
		dijit.byId('ng_diag_dsm05').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm06_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm06_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec06_Wrp'), "hide");
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm06'), 'ng_diag_dsm06');
		addToResFormValues(dojo.byId('ng_diag_dsmspec06'), 'ng_diag_dsmspec06');
		dijit.byId('ng_diag_dsm06').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm07_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm07_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec07_Wrp'), "hide");
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm07'), 'ng_diag_dsm07');
		addToResFormValues(dojo.byId('ng_diag_dsmspec07'), 'ng_diag_dsmspec07');
		dijit.byId('ng_diag_dsm07').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm08_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm08_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec08_Wrp'), "hide");
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm08'), 'ng_diag_dsm08');
		addToResFormValues(dojo.byId('ng_diag_dsmspec08'), 'ng_diag_dsmspec08');
		dijit.byId('ng_diag_dsm08').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm09_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm09_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec09_Wrp'), "hide");
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm09'), 'ng_diag_dsm09');
		addToResFormValues(dojo.byId('ng_diag_dsmspec09'), 'ng_diag_dsmspec09');
		dijit.byId('ng_diag_dsm09').required = true;
		return true;
	} else	if(dojo.style(dojo.byId('ng_diag_dsm10_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_dsm10_Wrp'), "hide");
		dojo.removeClass(dojo.byId('ng_diag_dsmspec10_Wrp'), "hide");
		toggleAdditionalInputdsmLink();
		placeLinkOnLastdsmField();
		addToResFormValues(dojo.byId('ng_diag_dsm10'), 'ng_diag_dsm10');
		addToResFormValues(dojo.byId('ng_diag_dsmspec10'), 'ng_diag_dsmspec10');
		dijit.byId('ng_diag_dsm10').required = true;
		return true;
	}
	
}

function placeLinkOnLastdsmField() {
	dojo.addClass(dojo.byId('lnkdsm05'), "hide");
	dojo.addClass(dojo.byId('lnkdsm06'), "hide");
	dojo.addClass(dojo.byId('lnkdsm07'), "hide");
	dojo.addClass(dojo.byId('lnkdsm08'), "hide");
	dojo.addClass(dojo.byId('lnkdsm09'), "hide");
	dojo.addClass(dojo.byId('lnkdsm10'), "hide");
	if(dojo.style(dojo.byId('ng_diag_dsm10_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm10'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm09_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm09'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm08_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm08'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm07_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm07'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm06_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm06'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_dsm05_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm05'), "hide");
		return true;
	}
}

function addAdditionalIcdInputFields() {
	
	if(dojo.style(dojo.byId('ng_diag_icd05_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd05_Wrp'), "hide");
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd05'), 'ng_diag_icd05');
		dijit.byId('ng_diag_icd05').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd06_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd06_Wrp'), "hide");
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd06'), 'ng_diag_icd06');
		dijit.byId('ng_diag_icd06').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd07_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd07_Wrp'), "hide");
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd07'), 'ng_diag_icd07');
		dijit.byId('ng_diag_icd07').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd08_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd08_Wrp'), "hide");
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd08'), 'ng_diag_icd08');
		dijit.byId('ng_diag_icd08').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd09_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd09_Wrp'), "hide");
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd09'), 'ng_diag_icd09');
		dijit.byId('ng_diag_icd09').required = true;
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd10_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('ng_diag_icd10_Wrp'), "hide");
		toggleAdditionalInputIcdLink();
		placeLinkOnLastIcdField();
		addToResFormValues(dojo.byId('ng_diag_icd10'), 'ng_diag_icd10');
		dijit.byId('ng_diag_icd10').required = true;
		return true;
	}
}

function placeLinkOnLastIcdField() {
	dojo.addClass(dojo.byId('lnkIcd05'), "hide");
	dojo.addClass(dojo.byId('lnkIcd06'), "hide");
	dojo.addClass(dojo.byId('lnkIcd07'), "hide");
	dojo.addClass(dojo.byId('lnkIcd08'), "hide");
	dojo.addClass(dojo.byId('lnkIcd09'), "hide");
	dojo.addClass(dojo.byId('lnkIcd10'), "hide");
	if(dojo.style(dojo.byId('ng_diag_icd10_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd10'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd09_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd09'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd08_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd08'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd07_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd07'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('ng_diag_icd06_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd06'), "hide");
		return true;
	} else	if(dojo.style(dojo.byId('ng_diag_icd05_Wrp'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd05'), "hide");
		return true;
	}
}

function removeAdditionalInputField(nodeId, inputId, addNodeId, addInputId) {
	dojo.addClass(dojo.byId(nodeId), "hide");
	if (dojo.byId(inputId)) {
		dojo.byId(inputId).value = '';
		addToResFormValues(dojo.byId(inputId), inputId);
		dijit.byId(inputId).required = false;
	}
	
	if (addNodeId) {
		if (dojo.byId(addNodeId)) {
			dojo.addClass(dojo.byId(addNodeId), "hide");
		}
	}
	if (addInputId) {
		if (dojo.byId(addInputId)) {
			dojo.byId(addInputId).value = '';
			addToResFormValues(dojo.byId(addInputId), addInputId);
			dijit.byId(addInputId).required = false;
		}		
	}
	toggleAdditionalInputdsmLink();
	placeLinkOnLastdsmField();
	toggleAdditionalInputIcdLink();
	placeLinkOnLastIcdField();
}

function toggleAdditionalInputdsmLink() {
	if(dojo.style(dojo.byId('ng_diag_dsm10_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsmLink'), "hide");
	} else {
		dojo.addClass(dojo.byId('dsmLink'), "hide");
	}
}

function toggleAdditionalInputIcdLink() {
	if(dojo.style(dojo.byId('ng_diag_icd10_Wrp'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icdLink'), "hide");
	} else {
		dojo.addClass(dojo.byId('icdLink'), "hide");
	}
}

//jquery method to disable all elements within a parent div tag
//function toggleStatusDisabled(node, divId) {
//	var jqq$ = jQuery.noConflict();
//	var jDivId = "#" + divId + " :input";
//   if (node.checked) {
//    	jqq$(jDivId).attr('disabled', true);
//    } else {
//    	jqq$(jDivId).removeAttr('disabled');
//    }   
//}

//jquery method to disable all elements within a parent div tag
function toggleStatusDisabled(node, divId) {
    if (node.checked) {
		dojo.addClass(dojo.byId(divId), "hide");
    } else {
		dojo.removeClass(dojo.byId(divId), "hide");
    }   
}

function toggleStatusDisabledRelatedNodes(node, relatedNode, divId) {
    if (node.checked || relatedNode.checked) {
		dojo.addClass(dojo.byId(divId), "hide");
    } else {
		dojo.removeClass(dojo.byId(divId), "hide");
    }   
}

function toggleIdeaSelections(nodeId, divId) {
	toggleCheckboxesWithinDiv(nodeId, divId);
	if (!dojo.byId(nodeId).checked) {
		clearOutAllTextBoxesWithinDiv(divId);
	}
	manageRschIdeaChkBoxFields(dojo.byId("ng_diag_idea8"), true, 'ng_diag_idea_hi_descrip', 'ideaOthLbl', 'othFld');
	manageRschIdeaChkBoxFields(dojo.byId("ng_diag_idea9"), true, 'ng_diag_idea_sld_descrip', 'ideaSpcfLbl', 'spcfFld');
}

function toggleIcdSelections(nodeId, divId) {
	toggleStatusEnabled(dojo.byId(nodeId), divId); 
	if (!dojo.byId(nodeId).checked) {
		clearOutAllTextBoxesWithinDiv(divId);
	}
}

function toggleDsmSelections(nodeId, divId) {
	toggleStatusEnabled(dojo.byId(nodeId), divId); 
	if (!dojo.byId(nodeId).checked) {
		clearOutAllTextBoxesWithinDiv(divId);
	}
}

function toggleNoResearchSelection(nodeId, divId) {
	if (dojo.byId(nodeId).checked) {
		clearOutAllCheckboxesWithinDiv(divId);
		clearOutAllTextBoxesWithinDiv(divId);
	}
	toggleStatusDisabled(dojo.byId(nodeId), divId);	
}

function toggleNoDiagnosisSelection(nodeId, relatedId, divId) {
	if (dojo.byId(nodeId).checked || dojo.byId(relatedId).checked ) {
		clearOutAllCheckboxesWithinDiv(divId);
	}
	toggleDsmSelections("ng_diag_dsm", "dsmWrp")	
	toggleLinksEnabled(dojo.byId("ng_diag_dsm"), "dsmAddMore");
	toggleIcdSelections("ng_diag_icd", "icdWrp");
	toggleLinksEnabled(dojo.byId("ng_diag_icd"), "icdAddMore");
	toggleIdeaSelections("ng_diag_idea", "ideaWrp")
	toggleStatusEnabled(dojo.byId("ng_diag_specEd"), 'spcEdWrp');
	toggleStatusDisabledRelatedNodes(dojo.byId(nodeId), dojo.byId(relatedId), divId);
}

function toggleStatusEnabled(node, divId)
{
	var jqq$ = jQuery.noConflict();

	jqq$('#'+divId).find(':input').each(function(){
		if (node.checked) {
			jQuery(this).removeAttr('disabled');
	    } else {
	    	jQuery(this).attr('disabled', true);
	    	jQuery(this).val('');
    		addToResFormValues(this, this.id);
	    }   
	})	
}

function toggleCheckboxesWithinDiv(nodeId, divId ){
	var jqq$ = jQuery.noConflict();
	jqq$('#'+divId).find(':checkbox').each(function(){

    	if (!dojo.byId(nodeId).checked) {
            jQuery(this).attr('checked', false);
            jQuery(this).attr('disabled', true);
    		addToResFormValues(this, this.id);
    	} else {
            jQuery(this).attr('disabled', false);
    	}

    });
}    

function clearOutAllCheckboxesWithinDiv( divId ){
	var jqq$ = jQuery.noConflict();
	jqq$('#'+divId).find(':checkbox').each(function(){
            jQuery(this).attr('checked', false);
    		addToResFormValues(this, this.id);
    });
}    

function clearOutAllTextBoxesWithinDiv(divId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + divId;
	//jqq$(jDivId).find("input:text").val('');
	jqq$(jDivId).find("input:text").each(function(){
		var parId = this.id + "_Wrp";
		jQuery(this).val('');
		addToResFormValues(this, this.id);
		if (dojo.byId(parId)) {
			dojo.addClass(dojo.byId(parId), "hide");
			dijit.byId(this.id).required = false;
		}
    });
}

function enableAllTextBoxesWithinDiv(divId) {
	var jqq$ = jQuery.noConflict();
	jqq$('#'+divId).find('input:text').each(function(){
		jQuery(this).removeAttr('disabled');
    });
}

//jquery method to disable all elements within a parent div tag
function disableElements(divId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + divId + " :input";
   	jqq$(jDivId).attr('disabled', true);
}

function initializeDiagnosisUI() {

//	disableElements('spcEdWrp');
//	disableElements('ideaWrp');
	
//	dojo.parser.parse("icdWrp");
//	disableElements('icdWrp');
	
//	dojo.parser.parse("dsmWrp");
//	disableElements('dsmWrp');
	
	disableLinks('.rschLink');
	
}

function fnConvertResearchDiagnosisEntryFormToJSON(historyFormId, jsonFormId) {
    console.log('................................ fnConvertResearchDiagnosisEntryFormToJSON');
    var formJson = dojo.formToJson(historyFormId);
    var jsonData = jsonFormId + ':researchJsonFormData';
    console.log('................................ fnConvertResearchDiagnosisEntryFormToJSON - jsonData : ' + jsonData);
    document.getElementById(jsonData).value = formJson;
    console.log('................................ fnConvertResearchDiagnosisEntryFormToJSON - formJson : ' + formJson);
}

function toggleLinksDisabled(node, linkCSS) {
	var jqq$ = jQuery.noConflict();
    if (node.checked) {
    	//jqq$(linkCSS).attr('style', 'pointer-events: none;');
    	jqq$(linkCSS).hide();    	
    } else {
    	//jqq$(linkCSS).attr('style', 'pointer-events: pointer;');
    	jqq$(linkCSS).show();    	
    }   
}

function toggleLinksEnabled(node, linkId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + linkId;
    if (node.checked) {
    	//jqq$(jDivId).attr('style', 'pointer-events: pointer;');
    	jqq$(jDivId).show();    	
    } else {
    	//jqq$(jDivId).attr('style', 'pointer-events: none;');
    	jqq$(jDivId).hide();    	
    }   
}

//jquery method to disable all elements within a parent div tag
function disableLinks(linkCSS) {
	var jqq$ = jQuery.noConflict();
	//jqq$(linkCSS).attr('style', 'pointer-events: none;');
	jqq$( linkCSS ).hide();
}

function checkForDiagnosisReset(node) {
    if (!node.checked) {
    	initializeDiagnosisUI();
    }	
}

//This approach to capturing inputs is required due to tabs with different purposes under the same form.
function addToResFormValues(node, slangVariable) { //this array contains the IDs of every element that has been changed on a page and nothing else. 
	console.log("addToResFormValues ... : " + slangVariable);
	var formValsLocal = resFormValues; 
	try {
		var nodeId = node.getAttribute("id");
	} catch(e) {
		var nodeId = node.domNode.getAttribute("id"); //if it's a Dijit
	}

	if (nodeId != slangVariable) {
		nodeId = slangVariable;
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
			resFormValues.push({ID: nodeId, ATTR: nodeAttr, VALUE: nodeValue, SLANG: slangVariable}); //add it to the array that says it needs to be updated
			console.log("resFormValues.push : " + nodeId + " .. " + nodeAttr + " .. " + nodeValue + " .. " + slangVariable);
		}
		else {
			var oldValue = formValsLocal[FVIndex].VALUE; 
			if (nodeValue != oldValue){
				resFormValues[FVIndex].VALUE = nodeValue;
				console.log("resFormValues[FVIndex].VALUE = nodeValue : " + nodeValue);
			}
		}
	}
}

//This approach to capturing inputs is required due to tabs with different purposes under the same form.
function updateResearchJSONString() { //fires upon save 
//	console.log("updateResearchWritersJSONString ........................... saving entered data");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:researchJsonFormData")) {
		formJsonData = dojo.byId("editExamineeForm:researchJsonFormData");
	} else if (dojo.byId("addExaminee:researchJsonFormData")) {
		formJsonData = dojo.byId("addExaminee:researchJsonFormData");
	}
	if (formJsonData != null) {
		JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 
		var formValsLocal = resFormValues; 
		for (var i = 0; i < formValsLocal.length; i++) { //for each element of the formValues array [the IDs of elements that will be updated]
			var nodeId = formValsLocal[i].ID; 
			var nodeAttr = formValsLocal[i].ATTR; 
			var nodeVal = formValsLocal[i].VALUE;
			var nodeSlang = formValsLocal[i].SLANG;
			if (nodeSlang in JsonData) { //if the JSON string already includes this element
//				console.log("updateResearchWritersJSONString ........................... is in JSON string");
				if (nodeAttr == "checkbox"){ 
					if (nodeVal == "unchecked") { 
						if (nodeId != nodeSlang) {
							delete JsonData[nodeId]; 
						}
						delete JsonData[nodeSlang];
					}
				}
				else { //formValues is not a checkbox
					if (nodeVal == "" || nodeVal == null) {  
						delete JsonData[nodeSlang]; //remove from the JSON
						//remove related date field if it exist
						var richDateId = nodeSlang + "InputDate";
						if (richDateId in JsonData) {
							delete JsonData[richDateId];
						}
					}
					else {
						JsonData[nodeSlang] = nodeVal; 
						if (nodeId != nodeSlang && nodeId in JsonData) {
							JsonData[nodeId] = nodeVal; 
						}
					}
				}
			} 
			else {  //if a JSON object is not defined for this current id
//				console.log("updateResearchWritersJSONString ........................... not currently in JSON string");
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
					if (!(nodeVal == "" || nodeVal == null)) { 
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
		resFormValues = [];
//		console.log("updateResearchWritersJSONString ........................... completed saving data");
	}
}

function initializeResearchTabs() {
	//initializeDiagnosisUI();
	reloadResearchTab();
}	

// Unfortunately a lot of hard coding of ID's.  This is needed to initialize all the fields.
function reloadResearchTab() {
	console.log("reloadResearchTab ............................... starting.");
	var formJsonData = null;
	if (dojo.byId("editExamineeForm:researchJsonFormData")) {
		formJsonData = "editExamineeForm:researchJsonFormData";
	} else if (dojo.byId("addExaminee:researchJsonFormData")) {
		formJsonData = "addExaminee:researchJsonFormData";
	}
	dojo.parser.parse("researchInfo");
	fnConvertResearchJsonToTab(formJsonData, "researchInfo");
	toggleNoResearchSelection('noRef', 'rshResWrpDiv');	
	toggleNoDiagnosisSelection('noDiag', 'diagWithheld', 'diagWrpDiv');	
	placeLinkOnLastdsmField();
	placeLinkOnLastIcdField();	
	initializeAdditionalDSMInputFields();	
	toggleDsmSelections("ng_diag_dsm", "dsmWrp")	
	toggleLinksEnabled(dojo.byId("ng_diag_dsm"), "dsmAddMore");
	toggleIcdSelections("ng_diag_icd", "icdWrp");
	toggleLinksEnabled(dojo.byId("ng_diag_icd"), "icdAddMore");
	toggleIdeaSelections("ng_diag_idea", "ideaWrp")
	toggleStatusEnabled(dojo.byId("ng_diag_specEd"), 'spcEdWrp');
	disableRelatedElement('noDiag', 'diagWithheld');
	disableRelatedElement('diagWithheld', 'noDiag');
}

function removeElementFromArray(elementId) {
	var length = resFormValues.length;
	for (var i = 0; i < length; i++) { 
		if (resFormValues[i].ID == elementId) {
			resFormValues.splice(i, 1);
			break;
		}
	} 
}

function isAdditionalTextInvalid(textId) {
	try {
		queryString = '[id^="' + textId + '"]';
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
					dijit.byId(elName).focus();
					errorsExist = true;
				} 
			}
		}
		
		return errorsExist;
		
	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error trying to validate tab information - '+e.message);
	}
}

function fnConvertResearchJsonToTab(dataElementId, tabId) {
	try {
		var formJson = document.getElementById(dataElementId).value;
		if (formJson != '' && formJson != '{}') {
			queryString = '[id^="' + tabId + '"]';
			
			var nodeList = dojo.query(queryString).query("*");
			
			var serverJson = dojo.fromJson(formJson);
			
			for (var i = 0; i<nodeList.length; i++) {
				var elName = '';
				try {
					elName = nodeList[i].attributes['name'].nodeValue;
				} catch (e) {}
				
				if(elName!='') {

					var element = nodeList[i];

					var jsonValue = serverJson[elName];

					if(jsonValue == undefined || jsonValue == null) {
					} else {
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
								widget.attr("value", jsonValue);
							} else {
								element.value = jsonValue;
							}
							removeWrapperDivHideStyle(elName);
						}
					}
				}
			}
		} else {
			console.log('No JSON data to parse out to tab ......');
		}

	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error while converting JSON to Form - '+e.message);
	}
}

function removeWrapperDivHideStyle(nodeId) {
	var jqq$ = jQuery.noConflict();
	var parentDivId = nodeId + "_Wrp";
	var jParentDivId = "#" + parentDivId;
	if (dojo.byId(parentDivId)) {
		if(jqq$(jParentDivId).hasClass('hide')) {
			dojo.removeClass(dojo.byId(parentDivId), "hide");
			dijit.byId(nodeId).required = true;
		}
	}
}

function initializeAdditionalDSMInputFields() {
	
	if(dojo.style(dojo.byId('ng_diag_dsm05_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec05_Wrp'), "hide");
	} 
	if(dojo.style(dojo.byId('ng_diag_dsm06_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec06_Wrp'), "hide");
	}
	if(dojo.style(dojo.byId('ng_diag_dsm07_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec07_Wrp'), "hide");
	} 
	if(dojo.style(dojo.byId('ng_diag_dsm08_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec08_Wrp'), "hide");
	} 
	if(dojo.style(dojo.byId('ng_diag_dsm09_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec09_Wrp'), "hide");
	}
	if(dojo.style(dojo.byId('ng_diag_dsm10_Wrp'), "display") != "none")	{
		dojo.removeClass(dojo.byId('ng_diag_dsmspec10_Wrp'), "hide");
	}
	
}

function errorsExistOnResearchTab() {
	
	var referralTabErrors = isResearchTabInvalid("researchInfo", "rsh_lbl");
	
	return referralTabErrors;
}

function isResearchTabInvalid(tabId, tabLabel) {
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
					dijit.byId(elName).focus();
					errorsExist = true;
				} 
			}
		}
		
		if (errorsExist) {
			dojo.style(tabLabel, "color", "rgb(160,0,0)"); 
		} else {
			dojo.style(tabLabel, "color", "black"); 
		}
		
		return errorsExist;
		
	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error trying to validate tab information - '+e.message);
	}
}

function disableRelatedElement(nodeId, relatedNodeId) {
	if (dojo.byId(nodeId).checked) {
		dojo.byId(relatedNodeId).disabled = true;
	} else {
		dojo.byId(relatedNodeId).disabled = false;
	} 
}