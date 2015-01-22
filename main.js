$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(header, amount, value){
  	$lightboxContent.append('<p>' + header + ': ' + amount + value + '</p>');
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
		timeOnPage: 0,
		currentScroll: document.body.scrollTop
	};

	data.percent = getPrecentViewed();

	var $lightboxContent = $('.lightbox-content');


	// Timer
	var timer = setInterval(function () {
		data.timeOnPage += 1;
	}, 1000);

	// Events
  $('.toggle-button').on('click', function() {
		$lightboxContent.empty();
  	$('.lightbox-screen').toggleClass('hidden');

  	addLightboxLine('Percentage of page viewed', data.percent, '%');
  	addLightboxLine('Total get Distance Scrolled', data.scrolled, 'px');
  	if (data.hasOwnProperty('timeBeforeSignup')) {
  		addLightboxLine('Time before clicking Sign Up', data.timeBeforeSignup, ' seconds');
  	}
  	addLightboxLine('Time spent on page', data.timeOnPage, ' seconds');

  });

  $(window).on('scroll', function() {
  	data.percent = getPrecentViewed();
  	data.scrolled += getDistanceScrolled();
  });

  $('.signup-button').one('click', function() {
  	data.timeBeforeSignup = data.timeOnPage;
  	return false;
  });

});