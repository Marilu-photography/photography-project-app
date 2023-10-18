import { useEffect, useState } from "react";
import {
    createComment,
    listComments,
  } from "../../services/CommentsServices";


const PostComment = ({ onCloseModalReview, product, handleUpdateComments }) => {
    const [comments, setComments] = useState([]);
    const [activeTab, setActiveTab] = useState("description");
    const [newComment, setNewComment] = useState({
        message: "",
        score: 0,
      });

      useEffect(() => {
        listComments(product._id)
          .then((comments) => {
            setComments(comments);
          })
          .catch((error) => {
            console.error("Error listing comments:", error);
          });
      }, [product._id]);

    const handleCommentSubmit = () => {
        if (newComment.message.trim() !== "" && newComment.score >= 1 && newComment.score <= 5) {
          createComment(product._id, newComment)
            .then((comment) => {
                handleUpdateComments()
              setNewComment({ message: "", score: 0 });
              listComments(product._id)
                .then((comments) => {
                    setComments(comments);
                  setActiveTab("reviews");
                    onCloseModalReview();
                
                })
                .catch((error) => {
                  console.error("Error listing comments:", error);
                });
    
            })
            .catch((error) => {
              console.error("Error creating comment:", error);
            });
        } else {
          console.error("Invalid comment.");
        }
      };

    const handleCommentChange = (event) => {
        const { name, value } = event.target;
        setNewComment({
          ...newComment,
          [name]: value,
        });
      };
    
    return (
        <form className="d-flex flex-column">
         <div className="form-group">
           <div>
             <label htmlFor="message"><h6>Write your review:</h6></label>
             </div>
           <div>
           <textarea className="text-area-form-control"
             id="message"
             name="message"
             value={newComment.message}
             onChange={handleCommentChange}
             required
           ></textarea>
           </div>
           
         </div>
         <div className="form-group">
           <label htmlFor="score">Score:</label>
           <input
             type="number"
             id="score"
             name="score"
             value={newComment.score}
             onChange={handleCommentChange}
             min="1"
             max="5"
             required
           />
         </div>
         <button type="button" onClick={handleCommentSubmit}>
           Submit Comment
         </button>
       </form>
    );
};

export default PostComment;