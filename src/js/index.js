// core version + navigation, pagination modules:
// import Swiper from 'swiper';
// import Swiper from 'swiper/bundle';





// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';



// Styles
import "../scss/style.scss"










const responsiveVideoSourceSet = () => {
	// const bodyElement = document.body
	const breakpoint = document.body.dataset.breakpointJs;
	window.breakpoint = breakpoint;

	// console.log(breakpoint)



	const videoElements = document.querySelectorAll('.responsivevideos');
	// console.log(videoElements)


	if (breakpoint == "xs" || breakpoint == "sm" || breakpoint == "md") {
		videoElements.forEach(video => {
			// console.log(video.dataset.videodesktop)
			video.setAttribute('src', video.dataset.videotablet);
			video.setAttribute('width', "1080");
			video.setAttribute('height', "1080");
		})
	} else {
		videoElements.forEach(video => {
			// console.log(video.dataset.videodesktop)
			video.setAttribute('src', video.dataset.videodesktop);
			video.setAttribute('width', "1920");
			video.setAttribute('height', "1080");
		})

	}
}





const responsiveVideoSourceChange = () => {
	const breakpointNew = document.body.dataset.breakpointJs;

	// if (breakpointNew != window.breakpoint && breakpointNew == "lg") {
	// 	// console.log("Switch to desktop videos")
	// 	responsiveVideoSourceSet()
	// }

	// if (breakpointNew != window.breakpoint && breakpointNew == "md") {
	// 	// console.log("Switch to tablet videos")
	// 	responsiveVideoSourceSet()
	// }

	if (breakpointNew != window.breakpoint) {
		// console.log("Switch to desktop videos")
		responsiveVideoSourceSet()
	}

	if (breakpointNew != window.breakpoint) {
		// console.log("Switch to tablet videos")
		responsiveVideoSourceSet()
	}
}







const swiperInit = () => {
	const mySwiper = document.querySelector('.mySwiper')
	if (!mySwiper) return
	
	mySwiper.classList.add('loaded') // Fade in CSS



	responsiveVideoSourceSet() // Uses data attr to set source (square og 16:9 format video)

	
		

	var swiper = new Swiper(".mySwiper", {
		modules: [Navigation, Pagination, Autoplay],
		// modules: [Navigation, Pagination],
	

		// loop: true,

		autoplay: {
          delay: 500,
          disableOnInteraction: false,
        },

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},


		/* ON INIT AUTOPLAY THE FIRST VIDEO */
		on: {
			// init: function () {
			// },

			slideChange: function () {
				const allVideos = document.querySelectorAll('video')

				allVideos.forEach(video => {
					
					
			
					setTimeout(() => {
						video.currentTime = 0
					}, 150)
				})
			}


		}

	})


	

}





// Resize
window.addEventListener('resize', () => {
	responsiveVideoSourceChange()
})






// DOM ready
window.addEventListener("DOMContentLoaded", () => {
	swiperInit()
})
	
	