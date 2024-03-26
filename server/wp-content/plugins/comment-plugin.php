<?php
/**
 * Plugin Name: Custom Comment Plugin
 * Description: Handles custom comment functionality including saving comments via REST API.
 * Version: 1.0
 * Author: Dipendra
 */

// Register custom REST API endpoint for handling comments
function custom_comment_rest_endpoint_init() {
    register_rest_route( 'custom-comment/v1', '/comments', array(
        'methods'  => 'POST',
        'callback' => 'custom_comment_rest_handle_post_request',
        'permission_callback' => function () {
            return current_user_can( 'publish_posts' );
        },
    ) );

    register_rest_route( 'custom-comment/v1', '/comments', array(
        'methods'  => 'GET',
        'callback' => 'custom_comment_rest_handle_get_request',
    ) );
}

add_action( 'rest_api_init', 'custom_comment_rest_endpoint_init' );

// Callback function to handle POST requests for saving comments
function custom_comment_rest_handle_post_request( $request ) {
    $params = $request->get_params();

    $title = sanitize_text_field( $params['title'] );
    $comment = sanitize_textarea_field( $params['comment'] );
    $date = current_time( 'mysql' );

    $post_data = array(
        'post_title'   => $title,
        'post_content' => $comment,
        'post_status'  => 'publish',
        'post_date'    => $date,
        'post_type'    => 'post',
    );

    $post_id = wp_insert_post( $post_data );

    if ( ! is_wp_error( $post_id ) ) {
        return new WP_REST_Response( 'Comment saved successfully.', 200 );
    } else {
        return new WP_Error( 'error_saving_comment', 'Failed to save comment.', array( 'status' => 500 ) );
    }
}

// Callback function to handle GET requests for retrieving comments
function custom_comment_rest_handle_get_request( $request ) {
    $args = array(
        'post_type'      => 'post',
        'posts_per_page' => -1,
    );

    $query = new WP_Query( $args );

    $comments = array();

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $comments[] = array(
                'title'   => get_the_title(),
                'comment' => get_the_content(),
                'date'    => get_the_date( 'Y-m-d H:i:s' ),
            );
        }
        wp_reset_postdata();
        return new WP_REST_Response( $comments, 200 );
    } else {
        return new WP_Error( 'no_comments', 'No comments found.', array( 'status' => 404 ) );
    }
}
