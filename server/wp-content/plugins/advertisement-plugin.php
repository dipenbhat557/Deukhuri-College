
<?php
/**
 * @package Advertisement Plugin
 * @version 1.0.0
 */
/*
Plugin Name: Advertisement Plugin
Plugin URI: http://www.deukhurimultiplecampus.edu.np/
Description: Plugin for managing advertisements
Author: Dipendra Bhatta
Version: 1.0.0
Author URI: http://www.deukhurimultiplecampus.edu.np/
*/

function generate_advertisement_type() {
    $labels = array(
        'name'                  => 'Advertisements',
        'singular_name'         => 'Advertisement',
    );
    $args = array(
        'label'                 => 'Advertisement',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post', // Change 'page' to 'post'
        'show_in_rest'          => true,
        'rest_base'             => 'advertisements',
    );
    register_post_type('advertisement_type', $args);
}
add_action('init', 'generate_advertisement_type', 0);

// Add a meta box for the advertisement image
function add_advertisement_image_meta_box() {
    add_meta_box(
        'advertisement_image_meta_box',
        'Advertisement Image',
        'render_advertisement_image_meta_box',
        'advertisement_type',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_advertisement_image_meta_box');

// Enqueue scripts
function enqueue_advertisement_scripts() {
    wp_enqueue_media();
    wp_enqueue_script('custom-script', plugin_dir_url(__FILE__) . 'custom-script.js', array('jquery'), '1.0', true);
}

add_action('admin_enqueue_scripts', 'enqueue_advertisement_scripts');

// Render the content of the advertisement image meta box
function render_advertisement_image_meta_box($post) {
    // Get the current image URL if it exists
    $image_url = get_post_meta($post->ID, '_advertisement_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'advertisement_image_nonce');

    // Display the input for the advertisement image
    ?>
    <label for="advertisement_image">Upload Advertisement Image:</label>
    <input type="text" name="advertisement_image" id="advertisement_image" class="widefat" value="<?php echo esc_url($image_url); ?>" />
    <p>
        <input type="button" id="upload_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function ($) {
            var custom_uploader;

            $('#upload_image_button').click(function (e) {
                e.preventDefault();

                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                custom_uploader.on('select', function () {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();
                    $('#advertisement_image').val(attachment.url);
                });

                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the advertisement image URL when saving the advertisement
function save_advertisement_image_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['advertisement_image_nonce']) || !wp_verify_nonce($_POST['advertisement_image_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('advertisement_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save advertisement image URL
        $image_url = esc_url($_POST['advertisement_image']);
        update_post_meta($post_id, '_advertisement_image_url', $image_url);
    }
}

add_action('save_post', 'save_advertisement_image_meta');
