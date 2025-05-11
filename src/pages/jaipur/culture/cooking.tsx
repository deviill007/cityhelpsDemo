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

const Cooking = () => {
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
        <h1>👩‍🍳 Cooking Class & Local Home Visit in Jaipur</h1>

        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[0]}
              alt="Main Cooking View"
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
          Food is not just what you eat—it's how people welcome, bless, and share joy. In Jaipur, cooking is
          an expression of culture, hospitality, and heritage. And there's no better way to experience it than
          stepping into a local kitchen.
        </p>
        <p>
          With CityHelps, you're invited into the homes of warm, welcoming families who teach you how to cook
          authentic Rajasthani dishes, the way their grandmothers taught them—with spice, soul, and stories.
        </p>

        <h2>🍽️ What You’ll Experience</h2>

        <h3>👩‍🍳 1. Hands-On Cooking Class</h3>
        <p>
          Join a local host in their home—often a traditional haveli or urban family kitchen. Roll up your
          sleeves and cook at least three dishes:
        </p>
        <ul>
          <li>🟡 Dal Baati Churma – Rajasthan's signature dish</li>
          <li>🥟 Gatte ki Sabzi – Chickpea dumplings in yogurt curry</li>
          <li>🍛 Laal Maas – A fiery mutton delicacy (on request)</li>
          <li>🔥 Tandoori Roti & Mint Chutney – From scratch on clay or iron plates</li>
        </ul>
        <p>
          Get involved in every step—from spice mixing to dough kneading, while learning the why behind every
          ingredient.
        </p>

        <h3>🍲 2. Eat What You Cook—Together</h3>
        <p>
          Once the meal is ready, gather around the table with your host family to eat, laugh, and connect.
        </p>
        <ul>
          <li>🪑 Learn how dishes are served based on hierarchy and tradition</li>
          <li>🍬 Discover dining customs, such as eating with hands, offering first bites to deities, and more</li>
          <li>🥣 Try homemade pickles and sweet notes like *Ghewar* or *Moong Dal Halwa*</li>
        </ul>

        <h3>🫖 3. Chai, Conversation & Cultural Deep Dive</h3>
        <p>
          Wrap up your visit with a slow-brewed cup of masala chai, and a casual conversation on life in
          Jaipur—covering:
        </p>
        <ul>
          <li>💍 Marriage traditions</li>
          <li>🎉 Festivals and fasts</li>
          <li>🔮 Astrology and local beliefs</li>
          <li>🏘️ What it's like living in a haveli or joint family</li>
        </ul>
        <p>
          Many hosts are rich in heritage, and CityHelps provides interpreters on request.
        </p>

        <h3>💡 Insider Tip</h3>
        <p>
          Ask your host if they're open to sharing their family spice mix recipes—you'll feel like home in
          seconds back in your own kitchen.
        </p>

        <ul>
          <li>✅ Vegetarian & Vegan Options Available</li>
          <li>✅ Kid Friendly & Elder Friendly</li>
          <li>📍 Locations in Old Jaipur, Bani Park & Amer</li>
          <li>🕒 Duration: 2–3 hours</li>
          <li>💵 ₹1500–₹2500/person (depending on group size and meal type)</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🧑‍🍳 Itinerary Plan: Jaipur Cooking Class</h3>
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
          <h3>Total Price: ₹ {travellers * 1699}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default Cooking;
