<?php
/**
 * Plugin Name: Post Slideshow - Gutenberg Block
 * Description: A great slideshow to display recent posts loaded from the WordPress API Rest of a given website.
 * Version: 1.0.0
 * Author: Felipe López
 * Text Domain: post-slideshow
 *
 * @package post-slideshow
 */

add_filter( 'should_load_separate_core_block_assets', '__return_true' );

/**
 * Register block using the block.json file in the same folder, wich will call
 * index.js as the editorScript for the implementation of save and edit functions
 */
function register_post_slideshow_block() {
    register_block_type( plugin_dir_path( __FILE__ ) );
}

add_action( 'init', 'register_post_slideshow_block' );