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



const StreetFoodWalk = () => {
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
        <h1>🍢 Jaipur Food Walk: A Street-Side Feast of Flavors, Stories & Spoons</h1>

        {/* 🔥 Image Gallery */}
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
            </button >
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
        <p>
          Jaipur isn’t just about forts and fabrics—it’s a flavor-packed paradise for food lovers. From sizzling snacks cooked right on the street to old-school sweets in hidden lanes, this walk dives deep into authentic Rajasthani cuisine with a generous side of heritage.
        </p>
        <p>
          With CityHelps’ food walk, you skip the touristy buffet lines and bite into real Rajasthan, where there’s rhythm in the tawa, warmth in the masala—and history in the thali.
        </p>

        <h2>🍴 What You’ll Experience</h2>

        <h3>🔥 1. The Classics, Done Right</h3>
        <p>
          This walk takes you through old city lanes and hidden food gems, where iconic Jaipur street foods are made by people who’ve perfected the recipe over generations:
        </p>
        <ul>
          <li>📦 Mirchi Vada – Spicy, deep-fried Rajasthani perfection</li>
          <li>🥟 Pyaaz Ki Kachori – Jaipur staple sold at nearly all stalls</li>
          <li>🍛 Ghewar & Mawa Kachori – Traditional sweets with ghee-laced glory</li>
          <li>🧊 Lassi in Clay Cups – Cool, creamy, and served with flair</li>
        </ul>
        <p>
          Each bite comes with a story—how the dish was born, what makes it special, and who’s been making it for generations.
        </p>

        <h3>🪑 2. Chaat with a View</h3>
        <p>
          Not all great food comes from metal stalls—but CityHelps takes you to the tea shops locals swear by, including rooftops with palace views or busy nooks filled with daily gossip.
        </p>
        <p>
          <strong>Tip:</strong>
        </p>
        <ul>
          <li>🍵 Kulhad Chai with saffron and cardamom</li>
          <li>🍞 Bun Maska or Mathri to go with it</li>
          <li>🎓 <em>Bonus:</em> A quick lesson on how spices are balanced in Indian tea culture</li>
        </ul>

        <h3>💰 3. Go Local, Go Seasonal</h3>
        <p>
          Depending on the season, your walk may also include:
        </p>
        <ul>
          <li>🍲 Makki Roti with Sarson Saag in winter</li>
          <li>🍧 Kulfi Faluda in summer</li>
          <li>🌶️ Fresh seasonal chutneys & pickles at market stalls</li>
          <li>🍚 Local fermented foods or papads made on rooftops</li>
        </ul>
        <p>
          Your guide helps explain how Jaipur’s climate and festivals shape its food—why certain dishes appear only during Holi, Diwali, or Makar Sankranti.
        </p>

        <h2>📚 Beyond Eating: Cultural Context</h2>
        <p>You’ll also explore:</p>
        <ul>
          <li>🌾 The religious roots of vegetarian food in Rajasthan</li>
          <li>🌰 Why mustard oil, besan, and yogurt dominate the cuisine</li>
          <li>📜 How local women preserve ancient recipes and fermentation techniques</li>
          <li>📖 The difference between Marwari, Rajasthani, and Rajput cuisine</li>
          <li>🌍 Is food anthropology meets flavorful adventure.</li>
        </ul>

        <h3>💡 Insider Tip:</h3>
        <p>
          Arrive hungry, wear something loose, and don’t skip the chutneys—they’re the real stars. And yes, bring a small spice pouch—you might want to carry back some fresh masalas from the local spice traders at the end of the walk.
        </p>

        <ul>
          <li>🌿 Pure-veg & vegan routes available</li>
          <li>📍 Routes: Bapu Bazaar, Johari, Tripolia, Sireh Deori</li>
          <li>🕒 Duration: 2 hours</li>
          <li>💵 ₹1000–₹1500/person (includes 6–8 tastings, chai, and sweets)</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🍢 Itinerary Plan: Street Food Walk</h3>
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
          <h3>Total Price: ₹ {travellers * 1200}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default StreetFoodWalk;
