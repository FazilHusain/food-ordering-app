export const RestaurantCard = ({ name, cuisine, rating, time, image, locality }) => {
    return (
      <div className="res-card">
        <img src={image} alt="res-logo" className="res-logo" />
        <h2>{name}</h2>
        <h3>{cuisine}</h3>
        <h3>{rating} ⭐</h3>
        <h3>{time} mins</h3>
        <p>{locality}</p>
      </div>
    );
  };