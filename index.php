<?php
/**
 * @package Malmos_REST_API_endpoints
 * @version 1.0.0
 */
/*
Plugin Name: Malmos REST API endpoints
Plugin URI: https://www.re-public.com
Description: Custom news endpoint for idverde website. Access at <code>https://malmos.as/wp-json/idverde/news/v1/10/</code> (10 posts)
Author: Christoffer Helgelin Hald
Version: 1.0.0
Author URI: https://www.re-public.com
*/


function custom_JSON_endpoint($data) {
	
	$args = array(
		// 'posts_per_page' 	=> 2,
		'showposts' => $data['items'],
		// 'lang' => 'en',
		'category_name' => 'nyhed',
		// 'post_type' => 'medarbejder',
        'post_status' => 'publish',

		'meta_query' => array(
			array(
				'key'   => 'idverde_show',
				'value' => '1'
			)
		)
	);


	$items = array();

	$query = new WP_Query($args);

	if ($query->posts) {
		foreach ($query->posts as $key => $post) {
			$id = $post->ID;

			$id_digits 		= sprintf("%08d", $id);
			$permalink 		= get_the_permalink($id);
			$title 			= get_the_title($id);
			$date 			= get_the_date('dmY', $id);
			$excerpt 		= get_the_excerpt($id);

			$imageID 		= get_post_thumbnail_id($id);
			$imageArray 	= wp_get_attachment_image_src( $imageID, 'large' );

			// Only the URL
			$image = false;
			if ($imageArray) {
				$image = $imageArray[0];
			}
			

			$content 		= apply_filters('the_content', get_post_field('post_content', $id));
			
			// Sanitation
			$content 		= str_replace('<p><!--more--></p>', '', $content);
			$content 		= str_replace('<!--more-->', '', $content);


			$items[] = array(
				'overskrift' => $title,
				'dato' => $date,
				'id' => $id,
				'id_artikel' => $id_digits,
				"lead_artikel" => $excerpt,
				"tekst_nyheder" => $content,
				"billede_artikel" => $image,
				"billede_artikel_array" => $imageArray,
				"permalink" => $permalink	
			);

		}
	}
	return $items;
}











add_action( 'rest_api_init', function() {
	register_rest_route( 'idverde/news/v1', '/(?P<items>\d+)', array(
		// register_rest_route( 'idverde/v1', '/items', array(
		'methods' => 'GET',
		'callback' => 'custom_JSON_endpoint',
	));
});
?>