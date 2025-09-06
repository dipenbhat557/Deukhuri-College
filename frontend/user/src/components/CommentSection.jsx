import { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

   
    useEffect(() => {
        axios.get('/comments')
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the comments!", error);
            });
    }, []);

    const handleAddComment = () => {
        if (newComment.trim()) {

            axios.post('/comments', { text: newComment })
                .then(response => {
                    
                    setComments([...comments, response.data]);
                    setNewComment("");
                })
                .catch(error => {
                    console.error("There was an error posting the comment!", error);
                });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleAddComment}
                >
                    Add Comment
                </button>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Comments:</h3>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div
                            key={index}
                            className="mb-2 p-2 bg-gray-100 rounded-md"
                        >
                            {comment.text}
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
