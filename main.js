$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(header, value){
  	$lightboxContent.append('<p>' + header + ': ' + value + '</p>');
	};

	var getPrecentViewed = function(){
		var current = Math.ceil((document.body.scrollTop + window.innerHeight) / $(document).height() * 100);
		return (data.percent > current) ? data.percent : current;
	};

	var getDistanceScrolled = function(){
		if (data.currentScroll > document.body.scrollTop) {
			return data.currentScroll - document.body.scrollTop;
		} else {
			return document.body.scrollTop - data.currentScroll;
		}
	};

	// Globals
	var data = {
		scrolled: 0,
		currentScroll: document.body.scrollTop
	}
	data.percent = getPrecentViewed();

	var $lightboxContent = $('.lightbox-content');

	// Events
  $('.button').on('click', function() {
		$lightboxContent.empty();
  	$('.lightbox-screen').toggleClass('hidden');

  	addLightboxLine('Percentage of page viewed', data.percent);
  	addLightboxLine('Total get Distance Scrolled', data.scrolled + 'px');

  });

  $(window).on('scroll', function() {
  	data.percent = getPrecentViewed();
  	data.scrolled += getDistanceScrolled();
  });

});