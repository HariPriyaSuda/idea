import "../style/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import SiteFooter from "../components/SiteFooter";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.length > 0 ? ( // Check if the wish list has items
          wishList.map(
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
          <p>No items in your wish list.</p> // Message when wish list is empty
        )}
      </div>
      <SiteFooter />
    </>
  );
};

export default WishList;
