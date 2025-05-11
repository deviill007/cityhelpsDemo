import React, { useState} from "react";
import styles from "@/styles/experience.module.css";
import Image from "next/image";

const images = [
  "/images/jaipur/Gallery/Morningtreks/Image1.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image2.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image3.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image4.jpg",
  "/images/jaipur/Gallery/Morningtreks/Image5.jpg",
];

const LeopardSafari = () => {
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
        <h1>🛡️ Leopard Safari in Jaipur: Into the Wild Heart of the Aravallis</h1>
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
          Forget crowded zones and artificial safaris. Just 30 minutes from central Jaipur lies Jhalana Leopard Safari,
          a 21 sq km reserve where leopards roam free amidst cliff-top ridges of the Aravallis right inside the city.
          This hidden green landscape offers the thrill and wild edge of Ranthambore—without the 6-hour drive.
        </p>
        <p>
          With CityHelps, each leopard sighting is guided, timed to perfection, and responsibly managed—
          ensuring clean, safe, and respectful interactions with nature.
        </p>

        <h2>🌿 Welcome to Jhalana: Jaipur’s Urban Jungle</h2>
        <p>
          Spanning over 21 sq km of scrub forests, Jhalana Leopard Safari offers a convenient access entry.
          Guests explore the ridge terrain through open-top Gypsys, with the highest leopard density per sq km
          in all of Rajasthan. You may also see blue bulls, hyenas, peacocks, and more.
        </p>
        <p>
          With visible pugdundis, thanks to the leopards being used to jeeps—they’re not tamed or tracked.
        </p>

        <h2>🎯 The Safari Experience</h2>

        <h3>① Choose Morning or Evening Safari</h3>
        <p>
          CityHelps’ experiences help you either rise before the sun or just before moonset, when the chance
          of spotting big cats are highest.
        </p>
        <ul>
          <li><strong>🕖 Morning: 6:00–8:30 AM (golden, quiet light)</strong></li>
          <li><strong>🕓 Evening: 4:00–6:30 PM (low movement, but golden sunset)</strong></li>
        </ul>
        <p>
          Each experience includes open-air gypsy ride, with a trained forest guide and a local CityHelps
          representative who enhances the safari storytelling.
        </p>

        <h3>🦌 ② Wildlife Sightings</h3>
        <ul>
          <li>View guaranteed: nightly, solitary, and unbothered</li>
          <li>Leopards – stealthy, solitary, mesmerizing</li>
          <li>Striped hyenas – crepuscular scavengers of the Aravallis</li>
          <li>
            Nilgais, peafowls and deer – prey species helping visitors interpret leopard presence
          </li>
          <li>
            Monkeys and raptors – especially during sunrise and dusk
          </li>
        </ul>
        <p>
          CityHelps guides use movement cues and distance-based clues to enhance exploration. Some leopards
          are more predictable than others; each block has its own slowly.
        </p>

        <h3>📸 Photography Paradise</h3>
        <p>
          This terrain is known for brilliant silhouette photography. With open rocks, rocky shrubs,
          and wild grasses, photographers often capture the elusive leopards in low sun. Bring a zoom
          lens if you love cool depth-of-field shots or sunset contrast shots.
        </p>

        <h3>✅ Responsible, Regulated, Real</h3>
        <ul>
          <li>
            Programs run only with official forest department guides, and follow ecological guidelines
          </li>
          <li>
            CityHelps ensures you enter through the main watch station, avoiding roadside riding
          </li>
          <li><strong>No baiting</strong> – just timing, patience, and luck</li>
          <li><strong>No unnatural enclosures</strong> – guests do not disembark</li>
        </ul>

        <h3>💰 Charges (Per Gypsy)</h3>
        <ul>
          <li>Small group (1–6): approx ₹2400–2700/gyp depending on season</li>
          <li>Professional cameras: ₹250–₹400 extra</li>
          <li>Pickup from Jaipur center (includes registration)</li>
        </ul>

        <h3>📍 Insider Tips</h3>
        <ul>
          <li>Pack in neutral tones—you can get chilly in the morning rides. Also, against black and white—stay silent, stay alert. The leopards blend in brilliantly.</li>
        </ul>

        <h2>✨ Why Choose CityHelps for Your Safari?</h2>
        <ul>
          <li>Verified leopard movement paths</li>
          <li>No rides with animals—just wild respect</li>
          <li>Free eco briefings and wildlife ethics capsule</li>
          <li>Book the safari’s best block conservatory entry access</li>
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

export default LeopardSafari;
