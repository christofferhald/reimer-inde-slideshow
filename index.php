<?php
/**
 * @package Reimer_Inde_Slideshow
 * @version 1.0.6
 */
/*
Plugin Name: Reimer-Inde Slideshow
Plugin URI: https://www.christofferhald.dk
Description: Custom slideshow for Reimer-Inde, requires plug-in Advanced Custom Fields Pro. Use shortcode [reimer_inde_slideshow]
Author: Christoffer Helgelin Hald
Version: 1.0.6
Author URI: https://www.christofferhald.dk
*/



function reimer_inde_loadscripts() {
	function load_custom_functions() {
		wp_register_style('style', plugins_url( '' , __FILE__ ) . '/dist/reimer-inde-slideshow.css','','1.0.5');
		wp_register_script('main', plugins_url( '' , __FILE__ ) . '/dist/reimer-inde-slideshow.js','','1.0.5', false);

		wp_enqueue_style('style');
		wp_enqueue_script('main');
	}

	add_action('wp_enqueue_scripts', 'load_custom_functions');
}





// Preloads first video
function preload_firstvideo() {
	$videolist = get_field('video_list');
	
	if ($videolist) {
		$videoTablet  = $videolist[0]['video_1_1'];
		echo "<link rel='preload' href='$videoTablet' as='video' type='video/mp4' media='(max-width: 992px)' />";

		$videoDesktop  = $videolist[0]['video_16_9'];
		echo "<link rel='preload' href='$videoDesktop' as='video' type='video/mp4' media='(min-width: 993px)' />";
	}

	
}
add_action( 'wp_head', 'preload_firstvideo' );



















function reimer_inde_slideshow_function(){
	reimer_inde_loadscripts(); // Loads Javacript and CSS
	$output = null;
	
	$videolist = get_field('video_list');


	if ($videolist) {
		$output = <<<EOD
			<div class="swiper mySwiper">
				<div class="swiper-wrapper">
		EOD;
		


		foreach($videolist as $key => $element) {
			$title 			= $element['title'];
			$video_desktop 	= $element['video_16_9'];
			$video_tablet 	= $element['video_1_1'];
			$delay 			= $element['delay'] - 200;


			$firstVideo = ($key == 0) ? ("src='$video_tablet'") : null; // inserts src in first element

			$preloadSetting = ($key == 0) ? ("preload='auto'") : ("preload='metadata'");


			$output .= <<<EOD
				<div class="swiper-slide" data-swiper-autoplay="$delay">
					<video class="responsivevideos" data-videodesktop="$video_desktop"  data-videotablet="$video_tablet" $preloadSetting autoplay loop muted>
						<source $firstVideo type="video/mp4">
					</video>

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
		EOD;
	}
	

	return $output;
}


add_shortcode('reimer_inde_slideshow', 'reimer_inde_slideshow_function');
?>