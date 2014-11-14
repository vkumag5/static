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

function fnConvertResearchDiagnosisEntryFormToJSON(historyFormId, jsonId) {
    var formJson = dojo.formToJson(historyFormId);
    document.getElementById(jsonId).value = formJson;
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
		}
		else {
			var oldValue = formValsLocal[FVIndex].VALUE; 
			if (nodeValue != oldValue){
				resFormValues[FVIndex].VALUE = nodeValue;
			}
		}
	}
}

//This approach to capturing inputs is required due to tabs with different purposes under the same form.
function updateResearchJSONString() { //fires upon save 
//	console.log("updateResearchWritersJSONString ........................... saving entered data");
	var formJsonData = null;
	if (dojo.byId("researchJsonFormData")) {
		formJsonData = dojo.byId("researchJsonFormData");
	} else if (dojo.byId("researchJsonFormData")) {
		formJsonData = dojo.byId("researchJsonFormData");
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
		//update JSON string with diagnosis entered flag if data was entered.
		checkForDiagnosisTabElementsEntered("diagInfo");
	}
}

function initializeResearchTabs() {
	//initializeDiagnosisUI();
	reloadResearchTab();
}	

// Unfortunately a lot of hard coding of ID's.  This is needed to initialize all the fields.
function reloadResearchTab() {
	formJsonData = "researchJsonFormData";
	
	try {
	dojo.parser.parse("researchInfo");
	} catch (e) {}	
	fnConvertResearchJsonToTab(formJsonData, "researchInfo");
	initializeResearchOtherFields();
	toggleNoResearchSelection('research.ng_reason_noreason', 'rshResWrpDiv');	

	try {
	dojo.parser.parse("diagInfo");
	} catch (e) {}	
	fnConvertHistoryJsonToTab(formJsonData, "diagInfo");
	initializeDiagnosisOtherFlds();	
	
	//toggleNoDiagnosisSelection('noDiag', 'diagWithheld', 'diagWrpDiv');	
	//disableRelatedElement('noDiag', 'diagWithheld');
	//disableRelatedElement('diagWithheld', 'noDiag');
}


function initializeResearchOtherFields() {
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_ac_other'), false, 'research.ac_Other', 'research.ac_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_ce_other'), false, 'research.ce_Other', 'research.ce_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_bc_other'), false, 'research.bc_Other', 'research.bc_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_mh_other'), false, 'research.mh_Other', 'research.mh_Other_Wrp');	
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_dd_other'), false, 'research.dd_Other', 'research.dd_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_lc_other'), false, 'research.lc_Other', 'research.lc_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_sc_other'), false, 'research.sc_Other', 'research.sc_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_pc_other'), false, 'research.pc_Other', 'research.pc_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_sa_other'), false, 'research.sa_Other', 'research.sa_Other_Wrp');
	manageRschChkBoxRelatedOtherField(dojo.byId('research.ng_reason_em_other'), false, 'research.em_Other', 'research.em_Other_Wrp');	
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
			//console.log('No JSON data to parse out to tab ......');
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
function manageDiagnosisChkBoxRelatedOtherField(node, nodeIsOther, focus, relatedOtherField, relatedOtherFieldWrp) { //determines whether related other field should be enabled
	var nodeSelected = false;
	if (node.checked && (nodeIsOther)) {
		nodeSelected = true;
	}	
	if (nodeSelected) {
		if (dijit.byId(relatedOtherField)) {
			dojo.removeClass(dojo.byId(relatedOtherFieldWrp), "hide");
			dijit.byId(relatedOtherField).required = true;
		}
		if (focus) {
			dojo.byId(relatedOtherField).focus();
		}
	}
	else {
		if (dijit.byId(relatedOtherField)) {
			dojo.byId(relatedOtherField).value = "";
			dojo.addClass(dojo.byId(relatedOtherFieldWrp), "hide");
			dijit.byId(relatedOtherField).required = false;
			dijit.byId(relatedOtherField).reset();
		}
	}
}
function initializeDiagnosisOtherFlds() {
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_as_other"), 'Other', false, 'ng_diag_as_other_txt', 'ng_diag_as_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_be_other"), 'Other', false, 'ng_diag_be_other_txt', 'ng_diag_be_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_id_other"), 'Other', false, 'ng_diag_id_other_txt', 'ng_diag_id_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_ldd_other"), 'Other', false, 'ng_diag_ldd_other_txt', 'ng_diag_ldd_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_ld_other"), 'Other', false, 'ng_diag_ld_other_txt', 'ng_diag_ld_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_mr_other"), 'Other', false, 'ng_diag_mr_other_txt', 'ng_diag_mr_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_md_other"), 'Other', false, 'ng_diag_md_other_txt', 'ng_diag_md_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_pd_other"), 'Other', false, 'ng_diag_pd_other_txt', 'ng_diag_pd_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_sc_other"), 'Other', false, 'ng_diag_sc_other_txt', 'ng_diag_sc_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_sp_other"), 'Other', false, 'ng_diag_sp_other_txt', 'ng_diag_sp_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_sa_other"), 'Other', false, 'ng_diag_sa_other_txt', 'ng_diag_sa_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_tb_other"), 'Other', false, 'ng_diag_tb_other_txt', 'ng_diag_tb_otherWrp');
	manageDiagnosisChkBoxRelatedOtherField(dojo.byId("ng_diag_ot_other"), 'Other', false, 'ng_diag_ot_other_txt', 'ng_diag_ot_otherWrp');
}

function checkForDiagnosisTabElementsEntered(tabId) { //if elements exist, add marker to JSON string. This will be used by platform diagnosis ETL process. 
	var formJsonData = null;
	if (dojo.byId("researchJsonFormData")) {
		formJsonData = dojo.byId("researchJsonFormData");
	} else if (dojo.byId("researchJsonFormData")) {
		formJsonData = dojo.byId("researchJsonFormData");
	}
	if (formJsonData != null && (formJsonData != "{}" || formJsonData != "{ }" || formJsonData != "")) {

		JsonData = dojo.fromJson(formJsonData.value); //save the current JSON string into a temporary JS object that will be manipulated here 

		if (tabId in JsonData) { //clear out tabid before checking
			delete JsonData[tabId];
		}
		
		queryString = '[id^="' + tabId + '"]';
		
		var nodeList = dojo.query(queryString).query("*");

		for (var i = 0; i<nodeList.length; i++) {

			var element = nodeList[i];
			
			try {
				var nodeId = element.getAttribute("id");
			} catch(e) {
				var nodeId = element.domNode.getAttribute("id"); //if it's a Dijit
			}

			if (nodeId) {  
				if (nodeId in JsonData) { //if the JSON string exists, add tab id and break out of loop.
					JsonData[tabId] = '1'; 
					break;
				} 
			}
		}
		
		var revisedJson = dojo.toJson(JsonData);
		dojo.attr(formJsonData, "value", revisedJson);
	}		
}
