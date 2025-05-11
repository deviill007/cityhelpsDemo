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

const Carpets = () => {
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
        <h1>🧵 Carpets of Jaipur: Walking on Woven Stories</h1>

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
          In Jaipur, even the floors have stories to tell. The city is a treasure chest for lovers of
          hand-knotted carpets and rugs, a tradition carried down through generations with roots in
          Mughal, Persian, and Rajasthani design. These aren’t fast-floor coverings—they’re textile
          masterpieces that take weeks, sometimes months, to create.
        </p>
        <p>
          With CityHelps, you skip the tourist traps and get direct access to trustified carpet galleries
          and artisan-run workshops where every knot is tied with purpose—and pride.
        </p>

        <h2>👀 What You&apos;ll See</h2>
        <h3>🧶 Hand-Knotting in Action</h3>
        <p>
          At verified showrooms and studios, you’ll witness master weavers seated on wooden looms, tying
          each knot by hand using silk, wool, or cotton. The rhythm of weaving, the soft pull of the thread—
          it’s hypnotic. You’ll get to:
        </p>
        <ul>
          <li>✅ Understand how the knot density defines quality (some rugs have over 800 knots per square inch!)</li>
          <li>✅ Watch artisans work from graph patterns or create freehand motifs</li>
          <li>✅ Try tying a few knots yourself if you&apos;re up for it!</li>
        </ul>

        <h3>🎨 Designs That Tell a Story</h3>
        <p>
          The designs on these carpets range from Persian floral elegance to Rajasthani geometrical brilliance.
          Popular motifs include:
        </p>
        <ul>
          <li>🌸 Mughal gardens and peacocks</li>
          <li>🦁 Royal hunting scenes</li>
          <li>🔶 Mandalas and lattice work inspired by city palaces and havelis</li>
        </ul>
        <p>
          Each region has a distinct style—Jaipur, Bikaner, and Agra patterns all offer different color palettes
          and storytelling nuances.
        </p>

        <h3>🌿 Natural Dyes & Traditional Tools</h3>
        <p>
          What sets a real handwoven carpet apart? Natural dyes, hand-spun wool, and age-old tools. At
          CityHelps-certified places, you’ll also see how indigo, madder, turmeric, and even pomegranate skins
          are used to create the deep hues that never fade.
        </p>
        <p>
          You’ll also learn how carpets are washed, sun-dried, stretched, and finished—a process as elaborate
          as the weaving itself.
        </p>

        <h3>🛍️ Beyond the Bazaar</h3>
        <p>
          Most tourists get shown mass-produced, machine-woven pieces in loud showrooms with pressure
          sales. But with CityHelps, you explore artisan-run cooperatives and family-owned showrooms,
          where the focus is on education, not just selling:
        </p>
        <ul>
          <li>✅ No commissions</li>
          <li>✅ No inflated pricing</li>
          <li>✅ Honest advice, transparent sourcing</li>
        </ul>
        <p>
          Some of these workshops support local women artisans or revive dying weaving traditions,
          making your visit socially impactful too.
        </p>
        <p>
          📍 Trusted locations across Amer Road, Tonk Road & near Jal Mahal
        </p>

        <h3>💡 Insider Tip:</h3>
        <p>
          Ask for a fold test—a genuine hand-knotted rug folds easily without creasing. Also, flip the rug
          over and check the back: the tighter and clearer the pattern, the higher the knot count and value.
        </p>

        <h3>🧾 Thinking of Buying?</h3>
        <p>
          CityHelps partners offer worldwide shipping and certificates of authenticity for exports. Even if
          you’re not buying, this experience is about understanding one of India’s most elegant art forms.
          And who knows—you might fall in love with a piece that fits your space and soul.
        </p>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🧵 Itinerary Plan: Jaipur Carpet Tour</h3>
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

export default Carpets;
