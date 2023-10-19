import { useEffect, useState } from "react";
import {
  createComment,
  listComments,
} from "../../services/CommentsServices";
import StarRating from "../StarRating/StarRating";
import "./PostComment.css";

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

  const handleStarClick = (score) => {
    setNewComment({
      ...newComment,
      score: score,
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
        <label><h6>Score:</h6></label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((score) => (
            <StarRating
              key={score}
              selected={score <= newComment.score}
              onSelect={() => handleStarClick(score)}
            />
          ))}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <button className="btn-post mt-4" type="button" onClick={handleCommentSubmit}>
        Submit Comment
      </button>
      </div>
      
    </form>
  );
};

export default PostComment;