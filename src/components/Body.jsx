import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { API_URL, CDN_URL } from "../utils/constants";
import ShimmerCard from "./ShimmerCard";
import { Link, useParams } from "react-router-dom";

export const Body = () => {
  const [restaurants, setRestaunrants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [input, setInput] = useState("");
  
  const fetchData = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    const list =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setRestaunrants(list);
    setFilterRestaurants(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterRestaurant = () => {
    const filter = restaurants.filter(
      (res) => parseFloat(res?.info?.avgRating) > 4.4
    );
    setFilterRestaurants(filter);
  };

  const onSearchClick = () => {
    const filteredText = restaurants.filter((res) =>
      res?.info?.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilterRestaurants(filteredText);
  };

  return (
    <div className="body">
      <div className="search">
        <button className="filter-btn" onClick={filterRestaurant}>
          Top Rated Restaurant
        </button>
        <input
          type="text"
          className="input-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="search-b">
          <button className="search-btn" onClick={onSearchClick}>
            Search
          </button>
        </div>
      </div>
      <div className="res-container">
        {filterRestaurants && filterRestaurants.length > 0
          ? filterRestaurants.map((res, index) => {
              const {
                id,
                name,
                cuisines,
                avgRating,
                sla,
                cloudinaryImageId,
                locality,
              } = res?.info;

              return (
                <Link key={id} to={"/restaurants/" + id}>
                  <RestaurantCard
                  name={name}
                  cuisine={cuisines?.join(", ")}
                  rating={avgRating}
                  time={sla?.deliveryTime}
                  image={CDN_URL + cloudinaryImageId}
                  locality={locality}
                />
                </Link>
              );
            })
          : // Show shimmer loader (like 8 fake cards)
            Array(20)
              .fill("")
              .map((_, i) => <ShimmerCard key={i} />)}
      </div>
    </div>
  );
};
