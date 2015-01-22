$(document).on('ready', function() {

	// Functions
	var addLightboxLine = function(header, field){
		var value = header.split('|')[1];
		header = header.split('|')[0];
		field = (field.indexOf('|') > 0) ? data[field.split('|')[0]][field.split('|')[1]].time : data[field];
  	$lightboxContent.append('<p>' + header + ': ' + field + value + '</p>');
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
	data.percent = getPrecentViewed();

	var fields = {
		'Percentage of page viewed|%': 'percent',
		'Total get Distance Scrolled|px': 'scrolled',
		'Time spent on page| seconds': 'timeOnPage',
	};

	var $lightboxContent = $('.lightbox-content'),
			$sections = $('section');

	$.each($sections, function(i, val) {
		var obj = {
			offset: $(val).offset().top,
			time: 0
		};
		data.section.push(obj);
		fields['Time spent on section ' + i + '| seconds'] = 'section|' + i;
	});

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
  	$.each(fields, function(i, val) {
  		addLightboxLine(i, val);
  	});
  });

  $(window).on('scroll', function() {
  	data.percent = getPrecentViewed();
  	data.scrolled += getDistanceScrolled();
  });

  $('.signup-button').one('click', function() {
  	data.timeBeforeSignup = data.timeOnPage;
  	fields[ 'Time before clicking Sign Up| seconds' ] = 'timeBeforeSignup';
  	return false;
  });

});