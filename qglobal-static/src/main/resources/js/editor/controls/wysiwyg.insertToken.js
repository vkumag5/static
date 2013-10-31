/**
 * Controls: Table plugin
 * 
 * Depends on jWYSIWYG
 */
(function ($) {
	"use strict";

	if (undefined === $.wysiwyg) {
		throw "wysiwyg.token.js depends on $.wysiwyg";
	}

	if (!$.wysiwyg.controls) {
		$.wysiwyg.controls = {};
	}
	
		
	var insertToken = function (tokenValue) {
		if (tokenValue === null) {
			return;
		}


		if (tokenValue === null) {
			tokenValue = "&nbsp;";
		}
            var tokenLength = tokenValue.length;   
     		var html = ['<span> ' +tokenValue+ ' </span>'];

			
		//html.push(tokenValue);
		//html.push("</input>");

		return this.insertHtml(html.join(""));
	};

	/*
	 * Wysiwyg namespace: public properties and methods
	 */
	$.wysiwyg.controls.token = function (Wysiwyg) {
		var adialog, dialog, tokenValue, formTokenHtml, dialogReplacements, key, translation, regexp;
		
		dialogReplacements = {
			legend: token_value
		};
		
		var list = getTokenList();
		
		formTokenHtml = '<form class="wysiwyg" id="wysiwyg-tokenInsert">' +
		    '<fieldset><legend>{legend}</legend>' +
			list +
			'</fieldset></form>';
		
		for (key in dialogReplacements) {
			if ($.wysiwyg.i18n) {
				translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs.table");

				if (translation === dialogReplacements[key]) { // if not translated search in dialogs 
					translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs");
				}

				dialogReplacements[key] = translation;
			}

			regexp = new RegExp("{" + key + "}", "g");
			formTokenHtml = formTokenHtml.replace(regexp, dialogReplacements[key]);
		}

		if (!Wysiwyg.insertToken) {
			Wysiwyg.insertToken = insertToken;
		}

		adialog = new $.wysiwyg.dialog(Wysiwyg, {
			"title"   : dialogReplacements.legend,
			"content" : formTokenHtml,
			"open"    : function (e, dialog) {
				dialog.find("form#wysiwyg-tokenInsert ul.tokenList li").click(function () {
					e.preventDefault();
					
					Wysiwyg.insertToken(this.title);

					adialog.close();
					return false;
				});
			
			}
		});
		
		adialog.open();

		$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
	};

	
	// $.wysiwyg.insertToken = function (tokenValue) {
		// return object.each(function () {
			// var Wysiwyg = $(this).data("wysiwyg");

			// if (!Wysiwyg.insertToken) {
				// Wysiwyg.insertToken = insertToken;
			// }

			// if (!Wysiwyg) {
				// return this;
			// }

			// Wysiwyg.insertToken(tokenValue);
			// $(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");

			// return this;
		// });
	// };
})(jQuery);

