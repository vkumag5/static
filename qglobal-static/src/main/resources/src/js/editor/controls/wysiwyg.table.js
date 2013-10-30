/**
 * Controls: Table plugin
 * 
 * Depends on jWYSIWYG
 */
(function ($) {
	"use strict";

	if (undefined === $.wysiwyg) {
		throw "wysiwyg.table.js depends on $.wysiwyg";
	}

	if (!$.wysiwyg.controls) {
		$.wysiwyg.controls = {};
	}

	var insertTable = function (colCount, rowCount, filler) {
		if (isNaN(rowCount) || isNaN(colCount) || rowCount === null || colCount === null) {
			return;
		}

		var i, j, html = ['<br /><table border="1" rules="all" style="width: 99%;"><tbody>'];
		var tdWidth = Math.round(99/colCount);

		colCount = parseInt(colCount, 10);
		rowCount = parseInt(rowCount, 10);

		if (filler === null) {
			filler = "&nbsp;";
		}
		filler = "<td width='"+tdWidth+"%'>" + filler + "</td>";

		for (i = rowCount; i > 0; i -= 1) {
			html.push("<tr style='height : 20px;'>");
			for (j = colCount; j > 0; j -= 1) {
				html.push(filler);
			}
			html.push("</tr>");
		}
		html.push("</tbody></table> <br /> <br />");

		return this.insertHtml(html.join(""));
	};

	/*
	 * Wysiwyg namespace: public properties and methods
	 */
	$.wysiwyg.controls.table = function (Wysiwyg) {
		var adialog, dialog, colCount, rowCount, formTableHtml, dialogReplacements, key, translation, regexp;

		dialogReplacements = {
			legend: "Insert table",
			cols  : "Count of columns",
			rows  : "Count of rows",
			submit: "Insert table",
			reset: "Cancel"
		};

		formTableHtml = '<form class="wysiwyg" id="wysiwyg-tableInsert"> <p id="tableInputError" style="color : red; font-size : 10px; margin : 0; padding : 0;"></p>' +
		    '<fieldset><legend>{legend}</legend>' +
			'<label>{cols}: <input type="text" id="colCount" name="colCount" style="width : 80%; border : 1px solid #ccc;" value="3" /></label> <br/>' +
			'<label>{rows}: <input type="text" id="rowCount" name="rowCount" style="width : 80%; border : 1px solid #ccc;" value="3" /></label><br/>' +
			'<input type="submit" class="button" value="{submit}" onclick="return validateInput(this.form);"/> ' +
			'<input type="reset" value="{reset}"/></fieldset></form>';
		
		for (key in dialogReplacements) {
			if ($.wysiwyg.i18n) {
				translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs.table");

				if (translation === dialogReplacements[key]) { // if not translated search in dialogs 
					translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs");
				}

				dialogReplacements[key] = translation;
			}

			regexp = new RegExp("{" + key + "}", "g");
			formTableHtml = formTableHtml.replace(regexp, dialogReplacements[key]);
		}

		if (!Wysiwyg.insertTable) {
			Wysiwyg.insertTable = insertTable;
		}

		adialog = new $.wysiwyg.dialog(Wysiwyg, {
			"title"   : dialogReplacements.legend,
			"content" : formTableHtml,
			"open"    : function (e, dialog) {
				dialog.find("form#wysiwyg-tableInsert").submit(function (e) {
					e.preventDefault();
					rowCount = dialog.find("input[name=rowCount]").val();
					colCount = dialog.find("input[name=colCount]").val();

					Wysiwyg.insertTable(colCount, rowCount, Wysiwyg.defaults.tableFiller);

					adialog.close();
					return false;
				});

				dialog.find("input:reset").click(function (e) {
					e.preventDefault();
					adialog.close();
					return false;
				});
			}
		});
		
		adialog.open();

		$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
	};

	$.wysiwyg.insertTable = function (object, colCount, rowCount, filler) {
		return object.each(function () {
			var Wysiwyg = $(this).data("wysiwyg");

			if (!Wysiwyg.insertTable) {
				Wysiwyg.insertTable = insertTable;
			}

			if (!Wysiwyg) {
				return this;
			}

			Wysiwyg.insertTable(colCount, rowCount, filler);
			$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");

			return this;
		});
	};
})(jQuery);


function validateInput(fObj){
		if (isNaN(fObj.rowCount.value) || isNaN(fObj.colCount.value)) {
			$("#tableInputError").html('* Please enter a number value only.');
			return false;
		}		
		else if (fObj.rowCount.value == "" || fObj.colCount.value == "") {
			$("#tableInputError").html('* Please enter all values.');
			return false;
		}		
		return true;
}