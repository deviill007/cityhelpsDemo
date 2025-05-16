import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Popup from "@/components/Popup";
import HomePagePopupContent from "@/components/HomePagePopupContent";
import React from "react";
import { DateRange } from "react-date-range";
import { RangeKeyDict } from 'react-date-range';
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Experience = { title: string; img: string; link: string; price: string };
const experiences: Record<number, Experience[]> = {
  0: [
    // Explore Everything
    {
      title: "Morning Treks",
      img: "/images/jaipur/morningTrek.jpg",
      link: "/jaipur/nature/morningTrek",
      price: "₹ 599",
    },
    {
      title: "Elephant Walks",
      img: "/images/jaipur/elephantWalks.jpg",
      link: "/jaipur/nature/elephantWalks",
      price: "₹ 599",
    },
    {
      title: "Leopard Safari",
      img: "/images/jaipur/leopardSafari.jpg",
      link: "/jaipur/nature/leopardSafari",
      price: "₹ 599",
    },
    {
      title: "Handicrafts",
      img: "/images/jaipur/handicrafts.jpg",
      link: "/jaipur/artist/handicrafts",
      price: "₹ 599",
    },
    {
      title: "Jewellery",
      img: "/images/jaipur/jewellery.jpg",
      link: "/jaipur/artist/jewellery",
      price: "₹ 599",
    },
    {
      title: "Carpets",
      img: "/images/jaipur/carpets.jpg",
      link: "/jaipur/artist/carpets",
      price: "₹ 599",
    },
    {
      title: "Textile and Block Printing",
      img: "/images/jaipur/textileBlock.jpg",
      link: "/jaipur/artist/textile",
      price: "₹ 599",
    },
    {
      title: "Cooking",
      img: "/images/jaipur/cooking.jpg",
      link: "/jaipur/culture/cooking",
      price: "₹ 599",
    },
    {
      title: "Yoga",
      img: "/images/jaipur/yoga.png",
      link: "/jaipur/culture/yoga",
      price: "₹ 599",
    },
    {
      title: "Temple Walk",
      img: "/images/jaipur/temple.jpg",
      link: "/jaipur/culture/templeWalk",
      price: "₹ 599",
    },
    {
      title: "Pottery",
      img: "/images/jaipur/pottery.jpg",
      link: "/jaipur/culture/pottery",
      price: "₹ 599",
    },
    {
      title: "Street Food Walk",
      img: "/images/jaipur/streetFoods.jpg",
      link: "/jaipur/culture/streetFood",
      price: "₹ 599",
    },
  ],
  1: [
    // Wilderness Escapes
    {
      title: "Morning Treks",
      img: "/images/jaipur/morningTrek.jpg",
      link: "/jaipur/nature/morningTrek",
      price: "₹ 599",
    },
    {
      title: "Elephant Walks",
      img: "/images/jaipur/elephantWalks.jpg",
      link: "/jaipur/nature/elephantWalks",
      price: "₹ 599",
    },
    {
      title: "Leopard Safari",
      img: "/images/jaipur/leopardSafari.jpg",
      link: "/jaipur/nature/leopardSafari",
      price: "₹ 599",
    },
  ],
  2: [
    // Cultural Treasures
    {
      title: "Cooking",
      img: "/images/jaipur/cooking.jpg",
      link: "/jaipur/culture/cooking",
      price: "₹ 599",
    },
    {
      title: "Yoga",
      img: "/images/jaipur/yoga.png",
      link: "/jaipur/culture/yoga",
      price: "₹ 599",
    },
    {
      title: "Temple Walk",
      img: "/images/jaipur/temple.jpg",
      link: "/jaipur/culture/templeWalk",
      price: "₹ 599",
    },
    {
      title: "Street Food Walk",
      img: "/images/jaipur/streetFoods.jpg",
      link: "/jaipur/culture/streetFood",
      price: "₹ 599",
    },
  ],
  3: [
    // Time Traveler’s Picks
    {
      title: "Handicrafts",
      img: "/images/jaipur/handicrafts.jpg",
      link: "/jaipur/artist/handicrafts",
      price: "₹ 599",
    },
    {
      title: "Jewellery",
      img: "/images/jaipur/jewellery.jpg",
      link: "/jaipur/artist/jewellery",
      price: "₹ 599",
    },
    {
      title: "Carpets",
      img: "/images/jaipur/carpets.jpg",
      link: "/jaipur/artist/carpets",
      price: "₹ 599",
    },
    {
      title: "Textile and Block Printing",
      img: "/images/jaipur/textileBlock.jpg",
      link: "/jaipur/artist/textile",
      price: "₹ 599",
    },
  ],
};
const interestOptions = [
  "Historical",
  "Cultural",
  "Luxury Stay",
  "Local Food",
  "Adventure",
  "Shopping",
];

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = Number(searchParams.get("tab") || "1");
  const [selected, setSelected] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
const handleSelect = (ranges: RangeKeyDict) => {
  const selection = ranges.selection;

  // Manually extract and ensure the types are Date (not undefined)
  if (selection?.startDate instanceof Date && selection?.endDate instanceof Date) {
    setDateRange([
      {
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection',
      },
    ]);
  }
};
  // Trigger popup after 5 seconds
  useEffect(() => {
    const hasSeenHomePopup = sessionStorage.getItem("hasSeenHomePopup");

    if (!hasSeenHomePopup) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        sessionStorage.setItem("hasSeenHomePopup", "true");
      }, 100); // show after 100ms

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleTabChange = (tabIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabIndex.toString());
    router.push(`?${params.toString()}`, undefined, { scroll: false });
  };

  const handleScrollToTabs = () => {
    const navbarHeight = 69;
    if (tabsRef.current) {
      const top = tabsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className={styles.home}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h2>Explore Jaipur like a local</h2>
            <p>
              Personalized and Authentic Local Experiences Tailored Just for You
            </p>
            <button className="button" onClick={handleScrollToTabs}>
              Start Exploring
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsContainer} ref={tabsRef}>
          <div
            className={`${styles.tab} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(1)}
          >
            <span>Design My Journey</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 2 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(2)}
          >
            <span>Discover Moments</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 3 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(3)}
          >
            <span>Personal Query</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 4 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(4)}
          >
            <span>Travel Diaries</span>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.hero2}>
          {activeTab === 1 && (
            <div className={styles.itineraryTab}>
              <div className={styles.selectionBlocks}>
                <div
                  className={styles.selectionBlock}
                  onClick={() => window.open("/sightseeing", "_blank")}
                >
                  <Image
                    src="/images/sightseeing.jpg"
                    alt="Sightseeing"
                    width={500}
                    height={500}
                  />
                  <div className={styles.selectionBlockText}>
                    <h2>Sightseeing</h2>
                    <p>
                      Explore the city&apos;s iconic landmarks and hidden gems
                      with expert local guides. <br />
                      <span>
                        From <span className={styles.price}>₹5,999</span> per
                        person
                      </span>
                    </p>
                  </div>
                </div>

                {/* Homestays (disabled) */}
                <div
                  className={`${styles.selectionBlock} ${styles.disabledBlock}`}
                >
                  <span className={styles.comingSoonBadge}>
                    <Image
                      src="/images/comingSoon.png"
                      alt="Homestay"
                      width={200}
                      height={100}
                    />
                  </span>
                  <Image
                    className={styles.dullCard}
                    src="/images/Homestays.jpg"
                    alt="Homestay"
                    width={500}
                    height={500}
                  />
                  <div
                    className={`${styles.selectionBlockText} ${styles.dullCard}`}
                  >
                    <h2>Homestays</h2>
                    <p>
                      Live like a local – stay in authentic homes and experience
                      warm cultural hospitality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className={styles.sidebarLayout}>
              <div className={styles.sidebarButtons}>
                {[
                  "Explore Everything",
                  "Wilderness Escapes",
                  "Cultural Treasures",
                  "Time Traveler’s Picks",
                ].map((label, index) => (
                  <p
                    key={index}
                    className={selected === index ? styles.activeBtn : ""}
                    onClick={() => setSelected(index)}
                  >
                    {label}
                  </p>
                ))}
              </div>

              <div className={styles.tabContent}>
                <div className={styles.ecardContainer}>
                  {experiences[selected]?.map((item, i) => (
                    <div
                      key={i}
                      className={styles.ecard}
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        className={styles.ecardImage}
                        width={500}
                        height={300}
                      />
                      <p className={styles.title}>{item.title}</p>
                      <p>
                        Starting at{" "}
                        <span className={styles.price}>{item.price}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className={styles.queryContainer}>
              <div className={styles.imageSection}>
                <Image
                  src="/images/jaipur/query_img.jpg"
                  alt="Travel Road"
                  height={1000}
                  width={1000}
                />
              </div>

              <div className={styles.formSection}>
                <h2>
                  Design Your Dream <span>Jaipur Experience</span>
                </h2>
                <p className={styles.subtitle}>
                  Tell us your preferences and we’ll build a plan tailored to
                  you — no stress, just fun!
                </p>

                <form className={styles.queryForm}>
                  <div className={styles.row}>
                    <div className={styles.datepickerWrapper}>
                      <button
                        type="button"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={styles.datepickerButton}
                      >
                        <Image
                          src="/icons/calendar.png"
                          alt="calender"
                          width={20}
                          height={20}
                        />
                        {`${format(
                          dateRange[0].startDate,
                          "MMM d, yyyy"
                        )} → ${format(dateRange[0].endDate, "MMM d, yyyy")}`}
                      </button>

                      {showCalendar && (
                        <div className={styles.calendarPopup}>
                          <DateRange
                            editableDateInputs={true}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            months={2}
                            direction="horizontal"
                            minDate={new Date()}
                            rangeColors={["#007BFF"]}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <input type="number" placeholder="No. of Travellers" />
                    </div>
                    <div className={styles.field}>
                      <input type="tel" placeholder="Phone Number" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <input type="email" placeholder="Email (optional)" />
                    </div>
                    <div className={styles.field}>
                      <input type="text" placeholder="Preferred Budget (₹)" />
                    </div>
                  </div>

                  <div className={styles.tags}>
                    {interestOptions.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`${styles.tag} ${
                          selectedTags.includes(tag) ? styles.active : ""
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className={styles.field}>
                    <textarea
                      placeholder="E.g., I want a 3-day budget trip in Jaipur covering forts and local cuisine."
                      rows={5}
                    ></textarea>
                  </div>

                  <div className={styles.checkboxRow}>
                    <input type="checkbox" id="expertCall" />
                    <label htmlFor="expertCall">
                      I want an expert to call me
                    </label>
                  </div>

                  <button type="submit" className="button">
                    Submit Query
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className={styles.content}>
              📚 Read articles & local stories...
            </div>
          )}
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <HomePagePopupContent onClose={closePopup} />
      </Popup>
    </>
  );
}
