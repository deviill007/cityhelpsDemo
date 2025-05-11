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

const Jewellery = () => {
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
        <h1>💎 Jewellery in Jaipur: Discover the Sparkle of Royal Craftsmanship</h1>

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
          Welcome to Jaipur, the glittering gem capital of India. Here, jewellery isn’t just
          adornment—it’s legacy, history, and artistry fused into one. For centuries, royal courts and
          global connoisseurs have looked to Jaipur for its intricate techniques, rich traditions, and
          impeccable gemstones.
        </p>
        <p>
          With CityHelps, you can explore the real, artistic side of Jaipur’s jewellery scene—beyond
          the tourist traps. We take you to trustified jewellers where each piece has a story and every
          artisan is a master of their craft.
        </p>

        <h2>🔍 What You'll Explore</h2>
        <p>Our curated jewellery experiences let you witness and engage with:</p>

        <h3>🛕 Kundan and Meenakari Work</h3>
        <p>
          Originating in Rajasthan’s royal courts, Kundan involves setting gemstones in pure gold foil.
          It’s delicate, regal, and painstakingly detailed. Often paired with Meenakari (a vibrant enamel
          area), these traditional styles are perfect for timeless Indian jewellery lovers.
        </p>
        <ul>
          <li>
            ✅ You’ll see artisans working on designs under magnifying glasses, using tiny tools and
            flame-based techniques handed down for generations.
          </li>
        </ul>

        <h3>💎 The Gemstone Journey</h3>
        <p>Jaipur is home to the largest gem-cutting and polishing industry in India. From raw stones to faceted brilliance, you can:</p>
        <ul>
          <li>🔬 Watch the cutting, shaping, and polishing process in action</li>
          <li>📘 Learn how different gems are sourced—from Tanzanite to Emerald to Topaz</li>
          <li>🧪 Understand the difference between natural, heat-treated, and synthetic stones</li>
          <li>
            At CityHelps-partnered workshops, you're invited to handle the stones, ask questions, and
            gain real insight—without pushy sales or gimmicks.
          </li>
        </ul>

        <h3>✨ Modern & Custom Jewellery</h3>
        <p>
          Prefer minimalist designs or want something customized? Many of our verified jewellers blend
          tradition-rich embellishment with contemporary aesthetics. You can even work with designers to
          co-create one-off pieces—ideal for gifts, engagement rings or travel keepsakes.
        </p>
        <ul>
          <li>🖋️ Personalized design consults on-site, or some options available upon request</li>
        </ul>

        <h3>🏰 The Royal Legacy Behind the Shine</h3>
        <p>
          Jewellery in Jaipur is deeply intertwined with royal patronage. Walk into any trustified showroom
          and you’ll find:
        </p>
        <ul>
          <li>👑 Historic styles for Rajput queens and Mughal emperors</li>
          <li>📿 Art deco-inspired designs from 18th-century palaces</li>
          <li>🔍 Stories how certain stones were linked to health, energy, or astrology</li>
        </ul>
        <p>
          With CityHelps, you won’t just see jewellery—you’ll be immersed in the stories behind them. You’ll
          meet family-run jewellers who have worked for royalty or starred in global exhibitions.
        </p>

        <h3>🔐 Why Trustified Matters</h3>
        <p>
          The jewellery industry’s market is filled with copycats, inflated pricing, and commission-driven
          encounters. At CityHelps, we only work with verified, transparent businesses—where craftsmanship
          is authentic and pricing is fair.
        </p>
        <ul>
          <li>🛍️ Recognizable districts: Johari Bazaar, MI Road, and Civil Lines</li>
          <li>🪪 CityHelps experts pre-demonstrate each experience to ensure taste & budget</li>
        </ul>

        <h3>💡 Insider Tip:</h3>
        <p>
          Interested in astrological stones? Jaipur is also a major hub for certified Vedic gemstones. Ask
          the jeweller about your birth chart, and they might help you pick a meaningful piece aligned with
          Indian traditions.
        </p>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>💎 Itinerary Plan: Jaipur Jewellery Tour</h3>
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
          <h3>Total Price: ₹ {travellers * 799}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default Jewellery;
