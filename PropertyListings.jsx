import { useEffect, useState } from "react";
import { categories } from "../data";
import "../style/Listings.scss";
import PropertyCard from "./PropertyCard"; // Renamed ListingCard to PropertyCard for consistency
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const PropertyListings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  /* Fetch listings based on selected category */
  const fetchListings = async () => {
    try {
      const endpoint =
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties";
      
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch listings:", err.message);
    }
  };

  /* Fetch listings when selectedCategory changes */
  useEffect(() => {
    setLoading(true);
    fetchListings();
  }, [selectedCategory]);

  return (
    <>
      {/* Category Filter */}
      <div className="category-filter">
        {categories?.map((category, index) => (
          <div
            className={`category-item ${category.label === selectedCategory ? "active" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category-icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {/* Loader while fetching data */}
      {loading ? (
        <Loader />
      ) : (
        <div className="property-listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <PropertyCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default PropertyListings;
