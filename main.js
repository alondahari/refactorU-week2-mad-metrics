$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(field){
		// field = (field.indexOf('|') > 0) ? data[field.split('|')[0]][field.split('|')[1]].time : data[field];
  	$lightboxContent.append('<p>' + field.header + ': ' + field.value + field.unit + '</p>');
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
		percent: {
			header: 'Percentage of page viewed',
			unit: '%'
		},
		scrolled: {
			header: 'Total get Distance Scrolled',
			unit: 'px',
			value: 0
		},
		timeOnPage: {
			header: 'Time spent on page',
			unit: ' seconds',
			value: 0
		},
		currentScroll: document.body.scrollTop,
		sections: []
	};
	data.percent.value = getPrecentViewed();

	var $lightboxContent = $('.lightbox-content'),
			$sections = $('section');

	$.each($sections, function(i, val) {
		data.sections.push({
			header: 'Time spent on section' + (i+1),
			unit: ' seconds',
			offset: $(val).offset().top,
			value: 0
		});
	});

	// Timer
	var timer = setInterval(function () {
		data.timeOnPage.value++;

		var viewTop = document.body.scrollTop,
				viewBottom = document.body.scrollTop + window.innerHeight;

	}, 1000);

	// Events
  $('.toggle-button').on('click', function() {
		$lightboxContent.empty();
  	$('.lightbox-screen').toggleClass('hidden');
  	$.each(data, function(i, val) {
  		if (val.constructor === Object) {
  			addLightboxLine(val);
			} else if (val.constructor === Array) {
				$.each(val, function(i, val) {
					addLightboxLine(val);
				});
			}
  	});
  });

  $(window).on('scroll', function() {
  	data.percent.value = getPrecentViewed();
  	data.scrolled.value += getDistanceScrolled();
  });

  $('.signup-button').one('click', function() {
		data.timeBeforeSignup = {
			header: 'Time before clicking Sign Up',
			unit: ' seconds',
			value: data.timeOnPage.value
		};
  	return false;
  });

});