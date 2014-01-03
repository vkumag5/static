/*
 * This JavaScript file is intended to be used with the Research tab under the History information.  
 *  
 * Refer to the BASC 2 PDD and Next Gen Export.xlsx files for details on SLANG variable ID's, etc.
 */
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
		if (relatedOtherLbl) {
			dojo.removeClass(dojo.byId(relatedOtherLbl), "hide");
		}
		if (relatedFieldWrp) {
			dojo.removeClass(dojo.byId(relatedFieldWrp), "hide");
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
		if (dijit.byId(relatedOtherField)) {
			dijit.byId(relatedOtherField).required = true;
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
	
	if(dojo.style(dojo.byId('dsm5'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm5'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec05'), "hide");
		placeLinkOnLastdsmField();
		return true;
	} else if(dojo.style(dojo.byId('dsm6'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm6'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec06'), "hide");
		placeLinkOnLastdsmField();
		return true;
	} else if(dojo.style(dojo.byId('dsm7'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm7'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec07'), "hide");
		placeLinkOnLastdsmField();
		return true;
	} else if(dojo.style(dojo.byId('dsm8'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm8'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec08'), "hide");
		placeLinkOnLastdsmField();
		return true;
	} else if(dojo.style(dojo.byId('dsm9'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm9'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec09'), "hide");
		placeLinkOnLastdsmField();
		return true;
	} else	if(dojo.style(dojo.byId('dsm10'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsm10'), "hide");
		dojo.removeClass(dojo.byId('dsmSpec10'), "hide");
		toggleAdditionalInputdsmLink();
		placeLinkOnLastdsmField();
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
	if(dojo.style(dojo.byId('dsm10'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm10'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('dsm9'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm09'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('dsm8'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm08'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('dsm7'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm07'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('dsm6'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm06'), "hide");
		return true;
	} else	if(dojo.style(dojo.byId('dsm5'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkdsm05'), "hide");
		return true;
	}
}

function addAdditionalIcdInputFields() {
	
	if(dojo.style(dojo.byId('icd5'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd5'), "hide");
		placeLinkOnLastIcdField();
		return true;
	} else if(dojo.style(dojo.byId('icd6'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd6'), "hide");
		placeLinkOnLastIcdField();
		return true;
	} else if(dojo.style(dojo.byId('icd7'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd7'), "hide");
		placeLinkOnLastIcdField();
		return true;
	} else if(dojo.style(dojo.byId('icd8'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd8'), "hide");
		placeLinkOnLastIcdField();
		return true;
	} else if(dojo.style(dojo.byId('icd9'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd9'), "hide");
		placeLinkOnLastIcdField();
		return true;
	} else	if(dojo.style(dojo.byId('icd10'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icd10'), "hide");
		toggleAdditionalInputIcdLink();
		placeLinkOnLastIcdField();
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
	if(dojo.style(dojo.byId('icd10'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd10'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('icd9'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd09'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('icd8'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd08'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('icd7'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd07'), "hide");
		return true;
	} else if(dojo.style(dojo.byId('icd6'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd06'), "hide");
		return true;
	} else	if(dojo.style(dojo.byId('icd5'), "display") != "none")
	{
		dojo.removeClass(dojo.byId('lnkIcd05'), "hide");
		return true;
	}
}

function removeAdditionalInputField(nodeId, inputId, addNodeId, addInputId) {
	dojo.addClass(dojo.byId(nodeId), "hide");
	if (dojo.byId(inputId)) {
		dojo.byId(inputId).value = '';
	}
	
	if (addNodeId) {
		dojo.addClass(dojo.byId(addNodeId), "hide");
	}
	if (addInputId) {
		if (dojo.byId(addInputId)) {
			dojo.byId(addInputId).value = '';
		}		
	}
	
	toggleAdditionalInputdsmLink();
	placeLinkOnLastdsmField();
	toggleAdditionalInputIcdLink();
	placeLinkOnLastIcdField();
}

function toggleAdditionalInputdsmLink() {
	if(dojo.style(dojo.byId('dsm10'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('dsmLink'), "hide");
	} else {
		dojo.addClass(dojo.byId('dsmLink'), "hide");
	}
}

function toggleAdditionalInputIcdLink() {
	if(dojo.style(dojo.byId('icd10'), "display") == "none")
	{
		dojo.removeClass(dojo.byId('icdLink'), "hide");
	} else {
		dojo.addClass(dojo.byId('icdLink'), "hide");
	}
}

//jquery method to disable all elements within a parent div tag
function toggleStatusDisabled(node, divId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + divId + " :input";
    if (node.checked) {
    	jqq$(jDivId).attr('disabled', true);
    } else {
    	jqq$(jDivId).removeAttr('disabled');
    }   
}

//jquery method to enable all elements within a parent div tag
function toggleStatusEnabled(node, divId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + divId + " :input";
    if (node.checked) {
    	jqq$(jDivId).removeAttr('disabled');
    } else {
    	jqq$(jDivId).attr('disabled', true);
    }   
}

//jquery method to disable all elements within a parent div tag
function disableElements(divId) {
	var jqq$ = jQuery.noConflict();
	var jDivId = "#" + divId + " :input";
   	jqq$(jDivId).attr('disabled', true);
}

function initializeResearchTab() {

	initializeDiagnosisUI();
	
	console.log('................................ research tab initialized!');
}

function initializeDiagnosisUI() {

	disableElements('spcEdWrp');
	disableElements('ideaWrp');
	
	dojo.parser.parse("icdWrp");
	disableElements('icdWrp');
	
	dojo.parser.parse("dsmWrp");
	disableElements('dsmWrp');
	
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
    console.log('................................ toggleLinksEnabled completed');
}

//jquery method to disable all elements within a parent div tag
function disableLinks(linkCSS) {
	var jqq$ = jQuery.noConflict();
	//jqq$(linkCSS).attr('style', 'pointer-events: none;');
	jqq$( linkCSS ).hide();
    console.log('................................ disableLinks completed');
}

function checkForDiagnosisReset(node) {
    if (!node.checked) {
    	initializeDiagnosisUI();
    }	
}