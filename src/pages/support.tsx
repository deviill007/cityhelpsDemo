import React from 'react';

const Support = () => {
  return (
    <div className="support-container">
      <h1 className="support-title">Support Center</h1>

      <div className="support-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <ul className="faq-list">
          <li className="faq-item">
            <h3>How do I book a trip?</h3>
            <p>Simply browse through our destinations, select a trip, and follow the steps to book your travel.</p>
          </li>
          <li className="faq-item">
            <h3>What is the cancellation policy?</h3>
            <p>Our cancellation policy varies by destination, but you can view the full details on the booking page.</p>
          </li>
        </ul>
      </div>

      <div className="support-section">
        <h2 className="section-title">Contact Us</h2>
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit" className="button">Send Message</button>
        </form>
      </div>

      <div className="support-section">
        <h2 className="section-title">Troubleshooting</h2>
        <ul className="troubleshooting-list">
          <li className="troubleshooting-item">
            <h3>Can't log in?</h3>
            <p>Ensure your email and password are correct. If you're still having issues, try resetting your password.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Support;
