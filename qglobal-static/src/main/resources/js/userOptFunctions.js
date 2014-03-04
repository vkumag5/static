/*
 * 
 * This file contains functions that support the database driven report options primarily used 
 * by the QLocal family of products.  The report options currently supported:
 * 
 * Single Report Option (implemented using <h:selectOneMenu ..> or <h:selectOneRadio ...>)
 * Multi Report Option  (implemented using <h:selectManyCheckbox ..>)
 * boolean Report Option (implemented using <h:selectBooleanCheckbox ..>)
 * Comparison Group Report Option (see xhtml file for details)
 * Cascading Report Option (implemented using <rich:tree ..> component, can contain any of the above options as nodes)
 * Enabling Report Options (implemented using <rich:tree ..> component, can contain any of the above options as nodes)
 * 
 * xhtml files located in the qglobal-platform-war project at src/main/webapp/userOptions 
 *
 * The data and objects used by the various components are managed by these primary platform classes:
 * 
 * ReportOptionsView
 * AbstractOptionsView
 * AbstractOptionsBO
 * 
 */

/*
 * 
 * TODO : Revisit "enabling" and "cascading" user report options and replace nodes with dijits instead of JSF components.  
 * This will remove a lot of this JavaScript code AND make the code more efficient.  The dijits will allow ID attributes
 * to be dynamically set. see comments on the initializeEnablingLeafLevelReportOptions(...) function below that describes issue.
 * Once in place, jquery can be used to locate the elements as needed and remove the hard coding.
 */

/*
 * TODO : These variables are hard coded and can be replaced by using the jquery API 
 */
this.topCascadingId = 'topCascadingId';
this.cascadingChild = 'cascadingChild';
this.topEnablingId = 'topEnablingId';
this.enablingChild = 'enablingChild';
this.eSelectOne = 'eSelectOne';
this.eSelectOneDD = 'eSelectOneDD';
this.eBoolean = 'eBoolean';
this.eMultiOpt = 'eMultiOpt';
this.radioBtnOptions = 4;

/*
 * Function enforces business rule on user report option where selection choices are limited.
 * User is presented with an alert box when selection exceeds allowed selection.
 */
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
			/*
			 * TODO : Use alert box css that is outlined in style guide.
			 */
			alert("Only " + this.max + " selections allowed.");
			return false;
		}
	}
	return true;
}

/*
 * Function initializes n levels of child report options for the "enabling" user report option.  
 * 
 * The basic functionality is responsible for enabling or disabling options that are configured for the report.  If a parent 
 * "enabling" node is checked or set to true, then the child element to that node should be enabled.
 * Otherwise, the child element should be disabled. The function also takes into account the business rule that some
 * "enabling" nodes will always be checked or set to true but are required to be disabled so that the user can't change it.  
 * 
 * Due to an issue with the ID attribute not dynamically set when JSF components such as <h:selectBooleanCheckbox ../> tags 
 * are used as nodes inside the Richfaces tree structures, the method is cumbersome, hard to understand, and unnecessarily verbose.
 * To overcome this issue with the ID attribute not usable in this case, a parent <div ../> tag is used with a 
 * custom attribute called "custom_title" - this attribute is used in lieu of the ID to identify the user report
 * options that are set (identified in the uiElementsList list).  See TO DO above for solution.
 * 
 * This function is invoked on the onbeforeshow attribute of the various report options modal panels.
 */
function initializeEnablingLeafLevelReportOptions(wrapperIdElement, uiElementsList) {

	console.log(".......................................... initializeEnablingLeafLevelReportOptions");

	//get raw list of element id's (built in AbstractOptionsView class)
	var enabled_element_list = uiElementsList.value;
	//split out into simple array
	enabled_element_array = enabled_element_list.split("~");
	//initialize array to contain full id of report options that should be enabled.
	var enabledElementsArray = new Array(enabled_element_array.length);
	//initialize array to contain options that need to always be disabled per the business rules.
	var disabledElementsArray = new Array(enabled_element_array.length); 

	/* 
	 * Retrieve elements that can be reset.  This data will be used to identify any fields that need to be disabled.
	 * See REPORT_OPTION database - min_selected and max_selected are equal.  If this condition is true for a given element,
	 * it will not be in this list and therefore should be disabled.
	 * 
	 * This list is managed by the platform and is implemented as a hidden input field on the "enabling" report options xhtml file.
	 */

	var jqq$ = jQuery.noConflict();
	try {
		var resetElements = jqq$('input[id*="eRstDfltVal"]');
	} catch  (e) {
		console.log("Error trying to retrieve eRstDfltVal array - " + e.message);
	}
	var resetJsonData = dojo.fromJson(resetElements[0].value);
	
	if (wrapperIdElement) {
		
		// find all elements that should be enabled or in some cases disabled (per the business rules) and place them in arrays
		var all = wrapperIdElement.getElementsByTagName('*');
		for (var i = -1, l = all.length; ++i < l;) {
			//inspect element and determine if enabled or disabled.
			loadEnabledPnlWrapperDiv(all[i], enabled_element_array, enabledElementsArray, disabledElementsArray, resetJsonData);
		}

		for (var i = -1, l = all.length; ++i < l;) { //blow through all the elements in enabled report option mark up.
			
			var skip = false;

			// Check if element should be enabled, if so set skip variable to true.
			for (var j = 0, k = enabledElementsArray.length; ++j < k;) { // if the element has been identified as set, assume it is available to user. 
				if (all[i].id == enabledElementsArray[j]) { 
					skip = true;
					break;
				} 
			}
			
			// Handle special case where element should be disabled per business rules, if so set skip variable to true.
			for (var j = 0, k = disabledElementsArray.length; ++j < k;) {
				if (all[i].id == disabledElementsArray[j]) {
					all[i].disabled = true;
					skip = true;
					break;
				}
			}
			
			// If the above loops did not identify the node as either enabled or disable, then disable.
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

/*
 * 
 * Function identifies elements that are a parent DIV to a user report option used as a node with in the <rich:tree ../> component.
 * If the element is a parent div, the children user report option node is inspected to determine if it can be enabled or disabled.
 * 
 * The notion of using a parent div tag is due to an issue with the ID attribute not dynamically set when JSF components 
 * such as <h:selectBooleanCheckbox ../> tags are used as nodes inside the Richfaces tree structures.  To overcome this issue with 
 * the ID attribute not usable in this case, a parent <div ../> tag is used with a custom attribute called "custom_title"
 * - this attribute is used in lieu of the ID.  See TO DO at top to clean up this issue.
 * 
 */
function loadEnabledPnlWrapperDiv(element, enabled_element_array, enabledElementsArray, disabledElementsArray, resetJsonData) {

	
	var title = element.getAttribute('custom_title');
	if (title == null) {
		title = element.getAttribute('title');
	}
	
	if (element.id.search(/pnlSingle/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (title == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlSingleDD/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (title == enabled_element_array[x]) { 
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlBoolean/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (title == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)){
						break;
					}
				}
			}
		} else if (element.id.search(/pnlMulti/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (title == enabled_element_array[x]) {
					if (isEnabledElementInDiv(element, enabledElementsArray)) {
						break;
					}
				}
			}
		} else if (element.id.search(/pnlEnabling/) > 0) {
			for (var x = -1, y = enabled_element_array.length; ++x < y;) {
				if (title == enabled_element_array[x]) {
					var optIdArry = title.split('_');
					// use resetJsonData to identify special cases where the element node needs to be disabled.
					if (optIdArry) {
						if (optIdArry[optIdArry.length-1] in resetJsonData) {
							break; // do not disable since element is in the resetJsonData
						} else {
							if (isDisabledEnabledElementInDiv(element, disabledElementsArray)) { // do disable if not in the resetJsonData AND it's value is checked.
								break;
							}
						}
					}
				}
			}
		}
}

/*
 * Add elements to enabled array if they are set.
 */
function isEnabledElementInDiv(pnlDiv, enabledElementsArray) {
	var foundElement = false;
	if (pnlDiv) {
		var pnlAll = pnlDiv.getElementsByTagName('*'); 
		for (var a = -1, b = pnlAll.length; ++a < b;) { // loop reads through report options inside the panel div.
			
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

/*
 * Function is responsible for identifying elements who need to be disabled per the business rules.
 * see REPORT_OPTION database - min_selected and max_selected are equal.  If this condition is true, the element
 * should be disabled and never allowed to be changed by the user.
 */
function isDisabledEnabledElementInDiv(pnlDiv, disabledElementsArray) {
	var foundElement = false;
	if (pnlDiv) {
		var pnlAll = pnlDiv.getElementsByTagName('*');
		for (var a = -1, b = pnlAll.length; ++a < b;) {
		    if (pnlAll[a].id.search(/enablingChild/) > 0) { // only applies to enabling check boxes
		    	disabledElementsArray.push(pnlAll[a].id);
				foundElement = true;
			}
		}
	}
	
	return foundElement;
}

function userOptTopCascadingSelection(id, rptId, children) {
	var idTag = ":" + this.topCascadingId + "_" + rptId;
	handleCascadingSelection(id, idTag, children, ":eTNA:eRTNA:"); //use jquery to remove necessity for hard coding dependencies on richfaces generated ids.
}

function userOptCascadeSelection(id, children) {
	handleCascadingSelection(id, "::" + this.cascadingChild, children, ":eRTNA:");  //use jquery to remove necessity for hard coding dependencies on richfaces generated ids.
}

/*
 * Function handles cascading logic to child nodes.
 */
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

/*
 * Function handles enabling selection logic to child nodes.
 */
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
