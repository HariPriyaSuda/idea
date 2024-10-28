import { useEffect, useState } from "react";
import "../style/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import PropertyCard from "../components/PropertyCard";
import SiteFooter from "../components/SiteFooter";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trip list. Please try again later.");
      }

      const data = await response.json();
      dispatch(setTripList(data));
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
      setErrorMessage(err.message); // Set error message if the fetch fails
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]); // Add userId as a dependency

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
      <div className="list">
        {tripList?.length > 0 ? (
          tripList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
            <PropertyCard
              key={listingId._id} // Added unique key prop for mapping
              listingId={listingId._id}
              creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          ))
        ) : (
          <p>No trips found.</p> // Message when no trips are available
        )}
      </div>
      <SiteFooter />
    </>
  );
};

export default TripList;
