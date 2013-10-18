BUNDLE = dojo.provide("BUNDLE");
BUNDLE = (function (bun) {
	//public variables			
	bun.emptyMessage = "This value is required";
	bun.invalidMessage = "The value entered is not valid";				
	bun.tabContainerId = 'tabContainer';
	bun.formId = 'myform';
	
	//private variables
	var _metaArr;
	
	// This function create a MetaData object for a DOM element. 			
	bun.createMeta = function (obj, tab, section) {
		return { 					
			dom : obj,
			tab : tab,
			section : section,		
			nextMeta :null
		}				
	}
	
	//This function links meta object to form a linked list. 
	var _linkMeta = function (a) {
		dojo.forEach(a, function(i, index) {
			i.index = index;
			i.nextMeta = (index < a.length-1) ? a[index+1] : null;
		});	
	}
	
	// Set MetaArr 
	// If enter key navigation is needed, product module (e.g. BUNDLE.WRMT) must set this array. 
	bun.setMetaArr = function (a) {					
		var s = new Date();				
		try {									
			if (dojo.isIE && dojo.isIE <=7) {
				a = _sortMetaIE7(a);
			}					
			_linkMeta(a);
			_metaArr = a;
		} catch (e) {
			console.log(e.message || e.discription);
		} 				
		console.log('loading field array took - ' + ((new Date() - s) /1000) + 's');					
		return a;
	};
	
	// fixes IE7 problems. In IE7, dojo.query doesn't sort the results as per the position in DOM. 
	// Position in DOM is essential for Enter-key navigation. 
	var _sortMetaIE7 = function (a) {
		var sorted = [];
		var elmts = document.forms[bun.formId].elements;
		dojo.forEach(elmts, function(elm) {
			if (elm.type === 'text' || elm.type === 'select-one' 
				|| elm.type === 'checkbox' || elm.type === 'textarea' || elm.type === 'radio') {
				
				var meta = dojo.filter(a, function(i) {																					
					return i.dom.id === elm.id;
				})[0];						
				if (meta) {
					sorted.push(meta);
				}
			}
		});
		return sorted;
	}
	
	//This function moves focus to next visible and enabled field. 
	//Opens tab or accordian as needed. 			
	var _nav = function (curr) {
		if (curr.tab != curr.nextMeta.tab ) {
			dijit.byId(bun.tabContainerId).selectChild(dijit.byId(curr.nextMeta.tab));
		} 
		if (curr.nextMeta.section && curr.section != curr.nextMeta.section) {
			if (!dijit.byId(curr.nextMeta.section).open) {
				dijit.byId(curr.nextMeta.section).toggle();
			}
		}
		if (curr.nextMeta.dom.disabled || !_isVisible(curr.nextMeta.dom)) {					
			_nav(curr.nextMeta);
		} else {
			curr.nextMeta.dom.focus();
		}
	};	
	
	
	// Checks if dom element is visible or not. 
	var _isVisible = function (node) {
		var n = node;
		try {
			while(n){
				if(n.nodeName && n.nodeName.toLowerCase() === "body"){
					return true;							
				}
				if(dojo.style(n,"display") === "none" || dojo.style(n,"visibility") ==="hidden"){
					return false;
				}
				n = n.parentNode;
			}
			return true;
		}catch(ex){
			return false;
		}				
	}

	// This function sets up validation. 
	// Input fields that have class as 'validate' are connected for validation. 
	bun.setupValidation = function () {   
		try {
			var start = new Date();			
			dojo.query("input.validate").connect("onblur", function() {												
				bun.validateInput(this);
				setTimeout('dijit.hideTooltip(dojo.byId(\''+this.id+'\'))', dijit.defaultDuration + 1000);
			}).connect("onmouseover", function(){
				if(dojo.attr(this,"data-valid") === "false") {					
					dijit.showTooltip(dojo.attr(this,'data-errorMessage'), this);
				}
			}).connect("onmouseout", function(){				
				setTimeout('dijit.hideTooltip(dojo.byId(\''+this.id+'\'))', dijit.defaultDuration + 10);
			});		
		} catch(e) { 
			console.log(" Problem with parsing the dojo widgets - "+e);	
		}
		console.log("custom validation setup took - " + ((new Date() - start)/1000) + 's');
	};
	
	var _showTooltip = function (obj, errorMessage) {
		dojo.attr(obj,"data-valid","false");					
		dojo.addClass(obj,"inputError");
		dojo.attr(obj,"data-errorMessage",errorMessage);		 
		dijit.showTooltip(errorMessage,obj);
	};

	var _hideTooltip = function (obj) {
		dojo.attr(obj,"data-valid","true");
		dojo.removeClass(obj,"inputError");
		dojo.attr(obj,"data-errorMessage","");
		dijit.hideTooltip(obj);
	}	

	//This function creates HTML as per the object template. 
	var _createHTML = function (o) {
		if (o.data && o.data.template && o.data.data) {
			_createHTML(o.data);							
		}
		if (o.template && o.data) {				
			if (dojo.isArray(o.data)) {
				var html = '';
				dojo.forEach(o.data, function (i) {
					html += dojo.replace(o.template,i);
				});					
				o.data = html;
			} else {
				o.data = dojo.replace(o.template, o.data);
			}
		}
	}
	
	var _findMeta = function (target) {
		return dojo.filter(_metaArr, function(i) {																					
			return i.dom.id === target;
		})[0];
	}
	
	var _linkNewMeta = function (src, dest) {
		var a = [];
		var srcMeta = _findMeta(src.id);
		var _qry = '#tab input[type=text], #tab input[type=checkbox],#tab select,#tab textarea';
		
		
		dojo.query(_qry.replace(/tab/g, dest.id)).forEach(function(i) {					
			a.push(bun.createMeta(i,srcMeta.tab,srcMeta.section));					
		});
		_linkMeta(a);
		
		a[a.length-1].nextMeta = srcMeta.nextMeta;				
		srcMeta.origNextMeta = srcMeta.nextMeta;
		srcMeta.nextMeta = a[0];			
		
		for (indx = 0; indx < a.length; indx++) {
			_metaArr.splice(srcMeta.index+indx,0,a[indx]);
		}				
	}		

	// Public fucntions.
	bun.validateInput = function (obj) {				
		var value = dojo.attr(obj,"value");
		var required = dojo.attr(obj,"data-required");
		var isValid = true;

		if (required === 'true' && (value === null || value === '')){
			_showTooltip(obj, bun.emptyMessage);			
			invalid = false;
		} else if ((value !== null && value !== '')) {
			var regExp = dojo.attr(obj,"data-regExp");
			if (regExp) {
				var regexPattern = new RegExp(regExp);
				if (regexPattern.exec(value) == null) {
					_showTooltip(obj, bun.invalidMessage);
					isValid = false;
				} else {
					_hideTooltip(obj);
				}
			} else {
				console.log('regExp attribute is not defined');
			}			
		} else {
			_hideTooltip(obj);
		}
		return isValid;	
	};

	bun.next = function (target, isEnterPressed) {
		var dom = dojo.byId(target);
		if (isEnterPressed) {
			_nav(_findMeta(dom.id));	
		} else if (dom.type === 'text' && dojo.attr(dom,'maxlength') == dom.value.length) {
			_nav(_findMeta(dom.id));
		}
	}	

	// Generic HTML DOM tree generator. 
	// Expects a object expressing dom tree in this pattern. 
	//{ 
	//	template: '',
	//	data : {
	//		template: '', 
	//		data: {
	//			template: '', 
	//			data: ...... and so on.
	//		}
	//	}
	//}
	bun.createHTML = function (dest, o, src) {
		 dest.innerHTML = _createHTML(o) || o.data;				 
		 _linkNewMeta(src, dest);
	}
	
	bun.colorizeLayout = function (id, color) {
		var dclass = dijit.byId(id).declaredClass;
		switch (dclass) {
			case 'dijit.TitlePane' : {
				dojo.query('#'+id+' .dijitTitlePaneTitleFocus').style('backgroundColor', color);
				break;
			}
			case 'dijit.layout.ContentPane' : {
				dojo.style(dojo.byId(bun.tabContainerId+'_tablist_'+id).parentNode.parentNode, "backgroundColor", color);
				break;
			}
		}
	}
	
	return bun;
}(typeof(BUNDLE)=='undefined'?{}:BUNDLE));