<?php
/**
 * @package Notice Header Plugin
 * @version 1.0.0
 */
/*
Plugin Name: Notice Header Plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: A simple notice plugin without image input.
Author: Dipendra Bhatta
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

// Register custom post type for notice headers
function register_notice_header_post_type() {
    $labels = array(
        'name'                  => 'Notice Headers',
        'singular_name'         => 'Notice Header',
    );

    $args = array(
        'label'                 => 'Notice Header',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'notice-headers',
    );

    register_post_type('notice-header', $args);
}

add_action('init', 'register_notice_header_post_type', 0);

// Save additional data when saving the notice header
function save_notice_header_additional_data($post_id) {
    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('notice-header' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save additional data (if any) here
    }
}

add_action('save_post', 'save_notice_header_additional_data');
