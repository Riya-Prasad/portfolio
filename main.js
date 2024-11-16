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

// split text animation
window.addEventListener("load", function () {
	let revealText = document.querySelectorAll(".reveal-text");
	let results = Splitting({ target: revealText, by: "lines" });

	results.forEach((splitResult) => {
		const wrappedLines = splitResult.lines
			.map(
				(wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
						.map(
							(word) => `${word.outerHTML}<span class="whitespace">
         </span>`
						)
						.join("")}
        </div></span>`
			)
			.join("");
		splitResult.el.innerHTML = wrappedLines;
	});

	gsap.registerPlugin(ScrollTrigger);
	let revealLines = revealText.forEach((element) => {
		const lines = element.querySelectorAll(".line .words");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: element,
				toggleActions: "restart none none reset",
				start: "top 80%",
			},
		});
		tl.set(revealText, { autoAlpha: 1 });
		tl.from(lines, 1, {
			yPercent: 200,
			ease: Power3.easeOut,
			stagger: 0.1225,
			delay: 0.3,
		});
	});
});

jQuery(document).ready(function () {
	let splitLines = jQuery("[data-line]");
	splitLines.each(function (i, j) {
		let x = new SplitText(j, {
			type: j.getAttribute("data-line"),
			linesClass: "line",
			wordsClass: "word",
			charsClass: "char",
		});
		let delay = j.getAttribute("data-delay");

		x.chars.forEach((ele, index) => {
			if (delay) {
				gsap.to(ele, { "--delay": index + parseInt(delay) + "s" });
			} else {
				gsap.to(ele, { "--delay": index + "s" });
			}
		});
	});
	let splitLines2 = jQuery("[data-line-no-animation]");
	splitLines2.each(function (i, j) {
		new SplitText(j, {
			type: j.getAttribute("data-line-no-animation"),
			linesClass: "line",
			wordsClass: "word",
			charsClass: "char",
		});
	});

	let splitLines3 = jQuery("[data-line-within-line]");
	splitLines3.each(function (i, j) {
		let x = new SplitText(j, { type: "lines", linesClass: "line-inner" });
		new SplitText(jQuery(j).find(".line-inner"), {
			type: "lines",
			linesClass: "line-mask",
		});
		let delay = j.getAttribute("data-delay");

		x.lines.forEach((ele, index) => {
			if (delay) {
				let delaytamp = index + parseInt(delay);
				gsap.to(ele, { "--delay": delaytamp + "s" });
			} else {
				gsap.to(ele, { "--delay": index + "s" });
			}
		});
	});
});

jQuery(window).on("load", function () {
	document.body.classList.add("loaded");
});
