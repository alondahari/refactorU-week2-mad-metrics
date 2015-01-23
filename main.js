$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(field){
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

	var setViewedSections = function(){
		var viewTop = document.body.scrollTop,
				viewBottom = document.body.scrollTop + window.innerHeight;

		$.each(data.sections, function(i) {
			var sectionTop = this.offset,
				sectionBottom = data.sections[i + 1] ? data.sections[i + 1].offset : Infinity;
			this.viewed = (viewTop < sectionBottom && viewBottom > sectionTop );
		});
	};

	// Globals
	var $lightboxContent = $('.lightbox-content'),
			$sections = $('section');

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

	$.each($sections, function(i, val) {
		data.sections.push({
			header: 'Time spent on section' + (i+1),
			unit: ' seconds',
			offset: $(val).offset().top,
			value: 0,
			viewed: false
		}
	);
	setViewedSections();


	});

	// Timer
	var timer = setInterval(function () {
		data.timeOnPage.value++;

		$.each(data.sections, function(i) {
			if (this.viewed === true) this.value++;
		});

	}, 1000);

	// Events
  $('.toggle-button').on('click', function() {
		$lightboxContent.empty();
  	$('.lightbox-screen').toggleClass('hidden');
  	$.each(data, function(i, val) {
  		if (val.constructor === Object) {
  			addLightboxLine(val);
			} else if (val.constructor === Array) {
				$.each(val, function(i, value) {
					addLightboxLine(value);
				});
			}
  	});
  });

  $(window).on('scroll', function() {
  	data.percent.value = getPrecentViewed();
  	data.scrolled.value += getDistanceScrolled();
  	setViewedSections();

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