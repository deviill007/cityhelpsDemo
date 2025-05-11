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

const Yoga = () => {
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
        <h1>🧘 Yoga with an Experienced Teacher in Jaipur</h1>

        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[0]}
              alt="Main Yoga View"
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
                  alt={`Yoga View ${index + 1}`}
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
              alt="large yoga image"
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
          Jaipur isn’t just a feast for the eyes—it’s a place to still the mind and nourish the soul.
          Nestled among its bustling bazaars and ancient palaces lies another rhythm, rooted in thousands of
          years of yogic tradition.
        </p>
        <p>
          With CityHelps, you can tap into that rhythm through personalized yoga sessions led by experienced,
          local teachers, often held on rooftops, courtyards, or heritage shalas overlooking the Pink City.
        </p>
        <p>
          Whether you’re a beginner or a lifelong practitioner, this is yoga beyond fitness—it’s culture,
          breath, and balance.
        </p>

        <h2>🔍 What You’ll Experience</h2>

        <h3>1. Rooftop or Heritage Haveli Yoga</h3>
        <p>
          Practice in serene, open-air locations—sunrise views of Nahargarh hills or shaded courtyards
          surrounded by birdsong.
        </p>
        <ul>
          <li>🧘 Start with gentle asanas (postures)</li>
          <li>🌬️ Learn the basics of pranayama (breathwork)</li>
          <li>🕉️ End with guided meditation and mantra chanting</li>
          <li>📜 Optional: deeper dives into philosophy or Ayurveda on request</li>
          <li>🧾 Formats available: Hatha, Vinyasa, Restorative & Intro to Yoga</li>
        </ul>

        <h3>2. Experienced Teachers, Real Roots</h3>
        <p>
          All CityHelps yoga teachers are certified professionals with years of teaching experience,
          trained in India’s classical systems. Many have also taught internationally, combining
          global-friendly instruction with deep local wisdom.
        </p>
        <ul>
          <li>👥 One-on-one or small group sessions</li>
          <li>🧘 Corrections, alignment guidance, and personalised flows</li>
          <li>📚 Cultural context behind movements & mantras</li>
        </ul>

        <h3>3. More Than a Class—A Cultural Window</h3>
        <p>
          After your practice, enjoy a light herbal tea and short talk with your instructor. Learn about:
        </p>
        <ul>
          <li>🧘‍♂️ The yogic way of living</li>
          <li>🧬 The meaning of OM, chakras, and doshas</li>
          <li>🍛 How Indian families incorporate yoga into daily life</li>
        </ul>
        <p>
          Ask questions, take notes, or just breathe in the vibe—it’s not a workout, it’s an awakening.
        </p>

        <h3>💡 Insider Tip</h3>
        <p>
          Schedule a sunrise session on a rooftop—the sky glows pink to match the city, and the birds
          become your background music.
        </p>

        <ul>
          <li>✅ Yoga mats and props provided</li>
          <li>📍 Sessions available in Civil Lines, Old Jaipur, and near Jal Mahal</li>
          <li>🕒 Duration: 1–1.5 hours</li>
          <li>💵 ₹500–₹1000/person (Private & Group Options)</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🧘 Itinerary Plan: Jaipur Yoga Session</h3>
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

export default Yoga;
