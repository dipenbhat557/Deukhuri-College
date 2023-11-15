<?php
/**
 * @package Message plugin
 * @version 1.0.0
 */
/*
Plugin Name: Message plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: Plugin for managing messages with title and image.
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/

function generate_message_type() {
    $labels = array(
        'name'                  => 'Messages',
        'singular_name'         => 'Message',
    );
    $args = array(
        'label'                 => 'Message',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'messages',
        'register_meta_box_cb'  => 'add_message_details_meta_box', 
    );
    register_post_type( 'message_type', $args );
}
add_action( 'init', 'generate_message_type', 0 );

// Add a meta box for the message details
function add_message_details_meta_box() {
    add_meta_box(
        'message_details_meta_box',
        'Message Details',
        'render_message_details_meta_box',
        'message_type',
        'normal',
        'high'
    );
}

// Render the content of the message details meta box
function render_message_details_meta_box($post) {
    // Get the current values if they exist
    $message_name = get_post_meta($post->ID, '_message_name', true);
    $message_image_url = get_post_meta($post->ID, '_message_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'message_details_nonce');

    // Display the inputs for the message details
    ?>
    <label for="message_name">Name:</label>
    <input type="text" name="message_name" id="message_name" class="widefat" value="<?php echo esc_attr($message_name); ?>" />

    <label for="message_image">Upload Message Image:</label>
    <input type="text" name="message_image" id="message_image" class="widefat" value="<?php echo esc_url($message_image_url); ?>" />
    <p>
        <input type="button" id="upload_message_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_message_image_button').click(function(e) {
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
                    $('#message_image').val(attachment.url);
                });

                //Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the message details when saving the message
function save_message_details_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['message_details_nonce']) || !wp_verify_nonce($_POST['message_details_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('message_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save message name
        update_post_meta($post_id, '_message_name', sanitize_text_field($_POST['message_name']));

        // Save message image URL
        update_post_meta($post_id, '_message_image_url', esc_url($_POST['message_image']));
    }
}

// Ensure custom fields are exposed in REST API
function expose_custom_fields_in_rest() {
    register_rest_field('message_type', '_message_name', array(
        'get_callback'    => 'get_custom_field',
        'update_callback' => 'update_custom_field',
        'schema'          => null,
    ));
}

function get_custom_field($object, $field_name, $request) {
    return get_post_meta($object['id'], $field_name, true);
}

function update_custom_field($value, $object, $field_name) {
    return update_post_meta($object->ID, $field_name, $value);
}

add_action('init', 'expose_custom_fields_in_rest');
add_action('save_post', 'save_message_details_meta');
add_action('rest_api_init', 'expose_custom_fields_in_rest');
