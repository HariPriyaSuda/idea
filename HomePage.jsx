import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import CategorySection from "../components/CategorySection";
import PropertyListings from "../components/PropertyListings";
import SiteFooter from "../components/SiteFooter";
import { useEffect } from "react";

const HomePage = () => {
  // You can add side effects or data fetching here if necessary
  useEffect(() => {
    // Example: Fetch data or perform some action on component mount
    console.log("HomePage component mounted");
  }, []);

  return (
    <div className="homepage-container">
      <Navbar />
      <main>
        <Slide />
        <CategorySection />
        <PropertyListings />
      </main>
      <SiteFooter />
    </div>
  );
};

export default HomePage;
