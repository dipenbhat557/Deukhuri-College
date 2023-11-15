<?php
/**
 * @package Administrative plugin
 * @version 1.0.0
 */
/*
Plugin Name: Administrative plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: Plugin for managing Administratives with title and image.
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

function generate_administrative_type() {
    $labels = array(
        'name'                  => 'Administratives',
        'singular_name'         => 'Administrative',
    );
    $args = array(
        'label'                 => 'Administrative',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'administratives',
        'register_meta_box_cb'  => 'add_administrative_details_meta_box', 
    );
    register_post_type( 'administrative_type', $args );
}
add_action( 'init', 'generate_administrative_type', 0 );

// Add a meta box for the administrative details
function add_administrative_details_meta_box() {
    add_meta_box(
        'administrative_details_meta_box',
        'Administrative Details',
        'render_administrative_details_meta_box',
        'administrative_type',
        'normal',
        'high'
    );
}

// Render the content of the administrative details meta box
function render_administrative_details_meta_box($post) {
    // Get the current values if they exist
    $administrative_image_url = get_post_meta($post->ID, '_administrative_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'administrative_details_nonce');

    // Display the inputs for the administrative details
    ?>
    
    <label for="administrative_image">Upload Administrative Image:</label>
    <input type="text" name="administrative_image" id="administrative_image" class="widefat" value="<?php echo esc_url($administrative_image_url); ?>" />
    <p>
        <input type="button" id="upload_administrative_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_administrative_image_button').click(function(e) {
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
                    $('#administrative_image').val(attachment.url);
                });

                //Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the administrative details when saving the administrative
function save_administrative_details_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['administrative_details_nonce']) || !wp_verify_nonce($_POST['administrative_details_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('administrative_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save administrative name
        update_post_meta($post_id, '_administrative_name', sanitize_text_field($_POST['administrative_name']));

        // Save administrative image URL
        update_post_meta($post_id, '_administrative_image_url', esc_url($_POST['administrative_image']));
    }
}