this.topCascadingId = 'topCascadingId';
this.cascadingChild = 'cascadingChild';
this.topEnablingId = 'topEnablingId';
this.enablingChild = 'enablingChild';
this.eSelectOne = 'eSelectOne';
this.eSelectOneDD = 'eSelectOneDD';
this.eBoolean = 'eBoolean';
this.eMultiOpt = 'eMultiOpt';
this.radioBtnOptions = 4;



function userOptMultiValidate(id, label, min, max, numOpts) {

	this.id = id;
	this.label = label;
	this.min = min;
	this.max = max;
	this.numOpts = numOpts;

	var selectCt = 0;
	for (var idx = 0; idx < this.numOpts; idx++) {
		var chkBoxID = this.id + ":" + idx;
		if (document.getElementById(chkBoxID).checked) {
			selectCt++;
		}
		if (selectCt > this.max) {
			alert("Only " + this.max + " selections allowed.");
			return false;
		}
	}
	return true;
}

function userOptTopCascadingSelection(id, rptId, children) {
	var idTag = ":" + this.topCascadingId + "_" + rptId;
	handleCascadingSelection(id, idTag, children, ":eTNA:eRTNA:");
}

function userOptCascadeSelection(id, children) {

	handleCascadingSelection(id, "::" + this.cascadingChild, children, ":eRTNA:");

}

function initializeEnablingLeafLevelReportOptions(wrapperIdElement, uiElementsList) {

	//get raw list of element id's (built in AbstractOptionsView)
	var enabled_element_list = uiElementsList.value;
	//split out into simple array
	enabled_element_array = enabled_element_list.split("~");
	//create array to contain full id of report options that should not be disabled.
	var enabledElementsArray = new Array(enabled_element_array.length);
	var disabledElementsArray = new Array(enabled_element_array.length); //enabled options that need to always be disabled.
	
	if (wrapperIdElement) {
		
		// find all elements that should not be disabled by default and place them in enabledElementsArray
		var all = wrapperIdElement.getElementsByTagName('*');
		for (var i = -1, l = all.length; ++i < l;) {
			loadEnabledPnlWrapperDiv(all[i], enabled_element_array, enabledElementsArray, disabledElementsArray);
		}
		
		for (var i = -1, l = all.length; ++i < l;) {
			
			var skip = false;

			// Check if element should not be disabled, if so skip
			for (var j = 0, k = enabledElementsArray.length; ++j < k;) {
				if (all[i].id == enabledElementsArray[j]) {
					skip = true;
					break;
				} 
			}
			
			// Check if enabled element should be disabled, if so skip
			for (var j = 0, k = disabledElementsArray.length; ++j < k;) {
				if (all[i].id == disabledElementsArray[j]) {
					console.log("trying to disable .... " + disabledElementsArray[j]);
					//disable the Enabled report option
					all[i].disabled = true;
					skip = true;
					break;
				}
			}
			
			if (!skip) {
				if (all[i].id.search(/eSelectOne/) > 0) {
					if (all[i].tagName != 'TABLE') {
						all[i].disabled = true;
					}
				} else if (all[i].id.search(/eSelectOneDD/) > 0) {
					all[i].disabled = true;
				} else if (all[i].id.search(/eBoolean/) > 0) {
					all[i].disabled = true;
				} else if (all[i].id.search(/eMultiOpt/) > 0) {
					all[i].disabled = true;
				}
			} 
		}
		
	}
	

}

function loadEnabledPnlWrapperDiv(element, enabled_element_array, enabledElementsArray, disabledElementsArray) {

	if (element.id.search(/pnlSingle/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (element.getAttribute('custom_title') == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlSingleDD/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (element.getAttribute('custom_title') == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlBoolean/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (element.getAttribute('custom_title') == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)){
						break;
					}
				}
			}
		} else if (element.id.search(/pnlMulti/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (element.getAttribute('custom_title') == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlEnabling/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (element.getAttribute('custom_title') == enabled_element_array[x]) {
					if (isDisabledEnabledElementInDiv(element, disabledElementsArray)) {
						break;
					}
				}
			}
		}
}
 
function isEnabledElementInDiv(pnlDiv, enabledElementsArray) {
	var foundElement = false;
	if (pnlDiv) {
		var pnlAll = pnlDiv.getElementsByTagName('*');
		for (var a = -1, b = pnlAll.length; ++a < b;) {
			
			if (pnlAll[a].id.search(/eSelectOne/) > 0) {
				enabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			} else if (pnlAll[a].id.search(/eSelectOneDD/) > 0) {
				enabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			} else if (pnlAll[a].id.search(/eBoolean/) > 0) {
				enabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			} else if (pnlAll[a].id.search(/eMultiOpt/) > 0) {
				enabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			} 
		}
	}
	
	return foundElement;
}

function isDisabledEnabledElementInDiv(pnlDiv, disabledElementsArray) {
	var foundElement = false;
	if (pnlDiv) {
		var pnlAll = pnlDiv.getElementsByTagName('*');
		for (var a = -1, b = pnlAll.length; ++a < b;) {
			
		    if (pnlAll[a].id.search(/enablingChild/) > 0) {
		    	disabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			}
		}
	}
	
	return foundElement;
}

function handleCascadingSelection(id, idTag, childrenSize, childrenTags) {
	this.idCasString = id;
	this.childrenSize = childrenSize;

	var selectCas = 0;
	for (var idx = 0; idx < this.childrenSize; idx++) {
		var chkBoxID = this.idCasString.replace(idTag, childrenTags + selectCas + "::" + this.enablingChild);
		if (!document.getElementById(chkBoxID).disabled){
			document.getElementById(chkBoxID).checked = document.getElementById(id).checked;
			userOptEnablingSelection(chkBoxID);
		}
		selectCas++;
	}
}

function userOptTopEnablingSelection(id, rptId) {
	var idTag = ":" + this.topEnablingId + "_" + rptId;
	handleEnablingSelection(id, idTag, ":eTNA:eRTNA:");
}

function userOptEnablingSelection(id) {
	handleEnablingSelection(id, "::" + this.enablingChild, ":eRTNA:");
}

function handleEnablingSelection(id, idTag, childrenTags) {
	this.idString = id;
	var selectCt = 0;
	var childFound = true;
	while (childFound){

		childFound = false;
		
		var radioCnt = 0;
		for (var chkIdx = 0; chkIdx < this.radioBtnOptions; chkIdx++) {
			var selectOne = this.idString.replace(idTag, childrenTags + selectCt + "::" + this.eSelectOne + ":" + radioCnt);
			if (document.getElementById(selectOne)) {
				document.getElementById(selectOne).disabled = !document.getElementById(id).checked;
				childFound = true;
			} 
			radioCnt++;
		}
		
		var selectOneDD = this.idString.replace(idTag, childrenTags + selectCt + "::" + this.eSelectOneDD);
		if (document.getElementById(selectOneDD)) {
			document.getElementById(selectOneDD).disabled = !document.getElementById(id).checked;
			childFound = true;
		}

		var booleanSelect = this.idString.replace(idTag, childrenTags + selectCt + "::" + this.eBoolean);
		if (document.getElementById(booleanSelect)) {
			document.getElementById(booleanSelect).disabled = !document.getElementById(id).checked;
			childFound = true;
		}

		var multiCnt = 0;
		var optionsFound = true;
		while (optionsFound) {
			optionsFound = false;
			var multiSlt = this.idString.replace(idTag, childrenTags + selectCt + "::" + this.eMultiOpt + ":" + multiCnt);
			if (document.getElementById(multiSlt)) {
				document.getElementById(multiSlt).disabled = !document.getElementById(id).checked;
				optionsFound = true;
				childFound = true;
			} 
			multiCnt++;
		}
		
		selectCt++;
		
	}
}