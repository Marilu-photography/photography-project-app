
import { useState } from "react";
import { doComment } from "../../services/ProductsServices";

const CommentsForm = ({ product, currentUser, onCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    doComment(product._id, comment)
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setComment(""); // Limpiar el campo de comentario después del envío
        onCommentSubmit(); // Llama a una función de retroalimentación o actualización de comentarios
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Error submitting comment. Please try again later.");
      });
  }

  return (
    <div className="CommentsForm">
      <h1>comments form</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <input
              type="text"
              className="form-control"
              id="comment"
              name="comment"
              value={comment}
              onChange={handleChange}
              disabled={isLoading} // Desactiva el campo de comentario mientras se envía
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {isSuccess && <p className="text-success">Comment submitted successfully!</p>}
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CommentsForm;
