<?php

/**
 * @package UG Result plugin
 * @version 1.0.0
 */
/*
Plugin Name: UG Result plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: Plugin for uploading undergraduate results with an image input field.
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

function generate_ug_result_type() {
    $labels = array(
        'name'                  => 'UG Results',
        'singular_name'         => 'UG Result',
    );
    $args = array(
        'label'                 => 'UG Result',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'ug_results',
    );
    register_post_type( 'ug_result_type', $args );
}
add_action( 'init', 'generate_ug_result_type', 0 );

// Add a meta box for the image upload
function add_ug_result_image_meta_box() {
    add_meta_box(
        'ug_result_image_meta_box',
        'UG Result Image',
        'render_ug_result_image_meta_box',
        'ug_result_type',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_ug_result_image_meta_box');

// Render the content of the image upload meta box
function render_ug_result_image_meta_box($post) {
    // Get the current image URL if it exists
    $image_url = get_post_meta($post->ID, '_ug_result_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'ug_result_image_nonce');

    // Display the input for the image upload
    ?>
    <label for="ug_result_image">Upload UG Result Image:</label>
    <input type="text" name="ug_result_image" id="ug_result_image" class="widefat" value="<?php echo esc_url($image_url); ?>" />
    <p>
        <input type="button" id="upload_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_image_button').click(function(e) {
                e.preventDefault();

                // If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                // Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                // When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function() {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();
                    $('#ug_result_image').val(attachment.url);
                });

                // Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the UG Result image URL when saving the UG Result
function save_ug_result_image_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['ug_result_image_nonce']) || !wp_verify_nonce($_POST['ug_result_image_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('ug_result_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save UG Result image URL
        update_post_meta($post_id, '_ug_result_image_url', esc_url($_POST['ug_result_image']));
    }
}

add_action('save_post', 'save_ug_result_image_meta');


