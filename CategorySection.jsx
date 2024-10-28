import { categories } from "../data";
import "../style/Categories.scss";
import { Link } from "react-router-dom";

function CategorySection() {
  return (
    <section className="category-section">
      <header>
        <h2>Discover Categories</h2>
        <p>
          Browse through our hand-picked vacation homes tailored for all
          travelers. Enjoy unique stays that offer the perfect mix of comfort
          and cultural immersion, ensuring a memorable experience.
        </p>
      </header>

      <div className="category-grid">
        {categories?.slice(1, 7).map((item, idx) => (
          <Link to={`/listings/${item.label}`} key={idx}>
            <div className="category-item">
              <img src={item.img} alt={item.label} />
              <div className="item-overlay"></div>
              <div className="category-content">
                <span className="category-icon">{item.icon}</span>
                <h3>{item.label}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
