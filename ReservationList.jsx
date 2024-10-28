import { useEffect, useState } from "react";
import "../style/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import PropertyCard from "../components/PropertyCard";
import SiteFooter from "../components/SiteFooter";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reservation list. Please try again later.");
      }

      const data = await response.json();
      dispatch(setReservationList(data));
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [userId]); // Adding userId as a dependency to ensure it updates if the user changes

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="list">
        {reservationList?.length > 0 ? (
          reservationList.map(({ listingId, hostId, startDate, endDate, totalPrice }) => (
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
              booking={true} // This can be dynamically set if needed
            />
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
      <SiteFooter />
    </>
  );
};

export default ReservationList;
