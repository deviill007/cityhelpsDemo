import React, { useEffect, useState } from "react";
import styles from "./experience.module.css";
import Image from "next/image";
const images = [
  "/images/jaipur/Gallery/Morningtreks/Image1.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image2.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image3.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image4.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image5.jpg",
];

const ElephantWalks = () => {
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTill, setTravelTill] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

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
          🐘 Elephant Village Jaipur: Walk, Feed & Bond With Gentle Giants
        </h1>
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
            </button>
            <button className={styles.leftArrow} onClick={prevModal}>
              <Image
                src="/icons/left-arrow.png"
                alt="Close"
                width={20}
                height={20}
              />
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
              <Image
                src="/icons/right-arrow.png"
                alt="Close"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
        <p>
          Tucked away in the green belt between Amer and Nahargarh, Elephant
          Village is a place where kindness, tradition, and conservation
          collide. Unlike touristy elephant rides or exploitative shows,
          Elephant Walks is about building a compassionate, cruelty-free bond
          with these majestic animals as you hear their stories, bathe them, and
          walk side-by-side.
        </p>

        <h2>🪔 What is HathiGaon?</h2>
        <p>
          Originally created as a settlement that also housed royal and
          religious processions, HathiGaon is a community-equipped sanctuary
          that became home for elephants and their caretakers (mahouts).
          CityHelps partners with responsible elephant caretakers and
          conservation-friendly programs that focus on welfare with love.
        </p>

        <h2>✨ Your Experience at Elephant Village</h2>

        <h3>1. 🛁 Morning Elephant Bathing Ritual</h3>
        <ul>
          <li>Help gently scrub and clean the giants</li>
          <li>
            Use clay tubs with clean water and cool conditions in Elephant's
            bath
          </li>
          <li>Bond between movement and photo opportunity</li>
        </ul>

        <h3>2. 🥬 Feeding & Forest Walks</h3>
        <ul>
          <li>
            After bathing, help prepare and feed a healthy elephant
            breakfast—usually bananas, sugarcane, or jaggery balls. Then join
            them on the forest track as they head to shaded parts.
          </li>
          <li>Watch them interact, stretch, and enjoy cleanly</li>
          <li>Learn about their personalities, their mahouts’ unique bond</li>
          <li>
            Support sustainable nutrition and daily health—physical & mental
          </li>
        </ul>

        <h3>3. 🎨 Eco Painting (Optional)</h3>
        <ul>
          <li>
            Some elephants are given &ldquo;decorative&rdquo; art without harm—eco-safe
            paints—mostly to note their roles in temple art. You may watch your
            host do painting and details on their trunks under safe, guided
            supervision.
          </li>
          <li>Completely safe, built patterns</li>
          <li>No dyes or chemicals used</li>
          <li>
            How CityHelps selects elephants who are comfortable and used to it
          </li>
        </ul>

        <h2>🫶 A Responsible, Compassionate Experience</h2>
        <ul>
          <li>No elephant rides, chains, sticks, or exploitation</li>
          <li>Promote alternative care systems and body awareness</li>
          <li>Educate through love, not performance</li>
          <li>Mahouts are paid ethically; policy of conscious rewards</li>
          <li>Respectful closure of walk after wellness checks</li>
        </ul>

        <h3>📋 Program Details</h3>
        <ul>
          <li>Charges: ₹799 – ₹2500 (depends on activities)</li>
          <li>Rides/pain shows are never included</li>
        </ul>

        <h2>👶 Toddler Tips</h2>
        <p>
          Ask your mahout about the individual story of the elephant you’re
          interacting with— many were born right through this facility station,
          and each has more personal memory you&rsquo;ll remember forever.
        </p>

        <h2>💡 Why Go With CityHelps?</h2>
        <ul>
          <li>Only platform offering walkable elephant care</li>
          <li>🏆 City certified and local enforcement</li>
          <li>🧼 No chains, no exploitation</li>
          <li>🎤 Mahouts from generation-back storytellers</li>
          <li>📸 Cameras allowed; support and local guides who care</li>
        </ul>
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

export default ElephantWalks;
