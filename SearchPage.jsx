import { useParams } from "react-router-dom";
import "../style/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import SiteFooter from "../components/SiteFooter";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/search/${search}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings. Please try again later.");
      }

      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
              <PropertyCard
                key={_id} // Added unique key prop for mapping
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
          <p>No listings found for "{search}".</p>
        )}
      </div>
      <SiteFooter />
    </>
  );
};

export default SearchPage;
