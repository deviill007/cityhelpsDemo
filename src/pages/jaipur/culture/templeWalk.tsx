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

const TempleWalk = () => {
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
        <h1>🛕 Discover Jaipur’s Local Temples</h1>

        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[0]}
              alt="Main Temple View"
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
                  alt={`Temple View ${index + 1}`}
                  width={700}
                  height={700}
                  className={styles.thumbnail}
                />
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
              alt="large temple image"
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
          Temples in Jaipur aren’t just monuments—they are living, breathing spaces of devotion, pulsing
          with incense aroma, rhythmic chants, and centuries of stories. Whether you’re spiritual, curious, or
          simply seeking serenity, exploring Jaipur’s local temples offers a profound connection to the soul of
          Rajasthan.
        </p>
        <p>
          With CityHelps, you don’t just visit—you understand. We guide you to lesser-known, spiritually
          active temples that locals cherish, where tradition meets daily life and every corner holds meaning.
        </p>

        <h2>✨ What You’ll Discover</h2>

        <h3>1. Galtaji (The Monkey Temple)</h3>
        <p>
          Tucked between rocky cliffs on Jaipur’s outskirts, this 16th-century complex of temples, holy kunds
          (water tanks), and monkey-filled courtyards is pure mysticism.
        </p>
        <ul>
          <li>🐒 Walk alongside herds of macaques and langurs</li>
          <li>🕉️ Witness sacred rituals and meditating sadhus</li>
          <li>🌄 Ideal time: Sunset—golden light over the hills is stunning</li>
          <li>🆓 Free Entry | 🙏 Donation optional</li>
        </ul>

        <h3>2. Govind Dev Ji Temple (City Palace Complex)</h3>
        <p>
          This is not a quiet temple—it’s full of clappings, bells, and devotion. Dedicated to Krishna, it’s one
          of the most visited temples by locals.
        </p>
        <ul>
          <li>🎶 Attend the Mangala Aarti (early morning prayer)</li>
          <li>🛕 See centuries-old idols said to be brought from Vrindavan</li>
          <li>👨‍👩‍👧‍👦 Experience the emotion of community devotion</li>
          <li>📍 Inside City Palace Complex | 🆓 Free Entry</li>
          <li>🕰️ Best Time: Early morning or evening aarti sessions</li>
        </ul>

        <h3>3. Hidden Haveli Shrines (CityHelps Exclusive)</h3>
        <p>
          Wander into Jaipur’s old city and you’ll find small shrines tucked into ancient havelis—dedicated to
          Ganesh, Hanuman, or village goddesses.
        </p>
        <ul>
          <li>🎨 Explore mirror-temples with hand-painted walls and local rituals</li>
          <li>🧭 Sit for a quiet aarti with residents and priests</li>
          <li>📚 Learn meanings of symbols, gestures, and offerings</li>
          <li>📍 Bapu Bazaar, Tripolia, Chameliwala areas</li>
          <li>🧑‍🏫 Best explored with a CityHelps culture interpreter</li>
        </ul>

        <h2>🙏 The CityHelps Temple Experience</h2>
        <p>
          Unlike crowded tourist spots, we help you:
        </p>
        <ul>
          <li>🕊️ Understand rituals, symbols, and customs</li>
          <li>📿 Join respectfully in aarti or prasad distribution</li>
          <li>👳‍♂️ Meet locals and priests (some of whom speak English or French)</li>
          <li>🧭 Navigate what to wear, how to behave, and what to offer</li>
          <li>💡 We believe in connection, not spectacle</li>
        </ul>

        <h3>💡 Insider Tip</h3>
        <p>
          Wear simple, modest clothing and carry a small offering—flowers, incense, or sweets. Your guide will
          show you how to offer it, and the gesture will be warmly appreciated.
        </p>

        <ul>
          <li>💰 No Entry Fees Required</li>
          <li>🙏 Donations Optional (₹50–₹100)</li>
          <li>🧭 Flexible routes based on interest (Architecture, Rituals, or Hidden Shrines)</li>
          <li>🕒 Duration: 1–2 hours</li>
          <li>🌐 Cultural interpreters available in multiple languages</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🛕 Itinerary Plan: Temple Walk</h3>
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
          <h3>Total Price: ₹ {travellers * 599}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default TempleWalk;
