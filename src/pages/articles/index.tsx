"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Articles.module.css";

const ArticlesPage = () => {
  const articles = [
    {
      title:
        "CityHelps Jaipur: Your Ultimate Travel Companion for Authentic Jaipur Experiences",
      date: "Wed 24 Apr, 2025",
      author: "Content Team",
      source: "CityHelps",
      content: (
        <>
          <p>
            <strong>Planning a trip to Jaipur?</strong> Welcome to{" "}
            <strong>CityHelps – Jaipur Edition</strong>, your one-stop platform
            for discovering handpicked local experiences, hidden gems, guided
            tours, and real-time help while you explore the Pink City. Whether
            you’re a first-time traveler or a frequent explorer, CityHelps
            ensures that your journey through Jaipur is effortless, immersive,
            and unforgettable.
          </p>
          <p>
            <strong>
              Why CityHelps Is Jaipur’s Best Travel Assistant <br />
            </strong>
            Unlike traditional travel platforms, CityHelps isn’t just about
            listings. We curate, personalize, and help on the go. Here&apos;s why
            we&apos;re different: <br />- 🔍{" "}
            <strong>Curated Local Experiences</strong> – From Rajasthani cooking
            classes in heritage homes to secret sunset viewpoints over Nahargarh
            Fort <br />- 📲 <strong>Real-Time Tourist Help</strong> – Lost your
            way? Need a quick translation? Looking for emergency services? We’re
            one tap away <br />- 🗓️ <strong>Custom Day Planner</strong> – Mix &
            match Jaipur’s classic sights with unique experiences like
            block-print workshops or folk dance nights <br />- 💬{" "}
            <strong>WhatsApp-Based Support</strong> – Instant chat with local
            experts for tips, bookings, or just navigating the city <br />- 🚗{" "}
            <strong>Safe & Verified Tours</strong> – All guides, drivers, and
            experience hosts are vetted for safety and quality <br />
          </p>
          <p>
            <strong>
              🌟 Top Experiences in Jaipur with CityHelps <br />
            </strong>
            <strong>1. Jaipur Culture Walk (with chai & chats)</strong> <br />
            Explore ancient havelis, bustling bazaars, and temple bells with a
            local storyteller <br />
            <strong>2. Handicraft & Textile Trail</strong> <br />
            Dive into Jaipur&apos;s artistry—blue pottery, block printing, gemstone
            carving—with real artisans <br />
            <strong>3. Sunset at Nahargarh Fort</strong> <br />
            A private guided walk ending with chai on the rooftop, overlooking
            the golden cityscape <br />
            <strong>4. Taste of Rajasthan</strong> <br />
            Home-cooked Rajasthani thali with a local family, plus a mini
            cooking demo <br />
            <strong>5. Royal History Ride</strong> <br />
            A guided e-rickshaw tour across palaces, stepwells, and secret
            streets of the Pink City <br />
          </p>
          <p>
            <strong>
              🛡️ Traveling with Confidence <br />
            </strong>
            CityHelps puts <strong>safety first</strong>—especially for solo
            women travelers. Expect: <br />
            - Verified hosts & guides <br />
            - Transparent pricing
            <br />
            - 24/7 chat support
            <br />
            - Optional female-guided tours
            <br />
          </p>
          <p>
            <strong>
              🧠 Plan Smart. Travel Easy. <br />
            </strong>
            <strong>CityHelps Jaipur</strong> is not just about sightseeing—it&apos;s
            about <strong>experiencing Jaipur the local way</strong>. Whether
            you want a structured <strong>day itinerary</strong> or prefer to
            explore with freedom and backup, we’ve got you. <br />
          </p>
          <p>
            <strong>
            📱 Ready to Explore? <br />
            </strong>
            ✅ Visit CityHelps Jaipur <br />
            ✅ Build your own day plan <br />
            ✅ Book unforgettable experiences <br />
            ✅ Get real-time support during your trip <br />
          </p>
        </>
      ),
    },
    {
      // Duplicate of the first article – replace with your own content later
      title:
        "Safe, Smart & Soulful: How CityHelps Is Redefining Solo Travel in Jaipur",
      date: "Wed 24 Apr, 2025",
      author: "Content Team",
      source: "CityHelps",
      content: (
        <>
          <p>
            Planning a solo trip to Jaipur? Whether you&apos;re a woman traveler,
            digital nomad, or free-spirited explorer, CityHelps Jaipur is your
            trusted local companion. We combine authentic experiences, real-time
            help, and complete safety to give you the best solo travel
            experience in Jaipur.
          </p>
          <p>
            <strong>
              Walk Like a Local, Not a Tourist <br />
            </strong>
            Skip the overdone bucket-list. CityHelps helps you{" "}
            <strong>explore Jaipur like a local</strong>, not a tourist. <br />
            - 🛕 Hidden temples known only to locals <br />
            - 🧶 Home-based block printing workshops in Amer <br />
            - 🐪 Camel sunset ride ending with chai and folk music <br />
            - 🛍️ Secret shopping lanes with Jaipur&apos;s best-kept bargains <br />
            These are the <strong>real hidden gems in Jaipur</strong>,
            handpicked to give you immersive joy without the tourist traps.
          </p>
          <p>
            <strong>
              Safe Travel for Women in Jaipur – Guaranteed <br />
            </strong>
            We understand that{" "}
            <strong>
              safety is the top concern for solo female travelers in India
            </strong>
            . That&apos;s why CityHelps Jaipur ensures: <br />
            - ✅ Verified guides, drivers, and hosts <br />
            - ✅ Optional female-led experiences <br />
            - ✅ 24/7 support via WhatsApp and call <br />
            - ✅ Transparent pricing, no hidden commissions <br />
            We don&apos;t just plan your day — we&apos;ve got your back, always.
          </p>
          <p>
            <strong>
              Jaipur in a Day: Plan Your Way <br />
            </strong>
            Want to do <strong>Jaipur in 1 day</strong>? We help you build your
            perfect <strong>Jaipur itinerary</strong> from scratch. <br />
            <strong>Example Custom Plan:</strong> <br />
            - Morning: Pink City walk + Lassi at Lassiwala <br />
            - Afternoon: City Palace + curated textile museum visit <br />
            - Evening: Rooftop puppet show or Nahargarh Fort hike <br />
            - Optional swap: Replace monuments with block-printing, jewelry
            making, or food walks <br />
            Whether you&apos;re into history, art, or food, our Jaipur travel planner
            makes it <strong>fun, flexible, and yours.</strong>
          </p>
          <p>
            <strong>
              Start Exploring Jaipur with CityHelps <br />
            </strong>
            CityHelps is{" "}
            <strong>
              perfect for solo travel, women travelers, and curious explorers
            </strong>{" "}
            looking to go deeper. ✅ Visit city-helps.vercel.app <br />
            ✅ Build your own Jaipur day itinerary <br />
            ✅ Book offbeat & safe experiences <br />
            ✅ Get local support every step of the way <br />
          </p>
        </>
      ),
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cardWidth = container.clientWidth;
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Travel Articles</h1>
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
          disabled={currentIndex === 0}
        >
          <Image
            src="/icons/left-arrow.png"
            alt="Previous"
            width={10}
            height={10}
          />
        </button>
        {articles.map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => scrollToIndex(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.pageButton}
          onClick={() =>
            scrollToIndex(Math.min(currentIndex + 1, articles.length - 1))
          }
          disabled={currentIndex === articles.length - 1}
        >
          <Image
            src="/icons/right-arrow.png"
            alt="Next"
            width={10}
            height={10}
          />
        </button>
      </div>
      <div ref={containerRef} className={styles.carousel}>
        {articles.map((article, index) => (
          <div key={index} className={styles.articleCard}>
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                height: 0,
                overflow: "hidden",
              }}
            >
              Solo travel in Jaipur, Safe travel for women in Jaipur, Things to
              do in Jaipur, Jaipur travel planner, Jaipur itinerary for solo
              travelers, Offbeat experiences in Jaipur, Hidden gems Jaipur,
              Explore Jaipur like a local
            </div>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.meta}>
              By <strong>{article.author}</strong>, <em>{article.source}</em> ·{" "}
              <span>{article.date}</span>
            </p>
            <div className={styles.content}>{article.content}</div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
          disabled={currentIndex === 0}
        >
          <Image
            src="/icons/left-arrow.png"
            alt="Previous"
            width={10}
            height={10}
          />
        </button>
        {articles.map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => scrollToIndex(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.pageButton}
          onClick={() =>
            scrollToIndex(Math.min(currentIndex + 1, articles.length - 1))
          }
          disabled={currentIndex === articles.length - 1}
        >
          <Image
            src="/icons/right-arrow.png"
            alt="Next"
            width={10}
            height={10}
          />
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;
