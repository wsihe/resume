$(document).ready(function() {



	// 
	var setPrt = $('#services .row'),
	setChd = setPrt.find('>div');
	function argHeight(){
		prtWidth = setPrt.outerWidth();
		chdWidth = setChd.outerWidth();
		setNum = Math.floor(prtWidth / chdWidth);
		chdLength = setChd.length;
		setChd.css({height:'auto'});
		setPrt.each(function(){
			h = 0;
			setChd.each(function(i){
				var self = $(this),
				i = i+1,
				hSet = self.outerHeight(),
				pdTop = parseInt(self.css('padding-top')),
				pdBtm = parseInt(self.css('padding-bottom')),
				boxSizing = self.css('box-sizing');
				self.addClass('heightReplace');
				if(hSet > h){
					h = hSet;
				};
				if(boxSizing === 'border-box'){
					setPrt.find('.heightReplace').css({height:h});
				} else {
					setPrt.find('.heightReplace').css({height:(h-(pdTop + pdBtm))});
				}
				if(i%setNum == 0 || i == chdLength){
					h = 0;
					setChd.removeClass('heightReplace');
				}
			});
		});
	}
	$(window).on('load resize',function(){
		argHeight();
	}).resize();

	/*============================================
	MOVIE
	==============================================*/

	var options = { videoId: 'riMfIhIb8Rk'};
    $('#home').tubular(options);

    var _ovc = $('<div id="bgOverlayContainer">').appendTo($('body'));
    _ovc.addClass('overlayPattern');

    $(window).on('resize', function(){
        _ovc.css({
          height : window.innerHeight
        });
    });

	/*============================================
	Page Preloader
	==============================================*/

	$(window).load(function(){
		$('#page-loader').fadeOut(500,function(){
			loadGmap();
		});

	})

	/*============================================
	Header
	==============================================*/

	$('#home').height($(window).height()+50);

	// $.backstretch('assets/images/header-bg.jpg');

	$(window).scroll( function() {
		var st = $(this).scrollTop(),
			wh = $(window).height(),
			sf = 1.2 - st/(10*wh);

		// $('.backstretch img').css({
		// 	'transform' : 'scale('+sf+')',
		// 	'-webkit-transform' : 'scale('+sf+')'
		// });

		$('#home .container').css({ 'opacity' : (1.4 - st/400) });

		// if($(window).scrollTop() > ($(window).height()+50)){
		// 	$('.backstretch').hide();
		// }else{
		// 	$('.backstretch').show();
		// }

	});

	var st = $(this).scrollTop(),
		wh = $(window).height(),
		sf = 1.2 - st/(10*wh);

	// $('.backstretch img').css({
	// 	'transform' : 'scale('+sf+')',
	// 	'-webkit-transform' : 'scale('+sf+')'
	// });

	$('#home .container').css({ 'opacity' : (1.4 - st/400) });


	/*============================================
	Navigation Functions
	==============================================*/
	if ($(window).scrollTop()< ($(window).height()-50)){
		$('#main-nav').removeClass('scrolled');
	}
	else{
		$('#main-nav').addClass('scrolled');
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()< ($(window).height()-50)){
			$('#main-nav').removeClass('scrolled');
		}
		else{
			$('#main-nav').addClass('scrolled');
		}
	});

	/*============================================
	ScrollTo Links
	==============================================*/
	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {gap:{y:-70}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	/*============================================
	Skills
	==============================================*/
	$('.skills-item').each(function(){
		var perc = $(this).find('.percent').data('percent');

		$(this).data('height',perc);
	})

	$('.touch .skills-item').each(function(){
		$(this).css({'height':$(this).data('height')+'%'});
	})

	$('.touch .skills-bars').css({'opacity':1});

	/*============================================
	Project thumbs - Masonry
	==============================================*/
	$(window).load(function(){

		$('#projects-container').css({visibility:'visible'});

		$('#projects-container').masonry({
			itemSelector: '.project-item:not(.filtered)',
			//columnWidth:370,
			isFitWidth: true,
			isResizable: true,
			isAnimated: !Modernizr.csstransitions,
			gutterWidth: 25
		});

		scrollSpyRefresh();
		waypointsRefresh();

	});

	/*============================================
	Filter Projects
	==============================================*/
	$('#filter-works a').click(function(e){
		e.preventDefault();

		if($('#project-preview').hasClass('open')){
			closeProject();
		}

		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');

		var category = $(this).attr('data-filter');

		$('.project-item').each(function(){
			if($(this).is(category)){
				$(this).removeClass('filtered');
			}
			else{
				$(this).addClass('filtered');
			}

			$('#projects-container').masonry('reload');
		});

		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Project Preview
	==============================================*/
	$('.project-item').click(function(e){
		e.preventDefault();

		var elem = $(this),
			title = elem.find('.project-title').text(),
			descr = elem.find('.project-description').html(),
			slidesHtml = '<ul class="slides">',
			elemDataCont = elem.find('.project-description');

			slides = elem.find('.project-description').data('images').split(',');

		for (var i = 0; i < slides.length; ++i) {
			slidesHtml = slidesHtml + '<li><img src='+slides[i]+' alt=""></li>';
		}

		slidesHtml = slidesHtml + '</ul>';

		$('#project-title').text(title);
		$('#project-content').html(descr);
		$('#project-slider').html(slidesHtml);

		openProject();

	});

	function openProject(){

		$('#project-preview').addClass('open');
		$('.masonry-wrapper').animate({'opacity':0},300);

		setTimeout(function(){
			$('#project-preview').slideDown();
			$('.masonry-wrapper').slideUp();

			$('html,body').scrollTo(0,'#filter-works',
				{
					gap:{y:-20},
					animation:{
						duration:400
					}
			});

			$('#project-slider').flexslider({
				prevText: '<i class="fa fa-angle-left"></i>',
				nextText: '<i class="fa fa-angle-right"></i>',
				animation: 'slide',
				slideshowSpeed: 3000,
				useCSS: true,
				controlNav: true,
				pauseOnAction: false,
				pauseOnHover: true,
				smoothHeight: false,
				start: function(){
					$(window).trigger('resize');
					$('#project-preview').animate({'opacity':1},300);
				}
			});

		},300);

	}

	function closeProject(){

		$('#project-preview').removeClass('open');
		$('#project-preview').animate({'opacity':0},300);

		setTimeout(function(){
			$('.masonry-wrapper').slideDown();
			$('#project-preview').slideUp();

			$('#project-slider').flexslider('destroy');
			$('.masonry-wrapper').animate({'opacity':1},300);


		},300);

		setTimeout(function(){
			$('#projects-container').masonry('reload');
		},500)
	}

	$('.close-preview').click(function(){
		closeProject();
	})

	/*============================================
	Contact Map
	==============================================*/
	function loadGmap(){
			var map = new BMap.Map("allmap");                        // 创建Map实例
					map.centerAndZoom(new BMap.Point(113.346913,23.176349), 16);     // 初始化地图,设置中心点坐标和地图级别
					// map.centerAndZoom("广州", 15);     // 初始化地图,设置中心点坐标和地图级别
					map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
					map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
					map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
					map.enableScrollWheelZoom();                            //启用滚轮放大缩小
					map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
					map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
					var marker1 = new BMap.Marker(new BMap.Point(113.346913,23.176349));  // 创建标注
					map.addOverlay(marker1);              // 将标注添加到地图中
					//创建信息窗口
					var infoWindow1 = new BMap.InfoWindow("<strong>river·前端</strong><br>地址：广东省广州市天河区长兴路147号B4");
					marker1.addEventListener("click", function () {
						this.openInfoWindow(infoWindow1);
					});
					marker1.openInfoWindow(infoWindow1);
	}
	/*============================================
	Waypoints Animations
	==============================================*/
	$('#skills').waypoint(function(){

		$('.skills-item').each(function(){
			$(this).css({'height':$(this).data('height')+'%'});
		})

		$('.skills-bars').css({'opacity':1});

	},{offset:'40%'});

	$('.scrollimation').waypoint(function(){
		$(this).addClass('in');
	},{offset:'90%'});

	/*============================================
	Resize Functions
	==============================================*/
	var thumbSize = $('.project-item').width();

	$(window).resize(function(){
		$('#home').height($(window).height()+50);

		if($('.project-item').width() != thumbSize){

			$('#projects-container').masonry('reload');
			thumbSize = $('.project-item').width();
		}

		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}
});