import "../style/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import SiteFooter from "../components/SiteFooter";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      dispatch(setPropertyList(data));
    } catch (err) {
      console.error("Fetch all properties failed", err.message);
      setError(err.message || "An error occurred while fetching properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  if (loading) return <Loader />;
  
  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="list">
        {propertyList.length > 0 ? (
          propertyList.map(
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
                key={_id} // Add a key prop for each ListingCard
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
          <div className="no-properties">No properties found.</div> // Message for no properties
        )}
      </div>

      <SiteFooter />
    </>
  );
};

export default PropertyList;
