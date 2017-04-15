/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('#nav a');

			// Scrolly-fy links.
				$nav_a
					.scrolly()
					.on('click', function(e) {

						var t = $(this),
							href = t.attr('href');

						if (href[0] != '#')
							return;

						e.preventDefault();

						// Clear active and lock scrollzer until scrolling has stopped
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');

						// Set this link to active
							t.addClass('active');

					});

			// Initialize scrollzer.
				var ids = [];

				$nav_a.each(function() {

					var href = $(this).attr('href');

					if (href[0] != '#')
						return;

					ids.push(href.substring(1));

				});

				$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

			// Toggle.
				$(
					'<div id="headerToggle">' +
						'<a href="#header" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#headerToggle, #header, #main')
						.css('transition', 'none');

		// Banner

			// Check width and display them

			toggleBannerDisplay();
			window.onresize = function() {
				toggleBannerDisplay();
			}

			function toggleBannerDisplay() {
				if (window.innerWidth < 750) {
					document.getElementById('wnd').style.display = 'none';    
				}
				else {
					document.getElementById('wnd').style.display = 'block';             
				}    
			}

		// Education

			// Watch the scroll reachs the components of education
			jQuery(document).ready(function($){
				var timelineBlocks = $('.timeline-block'),
					offset = 0.8;

				//hide timeline blocks which are outside the viewport
				hideBlocks(timelineBlocks, offset);

				//on scolling, show/animate timeline blocks when enter the viewport
				$(window).on('scroll', function(){
					(!window.requestAnimationFrame) 
						? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
						: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
				});

				function hideBlocks(blocks, offset) {
					blocks.each(function(){
						( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).addClass('is-hidden');
					});
				}

				function showBlocks(blocks, offset) {
					blocks.each(function(){
						if ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).hasClass('is-hidden') ) {
							let animate = '';
							if (window.innerWidth < 770) {
								animate = 'fadeInRight';
							} else {
								if ($(this).hasClass('timeline-block-left')) { animate = 'fadeInLeft'; }
								if ($(this).hasClass('timeline-block-right')) { animate = 'fadeInRight'; }
							}
							$(this).removeClass('is-hidden').addClass(animate + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
								$(this).removeClass(animate + ' animated');
							});
						};
					});
				}
			});

	});

})(jQuery);