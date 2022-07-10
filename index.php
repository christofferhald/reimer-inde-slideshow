<?php
/**
 * @package Reimer_Inde_Slideshow
 * @version 1.0.15
 */
/*
Plugin Name: Reimer-Inde Slideshow
Plugin URI: https://www.christofferhald.dk
Description: Custom slideshow for Reimer-Inde, requires plug-in Advanced Custom Fields Pro. Use shortcode [reimer_inde_slideshow]
Author: Christoffer Helgelin Hald
Version: 1.0.15
Author URI: https://www.christofferhald.dk
*/



function reimer_inde_loadscripts() {
	function load_custom_functions() {
		wp_register_style('style', plugins_url( '' , __FILE__ ) . '/dist/reimer-inde-slideshow.css','','1.0.15');
		wp_register_script('main', plugins_url( '' , __FILE__ ) . '/dist/reimer-inde-slideshow.js','','1.0.15', false);

		wp_enqueue_style('style');
		wp_enqueue_script('main');
	}

	add_action('wp_enqueue_scripts', 'load_custom_functions');
}













function reimer_inde_slideshow_function(){
	reimer_inde_loadscripts(); // Loads Javacript and CSS
	$output = null;
	
	$videolist = get_field('video_list');


	if ($videolist) {
		$output = <<<EOD
			<div class="swiper-container">
				<div class="swiper mySwiper">
					<div class="swiper-wrapper">
		EOD;
		


		foreach($videolist as $key => $element) {
			$title 					= $element['title'];
			$video_desktop 			= $element['video_16_9'];
			$video_tablet 			= $element['video_1_1'];
			$video_postertablet		= plugins_url( '' , __FILE__ ) . '/dist/poster-tablet.png';
			$video_posterdesktop	= plugins_url( '' , __FILE__ ) . '/dist/poster-desktop.png';
			$delay 					= $element['delay'] - 200;


			
			$output .= <<<EOD
				<div class="swiper-slide" data-swiper-autoplay="$delay">
					<div class="js-swiper-video" data-videodesktop="$video_desktop" data-videotablet="$video_tablet" data-postertablet="$video_postertablet" data-posterdesktop="$video_posterdesktop"></div>

					<div class="title">
						<h5>$title</h5>
					</div>
				</div>
			EOD;
		}



		$output .= <<<EOD
		
					</div>

					<div class="swiper-button-next"></div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-pagination"></div>
				</div>
			</div>

		EOD;
	}
	

	return $output;
}



// <hr />

// 			<video poster="http://localhost:8888/wp-content/plugins/reimer-inde-slideshow/dist/poster-desktop.png" width="1920" height="1080" autoplay muted loop controls>
// 				<source src="https://reimerinde.dev.christofferhald.dk/wp-content/uploads/2022/07/Ikea-3Partners-1920x1080_2500kbps.mp4" type="video/mp4">
// 				Your browser does not support the video tag.
// 			</video>


add_shortcode('reimer_inde_slideshow', 'reimer_inde_slideshow_function');
?>