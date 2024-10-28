import { useState } from "react";
import "../style/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const PropertyCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* SLIDER NAVIGATION */
  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* HANDLE WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList.some((item) => item?._id === listingId);

  const updateWishList = async () => {
    if (user?._id !== creator._id) {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${user?._id}/${listingId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        dispatch(setWishList(data.wishList));
      } catch (error) {
        console.error("Error updating wishlist:", error);
      }
    }
  };

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      <div className="image-slider">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo.replace("public", "")}`}
                alt={`Property photo ${index + 1}`}
              />
              <button className="prev-button" onClick={goToPrevSlide}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </button>
              <button className="next-button" onClick={goToNextSlide}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <div className="price-info">
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </div>
      ) : (
        <div className="booking-info">
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </div>
      )}

      <button
        className="wishlist-button"
        onClick={(e) => {
          e.stopPropagation();
          updateWishList();
        }}
        disabled={!user}
      >
        <Favorite sx={{ color: isLiked ? "red" : "white" }} />
      </button>
    </div>
  );
};

export default PropertyCard;
