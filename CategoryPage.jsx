import { useState, useEffect } from "react";
import "../style/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/PropertyCard";
import Footer from "../components/SiteFooter";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties?category=${category}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.error("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} Listings</h1>
      <div className="list">
        {listings?.length > 0 ? (
          listings.map(
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
              <ListingCard
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
          )
        ) : (
          <p>No listings available in this category.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
