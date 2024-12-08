// Custom Cursor
var cursor = $(".cursor"),
	follower = $(".cursor-follower");

var posX = 0,
	posY = 0,
	mouseX = 0,
	mouseY = 0;

TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function () {
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		TweenMax.set(follower, {
			css: {
				left: posX - 20,
				top: posY - 20,
			},
		});

		TweenMax.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY,
			},
		});
	},
});

$(document).on("mousemove", function (e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

// $(document).ready(function () {
// 	TweenMax.set(".project-preview", { width: 0 });

// 	var tl = new TimelineLite();

// 	$(document)
// 		.on("mouseover", ".work", function (evt) {
// 			tl = new TimelineLite();
// 			tl.to($(".project-preview"), 1, {
// 				width: "600px",
// 				ease: Expo.easeInOut,
// 			});
// 		})
// 		.on("mouseout", ".work", function (evt) {
// 			tl = new TimelineLite();
// 			tl.to($(".project-preview"), 0.5, {
// 				width: 0,
// 				ease: Expo.easeInOut,
// 			});
// 		});

// });

// $(".work-link-1").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/accumly.jpg)" });
// });
// $(".work-link-2").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/vylla.jpg)" });
// });
// $(".work-link-3").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/books.jpg)" });
// });
// $(".work-link-4").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/fitopia.jpg)" });
// });
// $(".work-link-5").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/notes.jpg)" });
// });
// $(".work-link-6").hover(function () {
// 	$(".project-preview").css({ "background-image": "url(./assets/images/bel.jpg)" });
// });

gsap.registerPlugin(ScrollTrigger);

// nav link animation
ScrollTrigger.create({
	animation: gsap.from(".primary-nav li", {
		yPercent: -250,
		stagger: 0.3545,
		duration: 1,
		opacity: 0,
	}),
	trigger: ".primary-header",
	start: "top 50%",
	ease: "power3.easeOut",
});

// works page work image reveal animation
let revealContainers = document.querySelectorAll(".works-img");

revealContainers.forEach((container) => {
	let image = container.querySelector("img");
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			toggleActions: "restart none none reset",
		},
	});

	tl.set(container, { autoAlpha: 1 });
	tl.from(container, 1.5, {
		xPercent: -100,
		ease: Power2.out,
	});
	tl.from(image, 1.5, {
		xPercent: 100,
		scale: 1.2,
		delay: -1.5,
		ease: Power2.out,
	});
});
