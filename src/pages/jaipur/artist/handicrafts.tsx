import React, { useState } from "react";
import styles from "@/styles/experience.module.css";
import Image from "next/image";

const images = [
  "/images/jaipur/Gallery/Morningtreks/Image1.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image2.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image3.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image4.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image5.jpg",
];

const Handicrafts = () => {
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTill, setTravelTill] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const nextModal = () => setModalIndex((prev) => (prev + 1) % images.length);
  const prevModal = () => setModalIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.contentContainer}>
        <h1>🎨 Jaipur Handicrafts: Craft, Culture, and Creation</h1>

        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[0]}
              alt="Main View"
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
              priority
            />
          </div>
          <div className={styles.sideGrid}>
            {images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className={styles.sideImageWrapper}
                onClick={() => openModal(index + 1)}
              >
                <Image
                  src={img}
                  alt={`View ${index + 1}`}
                  width={700}
                  height={700}
                  className={styles.thumbnail}
                />
                {index === 3 && images.length > 5 && (
                  <div className={styles.overlay}>+{images.length - 5}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 📸 Modal View */}
        {modalOpen && (
          <div className={styles.modalOverlay}>
            <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
              <Image src="/icons/close.png" alt="Close" width={20} height={20} />
            </button>
            <button className={styles.leftArrow} onClick={prevModal}>
              <Image src="/icons/left-arrow.png" alt="Previous" width={20} height={20} />
            </button>
            <Image
              src={images[modalIndex]}
              alt="large"
              width={1000}
              height={1000}
              style={{ objectFit: "contain", borderRadius: "20px" }}
              className={styles.modalImage}
            />
            <button className={styles.rightArrow} onClick={nextModal}>
              <Image src="/icons/right-arrow.png" alt="Next" width={20} height={20} />
            </button>
          </div>
        )}

        <p>
          Jaipur is not just the Pink City of palaces, but also a living, breathing gallery
          of India’s rich craft culture. In this curated journey, you’ll visit local artisan
          workshops, explore traditional block printing, blue pottery, lac bangle making,
          and marble carving—all under the guidance of generational masters.
        </p>

        <h2>🧵 Traditional Craft Districts</h2>
        <p>
          From Sanganer to Kishanpole Bazaar, every lane is a legacy. You’ll meet artisans
          in their homes and small-scale studios, learning the history behind each style and
          the sustainable processes they follow. These are crafts passed down for centuries.
        </p>

        <h2>🪡 Your Experience</h2>
        <h3>1. 🖋️ Block Printing Session</h3>
        <ul>
          <li>Try your hand at printing using wooden blocks and natural dyes</li>
          <li>Choose your fabric and make your own piece to take home</li>
          <li>Learn how Jaipur’s prints became globally celebrated</li>
        </ul>

        <h3>2. 🏺 Blue Pottery Demo</h3>
        <ul>
          <li>Watch a live demo of hand-painted blue ceramics</li>
          <li>Learn the secret behind the Persian-origin artform</li>
          <li>Option to buy directly from makers (no middlemen)</li>
        </ul>

        <h3>3. 💍 Lac Bangle Making</h3>
        <ul>
          <li>Observe the traditional bangle-crafting method using lacquer and heat</li>
          <li>Custom-fit bangles or anklets you can decorate</li>
          <li>Great for gifts or personalized wearables</li>
        </ul>

        <h2>🌿 Ethical & Authentic</h2>
        <ul>
          <li>No factory-made or tourist gimmicks</li>
          <li>Support local craftspeople directly</li>
          <li>Optional donation or tip to each artisan</li>
        </ul>

        <h3>📋 Program Details</h3>
        <ul>
          <li>Charges: ₹999 – ₹1999 depending on add-ons</li>
          <li>Includes raw materials, workshops, and a handmade souvenir</li>
        </ul>

        <h2>👶 Toddler Tips</h2>
        <p>
          Many artisans are happy to involve children in small activities—clay rolling, safe
          block stamping, or storytelling—so feel free to bring along your little ones!
        </p>

        <h2>💡 Why Book With CityHelps?</h2>
        <ul>
          <li>Only platform with verified artisan ties in Jaipur</li>
          <li>🚫 No mass-produced products</li>
          <li>👩‍🎨 Women-led workshops featured</li>
          <li>🎁 Gift wrapping and local shipping support</li>
          <li>🎥 Short documentary access post-visit</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🎨 Itinerary Plan: Jaipur Handicrafts</h3>
          <div className={styles.inputs}>
            <label>
              Travel From:
              <input
                type="date"
                value={travelFrom}
                onChange={(e) => setTravelFrom(e.target.value)}
                className={styles.dateInput}
              />
            </label>
            <label>
              Travel Till:
              <input
                type="date"
                value={travelTill}
                onChange={(e) => setTravelTill(e.target.value)}
                className={styles.dateInput}
              />
            </label>
            <label>
              No. of Travellers:
              <input
                type="number"
                min="1"
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className={styles.travellerInput}
              />
            </label>
          </div>
        </div>

        <div className={styles.totalAndBtn}>
          <h3>Total Price: ₹ {travellers * 500}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default Handicrafts;
