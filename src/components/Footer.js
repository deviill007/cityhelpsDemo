import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        {/* Logo + Description */}
        <div className="section">
          <Image src="/icons/cityhelpsLogo.png" alt="CityHelps Logo" width={1000} height={1000} className="footer-logo"/>
          <p>
          Personalized and Authentic Local Experiences Tailored Just for You
</p>

        </div>

        {/* Quick Links */}
        <div className="section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">Explore</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        {/* Cities */}
        <div className="section">
          <h3>Cities</h3>
          <ul>
            <li>Jaipur</li>
            <li>Udaipur <span>(Coming Soon...)</span></li>
            <li>Jodhpur <span>(Coming Soon...)</span></li>
            <li>Delhi <span>(Coming Soon...)</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="section">
          <h3>Contact Us</h3>
          <p>Email: support@cityhelps.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Jaipur, India</p>

          <div className="socials">
            <Link href="#"><Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} /></Link>
            <Link href="#"><Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} /></Link>
            <Link href="#"><Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} /></Link>
          </div>
        </div>
      </div>

      <div className="copyright">
        <hr></hr>
        © {new Date().getFullYear()} CityHelps. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
