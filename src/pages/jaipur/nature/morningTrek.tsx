import React, { useState, useEffect } from "react";
import styles from "./experience.module.css";
import Image from "next/image";

const images = [
  "/images/jaipur/Gallery/Morningtreks/Image1.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image2.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image3.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image4.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image5.jpg",
];

const MorningTrek = () => {
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTill, setTravelTill] = useState("");
  const [travellers, setTravellers] = useState(1);

  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const auto = setInterval(nextSlide, 4000);
    return () => clearInterval(auto);
  }, []);

  const openModal = (index: React.SetStateAction<number>) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const nextModal = () => setModalIndex((prev) => (prev + 1) % images.length);
  const prevModal = () =>
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.contentContainer}>
        <h1>
          🌄 Morning Treks in Jaipur: Walk Into the Wild, Before the World Wakes
          Up
        </h1>

        {/* 🔥 Image Gallery */}
        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <img src={images[0]} onClick={() => openModal(0)} alt="Main View" />
          </div>
          <div className={styles.sideGrid}>
            {images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className={styles.sideImageWrapper}
                onClick={() => openModal(index + 1)}
              >
                <img src={img} alt={`View ${index + 1}`} />
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
            <button
              className={styles.closeBtn}
              onClick={() => setModalOpen(false)}
            >
              <Image
                src="/icons/close.png"
                alt="Close"
                width={20}
                height={20}
              />
            </button >
            <button className={styles.leftArrow} onClick={prevModal}>
              <Image
                src="/icons/left-arrow.png"
                alt="Close"
                width={20}
                height={20}
                
              />
            </button>
            <img
              src={images[modalIndex]}
              alt="large"
              className={styles.modalImage}
            />
            <button className={styles.rightArrow}  onClick={nextModal}>
              <Image
                src="/icons/right-arrow.png"
                alt="Close"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}

        {/* ⛰️ Text Content continues */}
        <p>
          When the city is still sleeping in its blanket and morning sunshine
          hasn’t unfolded, Jaipur reveals its most raw, green face. These
          pre-dawn golden adventures take trekkers through hidden forest trails,
          ancient paths, and scenic beauty that you won’t find once the sun’s
          up.
        </p>
        <p>
          With CityHelps, you’ll start with local information, exciting
          storytelling, and sustainable—all-purpose eco trekking mornings.
        </p>

        <h2>✨ Why Jaipur is a Hidden Trekking Gem</h2>
        <p>
          Unlike common mountain treks, Jaipur’s rugged edges, forested trails,
          and fort ruins make it perfect spot for beginners to intermediates
          alike. Add in those chirping breeze, the calm of peacocks, and remote
          views—and you get a serene break from chaos.
        </p>

        <h2>🥾 Top Morning Treks Curated by CityHelps</h2>

        <h3>1. Nahargarh Sunrise Hike</h3>
        <p>
          Start at the fort’s base (Nahargarh Post) and take a gentle uphill
          trail through forested paths, historic watchtowers, and rocky
          clearings.
          <br />
          <strong>Bonus:</strong> You can also cover other sites like Jaipur
          skyline, including the Jal Mahal ducking in Man Sagar Lake.
        </p>
        <ul>
          <li>⏰ Start time: 5:30 AM</li>
          <li>📍 Spot: Jal Mahal parking, post-sun, longer area is covered</li>
          <li>🚶 Trek Type: Beginner (Easy level)</li>
          <li>💰 Charges: ₹499/person (includes guide)</li>
        </ul>

        <h3>2. Bhuteshwar Mahadev Nature Trek (Hidden Temple Trail)</h3>
        <p>
          This secret lush forest—calm, dense, and deeply spiritual. You’ll trek
          through dense forests to reach a serene Shiva temple.
        </p>
        <ul>
          <li>🌳 Path: Through unpaved village roads and seasonal streams</li>
          <li>🚫 No direct cars, mopeds; no stalls or packers</li>
          <li>
            📍 Start at Galta Gate; moderately crowd-free—ask locals to help
            stop
          </li>
          <li>🕒 Duration: ~1.5 hours</li>
          <li>🧭 Difficulty: Moderate</li>
          <li>💰 Charges: ₹699/person (includes guide & snacks)</li>
        </ul>

        <h3>3. Garh Ganesh to Jaigarh Fort Ridge Walk</h3>
        <p>
          This path links ancient Jaipur hill customs to majestic landmarks &
          ancient religious. A walk between forts & history.
        </p>
        <ul>
          <li>
            ⛩️ Cross old stairways between Garh Ganesh Temple and Jaigarh Fort
          </li>
          <li>🌄 Great views of city and Aravalli range ahead</li>
          <li>🕒 Duration: ~2 hours</li>
          <li>🧭 Difficulty: Moderate</li>
          <li>
            💰 Charges: ₹499/person (includes entry fee, guide, hydration kits)
          </li>
        </ul>

        <h2>✨ What Makes These Treks Special</h2>
        <ul>
          <li>✅ Local guiding groups from CityHelps prioritise eco-treks</li>
          <li>♻️ Sustainable snacks, reusable kits, no litter commitments</li>
          <li>🌱 Offbeat hidden trails—less known, more memorable</li>
          <li>🧭 All treks start before 6:30am—100% sunrise guaranteed</li>
          <li>
            👟 Group safety support with radios, volunteers at the backend
          </li>
        </ul>

        <h2>📌 Insider Tip</h2>
        <p>
          After your trek, plan for a chai stop at a nearby forest-side
          dhaba—away after fresh mountain chills, each gulp greets the wild
          within!
        </p>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🗺️ Itinerary Plan: Morning Trek</h3>
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

export default MorningTrek;
