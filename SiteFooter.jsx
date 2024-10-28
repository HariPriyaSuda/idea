import "../style/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-section logo-section">
        <a href="/">
          <img src="/assets/logo.png" alt="DreamNest Logo" />
        </a>
      </div>

      <div className="footer-section links-section">
        <h3>Explore</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
          <li><a href="/refund">Return & Refund Policy</a></li>
        </ul>
      </div>

      <div className="footer-section contact-section">
        <h3>Get in Touch</h3>
        <div className="contact-info">
          <LocalPhone />
          <span>+1 234 567 890</span>
        </div>
        <div className="contact-info">
          <Email />
          <span>dreamnest@support.com</span>
        </div>
        <div className="payment-info">
          <img src="/assets/payment.png" alt="Accepted Payment Methods" />
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
