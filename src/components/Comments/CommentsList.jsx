const CommentList = ({ comments }) => {
  return (
    <div className="CommentList">
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.message}</p>
            <p>Rating: {comment.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
