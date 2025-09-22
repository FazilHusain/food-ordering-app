import React, { useState, useEffect } from "react";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [menuCategories, setMenuCategories] = useState([]);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // Extract restaurant info safely
  const infoCard = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  );
  const { name, cuisines, avgRating, locality } = infoCard?.card?.card?.info || {};

  // Extract REGULAR menu categories
  useEffect(() => {
    if (resInfo) {
      const regularCards =
        resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const categories = regularCards.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      setMenuCategories(categories);
    }
  }, [resInfo]);

  // Loading shimmer
  if (!resInfo) {
    return (
      <div className="shimmer-wrapper">
        {Array(20)
          .fill("")
          .map((_, i) => (
            <ShimmerCard key={i} />
          ))}
      </div>
    );
  }

  // Main UI
  return (
    <div className="restaurant-menu">
      {/* Restaurant Header */}
      <div className="res-card">
        <h2>{name}</h2>
        <h3>{cuisines?.join(", ")}</h3>
        <h3>{avgRating} ⭐</h3>
        <p>{locality}</p>
      </div>

      {/* Menu Categories + Items */}
      <div className="menu-section">
        {menuCategories.map((cat, i) => (
          <div key={i} className="menu-category">
            <h2>{cat.card.card.title}</h2>
            <ul>
              {cat.card.card.itemCards?.map((item) => (
                <li key={item.card.info.id}>
                  <h3>{item.card.info.name}</h3>
                  <p>{item.card.info.description}</p>
                  <p>
                    ₹
                    {(item.card.info.finalPrice ??
                      item.card.info.price ??
                      item.card.info.defaultPrice) / 100}
                  </p>
                  <p>{item.card.info.itemAttribute?.vegClassifier}</p>
                  {item.card.info.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/${item.card.info.imageId}`}
                      alt={item.card.info.name}
                      width={120}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
