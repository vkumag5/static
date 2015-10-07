var userPreferences = [];
userPreferences['showEdit'] = function() {
	$('preferences-details').hide();
	$('edit-preferences-details').show();
	dropdownSelect($('userPreferencesForm:edit-value-examiner'), $('userPreferencesForm:edit-value-examiner').previous().innerHTML);
};
userPreferences['showView'] = function() {
	$('edit-preferences-details').hide();
	$('preferences-details').show();
};
userPreferences['refresh'] = function() {
	if (userPreferences['checkMessages']()) {
		userPreferences['showEdit']();
	} else {
		userPreferences['showView']();
	}
};
userPreferences['cancelChanges'] = function() {
	userPreferences['clearMessages']();
	$$('.hidden-data').each(function(el, i) {
		userPreferences['setData'](el.next(), el.innerHTML);
	});
};
userPreferences['setData'] = function(el, data) {
	if (el.tagName == 'SPAN' || el.tagName == 'span') {
		userPreferences['setData'](el.children[0], data);
	} else if (el.tagName == 'SELECT' || el.tagName == 'select') {
		el.selectedIndex = data;
	} else if (el.tagName == 'INPUT' || el.tagName == 'input') {
		el.value = data;
	} else {
		el.innerHTML = data;
	}
};
userPreferences['checkMessages'] = function() {
	return isRichMessagePresent();
};
userPreferences['clearMessages'] = function() {
	return clearAllRichMessages();
};

function isRichMessagePresent() {
	var check = false;
	$$('.rich-message-label, .rich-messages-label').each(function(el, i) {
		if (el.innerHTML.length > 0) {
			check = true;
		}
	});
	return check;
}

function clearAllRichMessages() {
	var check = false;
	$$('.rich-message-label, .rich-messages-label').each(function(el, i) {
		if (el.innerHTML.length > 0) {
			el.innerHTML = '';
			check = true;
		}
	});
	return check;
}

function dropdownSelect(e, val) {
	$A(e.childNodes).each(function(el, i) {
		// alert(el.attributes.getNamedItem('selected').nodeValue);
		if(el.value == val) {
			e.selectedIndex = i;
		}
	});
}

var editExaminee = [];
editExaminee['assignCurrentDob'] = function() {
	editExaminee['currentDob'] = $('calendarInputDate').value;
	// $('editExamineeForm:calendarmsg').children('span')[0].innerHTML = "";
};
editExaminee['checkDateEquals'] = function(dob1, dob2) {
	//return Date.parse(dob1) == Date.parse(dob2);
	return dob1 == dob2;
};
editExaminee['checkDobEquals'] = function() {
	return editExaminee['checkDateEquals']($('calendarInputDate').value,
			editExaminee['initDob']);
};
editExaminee['checkDobFormat'] = function() {
	return checkDate($('calendarInputDate').value,
			$('calendarInputDate'));
};
editExaminee['oncompleteDob'] = function() {
	if ($('calendarInputDate').value.length == 0) {
		$('calendarmsg').select('span')[0].innerHTML = "Date of Birth should not be blank";
	} else if (!this.checkDobFormat()) {
		$('calendarmsg').select('span')[0].innerHTML = "Invalid Format";
		$('age').innerHTML = "";
		return false;
	} else {
		return true;
	}
};

var addExaminee = [];
addExaminee['checkDobFormat'] = function() {
	return checkDate($('calendarInputDate').value,
			$('calendarInputDate'));
};
addExaminee['oncompleteDob'] = function() {
	if ($('calendarInputDate').value.length == 0) {
		$('calendarmsg').select('span')[0].innerHTML = "Date of Birth should not be blank";
	} else if (!this.checkDobFormat()) {
		$('calendarmsg').select('span')[0].innerHTML = "Invalid Format";
		$('age').innerHTML = "";
		return false;
	}
};

var updateAccount = [];
updateAccount['checkDirectBilling'] = function(element, state) {
	if (element == null) {
		return;
	}
	var formName = element.up('form').name;
	element.checked = state;
	updateAccount['toggleDirectBilling'](element);
};
updateAccount['toggleDirectBilling'] = function(element) {
	if (element == null) {
		return;
	}
	var formName = element.up('form').name;
	if ($(formName + ':directBillingCheckBx').checked) {
		$(formName + ':accountNumberPanel').show();
		if (!$(formName + ':acctnoTxt').disabled) {
			$(formName + ':acctnoTxt').value = '';
		}
		// $(formName+':accountNumberPanel2').disabled = false;
		$(formName + ':accountNumberPanel2').show();
	} else {
		$(formName + ':accountNumberPanel').hide();
		if (!$(formName + ':acctnoTxt').disabled) {
			$(formName + ':acctnoTxt').value = '';
		}
		// $(formName+':accountNumberPanel2').disabled = true;
		$(formName + ':accountNumberPanel2').hide();
	}
};
updateAccount['onclickSave'] = function(element) {
	try {
		this.disabled = true;
		var formName = element.up('form').name;
		if (!$(formName + ':acctTreeBtn').disabled
				&& !$(formName + ':directBillingCheckBx').checked
				&& $(formName + ':parentAcctTxt').value == '') {
			alert('When parent is not available, direct billing needs to be available.');
			return false;
		} else {
			return true;
		}
	} catch (err) {
		return true;
	}
};

// MM/dd/yyyy
function checkDate(strValue, obj) {
	try {
		// var objRegExp = /^\d{1,2}(\/)\d{1,2}(\/)\d{2,4}$/;
		var objRegExp = /^(0?[1-9]|1[0-2])(\/)(0?[1-9]|[12]\d|3[01])(\/)(\d{4})$/;
		if (strValue.length > 0) {
			if ((!objRegExp.test(strValue))
					|| (!(strValue.length > 5 && strValue.length < 11))) {
				// alert('Invalid Date');
				// obj.focus();
				// selectFocus(obj);
				return false;
			}
		}
		return true;
	} catch (e) {
		return false;
	}
}

function checkDatedForAge(strValue, obj) {
	try {
		// var objRegExp = /^\d{1,2}(\/)\d{1,2}(\/)\d{2,4}$/;
		var objRegExp = /^(0?[1-9]|1[0-2])(\/)(0?[1-9]|[12]\d|3[01])(\/)(\d{4})$/;
		if ((!objRegExp.test(strValue))
				|| (!(strValue.length > 5 && strValue.length < 11))) {
			// alert('Please Enter Valid Date in Format(MM/DD/YYYY)');
			// obj.focus();
			// selectFocus(obj);
			return false;
		} else {
			calculateAge();
			return true;
		}
		return true;
	} catch (e) {
		return false;
	}
}

function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [ curtop ];
	}
}

function focusOnSaveError(el) {
	var formName = el.up('form').name;
	var focussed = false;
	$$('.rich-message-label').each(function(el, i) {
		if (!focussed && el.innerHTML > 0) {
			el.focus();
		}
	});
}

function isBundleFormValid() {
	return validateBundleForm();
}

function hideTerms() {
	$('agreements:termsPanel').hide();
	if ($('acceptTermsId')) {
		$('acceptTermsId').checked = true;
	}
	if ($('registerMain')) {
		$('registerMain').show();
	}
}

function showTerms() {
	$('agreements:termsPanel').show();
}

function agreementsAcceptCheck() {
	var enableAccept = true;
	$$('.agreement-accept').each(function(e, i) {
		if (!e.checked) {
			enableAccept = false;
		}
	});
	if ($('agreements:acceptButton')) {
		if (enableAccept) {
			$('agreements:acceptButton').enable();
			$('agreements:acceptButton').style.cursor = 'pointer';
		} else {
			$('agreements:acceptButton').disable();
			$('agreements:acceptButton').style.cursor = 'auto';
		}
	}
}

function destroyContainerWidgets() {
	try {
		dijit.registry.forEach(function(w) {
			w.destroy(false);
		});		
	} catch (e) {
	}
}

function fnConvertJsonToForm(dataElementId, htmlFormId) {
	try {
		var keyPrefix = 'Response.';
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
					jsonValue = serverJson[elName.replace(keyPrefix,'')];
				}
				if(jsonValue == undefined || jsonValue == null) {
					jsonValue = '';
				}
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

	} catch (e) {
		// eat the exception. This is will be thrown when there is no JSON data.
		// alert(e);
		console.log('Error while converting JSON to Form - '+e.message);
	}
}

function destroyReportOptionWidgets(htmlFormId) {
	try {
	if (htmlFormId == null || htmlFormId == 'undefined') {
		    htmlFormId = bundleReportOptionsForm;
	}
	dojo.forEach(dijit.byId(htmlFormId).getDescendants(), function(widget){
    widget.destroyRecursive();
	});
	dijit.byId(htmlFormId).destroy();
	}
	catch(e)	{
	console.log(e);
	}
}

function checkDateforAssessment(strInputText, strMsgField, strFormName) {
	try {
		var objText = $(strFormName + ':' + strInputText);
		var objMsg = $(strFormName + ':' + strMsgField);

		if (!checkDate(objText.value, objText)) {
			(objMsg).select('span')[0].innerHTML = "Invalid Date";
			return false;
		}

		(objMsg).select('span')[0].innerHTML = "";
		return true;
	} catch (e) {
		(objMsg).select('span')[0].innerHTML = "Invalid Date";
		return false;
	}
}





function imposeMaxLength(Object, MaxLen)
{
  return (Object.value.length <= MaxLen);
}

function findDojoTabContainer() {
	var tabDiv = null;
	try {
		for ( var i = 0; i < $(bundleHTMLFormId).children.length; i++) {
			if ($(bundleHTMLFormId).children[i].attributes.getNamedItem('dojoType')) {
				if ($(bundleHTMLFormId).children[i].attributes.getNamedItem('dojoType').nodeValue == 'dijit.layout.TabContainer') {
					tabDiv = $(bundleHTMLFormId).children[i];
				}
			}
		}
	} catch (e) {
	}
	return tabDiv;
}

function fixStyles(upperDiv) {
  try {
	var tabDiv = findDojoTabContainer();
	if(tabDiv==null) {
		return;
	}
	tabDiv.style.width = (parseInt($(upperDiv).style.width) - 20) + 'px';
	if (parseInt(tabDiv.style.height) > parseInt($(upperDiv).style.height)) {
		tabDiv.style.height = $(upperDiv).style.height;
	}
	} catch(e) {}
}

function setCommandButtonEnabled(el, enable) {
	try {
		if (enable == true) {
			enableCommandButton(el);
		} else {
			disableCommandButton(el);
		}
	} catch (e) {
	}
}

function disableCommandButton(el) {
	el.disable();
	el.up().disabled = true;
}

function enableCommandButton(el) {
	el.enable();
	el.up().disabled = false;
}

function selectDojoTabByIndex(tabContainer, tabIndex) {
	tabContainer.selectChild(tabContainer.getChildren()[tabIndex]);
}

function selectDojoTab(tabContainer, tabTitle) {
	var totalTabs = tabContainer.getChildren().length;
	if(totalTabs > 1) {
		var indexToSelect = 0;
		for(var i = 0; i<tabContainer.getChildren().length; i++) {
			if(tabContainer.getChildren()[i].title==tabTitle){
				indexToSelect = i;
			}
 
		}
		selectDojoTabByIndex(tabContainer,indexToSelect);
	}
}

function killBackSpace(e) {
	var e = e || window.event;
	var t = e.target? e.target : e.srcElement? e.srcElement : null;
	if(t && t.tagName && (t.type && /(password)|(text)|(file)/.test(t.type.toLowerCase())) || t.tagName.toLowerCase() == 'textarea'){
		return true;
			   }
	if(e.keyCode == 8) 
   	{ 
   	return false; 
   	}
       return true; 
}

function checkRadioSelected(el) {
	return el.attributes.getNamedItem('type').nodeValue=='radio' 
		&& el.attributes.getNamedItem('checked') 
		&& (el.attributes.getNamedItem('checked').nodeValue==true 
				|| el.attributes.getNamedItem('checked').nodeValue=='checked');
}

function resetForm() {
	try {
		dijit.byId(bundleHTMLFormId).reset();
		$$('#' + bundleHTMLFormId + ' input').each(function(el){
			if(checkRadioSelected(el)){
				el.checked = true;
			}
		});
		$$('#' + bundleHTMLFormId + ' select').each(function(el){
			el.selectedIndex = 0;
		});
		if(typeof(initializeForm) != 'undefined') {
			initializeForm();
		}
	} catch(e) {
		console.log(e);
	}
}

function groupAssOncompleteAction(noResetTab) {
	try {
		var title = dijit.byId("tabContainer").selectedChildWidget.title;
		
		resetForm();
		
		resetDojoTabsBackgrounds();
		
		processAfterParsing();
		
		// select First tab here
		if(noResetTab) {
			selectDojoTab(dijit.byId(bundleHTMLFormId).getChildren()[0],title); //set tab with original tab after reseting form
		} else {
			resetTabSelection();
		}
	} catch(e) {
		console.log(e);
	}
}

function resetTabSelection() {	
	selectDojoTabByIndex(dijit.byId(bundleHTMLFormId).getChildren()[0], 0);
}

function showProgressModal() {	
	Richfaces.showModalPanel('spinnerModal');
}

function hideProgressModal() {	
	Richfaces.hideModalPanel('spinnerModal');	
}

function showProgressIcon(showTime, showAfter, doMe) {
	try {
		if(showAfter && showAfter > 0) {
			setTimeout("showProgressModal();", showAfter);
		} else {
			showProgressModal();
		}
		if(showTime) {
			if(doMe) {
				hideProgressIcon(showTime, doMe);
			} else {
				hideProgressIcon(showTime);
			}
		}
	} catch(e) {
		// console.log(e);
	}
}

function hideProgressIcon(hideAfter, doMe) {
	try {
		if(hideAfter && hideAfter > 0) {
			if(doMe) {
				doMeAfterHideProgress = doMe;
				setTimeout("hideProgressModal(); doMeAfterHideProgress();", hideAfter);
			} else {
				setTimeout("hideProgressModal();", hideAfter);
			}
		} else {
			hideProgressModal();
		}
	} catch(e) {
		// console.log(e);
	}
}

var bundleHTMLFormId = "myform";
var bundleReportOptionsForm = "reportOptionsForm";

/**
 * This function has been written to fix the Dojo 1.5 defect wherein combination of 
 * dijit.form.Form, dijit.layout.TabContainer, and dijit.layout.ContentPane would get distorted 
 * after parsing. 
 * 
 * This function just calls resize() on all widgets. 
 */
function fixDojoFormTabContainerContentPaneProblem(htmlFormId) {
	 try {		 
		 if (htmlFormId == null || htmlFormId == 'undefined') {
			 htmlFormId = bundleHTMLFormId;
		 }

		 dojo.query('.dijitTabListContainer-top').forEach(function(node, index, arr){
			 node.style.visibility = 'hidden';
		 });
		 
		 if (dijit.byId(htmlFormId)) {

			 // A delay of 800ms is given. 
		     setTimeout(function() { 
		    	 dojo.forEach(dijit.byId(htmlFormId).getChildren(), 
		    		function(child){ 
		    			if (child.resize) { // Some child objects don't have a resize method, so this must be checked first
		    		 		child.resize(); 
		    		 	}
		 			}); 
		    	 
		    	 dojo.query('.dijitTabListContainer-top').forEach( 
				 	function(node, index, arr){ 
				 		node.style.visibility = 'visible';
				 	});   	 
		    	 
		     } ,800);
		 }
	     
	     dojo.query('.dijitTabContainer').forEach(
			 function(node, index, arr){
				 node.style.cssFloat = 'left';
			 });
	 } catch (e) {
		 
		 console.log(" Problem with resizing the dojo widgets - "+e);
	 }
}


function setFormMode(htmlFormId, isViewMode) {
	var formViewModeFlag;
	try {
	    if(!$(htmlFormId)) { return; }
	    if(isViewMode == 'true') {                    
	        $(htmlFormId).disable();
	        toggleSelectWidgets(true);
		formViewModeFlag=true;
	        //dijit.byId(htmlFormId).disable();
	    } else {
	        $(htmlFormId).enable();
	        toggleSelectWidgets(false);
		formViewModeFlag=false;
	        //dijit.byId(htmlFormId).enable(); 
	    }
	return formViewModeFlag;
	} catch (e) {
		console.log('Problem setting form mode - '+e);
	}
}

function toggleSelectWidgets(isDisabled) {
	
	var selectWidgets = getDojoWidgetsByType('dijit.form.Select');
	var disabled = isDisabled ? 'disabled' : null;
	
	if (selectWidgets) {
		for (var i = 0; i < selectWidgets.length; i++) {
			selectWidgets[i].disabled = disabled; 
		}		 
	}
}

function getDojoWidgetsByType(widgetType) {	
	var widgets = new Array();
	if (widgetType == 'dijit.form.Select') {
		var selectWidgets = $$('.dijitSelect');
		for ( var i = 0; i < selectWidgets.length; i++) {			
			widgets[i] = dijit.byId(selectWidgets[i].id);
		}		
		return widgets;
	} else {
		return null;
	}
	
}

var defaultJson = '';

function readDefaultJSON() {
	if(defaultJson == '') {
    	defaultJson = dojo.formToJson(bundleHTMLFormId);
    }
}

var defaultReportJson = '';

function readDefaultReportJSON(){
   try{
	   defaultReportJson = dojo.formToJson(getReportOptionHtmlFormId());
   } catch(e){}	
    
}


function readDefaultJSONForReport(htmlFormId) {
	if(htmlFormId != null && htmlFormId != 'undefined'){
		defaultJson = dojo.formToJson(htmlFormId);
	}
}

function fnPerformHTMLValidation(){
	var isValid = false;
    try {
        isValid = isBundleFormValid();
    } catch(e) {
        console.log(e);
    }
    return isValid;
}

/**
 * This method invokes the Bundle HTML function onFormLoad() after initial loading and passes true it JSON is empty. 
 * @param initialJSON
 */
function invokeBundleHTMLOnLoad(initialJSON) {
	try {		
		onFormLoad(initialJSON == '' ? true : false);
	} catch (e) {
		console.log("Either onFormLoad() doesn't exist or there is an error in it - "+ e);
	}
}

function dojoParseElement(el) {
	console.log("Start parsing " + el + " : " + new Date());
   try {
       dojo.parser.parse(el);
   } catch(e) {
	   console.log(e);
   }
	console.log("End parsing " + el + " : " + new Date());
}

function functionToWrapErrorsToConsole(functionObject) {
	return functionObject.wrap(function(proceed, args){
		try {
			return proceed(args);
		} catch(e) {
			console.log(e);
		}
	});
}

function wrapErrorsToConsole(functionName) {
	defineWrapErrorsToConsole(eval(functionName), functionName);
}

function defineWrapErrorsToConsole(functionObject, newFunctionName) {
	try {
		var wrappedFunction = function() {
			try {
				console.log('Start function : ' + newFunctionName + " : at " + new Date());
				return functionObject.apply(arguments.callee, arguments);
			} catch(e) {
				console.log(e);
			} finally {
				console.log('End function : ' + newFunctionName + " : at " + new Date());
			}
		};
		eval(newFunctionName + ' = wrappedFunction;');
	} catch(e) {
		console.log(e);
	}
}

function resetDojoTabsBackgrounds() {
	$$('.dijitTabContent div').each(function(el){dojo.style(el, "backgroundColor", "");});
}


/**
 * This method resolves the problem of Report Options HTML form name. 
 * 
 * For Sprint 10, product bundles must have a HTML form Id other than 'myform'. 
 * Sprint 9 code should work with 'myform' as form Id and also with 'reportOptionsForm' as form id. 
 * 
 * This method is used to resolve the conflict and is used in Report Options Modal Panel Javascripts. 
 * 
 * NOTE - This method can be discarded once the Form Element naming in Product Bundles is sorted out. 
 * While removing the code necessary changes must be done in Report Option Modal Panel Javascript.  
 * @returns
 */
function getReportOptionHtmlFormId() {
	var htmlFormId = null;					
	
	if (dojo.byId(bundleReportOptionsForm)) {
		htmlFormId = bundleReportOptionsForm;
	} else {
		htmlFormId = bundleHTMLFormId;
	}
	return htmlFormId;
}

/** Focus issues? */
function reclaimFocus(tabbedEl, focusEl, checkEl) {
	try {
		console.log(tabbedEl.id + ' , ' + focusEl.id + ' , ' + checkEl.id);
		if(document.activeElement != tabbedEl && document.activeElement != focusEl && document.activeElement != checkEl) {
			focusEl.focus();
		}
	} catch(e) {
		console.log(e);
	}
}

function changeDropDownWidthOnOpen(x) {
	if(navigator.appName=='Microsoft Internet Explorer'){
	   x.style.width='auto';
}}

function changeDropDownWidthOnOpenReportFormat(x) {
	if(navigator.appName=='Microsoft Internet Explorer'){
	   x.style.width='150px';
}}

function changeDropDownWidthOnOpenTemplate(x) {
	if(navigator.appName=='Microsoft Internet Explorer'){
	   x.style.position='absolute';
	   x.style.width='auto';
}}

function changeDropDownWidthOnClose(obj,objWidth) {
		obj.style.width=objWidth;
}

function limitText(limitField,limitCount,limitNum) {
	
	if (document.getElementById(limitField).value.length > limitNum) {
		
		document.getElementById(limitField).value = document.getElementById(limitField).value.substr(0, limitNum);
	} 
	else {	
		setCount(limitField,limitCount,limitNum);
	}
}

function setCount(limitFieldID,countFieldID,maxLength){	
	document.getElementById(countFieldID).innerHTML=maxLength - document.getElementById(limitFieldID).value.length;
}

function sortAscColumn(columndId) {
	if(!((document.getElementById(columndId + ":sortDiv").childNodes[0].childNodes[0].nextSibling.src).indexOf('DataTableIconSortAsc') > -1 )){
		$(columndId).onclick();
	}
}
function sortDescColumn(columndId) {
	if(!((document.getElementById(columndId + ":sortDiv").childNodes[0].childNodes[0].nextSibling.src).indexOf('DataTableIconSortDesc') > -1 )){
		$(columndId).onclick();
	}
}
function sortDone(columndId) {
	var columnSortDiv = columndId + ':sortDiv';
	document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src = (document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src).replace("DataTableIconSortAsc","DataTableIconSortNone");
	document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src = (document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src).replace("DataTableIconSortDesc","DataTableIconSortNone");
	}

function sortDoneForCusotmTable(columndId) {
	var columnSortDiv = columndId + ':sortDiv';
	document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src = (document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src).replace("sort-desc.gif","sortable-column.gif");
	document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src = (document.getElementById(columnSortDiv).childNodes[0].childNodes[0].nextSibling.src).replace("sort-asc.gif","sortable-column.gif");
}

function checkAllAssmnt(ths) { 
	try{					
		if (ths.checked){
			for(i=0; i < document.forms["grpAssmntFrm"].elements.length; i++)
	    		{
	    			elm = document.forms["grpAssmntFrm"].elements[i];
	    			if ( elm.type == 'checkbox' && elm.disabled == false)
	    			{
	    				elm.checked = true;
	    			}
	    		}
	    		return false;
    	}
    	else{
    		for(i=0; i < document.forms["grpAssmntFrm"].elements.length; i++)
	    		{
	    			elm = document.forms["grpAssmntFrm"].elements[i];
	    			if ( elm.type == 'checkbox' && elm.disabled == false)
	    			{
	    				elm.checked = false;
	    			}
	    		}
	    		return false;
    	}
	}
	catch(err){}
}
function checkAssmntSection(ths) { 
	try{
		var flag = 1;
		if (ths.checked){
			for(i=0; i < document.getElementsByName("grpAssmntFrm").item(0).elements.length; i++)
			{
				elm = document.getElementsByName("grpAssmntFrm").item(0).elements[i];
				if ( elm.type == 'checkbox' && elm.disabled == false)
				{
					try{

					if(elm.id.indexOf('assmnt_') > -1 && elm.checked == false){
						flag = 0;
						break;
					}
					}catch(e){}
				}
			}
			if(flag == 1){
				document.getElementById('grpAssmntFrm:searchAssResultDt:assmntCheckAll').checked = true;
			}
		return false;
	}
	else{
		
		document.getElementById('grpAssmntFrm:searchAssResultDt:assmntCheckAll').checked = false;	
			
		return false;
	}
}
catch(err){}
}

function submitenter(form,e)
{
  var keycode;
  if (window.event) keycode = window.event.keyCode;
  else if (e) keycode = e.which;
  else return true;

 if (keycode == 13)
  {
 $(form).onclick();
	
 return false;
 }
else
return true;
}

function hideTestingSiteDropdown(e) {
 	e = e || window.event;
	var obj = e.target || e.srcElement;
	if(obj.id.indexOf('viewFavouriteTestSite') == -1 && obj.id.indexOf('viewAllTestSite') == -1 && 
			obj.id.indexOf('siteImageLinkFilledIdImg') == -1 && obj.id.indexOf('siteImageLinkUnfilledIdImg') == -1 ) {

				if ($("testingsite-list-commandbar-dropdown") && $("testingsite-list-commandbar-dropdown").style.display != 'none') {
					$("testingsite-list-commandbar-dropdown").hide();

					$("editAssessmentForm:testingSiteBtnDropDwn").enable();
					$("editAssessmentForm:newTestingSiteBtn").enable();
			 	}
			}
	
	
	if(obj.id.indexOf('viewFavouriteTeacher') == -1 && obj.id.indexOf('viewAllTeacher') == -1 && 
			obj.id.indexOf('teacherImageLinkFilledIdImg') == -1 && obj.id.indexOf('teacherImageLinkUnfilledIdImg') == -1 ) {

				if ($("teacher-list-commandbar-dropdown") && $("teacher-list-commandbar-dropdown").style.display != 'none') {
					$("teacher-list-commandbar-dropdown").hide();

					$("editAssessmentForm:teacherBtnDropDwn").enable();
					$("editAssessmentForm:newTeacherBtn").enable();
			 	}
			}
	
}


function showClickedElement( e ) {

 	console.log('fff'); 
 	e = e || window.event;
	var obj = e.target || e.srcElement;
	
	if(obj.id.indexOf('viewFavouriteAssessments') == -1 && obj.id.indexOf('viewAllAssessments') == -1 && 
	obj.id.indexOf('assessmentImageLinkFilledIdImg') == -1 && obj.id.indexOf('assessmentImageLinkUnfilledIdImg') == -1 ) {

		if ($("assessment-list-commandbar-dropdown") && $("assessment-list-commandbar-dropdown").style.display != 'none') {
			$("assessment-list-commandbar-dropdown").hide();

			$("searchForm:newExAssessmentBtn").enable();
			$("searchForm:newExAssessmentBtnDropDwn").enable();
			
			
			if (obj.id.indexOf('assessmentLinkTextId') == -1 && typeof($(obj).up('.assessment_dropdown')) == 'undefined') {
				hideAssessmentListOnClick();
			}
	 	}
	}
	
	 if(obj.id.indexOf('viewFavouriteAssessments') == -1 && obj.id.indexOf('viewAllAssessments') == -1 && 
 obj.id.indexOf('reportImageLinkFilledIdImg') == -1 && obj.id.indexOf('reportImageLinkUnfilledIdImg') == -1 ) {
		if ($("report-list-commandbar-dropdown") && $("report-list-commandbar-dropdown").style.display != 'none') {
		$("report-list-commandbar-dropdown").hide();
		
		
		if($("reportSearchForm") != null){
			$("reportSearchForm:newExReportBtn").enable();
			$("reportSearchForm:newExReportBtnDropDwn").enable();
			}
		if($("groupReportSearchForm") != null){
			$("groupReportSearchForm:newExReportBtn").enable();
			$("groupReportSearchForm:newExReportBtnDropDwn").enable();
		}
 	}
}


if ($("more-actions-list-commandbar-dropdown") && $("more-actions-list-commandbar-dropdown").style.display != 'none') {
			$("more-actions-list-commandbar-dropdown").hide();

			$("searchForm:more-actions-button").enable();
			$("searchForm:more-actions-dropdown").enable();
	
	
	}
	
	
	if ($("move-to-list-commandbar-dropdown") && $("move-to-list-commandbar-dropdown").style.display != 'none') {
			$("move-to-list-commandbar-dropdown").hide();

			$("searchForm:move-to-button").enable();
			$("searchForm:move-to-dropdown").enable();
	
	
	}
	
 }

