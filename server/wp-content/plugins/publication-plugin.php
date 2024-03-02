<?php
/**
 * @package Publication Plugin
 * @version 1.0.0
 */
/*
Plugin Name: Publication Plugin
Plugin URI: http://www.deukhurimultiplecampus.edu.np/
Description: Plugin for managing publications
Author: Dipendra Bhatta
Version: 1.0.0
Author URI: http://www.deukhurimultiplecampus.edu.np/
*/

function generate_publication_type() {
    $labels = array(
        'name'                  => 'Publications',
        'singular_name'         => 'Publication',
    );
    $args = array(
        'label'                 => 'Publication',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'publications',
    );
    register_post_type('publication_type', $args);
}
add_action('init', 'generate_publication_type', 0);

// Add a meta box for the publication cover image
function add_publication_cover_meta_box() {
    add_meta_box(
        'publication_cover_meta_box',
        'Publication Cover Image',
        'render_publication_cover_meta_box',
        'publication_type',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_publication_cover_meta_box');

// Enqueue scripts
function enqueue_publication_scripts() {
    wp_enqueue_media();
    wp_enqueue_script('custom-script', plugin_dir_url(__FILE__) . 'custom-script.js', array('jquery'), '1.0', true);
}

add_action('admin_enqueue_scripts', 'enqueue_publication_scripts');

// Render the content of the publication cover image meta box
function render_publication_cover_meta_box($post) {
    // Get the current image URL if it exists
    $cover_image_url = get_post_meta($post->ID, '_publication_cover_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'publication_cover_nonce');

    // Display the input for the publication cover image
    ?>
    <label for="publication_cover">Upload Publication Cover Image:</label>
    <input type="text" name="publication_cover" id="publication_cover" class="widefat" value="<?php echo esc_url($cover_image_url); ?>" />
    <p>
        <input type="button" id="upload_cover_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function ($) {
            var custom_uploader;

            $('#upload_cover_button').click(function (e) {
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
                    $('#publication_cover').val(attachment.url);
                });

                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the publication cover image URL when saving the publication
function save_publication_cover_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['publication_cover_nonce']) || !wp_verify_nonce($_POST['publication_cover_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('publication_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save publication cover image URL
        $cover_image_url = esc_url($_POST['publication_cover']);
        update_post_meta($post_id, '_publication_cover_url', $cover_image_url);
    }
}

add_action('save_post', 'save_publication_cover_meta');
