var jq$ = jQuery.noConflict();
jq$(document).ready(function() {
	//slideShowImages();
	slideNews();
});

function slideShowImages()  {
	jq$('.slideshow').cycle({
		fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	});
}

function slideNews()  {
	jq$('#slides').slides({
				preload: true,
				generatePagination: true,
				//play: 5000,
				//pause: 2500,
				hoverPause: true,
				// Get the starting slide
				//start: startSlide,
				
	});
}