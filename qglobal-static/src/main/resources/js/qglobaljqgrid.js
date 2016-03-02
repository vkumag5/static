 //<![CDATA[

        /*global jq$ */

        /*jslint devel: true, browser: true, plusplus: true */
		
		var jq$ = jQuery.noConflict();
		var resultMap='';
		var resultMapSequence = '';
        jq$.jgrid.formatter.integer.thousandsSeparator = ',';

        jq$.jgrid.formatter.number.thousandsSeparator = ',';

        jq$.jgrid.formatter.currency.thousandsSeparator = ',';
        
        var disabledIdsArray = new Array();
        
		jq$(document).ready(function () {
		if(typeof(window.localStorage) != 'undefined'){ 
				window.localStorage.clear() ;
		}
		if(divId != 'undefined' && divId != '') {
		loadGrid();
		showSelectedCheckbox();
		setSelectedRadio();
		}

});

function showSelectedCheckbox() {
	var i = 0;
	var count = 0;
	var checkboxid;
	if (selectAll == 'true') {
		chekedList = jq$("#"+divId).jqGrid('getDataIDs');
		for (i = 0, count = chekedList.length; i < count; i++) {
			checkboxid = chekedList[i].replace(' ', '');
			if ($('jqg_'+ divId +'_' + checkboxid) != null && !$('jqg_' + divId + '_' + checkboxid).disabled) {
				jq$("#" + divId).jqGrid('setSelection', checkboxid, false);
			}
		}
		$('cb_' + divId).checked = true;
		toggleCheckAll(true);
	} else {
		if (chekedList.length > 0) {
			for (i = 0, count = chekedList.length; i < count; i++) {
				checkboxid = chekedList[i].replace(' ', '');
				if ($('jqg_' + divId + '_' + checkboxid) != null) {
					jq$("#" + divId).jqGrid('setSelection', checkboxid, false);
				}
			}
		}
	}
}

var disableTotalRow = false;

function setSelectedRadio() {
    var radios = document.getElementsByName("selectedradio");
   for( i = 0; i < radios.length; i++ ) {	      
     if(radios[i].id == selectedId) {
        radios[i].checked = true;
        break;
    }
  }
	//Richfaces.hideModalPanel('spinnerModal');
}
  
  function loadGrid() {
  	
            'use strict';

            var jq$grid = jq$("#" + divId),

                initDateSearch = function (elem) {

                    setTimeout(function () {

                        jq$(elem).datepicker({

                            dateFormat: 'dd-M-yy',

                            autoSize: false,

                            //showOn: 'button', // it dosn't work in searching dialog

                            changeYear: true,

                            changeMonth: true,

                            showButtonPanel: true,

                            showWeek: true,

                            onSelect: function () {

                                if (this.id.substr(0, 3) === "gs_") {

                                    setTimeout(function () {

                                        jq$grid[0].triggerToolbar();

                                    }, 50);

                                } else {

                                    // to refresh the filter

                                    jq$(this).trigger('change');

                                }

                            }

                        });

                    }, 100);

                },

                numberSearchOptions = ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],

                numberTemplate = {formatter: 'number', align: 'right', sorttype: 'number',

                    searchoptions: { sopt: numberSearchOptions }},

                myDefaultSearch = 'cn',

                getColumnIndex = function (grid, columnIndex) {

                    var cm = grid.jqGrid('getGridParam', 'colModel'), i, l = cm.length;

                    for (i = 0; i < l; i++) {

                        if ((cm[i].index || cm[i].name) === columnIndex) {

                            return i; // return the colModel index

                        }

                    }

                    return -1;

                },

                refreshSerchingToolbar = function (jq$grid, myDefaultSearch) {

                    var postData = jq$grid.jqGrid('getGridParam', 'postData'), filters, i, l,

                        rules, rule, iCol, cm = jq$grid.jqGrid('getGridParam', 'colModel'),

                        cmi, control, tagName;

							alert('Comes here' + cm.length);

                    for (i = 0, l = cm.length; i < l; i++) {
						
						alert('Comes here' + i + 'l' + l);
						alert('Cm[i]' +  jq$.jgrid.jqID(cm[i].name));
                        control = jq$("#gs_" + jq$.jgrid.jqID(cm[i].name));

                        if (control.length > 0) {

                            tagName = control[0].tagName.toUpperCase();

                            if (tagName === "SELECT") { // && cmi.stype === "select"

                                control.find("option[value='']")

                                    .attr('selected', 'selected');

                            } else if (tagName === "INPUT") {

                                control.val('');

                            }

                        }

                    }



                    if (typeof (postData.filters) === "string" &&

                            typeof (jq$grid[0].ftoolbar) === "boolean" && jq$grid[0].ftoolbar) {



                        filters = jq$.parseJSON(postData.filters);

                        if (filters && filters.groupOp === "AND" && typeof (filters.groups) === "undefined") {

                            // only in case of advance searching without grouping we import filters in the

                            // searching toolbar

                            rules = filters.rules;

                            for (i = 0, l = rules.length; i < l; i++) {

                                rule = rules[i];

                                iCol = getColumnIndex(jq$grid, rule.field);

                                if (iCol >= 0) {

                                    cmi = cm[iCol];

                                    control = jq$("#gs_" + jq$.jgrid.jqID(cmi.name));

                                    if (control.length > 0 &&

                                            (((typeof (cmi.searchoptions) === "undefined" ||

                                            typeof (cmi.searchoptions.sopt) === "undefined")

                                            && rule.op === myDefaultSearch) ||

                                              (typeof (cmi.searchoptions) === "object" &&

                                                  jq$.isArray(cmi.searchoptions.sopt) &&

                                                  cmi.searchoptions.sopt.length > 0 &&

                                                  cmi.searchoptions.sopt[0] === rule.op))) {

                                        tagName = control[0].tagName.toUpperCase();

                                        if (tagName === "SELECT") { // && cmi.stype === "select"

                                            control.find("option[value='" + jq$.jgrid.jqID(rule.data) + "']")

                                                .attr('selected', 'selected');

                                        } else if (tagName === "INPUT") {

                                            control.val(rule.data);

                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                cm = columnModel,

                saveObjectInLocalStorage = function (storageItemName, object) {

                    if (typeof window.localStorage !== 'undefined') {

                        window.localStorage.setItem(storageItemName, JSON.stringify(object));

                    }

                },

                removeObjectFromLocalStorage = function (storageItemName) {

                    if (typeof window.localStorage !== 'undefined') {

                        window.localStorage.removeItem(storageItemName);

                    }

                },

                getObjectFromLocalStorage = function (storageItemName) {

                    if (typeof window.localStorage !== 'undefined') {

                        return JSON.parse(window.localStorage.getItem(storageItemName));

                    }

                },

                myColumnStateName = 'ColumnChooserAndLocalStorage1.colState',

                saveColumnState = function () {

                    var colModel = this.jqGrid('getGridParam', 'colModel'), i, l = colModel.length, colItem, cmName,

                        postData = this.jqGrid('getGridParam', 'postData'),

                        columnsState = {

                            search: this.jqGrid('getGridParam', 'search'),

                            page: this.jqGrid('getGridParam', 'page'),

                            rowNum: this.jqGrid('getGridParam', 'rowNum'),

							rownumWidth: this.jqGrid('getGridParam', 'rownumWidth'),

                            sortname: this.jqGrid('getGridParam', 'sortname'),

                            sortorder: this.jqGrid('getGridParam', 'sortorder'),

                            permutation: this.jqGrid('getGridParam', 'remapColumns'),

                            colStates: {}

                        },

                        colStates = columnsState.colStates;



                    if (typeof (postData.filters) !== 'undefined') {

                        columnsState.filters = postData.filters;

                    }



                    for (i = 0; i < l; i++) {

                        colItem = colModel[i];

                        cmName = colItem.name;
						

                        if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {

                            colStates[cmName] = {

                                width: colItem.width,

                                hidden: colItem.hidden

                            };

                        }

                    }

                    saveObjectInLocalStorage(myColumnStateName, columnsState);

                },

                myColumnsState,

                isColState,

                restoreColumnState = function (colModel) {

                    var colItem, i, l = colModel.length, colStates, cmName,

                        columnsState = getObjectFromLocalStorage(myColumnStateName);



                    if (columnsState) {

                        colStates = columnsState.colStates;

                        for (i = 0; i < l; i++) {

                            colItem = colModel[i];

                            cmName = colItem.name;

                            if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {

                                colModel[i] = jq$.extend(true, {}, colModel[i], colStates[cmName]);

                            }

                        }

                    }

                    return columnsState;

                },

                firstLoad = false;



            myColumnsState = restoreColumnState(cm);

            isColState = typeof (myColumnsState) !== 'undefined' && myColumnsState !== null;
		     //alert(rowNumbers);
            jq$grid.jqGrid({
              
                datatype: 'json',

                url: gridURL,

                colNames: columnNames,

                colModel: cm,

                rowNum: rowsPerPage,
				
                rowList: [10, 25, 50, 100],
				
				rownumWidth: 50,
				
                pager: '#'+ pager,

                gridview: true,
				
				multiselect : mutiselect,

				multiselectWidth : 50,

                page: isColState ? myColumnsState.page : 1,

                search: isColState ? myColumnsState.search : false,

                postData: isColState ? { filters: myColumnsState.filters } : {},

                sortorder: isColState ? myColumnsState.sortorder : 'desc',

                rownumbers: (typeof (showRowNumberInGrid) != 'undefined' && showRowNumberInGrid != null)? showRowNumberInGrid:false,

                ignoreCase: true,
                
                altRows: true,
				
				altclass:'myAltRowClass',

                shrinkToFit: true,
                
                //forceFit: true,
                
                width: width,
                
                height: height,
				
				jsonReader:
                {
       				repeatitems: false
                },

                viewrecords: true,
                
                gridComplete: function(){
					if( typeof (showRowNumberInGrid) != 'undefined' && showRowNumberInGrid != null)
					{
						showRowNumberInGrid = '';
					}
                	var rowCount = jq$grid.jqGrid('getGridParam', 'reccount');
                	var colCount = jq$grid.jqGrid('getGridParam', 'colModel').length;
                	var sortedColName = jq$grid.jqGrid('getGridParam', 'sortname');
                	if(sortedColName != ''){
                		sortedColumn(sortedColName,rowCount,colCount);
                	} else {
                		revertSortedColumn();
                	}
                	disableCheckBoxes();
					showSelectedCheckbox();
					if (!mutiselect) {
					var ids = jq$grid.jqGrid('getDataIDs'); 
						for(var i=0;i < ids.length;i++){ 
						   var radioButtonId = ids[i].replace(' ', '');	
						   var radioButton = '<input type="radio" name="selectedradio" id="'+ radioButtonId +'" onclick="getSelectedRowId('+radioButtonId+');"'+'  />';
						if (typeof replaceRowNumberForRadio != 'undefined'  && typeof replaceRowNumberForRadio == 'boolean' && replaceRowNumberForRadio == true) {
							jq$grid.jqGrid('setRowData',ids[i],{rn:radioButton}); 
						} else {
							jq$grid.jqGrid('setRowData',ids[i],{systemid:radioButton}); 
						}	
					}
					}
					setSelectedRadio();
					if(shiftselect){
					jq$.widget('ui.iconbutton', jq$.extend({}, jq$.ui.button.prototype, {
					_init: function() {
					jq$.ui.button.prototype._init.call(this);
					this.element.removeClass('ui-corner-all')
					.addClass('ui-iconbutton')
					.unbind('.button');
					}		
					}));

					if(rowCount != 0) {
						showCustomSelectionOptions();
					}
                }},
				
				onSelectRow: function(id,status,e){
					try{
						Richfaces.showModalPanel('spinnerModal');
						if( !e ) e = window.event;
						var x = e.target||e.srcElement;
						var z = 'searchForm:targetElm';
						var selrownum=jq$grid.jqGrid('getGridParam', 'selrow');
						var cellval=jq$grid.jqGrid('getCell', selrownum, keyColumn);
						var cellval1=jq$grid.jqGrid('getCell', selrownum, 'selarrrow');
						if(x.type == 'checkbox') {
							if (x.checked) {
								setSelectedExamineeID(id, true);
								} else {
								setSelectedExamineeID(id, false);
								}
						 } else {						
								try{	
								var eleId = document.getElementById('jqg_list_' + id);
								if (eleId != null && eleId != 'undefined' && $('jqg_list_' + id).disabled) {
										$('jqg_list_' + id).checked = false;
										Richfaces.hideModalPanel('spinnerModal');
								} else {
									Richfaces.showModalPanel('spinnerModal');
									setCurrentViewJS(id);
								}
							
									} catch (err){										
										Richfaces.hideModalPanel('spinnerModal');
									}
					}
					} catch (err){
						Richfaces.hideModalPanel('spinnerModal');
					}
				},
				beforeSelectRow : function(rowid, e) {
				
					if(shiftselect){
					var grid = jq$(e.target).closest("table.ui-jqgrid-btable");
					if( !e ) e = window.event;
						var x = e.target||e.srcElement;
						if(x.type == 'checkbox') {
								if (x.checked) {
					
					var ts = grid[0], td = e.target;
					var scb = jq$(td).hasClass("cbox");
					if ((td.tagName == 'INPUT' && !scb) || td.tagName == 'A') {
						return true;
					}
					var sel = grid.getGridParam('selarrrow');
					var selected = jq$.inArray(rowid, sel) >= 0;
					if (e.ctrlKey || (scb && (selected || !e.shiftKey))) {
						grid.setSelection(rowid, true, e);
					} else {
						if (e.shiftKey) {
							var six = grid.getInd(rowid);
							var min = six, max = six;
							jq$.each(sel, function() {
								var ix = grid.getInd(this);
								if (ix < min)
									min = ix;
								if (ix > max)
									max = ix;
							});
							while (min <= max) {
								var row = ts.rows[min++];
								var rid = row.id;
								if (rid != rowid && jq$.inArray(rid, sel) < 0) {
									grid.setSelection(row.id, false, e);
								}
							}
							/*Using getDataIDs function instead of selarrrow.
							selarrrow function doesnot work if shift key is already pressed.*/
								var checkedList, checkboxid, count, i;
								var shiftSelectedIdsArray = new Array();								
								checkedList = jq$("#"+divId).jqGrid('getDataIDs');
								for (i = 0, count = checkedList.length; i < count; i++) {
									checkboxid = checkedList[i].replace(' ', '');	
									if ($('jqg_'+ divId +'_' + checkboxid) != null) {
									if($('jqg_'+ divId +'_' + checkboxid).checked == true){
									shiftSelectedIdsArray.push(checkboxid);
									}
								}
							   }
								setShiftSelectedIDsjs(shiftSelectedIdsArray);
						} else if (!selected) {
							grid.resetSelection();
						}
						if (!selected) {
							grid.setSelection(rowid, true, e);
						} else {
							var osr = grid.getGridParam('onSelectRow');
							if (jq$.isFunction(osr)) {
								osr(rowid, true,e);
							}
						}
					}

					// get the rowids of selected rows
					} else {
					grid.setSelection(rowid, true, e);
					}
					} else {
						try{								
							Richfaces.showModalPanel('spinnerModal');
							setCurrentViewJS(rowid);} 
						catch (err){										
						Richfaces.hideModalPanel('spinnerModal');}
						}
					} else {
					return true;
					}
				},
				onSortCol: function(index,iCol,sortorder){
					setOrderTypeAndColumnIndex(index,sortorder);
					return 'stop';
				},
				onPaging: function (pgButton) {
					Richfaces.showModalPanel('spinnerModal');
					var pageSize = jq$('#'+ divId).getGridParam('rowNum');
					var pageNumber = 0;
					var isprocess = 'false';
					var isLastPage = 'false';
					if(pgButton == 'first_pager' || pgButton == 'first_t_' + divId + '_toppager'){
						pageNumber = 0;
						isprocess ='true';
					}else if(pgButton == 'next_pager' || pgButton == 'next_t_' + divId + '_toppager'){
						pageNumber = Math.round(jq$('#' + divId).getGridParam('page'))-1;
						isprocess ='true';
					} else if(pgButton == 'prev_pager' || pgButton == 'prev_t_' + divId + '_toppager'){
						pageNumber =Math.round(jq$('#' + divId).getGridParam('page')) -1;
						isprocess ='true';
					} else if(pgButton == 'last_pager' || pgButton ==  'last_t_' + divId + '_toppager'){
						isprocess ='true';
						isLastPage = 'true';
					} else if(pgButton == 'user'){
						var lastpgNumber = Number(lastPageNo) + Number(1);
						var pgNumber = Math.round(jq$('#' + divId).getGridParam('page'));
						if(pgNumber > 0 && pgNumber <= lastpgNumber){
							pageNumber = pgNumber - 1;
							isprocess ='true';
						}
					} else if (pgButton == 'records') {
						isprocess ='true';
					}
					var currentRecordCount = (pageSize * pageNumber);
					var recordCnt = Number(currentRecordCount) + Number(pageSize);
					if(isprocess == 'true') {
						refreshGridWithPageNoAndPageSize(pageSize,pageNumber,isLastPage);
						return 'stop';
					} else {
						Richfaces.hideModalPanel('spinnerModal');
					}
	},
	onSelectAll: function (aRowids, isSelected) {
		var disabledId = '';
		toggleCheckAll(isSelected);
		if (disabledIdsArray != null) {
		      var i, a;	  
		      for (a = 0; a < disabledIdsArray.length; a++) {
			   disabledId = disabledIdsArray[a].replace(' ', '');
		      for (i = 0; i < aRowids.length;  i++) {
 
					if (disabledId == aRowids[i]) {					
		            	$('jqg_' + divId + '_' + aRowids[i]).checked = false;
						jq$('#'+ disabledId).removeClass('ui-state-highlight');
						}
		            }
		            
		        }
		      }
   },
				toppager:showTopPager,
				
                caption: 'Sample QGlobal Grid with features for column selection',

                loadComplete: function () {

                    var jq$this = jq$(this);
					
					/*alert('Value of first load'+ firstLoad);*/
					
                    if (firstLoad) {

                        firstLoad = false;

                        if (isColState && myColumnsState.permutation.length > 0) {

                            jq$this.jqGrid("remapColumns", myColumnsState.permutation, true);

                        }

                        if (typeof (this.ftoolbar) !== "boolean" || !this.ftoolbar) {

                            // create toolbar if needed

                            jq$this.jqGrid('filterToolbar',

                                {stringResult: true, searchOnEnter: true, defaultSearch: myDefaultSearch});

                        }

                    }
					
					if (showColumnChooser) {	
		var new_order_index = {};
        var new_order = new Array();
		new_order = columnOrdering.split(",");
        jq$.each(new_order, function(i,n){
            new_order_index[n] = i;
        });
		

        var colModel = jq$grid.jqGrid('getGridParam', 'colModel');
        var cur = [];
        jq$.each(colModel, function(i,n){
            var name = this.name;
            if (name != "" && name != 'subgrid')
                cur[cur.length] = name;
        });
        
        var cur_index = {};
        jq$.each(cur, function(i,n){
            cur_index[n] = i;
        });

        var perm = [];
		var new_item_index = {};
		var new_item = [];
		
        jq$.each(cur, function(i, name){
            new_item = new_order[i];			
            new_item_index = cur_index[new_item];			
			if (new_item_index != undefined) {
            perm[i] = new_item_index;
		}
        });
        if (colModel[0].name == 'subgrid')
        {
            perm.splice(0, 0, 0);
            jq$.each(perm, function(i,n){
                ++perm[i]
            });
            perm[0] = 0;
        }		
			if (perm != null && perm != '') {			
			jq$grid.jqGrid("remapColumns", perm, true, false);
			}
		}
		
					//saveColumnState.call(jq$this);
                    /*refreshSerchingToolbar(jq$this, myDefaultSearch);

                     */
					//alert('complete');
					
					
                },

                resizeStop: function () {

                    saveColumnState.call(jq$grid);

                }

            });
            
            jq$.extend(jq$.jgrid.search, {

                multipleSearch: true,

                multipleGroup: true,

                recreateFilter: true,

                closeOnEscape: true,

                closeAfterSearch: true,

                modal:true

            });

            jq$grid.jqGrid('navGrid', '#' + pager, {edit: false, add: false, del: false, search:false, cloneToTop:true, refresh:false});

            if (showColumnChooser) {
            if (jq$(".ui-icon-calculator").length == 0) {
            jq$grid.jqGrid('navButtonAdd', '#' + pager, {

                caption: "",

                buttonicon: "ui-icon-calculator",

                title: chooseCols,

                onClickButton: function () {

                    jq$(this).jqGrid('columnChooser', {
						
						modal:true,
						
                        done: function (perm) {

                            if (perm) {
                                this.jqGrid("remapColumns", perm, true);
								saveColStatetoDb(this.jqGrid('getGridParam', 'colModel'), perm);
                                saveColumnState.call(this);
                            }
							if(resultMap!=null&&resultMap!="")
							{
							width = getWidthAsPerTheColumn(resultMap);
							jq$grid.jqGrid('setGridWidth', width , true);
							}
                        }
                    });

                }

            });
			}
            }
            /*jq$grid.jqGrid('navButtonAdd', '#pager', {

                caption: "",

                buttonicon: "ui-icon-closethick",

                title: clearGridSettings,

                onClickButton: function () {

                    removeObjectFromLocalStorage(myColumnStateName);

                    //window.location.reload();

                }

            });
			
		jq$(".cbox").each(function() {
			jq$(this).click(function() {
				toggleCheckAll(this.checked);
			});
			
        });*/
		//jq$("#list").remapColumns(columnOrderingArray, true, false);
  }
		
  function showCustomSelectionOptions() {
  if (jq$(".ui-iconbutton").length == 0) {
  +jq$('<button>').appendTo(jq$('#jqgh_list_cb')).iconbutton({
	icons: {primary: "selectallclass"},text: false}).click(
	function (e) {
		var pos = $(jq$('#jqgh_list_cb')).offset();  
		var eWidth = $(jq$('#jqgh_list_cb')).outerWidth();	
		var mWidth = $(jq$('#custom-selection-dropdown')).outerWidth();
		var left = (pos.left + eWidth - mWidth + 37) + "px";
		var top = pos.top - 60 + "px";
		$(jq$('#custom-selection-dropdown')).css( { 
					position: 'absolute',
					zIndex: 5000,
					left: left, 
					top: top
	} );

	$('custom-selection-dropdown').show();
	return false;
	});
   }
  }
  function saveColStatetoDb(colModel, perm) {
	    Richfaces.showModalPanel('spinnerModal');
		
		var l=colModel.length;
		resultMap = "{";
		resultMapSequence='[';
		var cmName, i;
		for ( i = 0; i < l ; i++) {
				colItem = colModel[i];
                cmName = colItem.name;				
                if (cmName !== 'subgrid') {						
						map[colItem.name] = colItem.hidden;
						resultMap=resultMap + colItem.name.toString() + ":" + colItem.hidden.toString();
						resultMapSequence = resultMapSequence + colItem.name.toString();
						if(i!=l-1) {
						resultMap= resultMap + ",";
						resultMapSequence = resultMapSequence + ',';
						}
                  }
				}
		resultMap = resultMap+"}";
		resultMapSequence = resultMapSequence + ']';
		setCurrentColJS(resultMap, resultMapSequence);
   }
  
  function sortedColumn(colName,totalRows,totalCols){
		var coloredCells = document.getElementsByTagName('th');
		for(var x = 0; coloredCells.length > x ; x++){
			if(coloredCells[x].className = "ui-state-default ui-th-column ui-th-ltr sorted_header"){
				coloredCells[x].className = "ui-state-default ui-th-column ui-th-ltr";
				}					
			}
		var i;
		var sortedCol =	document.getElementById(divId + '_' + colName);
		var sortIcon = document.getElementsByClassName('s-ico');
		var sortedColIndex = sortedCol.cellIndex;
		var rows = document.getElementById('gbox_' + divId).getElementsByTagName('tr');
		var cells = document.getElementById('gbox_' + divId).getElementsByTagName('td');
		if (showTopPager == false) {
		  i = 1;
		} else {
		  i = 4;
		}
		var tillRow = i + totalRows + 1;
		sortIcon[sortedColIndex].className = "s-ico";
		sortedCol.className += " sorted_header";
		for(var i; tillRow > i ; i++){
			if(rows[i].cells.length == totalCols){
				rows[i].cells[sortedColIndex].className += " sorted_col"; 
				}
			} 
	}
  
  function revertSortedColumn(){
		var coloredCells = document.getElementsByTagName('th');
		for(var x = 0; coloredCells.length > x ; x++){
			if(coloredCells[x].className = "ui-state-default ui-th-column ui-th-ltr sorted_header"){
				coloredCells[x].className = "ui-state-default ui-th-column ui-th-ltr";
				}					
			}

		var sortIcons = document.getElementsByClassName('s-ico');
		for(var s = 0; sortIcons.length > s ; s++){
			if(sortIcons[s].className == "s-ico"){
			//	sortIcons[s].className += " doNotDisplay";
				}
			}
	}
  
  function reloadJQGrid(){
		
		jq$('#' + divId).trigger("reloadGrid"); 
		Richfaces.hideModalPanel('spinnerModal');
	}
  
  function resetSortOrder(){
	  jq$("#" + divId).setGridParam({sortname:''});
	  }
  
  function disableCheckBoxes() {
	  if (disabledIdsArray != 'undefined' && disabledIdsArray != null && disabledIdsArray.length > 0) {

			for (var i = 0, count = disabledIdsArray.length; i < count; i++) {
				checkboxid = disabledIdsArray[i].replace(' ', '');
				if ($('jqg_' + divId + '_' + checkboxid) != null) {
					$('jqg_' + divId + '_' + checkboxid).disabled = true;
				}
			}
		}
  }
  
  function getSelectedRowId(deleteRowId) {
	  //alert('asdas' + deleteRowId);
	  Richfaces.showModalPanel('spinnerModal');
	  processSelectedData(deleteRowId);
  }	

  function customSelectionDropdownHide() {
		if(document.getElementById("custom-selection-dropdown")) {
			var obj = document.getElementById("custom-selection-dropdown").style.display="none";
		}
  }

  function customSelectionSelectAll() {
	if ($('cb_list').checked == false) {
	   $('cb_list').click();
	   }
  }	

  function customSelectionDeselectAll() {	
		if ($('cb_list').checked == true) {
			$('cb_list').click();
		}
		
		chekedList = jq$("#"+divId).jqGrid('getDataIDs');
		var count = 0;
		for (i = 0, count = chekedList.length; i < count; i++) {
			checkboxid = chekedList[i].replace(' ', '');
			if ($('jqg_'+ divId +'_' + checkboxid) != null && !$('jqg_' + divId + '_' + checkboxid).disabled) {
				$('jqg_'+ divId +'_' + checkboxid).checked = false;
			}
		}
		jq$("#" + divId).jqGrid('resetSelection');
		$('cb_' + divId).checked = false;
		toggleCheckAll(false);
	  }


  function setShiftSelectedIDsjs(selected) {
		document.getElementById("hidden-field-for-shift-select").value =  selected;
		setShiftSelectedExamineeIDs();
	}

//	function replaceSpWithNewLine(strToReplace){
//                          
//			  if(strToReplace.startsWith('Examinee Assessment')){
//			     strToReplace = strToReplace.replace('Examinee ','');
//			     
//			     
//			  }
//                        if(strToReplace.startsWith('Assessment Count')){
//				 strToReplace = 'Number of <br/>Assessmnts';
//				 return strToReplace;
//			     
//			     
//			  }
//			   if(strToReplace.startsWith('Examinee Count')){
//				 strToReplace = 'Number of <br/>Examinees';
//				 return strToReplace;
//			     
//			     
//			  }
//
//
//			  if(strToReplace.startsWith('Administration')){
//			     strToReplace = strToReplace.replace('Administration','Admin');
//			     
//			     
//			  }
//			  if(strToReplace.startsWith('Group Assessments')){
//			     strToReplace = strToReplace.replace('Assessments','Assessmnts');
//			     
//			     
//			  }
//
//			  if(strToReplace.startsWith('Qualification')){
//			     strToReplace = strToReplace.replace('Qualification','Qual');
//			     return strToReplace;
//			     
//			  }
//			   if(strToReplace.startsWith('Parent')){
//			     strToReplace = strToReplace.replace('Account','Acct');
//
//			     
//			  }
//			  if(strToReplace.startsWith('Email')){
//				  if(strToReplace.indexOf('Id')!=-1){
//     			     strToReplace = strToReplace.replace('Id','');
//     			     return strToReplace;
//				  }
//				  if(strToReplace.indexOf('Address')!=-1){
//     			     strToReplace = strToReplace.replace('Address','');
//     			     return strToReplace;
//				  }
//			  }
//			  strToReplace = strToReplace.replace(' ','<br/>');
//			  return strToReplace;
//			 
//			
//			}

			function getWidthAsPerTheColumn(resultMap) {

			var matchStringWithFalse = resultMap.match(/false/g);
			
		    if (typeof (matchStringWithFalse) != 'undefined' && matchStringWithFalse != null){
			   if(matchStringWithFalse.length >8)
			    	width = '1745';
				else
					width = '945';
				    return width;
			} else {
			    return '945';
			}
			}
    //]]>