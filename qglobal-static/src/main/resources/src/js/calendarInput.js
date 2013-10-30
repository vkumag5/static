

// j code for suggestion text in calendar input text box


var j = jQuery.noConflict();
var dateFormat;

	function generateSuggestionText() {
			
		 dateFormat = j("#datePatternForUser").text();
			
			calendarOnLoad();
			
		    j(".rich-calendar-input").focus(function(){		    	
			   	calendarFocus(this);
		    });
		  
		   j(".rich-calendar-input").blur(function(){				  
			   calendarBlur(this);
		   });	

			 j(".rich-calendar-popup").click(function(){	
				var parent = j(this).parent().get(0);
				j(parent).children("span").children("input").css("color", "#000000");				
		   });	
	
	}

	function calendarOnLoad() {	
		var x = j(".rich-calendar-input").val() ;
		
		j("input:first").focus();
		
		if (j(".rich-calendar-input").val() == "") {	
			j(".rich-calendar-input").css("color", "#AAA7A7");
			j(".rich-calendar-input").val(dateFormat);		
		}
		
	}
	
	function calendarFocus(currObj) {
		j(currObj).css("color", "#000000");
	      var dob = j(currObj).val();
			  if( dob == dateFormat) { j(currObj).val("");}	
	}
	
	function calendarBlur(currObj) {
		var dob = j(currObj).val();		
		  if( dob == "") { 
		  j(currObj).css("color", "#AAA7A7");
		  j(currObj).val(dateFormat);
		  }	
		  else {
		  j(currObj).css("color", "#000000");
		  }
	}
	
	function checkForSubmit() {
		dateFormat = j("#datePatternForUser").text();
		j(".rich-calendar-input").each(function() {
		  if (j(this).val() == dateFormat) {
		        j(this).val("");
		      }	
		});
		return !isRichMessagePresent();
	}
