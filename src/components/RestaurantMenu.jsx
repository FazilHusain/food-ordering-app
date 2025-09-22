import React, { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  

  const {resId} = useParams();

  const fetchMenuData = async () => {
    try {
      const data = await fetch(
        MENU_API + resId
      );
      const json = await data.json();

      // Restaurant info
      setResInfo(json?.data?.cards?.[2]?.card?.card?.info);

      // Extract REGULAR menu categories
      const regularCards =
        json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const categories = regularCards.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      setMenuCategories(categories);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return resInfo === null ? (
    <div className="shimmer-wrapper">
      {Array(20)
        .fill("")
        .map((_, i) => (
          <ShimmerCard key={i} />
        ))}
    </div>
  ) : (
    <div className="restaurant-menu">
      {/* Restaurant Header */}
      <div className="res-card">
        <h2>{resInfo?.name}</h2>
        <h3>{resInfo?.cuisines?.join(", ")}</h3>
        <h3>{resInfo?.avgRating} ⭐</h3>
        <p>{resInfo?.locality}</p>
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
