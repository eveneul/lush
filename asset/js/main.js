$(function () {
	// 스와이퍼
	var swiper = new Swiper('.product-slide', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		loop: true,
		touchRatio: 0,
		effect: 'fade',
		fadeEffect: { crossFade: true },
		slidesPerView: 1,
	});

	//메인 별 배경

	let particle1 = '';
	let particle2 = '';
	for (let i = 0; i < 15; i++) {
		particle1 += `<span class="particle particle1" data-speed="${
			i + 1
		}"><i class="front"></i><i class="back"></i></span>`;
	}
	for (let i = 0; i < 15; i++) {
		particle2 += `<span class="particle particle2" data-speed="${
			i + 1
		}"><i class="front"></i><i class="back"></i></span>`;
	}

	$('.bg-particle').prepend(particle1);
	$('.bg-particle').prepend(particle2);
	const winH = $(window).innerHeight();
	const winW = $(window).innerWidth();

	const sizeArrS = [
		[3, 3],
		[5, 5],
		[4, 4],
		[2, 2],
	];

	const sizeArrM = [
		[10, 10],
		[7, 7],
		[9, 9],
	];

	const small = Math.floor(Math.random() * sizeArrS.length);
	const sizeSmaollSelec = sizeArrS[small];

	const mid = Math.floor(Math.random() * sizeArrM.length);
	const sizeMidSelec = sizeArrM[mid];

	gsap.set('.particle1', {
		width: `${sizeSmaollSelec[0]}`,
		height: `${sizeSmaollSelec[1]}`,
		top: `random(0, ${winH})px`,
		left: `random(0, ${winW})px`,
	});
	gsap.set('.particle2', {
		width: `${sizeMidSelec[0]}`,
		height: `${sizeMidSelec[1]}`,
		top: `random(0, ${winH})px`,
		left: `random(0, ${winW})px`,
	});

	$('body').on('mousewheel', function (e) {
		let y = e.originalEvent.wheelDelta;
		number = Math.abs(y);
		result = number > 10 ? 12 : 5;

		gsap.to('.particle .back', {
			scaleY: result,
		});

		if (y > 0) {
			gsap.set('.particle .back', {
				'transform-origin': 'center top',
				'background': 'rgb(255,255,255)',
				'background':
					'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(159,159,159,1) 93%)',
				'border-top-left-radius': '3px',
				'border-top-right-radius': '3px',
			});
		} else {
			gsap.set('.particle .back', {
				'transform-origin': 'center bottom',
				'background': 'rgb(255,255,255)',
				'background':
					'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(159,159,159,1) 93%)',
				'border-bottom-left-radius': '3px',
				'border-bottom-right-radius': '3px',
			});
		}

		gsap.to('.particle .back', {
			scaleY: 0,
		});
	});

	$(window).mousemove(function (e) {
		$('.particle').each(function (idx, el) {
			const speed = $(this).data('speed');
			const x = ($(window).outerWidth() - e.offsetX * speed) / 350;
			const y = ($(window).outerHeight() - e.offsetY * speed) / 350;

			gsap.to(el, {
				x: x,
				y: y,
			});
		});
	});

	// 헤더 fixed

	const headerAni = gsap
		.from('.header', {
			yPercent: -100,
			paused: true,
			duration: 0.4,
		})
		.progress(1);

	ScrollTrigger.create({
		start: 'top top',
		end: 99999,
		onUpdate: (self) => {
			self.direction === -1 ? headerAni.play() : headerAni.reverse();
		},
	});

	$(window).scroll(function (e) {
		let scrollVal = $(this).scrollTop();

		if (scrollVal <= 10) {
			gsap.to('.header', {
				'background-color': 'rgba(24,24,24, 0)',
			});
		} else {
			gsap.to('.header', {
				'background-color': 'rgba(24,24,24, 1)',
			});
		}
	});

	// 로딩 완료된 후 헤더 애니메이션

	const header = gsap.timeline({
		defaults: {
			duration: 0.5,
			ease: 'power2.out',
		},
	});

	header
		.addLabel('header')
		.from(
			'.header-border',
			{
				width: '1%',
				duration: 1,
			},
			'header+=0'
		)
		.from('.logo', { opacity: 0, yPercent: -100 }, 'header+=0.2')
		.from('.menu-char1', { opacity: 0, yPercent: -100 }, 'header+=0.3')
		.from('.menu-char2', { opacity: 0, yPercent: -100 }, 'header+=0.4')
		.from('.menu-char3', { opacity: 0, yPercent: -100 }, 'header+=0.5')
		.from('.menu-char4', { opacity: 0, yPercent: -100 }, 'header+=0.6')
		.from('.btn-search', { opacity: 0, yPercent: -100 }, 'header+=0.7')
		.from('.link-cart', { opacity: 0, yPercent: -100 }, 'header+=0.8')
		.from('.link-user', { opacity: 0, yPercent: -100 }, 'header+=0.9');

	// 헤더 로고 애니메이션

	const logo = gsap.timeline({
		defaults: {
			duration: 0.6,
			ease: 'power2.out',
		},
	});

	logo
		.addLabel('logo')
		.to('.circle', { left: 0 }, 'logo+=0')
		.to('.char4', { opacity: 0, yPercent: 100 }, 'logo+=0')
		.to('.char3', { opacity: 0, yPercent: -100 }, 'logo+=0.1')
		.to('.char2', { opacity: 0, yPercent: 100 }, 'logo+=0.2')
		.to('.char1', { opacity: 0, yPercent: -100 }, 'logo+=0.3');

	logo.pause(); // 애니메이션이 바로 시작되는 것이 아니라 일단 일시정지

	$('.logo').mouseover(() => logo.play());
	$('.logo').mouseleave(() => logo.reverse());

	// 메인 비주얼 애니메이션

	gsap.from('.sc-visual', {
		duration: 1,
		opacity: 0,
	});

	const visualAni = gsap.timeline({
		defaults: {
			duration: 1,
			ease: 'power2.out',
		},
	});

	visualAni
		.from('.sc-visual .sc-title', {
			scaleY: 5,
		})
		.from('.sc-visual .link-more', {
			duration: 0.5,
			opacity: 0,
			bottom: '200px',
		})
		.from('.rotate-article', {
			duration: 0.5,
			opacity: 0,
		})
		.to('.sc-visual .group-right .img-box', {
			opacity: 1,
		})
		.to('.sc-visual .group-right .img-box', {
			y: '15px',
			repeat: -1,
			yoyo: true,
			ease: Power1.easeInOut,
		});

	// new item 마우스무브 이벤트

	const newItem = $('.new-item');

	newItem.mousemove(function (e) {
		const item = $(this).find('.mainimg-box img');
		const speed = $(this).data('speed');
		const x = (newItem.outerWidth() - e.offsetX * speed) / 50;
		const y = (newItem.outerHeight() - e.offsetY * speed) / 50;
		gsap.to(item, {
			x: x,
			y: y,
		});
	});

	// about section 텍스트 오퍼시티 애니메이션

	const aboutTextAni = gsap.timeline({
		scrollTrigger: {
			trigger: '.sc-about',
			start: '0 0',
			end: '+=300%',
			pin: true,
			scrub: 1,
		},
	});
	aboutTextAni
		.from('.sc-about .text-area span', {
			opacity: 0,

			stagger: {
				from: 'random',
				amount: 2,
			},
		})
		.from('.sc-about .link-about', {
			opacity: 0,
		});

	// about 링크 마우스오버 이벤트

	const aboutBtn = $('.sc-about .link-about');
	aboutBtn.mousemove(function (e) {
		const speed = $(this).data('speed');
		const x = (aboutBtn.outerWidth() - e.offsetX * speed) / 10;
		const y = (aboutBtn.outerHeight() - e.offsetY * speed) / 10;

		gsap.to(aboutBtn, {
			x: x,
			y: y,
		});
	});

	// spa 텍스트 scaleY

	gsap.to('.sc-spa .bgtext-area .animate', {
		scaleY: 2,
		scrollTrigger: {
			trigger: '.sc-spa',
			start: 'top 40%',
			end: 'bottom top',
			scrub: 1,
		},
	});

	// spa 이미지 마우스무브 이벤트

	const spaImg = $('.sc-spa .thumb-area');
	spaImg.mousemove(function (e) {
		const speed = $(this).data('speed');
		const x = (spaImg.outerWidth() - e.offsetX * speed) / 80;
		const y = (spaImg.outerHeight() - e.offsetY * speed) / 80;

		gsap.to(spaImg, {
			x: x,
			y: y,
		});
	});

	// 푸더 텍스트 scaleY

	gsap.to('.footer-bottom .animate', {
		scrollTrigger: {
			trigger: '.footer-bottom .animal',
			start: 'bottom top',
			end: '+=100%',
			scrub: 1,
			pin: '.footer-bottom .animate',
		},
		scaleY: 4,
	});

	// 스크롤 마지막까지 내리면 맨 상단으로 이동하기

	$(window).scroll(function (e) {
		let scrolled = $(this).scrollTop();
		const h = $(document).height();
		let speed = 500;

		if (scrolled >= h - 1200) {
			$('body, html').animate({ scrollTop: 0 }, speed);
		}
	});
});
