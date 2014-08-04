function showManualEntryHighPerVersion() {
window.console.time("showManualEntryHighPerVersion");
  try {       
	// showProgressIcon(13000, 10, function(){});
	  startBundleHTMLParsingHP();
	//hideForm();   This function is duplicate. This is called inside manualEntryHtmlSection.xhtml
	
  } catch(e) {
   } finally {
 //  hideProgressIcon(10000, function(){});
   }
   window.console.timeEnd("showManualEntryHighPerVersion");
 }
 
function startBundleHTMLParsingHP() {
	if (!assessmentMVCInvoked) {
		assessmentMVCInvoked = 'false';
	} else if (assessmentMVCInvoked == 'true') {
		bundleHTMLFormId = bundledMVCHtmlFormId;
	} 
   

   $('container').hide();
window.console.time("detachAccordians");
   if(stripParse=='true') {
       detachAccordians();
   }
 window.console.timeEnd("detachAccordians");
 
   if (assessmentMVCInvoked=='false') {
       var tempForm = dojo.byId(bundleHTMLFormId);
	   window.console.time("setInitialTabIndex");
       setInitialTabIndex(tempForm);
	   window.console.timeEnd("setInitialTabIndex");
   } else {
   	   var tempForm = dojo.byId(bundledMVCHtmlFormId);
	    window.console.time("setInitialTabIndex");
       setInitialTabIndex(tempForm);
	    window.console.timeEnd("setInitialTabIndex");
   }    
   
   if(stripParse=='true') {
   window.console.time("attachAccordians");
       attachAccordians();
	   window.console.timeEnd("attachAccordians");
   }

   $('container').show();

   if (assessmentMVCInvoked=='false') {
        window.console.time("fixDojoFormTabContainerContentPaneProblem");
       fixDojoFormTabContainerContentPaneProblem();
        window.console.timeEnd("fixDojoFormTabContainerContentPaneProblem");
		window.console.time("processAfterParsingHP");
       processAfterParsingHP();
	   window.console.timeEnd("processAfterParsingHP");
   } else {
   window.console.time("processAfterParsingHP");
       processAfterParsingMVC();
	     window.console.timeEnd("processAfterParsingHP");
   }
   
   if($('loadingMessage')) {
       $('loadingMessage').hide();
   }
   $('edit-examinee-details').show();
}


            function refreshFormModeHP(isCancel) {
                if (assessmentMVCInvoked) {
                    if (assessmentMVCInvoked == 'true') {
                    	setFormModeHP(bundledMVCHtmlFormId, viewMode);
                    } else if (assessmentMVCInvoked == 'false') {
                        setFormModeHP(bundleHTMLFormId, viewMode);
                    }
                } else {
                    setFormModeHP(bundleHTMLFormId, viewMode);
                } 
                
                if (isHtmlValidationNeeded == 'true') {
                	fnPerformHTMLValidation();
				}

				if (isCancel ) {
					if (assessmentMVCInvoked == 'false') {
						fnConvertJsonToFormHP("editAssessmentForm:manualEntryJsonFormData");
					}
				}
            }	

function setFormModeHP(htmlFormId, isViewMode) {
	try {
	    if(!$(htmlFormId)) { return; }
	    if(isViewMode == 'true') {                    
	        $(htmlFormId).disable();
	        toggleSelectWidgets(true);
	        //dijit.byId(htmlFormId).disable();
	    } else {
	        $(htmlFormId).enable();
	        toggleSelectWidgets(false);
	        //dijit.byId(htmlFormId).enable(); 
	    }
	} catch (e) {
		console.log('Problem setting form mode - '+e);
	} 
}			


if(window.console && typeof(window.console.time) == "undefined") {
    console.time = function(name, reset){
        if(!name) { return; }
        var time = new Date().getTime();
        if(!console.timeCounters) { console.timeCounters = {}; }
        var key = "KEY" + name.toString();
        if(!reset && console.timeCounters[key]) { return; }
            console.timeCounters[key] = time;
        };

    console.timeEnd = function(name){
        var time = new Date().getTime();
        if(!console.timeCounters) { return; }
        var key = "KEY" + name.toString();
        var timeCounter = console.timeCounters[key];
        var diff;
        if(timeCounter) {
            diff = time - timeCounter;
            var label = name + ": " + diff + "ms";
            console.info(label);
            delete console.timeCounters[key];
        }
        return diff;
    };
}

function getDefaultJSON_HP(){
if(defaultJson == '') {
readDefaultJSON_HP();
}
return defaultJson;
}
var defaultJsonObj_HP = null;
function readDefaultJSON_HP() {


	if(defaultJson == '' || (defaultJsonObj_HP == null || defaultJsonObj_HP == undefined) ) {
	var formIdString = "#"+bundleHTMLFormId;
    	defaultJsonObj_HP = jQuery(formIdString).serializeObject();
		defaultJson = JSON.stringify(defaultJsonObj_HP);
    }
	return defaultJsonObj_HP;
}
function getDefaultJSONString(){
if(defaultJson != '' ) {
defaultJson = JSON.stringify(getDefaultJSON_HP());
}
return defaultJson;
}

jQuery.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function fnConvertJsonToFormHP(dataElementId, htmlFormId) {
	try {
		var keyPrefix = 'Response.';
		var formJson = document.getElementById(dataElementId).value;
		
		var serverJson = null;
		if (formJson == '') {
			serverJson = readDefaultJSON_HP(); 	
		} else {
			serverJson = dojo.fromJson(formJson);
		}
		
		
		if (htmlFormId == null || htmlFormId == 'undefined') {
		    htmlFormId = bundleHTMLFormId;
		}
		var formEl = dojo.byId(htmlFormId);
		for(var elName in serverJson ) {
	//	for (var i = 0; i<formEl.elements.length; i++) {
	//		var elName = ''; 
			if(elName!='') {
				var element = formEl.elements[elName];
				if(element == null || element == undefined){
				continue;
				}
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