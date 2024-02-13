<?php
/**
 * @package Statute Plugin
 * @version 1.0.0
 */
/*
Plugin Name: Statute Plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: Plugin for uploading undergraduate results with a PDF input field.
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

// Register custom post type for statutes
function register_statute_post_type() {
    $labels = array(
        'name'                  => 'Statutes',
        'singular_name'         => 'Statute',
    );

    $args = array(
        'label'                 => 'Statute',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'custom-fields'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'statutes',
    );

    register_post_type('statute', $args);
}

add_action('init', 'register_statute_post_type', 0);

// Add a meta box for the PDF upload
function add_statute_pdf_meta_box() {
    add_meta_box(
        'statute_pdf_meta_box',
        'Statute PDF',
        'render_statute_pdf_meta_box',
        'statute',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_statute_pdf_meta_box');

// Render the content of the PDF upload meta box
function render_statute_pdf_meta_box($post) {
    // Get the current PDF URL if it exists
    $pdf_url = get_post_meta($post->ID, '_statute_pdf_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'statute_pdf_nonce');

    // Display the input for the PDF upload
    ?>
    <label for="statute_pdf">Upload Statute PDF:</label>
    <input type="text" name="statute_pdf" id="statute_pdf" class="widefat" value="<?php echo esc_url($pdf_url); ?>" />
    <p>
        <input type="button" id="upload_pdf_button" class="button" value="Upload PDF" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_pdf_button').click(function(e) {
                e.preventDefault();

                // If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                // Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose PDF',
                    button: {
                        text: 'Choose PDF'
                    },
                    multiple: false
                });

                // When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function() {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();
                    $('#statute_pdf').val(attachment.url);
                });

                // Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the Statute PDF URL when saving the Statute
function save_statute_pdf_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['statute_pdf_nonce']) || !wp_verify_nonce($_POST['statute_pdf_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('statute' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save Statute PDF URL
        update_post_meta($post_id, '_statute_pdf_url', esc_url($_POST['statute_pdf']));
    }
}

add_action('save_post', 'save_statute_pdf_meta');
