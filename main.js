$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(header, value){
  	$lightboxContent.append('<p>' + header + ': ' + value + '</p>');
	};

	var setPrecentViewed = function(){
		var current = Math.ceil((document.body.scrollTop + window.innerHeight) / $(document).height() * 100);
		return (data.percent > current) ? data.percent : current;
	};

	// Globals
	var data = {}
	data.percent = setPrecentViewed();


	var $lightboxContent = $('.lightbox-content');

	// Events
  $('.button').on('click', function() {
		$lightboxContent.empty();
  	$('.lightbox-screen').toggleClass('hidden');

  	addLightboxLine('Percentage of page viewed', data.percent);

  });

  $(window).on('scroll', function() {
  	data.percent = setPrecentViewed();
  });

});