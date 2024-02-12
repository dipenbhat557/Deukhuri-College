<?php

/**
 * @package Management Team plugin
 * @version 1.0.0
 */
/*
Plugin Name: Management Team plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: Plugin for management team of campus
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/
function generate_management_team_type() {
    $labels = array(
        'name'                  => 'Management Team',
        'singular_name'         => 'Management Team Member',
    );
    $args = array(
        'label'                 => 'Management Team',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'managements',
    );
    register_post_type( 'management_team_type', $args );
}
add_action( 'init', 'generate_management_team_type', 0 );


// Add a meta box for the management team member image
function add_management_team_image_meta_box() {
    add_meta_box(
        'management_team_image_meta_box',
        'Management Team Member Image',
        'render_management_team_image_meta_box',
        'management_team_type',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_management_team_image_meta_box');


// Render the content of the management team member image meta box
function render_management_team_image_meta_box($post) {
    // Get the current image URL if it exists
    $image_url = get_post_meta($post->ID, '_management_team_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'management_team_image_nonce');

    // Display the input for the management team member image
    ?>
    <label for="management_team_image">Upload Management Team Member Image:</label>
    <input type="text" name="management_team_image" id="management_team_image" class="widefat" value="<?php echo esc_url($image_url); ?>" />
    <p>
        <input type="button" id="upload_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_image_button').click(function(e) {
                e.preventDefault();

                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function() {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();
                    $('#management_team_image').val(attachment.url);
                });

                //Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the management team member image URL when saving the management team member
function save_management_team_image_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['management_team_image_nonce']) || !wp_verify_nonce($_POST['management_team_image_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('management_team_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save management team member image URL
        update_post_meta($post_id, '_management_team_image_url', esc_url($_POST['management_team_image']));
    }
}

add_action('save_post', 'save_management_team_image_meta');
