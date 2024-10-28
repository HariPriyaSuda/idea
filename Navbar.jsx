import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../style/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Handle Search */
  const handleSearch = () => {
    if (search !== "") {
      navigate(`/properties/search/${search}`);
      setSearch(""); // Clear search field after navigation
    }
  };

  /* Toggle Dropdown Menu */
  const toggleMenu = () => {
    setDropdownMenu((prev) => !prev);
  };

  /* Handle Logout */
  const handleLogout = () => {
    dispatch(setLogout());
    setDropdownMenu(false); // Close menu after logout
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/logo.png" alt="logo" />
      </Link>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={!search} onClick={handleSearch}>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {/* Host Link */}
        <Link to={user ? "/create-listing" : "/login"} className="host">
          Become A Host
        </Link>

        {/* Profile Menu Button */}
        <button className="navbar_right_account" onClick={toggleMenu}>
          <Menu sx={{ color: variables.darkgrey }} />
          {user ? (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile"
              className="profile-photo"
            />
          ) : (
            <Person sx={{ color: variables.darkgrey }} />
          )}
        </button>

        {/* Dropdown Menu */}
        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            {user ? (
              <>
                <Link to={`/${user._id}/trips`}>Trip List</Link>
                <Link to={`/${user._id}/wishList`}>Wish List</Link>
                <Link to={`/${user._id}/properties`}>Property List</Link>
                <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                <Link to="/create-listing">Become A Host</Link>
                <Link to="/login" onClick={handleLogout}>
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
