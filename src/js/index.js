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







const buildSlideVideos = () => {
	const browserWidth = window.innerWidth
	const slides = document.querySelectorAll('.js-swiper-video')

	
	slides.forEach(slide => {
		const video 	= document.createElement('video')
	
		video.src 		= slide.dataset.videotablet
		video.poster	= slide.dataset.postertablet
		video.autoplay 	= true
		video.controls 	= false
		video.loop 		= true
		video.muted 	= true
		video.width 	= 1080
		video.height	= 1080
		video.preload 	= "metadata"
		
		video.setAttribute('webkit-playsinline', 'webkit-playsinline')
		video.setAttribute('playsinline', 'playsinline')
		
		if (browserWidth >= 991) {
			video.poster	= slide.dataset.posterdesktop
			video.src 		= slide.dataset.videodesktop
			video.width 	= 1920
		}
	
		slide.appendChild(video);
	})
}




const removeSlideVideos = () => {
	// const mySwiper = document.querySelector('.mySwiper')
	// if (!mySwiper) return
	// mySwiper.classList.remove('loaded') // Fade in CSS


	const slides = document.querySelectorAll('.js-swiper-video')

	slides.forEach(slide => {
		slide.removeChild(slide.firstElementChild)
	})
}
















const swiperInit = () => {
	buildSlideVideos() // Adds element and src


	const mySwiper = document.querySelector('.mySwiper')
	if (!mySwiper) return
	
	mySwiper.classList.add('loaded') // Fade in CSS



	// responsiveVideoSourceSet() // Uses data attr to set source (square og 16:9 format video)

	
		

	var swiper = new Swiper(".mySwiper", {
		modules: [Navigation, Pagination, Autoplay],
		// modules: [Navigation, Pagination],
	

		// loop: true,
		// autoplay: false,

		observer: false,
		resizeObserver: false,

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












let newWidth = window.innerWidth
let oldWidth = newWidth
let resizeId = null;

window.addEventListener('resize', () => {
	// clearTimeout(resizeId);
	


	newWidth = window.innerWidth;

	if (newWidth <= 900 && oldWidth > 900) { 
		console.log("SMALLER")
		const mySwiper = document.querySelector('.mySwiper')
		mySwiper.classList.remove('loaded') // Fade in CSS // Fade out
		
		clearTimeout(resizeId);
		resizeId = setTimeout(doneResizing, 500);
	}

	if (newWidth > 900 && oldWidth <= 900) {
		console.log("BIGGER")
		const mySwiper = document.querySelector('.mySwiper')
		mySwiper.classList.remove('loaded') // Fade in CSS // Fade out
		
		clearTimeout(resizeId);
		resizeId = setTimeout(doneResizing, 500);
	}

	oldWidth = newWidth

	
})



function doneResizing() {
	// alert('Resize trigger')
	removeSlideVideos()
	buildSlideVideos()
	
	// Fade in
	const mySwiper = document.querySelector('.mySwiper')
	mySwiper.classList.add('loaded') // Fade in CSS
}




// Closure last-height/width
// var lastX = window.innerWidth
// var lastY = window.innerHeight

// function fooOnResize() {
// 	var x = window.innerWidth
// 	var y = window.innerHeight
   
// 	if (lastX < 900 && 900 <= x) {
// 		console.log("OVER")
// 		// removeSlideVideos()
// 		// buildSlideVideos()
// 	}

// 	if (lastX >= 900 && 900 > x) {
// 		console.log("UNDER")
// 		// removeSlideVideos()
// 		// buildSlideVideos()
// 	}
	
// 	lastX = x
// 	lastY = y
// }

// window.addEventListener("resize", fooOnResize)


// window.addEventListener('resize', () => {
// 	// Swiper.update()
// })



// DOM ready
window.addEventListener("DOMContentLoaded", () => {
	swiperInit()
})
	
