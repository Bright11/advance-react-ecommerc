import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="social-media">
        <Facebook className="social" />
        <Instagram className="social" />
        <YouTube className="social" />
        <Twitter className="social" />
      </div>
      <p>All Right resver: Bright c web developer</p>
    </div>
  );
}

export default Footer;
