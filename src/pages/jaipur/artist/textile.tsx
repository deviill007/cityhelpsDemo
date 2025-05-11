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

const Textile = () => {
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
        <h1>🧵 Textiles & Block Printing in Jaipur: Stamp Your Soul on Fabric</h1>

        <div className={styles.masonryGallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[0]}
              alt="Main Textile View"
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
          Among the sandy hues and pink facades of Jaipur lies an explosion of color, rhythm, and creativity—
          all captured in the city&apos;s legendary hand block printing and textile artistry. From the vibrant
          bazaars of Sanganer to the story-filled villages of Bagru, this is where fabric becomes canvas and
          every print tells a tale.
        </p>
        <p>
          Whether you&apos;re a design lover, fashion enthusiast, or someone who just appreciates mindful making,
          CityHelps offers exclusive access to trustified textile studios where you can witness and even create
          your own printed masterpiece.
        </p>

        <h2>✨ What You’ll Experience</h2>

        <h3>🎨 The Art of Block Printing</h3>
        <p>
          This centuries-old technique involves carving intricate designs into wooden blocks, dipping them into
          natural ink, and pressing them rhythmically onto fabric. Each layer is stamped by hand, with
          perfect alignment—a process that requires immense patience and precision.
        </p>
        <p>Watch artisans:</p>
        <ul>
          <li>🪵 Hand-carve printing blocks from seasoned teak</li>
          <li>🌿 Mix and ferment natural dyes from indigo, turmeric, pomegranate, and madder root</li>
          <li>🖐 Stamp multiple layers to create rich, multi-color patterns</li>
        </ul>
        <p>
          The studios encourage photography, so feel free to document your behind-the-scenes moment!
        </p>

        <h3>📍 Explore Sanganer & Bagru Styles</h3>
        <p>
          Jaipur is home to two major schools of block printing, each with its own vibe:
        </p>
        <ul>
          <li>
            🧼 Sanganeri prints are known for their delicate floral designs, fine lines, and white or pastel backgrounds
          </li>
          <li>
            🟫 Bagru prints are more earthy and geometric, using mud-resist techniques and natural browns,
            blacks, and indigos
          </li>
        </ul>
        <p>
          At CityHelps-verified studios, you can compare both styles side-by-side, understand their history,
          and see how local communities keep these legacies alive.
        </p>

        <h3>🖌️ Try It Yourself – Make Your Own Printed Fabric</h3>
        <p>
          Here&apos;s where it gets exciting: most studios offer hands-on mini workshops (with prior booking). In
          these sessions, you’ll:
        </p>
        <ul>
          <li>✅ Choose your blocks and colors</li>
          <li>✅ Learn how to layer prints</li>
          <li>✅ Create your own scarf, tote bag, or wall hanging to take home</li>
        </ul>
        <p>
          Charges for workshops vary (usually ₹800–₹1500) depending on material and time.
        </p>

        <h3>♻️ Sustainability Meets Heritage</h3>
        <p>
          What’s truly special about Jaipur’s textile scene is its eco-conscious approach. Unlike fast fashion,
          these textiles are:
        </p>
        <ul>
          <li>🌿 Made using non-toxic dyes and traditional methods</li>
          <li>👩‍🎨 Often produced by women-led cooperatives</li>
          <li>🌍 Created in a slow cycle, respecting the land and the craft</li>
        </ul>
        <p>
          By visiting a CityHelps partner, you’re not just learning—you’re supporting a whole ecosystem of
          ethical creativity.
        </p>
        <p>
          🛑 <strong>No Additional Charges for Visits</strong><br />
          🎟️ <strong>Charges Apply for Add-on Workshops</strong><br />
          📍 Studios & Artisan Homes in Sanganer, Bagru & Bapu Bazaar
        </p>

        <h3>💡 Insider Tip</h3>
        <p>
          Want something extra? Ask the studio to print your initials or a favorite symbol into the fabric.
          Some even let you create your own block, which they&apos;ll carve and keep for future prints you may
          want shipped later!
        </p>

        <h3>🟩 Why Go with CityHelps?</h3>
        <p>
          We connect you directly with artisan-run spaces, not touristy fabric showrooms. You’ll walk away with:
        </p>
        <ul>
          <li>📚 Authentic textile knowledge</li>
          <li>🤝 Meaningful local connections</li>
          <li>🎁 A piece of Jaipur made by you</li>
        </ul>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.planInfo}>
          <h3>🎨 Itinerary Plan: Jaipur Textile Tour</h3>
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
          <h3>Total Price: ₹ {travellers * 699}</h3>
          <button className="button">Buy Itinerary</button>
        </div>
      </div>
    </div>
  );
};

export default Textile;
