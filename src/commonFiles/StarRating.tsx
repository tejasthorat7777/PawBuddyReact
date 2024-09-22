const StarRating = ({ rating = 0, style = {} }) => {
  const starStyle = (filled: boolean) => ({
    fontSize: "2em",
    color: filled ? "#ffbf00" : "#ddd",
    cursor: "pointer",
    transition: "color 0.2s",
    ...style,
  });

  return (
    <div style={{ display: "flex",scale:"0.9" }}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} style={starStyle(index < rating)}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
