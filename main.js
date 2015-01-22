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
		currentScroll: document.body.scrollTop,
		section: []
	};

	var $lightboxContent = $('.lightbox-content'),
			$sections = $('section');


	$.each($sections, function(index, val) {
		var obj = {
			offset: $(val).offset().top,
			time: 0
		};
		data.section.push(obj);
	});

	data.percent = getPrecentViewed();



	// Timer
	var timer = setInterval(function () {
		data.timeOnPage++;
		var viewTop = document.body.scrollTop,
				viewBottom = document.body.scrollTop + window.innerHeight;

		$.each(data.section, function(i) {
			var sectionTop = this.offset,
					sectionBottom = data.section[i + 1] ? data.section[i + 1].offset : Infinity;
			if (viewTop < sectionBottom && viewBottom > sectionTop ) {
				this.time++;
			}
		});
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
  	addLightboxLine('Time spent on section 1', data.section[0].time, ' seconds');
  	addLightboxLine('Time spent on section 2', data.section[1].time, ' seconds');
  	addLightboxLine('Time spent on section 3', data.section[2].time, ' seconds');
  	addLightboxLine('Time spent on section 4', data.section[3].time, ' seconds');

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