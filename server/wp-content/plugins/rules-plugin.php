<?php
/**
 * @package Rules Plugin
 * @version 1.0.0
 */
/*
Plugin Name: Rules Plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: A simple plugin demonstrating custom rules.
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

// Register custom post type for rules
function register_rules_post_type() {
    $labels = array(
        'name'                  => 'Rules',
        'singular_name'         => 'Rule',
    );

    $args = array(
        'label'                 => 'Rule',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'rules',
    );

    register_post_type('rule', $args);
}

add_action('init', 'register_rules_post_type', 0);

// Save additional data when saving the rule
function save_rule_additional_data($post_id) {
    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('rule' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save additional data (if any) here
    }
}

add_action('save_post', 'save_rule_additional_data');
