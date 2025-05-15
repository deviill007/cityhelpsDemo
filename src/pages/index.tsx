import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Popup from "@/components/Popup";
import HomePagePopupContent from "@/components/HomePagePopupContent";
import React from "react";


type Experience = { title: string; img: string; link: string };
const experiences: Record<number, Experience[]> = {
  0: [
    // Explore Everything
    {
      title: "Morning Treks",
      img: "/images/jaipur/morningTrek.jpg",
      link: "/jaipur/nature/morningTrek",
    },
    {
      title: "Elephant Walks",
      img: "/images/jaipur/elephantWalks.jpg",
      link: "/jaipur/nature/elephantWalks",
    },
    {
      title: "Leopard Safari",
      img: "/images/jaipur/leopardSafari.jpg",
      link: "/jaipur/nature/leopardSafari",
    },
    {
      title: "Handicrafts",
      img: "/images/jaipur/handicrafts.jpg",
      link: "/jaipur/artist/handicrafts",
    },
    {
      title: "Jewellery",
      img: "/images/jaipur/jewellery.jpg",
      link: "/jaipur/artist/jewellery",
    },
    {
      title: "Carpets",
      img: "/images/jaipur/carpets.jpg",
      link: "/jaipur/artist/carpets",
    },
    {
      title: "Textile and Block Printing",
      img: "/images/jaipur/textileBlock.jpg",
      link: "/jaipur/artist/textile",
    },
    {
      title: "Cooking",
      img: "/images/jaipur/cooking.jpg",
      link: "/jaipur/culture/cooking",
    },
    {
      title: "Yoga",
      img: "/images/jaipur/yoga.png",
      link: "/jaipur/culture/yoga",
    },
    {
      title: "Temple Walk",
      img: "/images/jaipur/temple.jpg",
      link: "/jaipur/culture/templeWalk",
    },
    {
      title: "Pottery",
      img: "/images/jaipur/pottery.jpg",
      link: "/jaipur/culture/pottery",
    },
    {
      title: "Street Food Walk",
      img: "/images/jaipur/streetFoods.jpg",
      link: "/jaipur/culture/streetFood",
    },
  ],
  1: [
    // Wilderness Escapes
    {
      title: "Morning Treks",
      img: "/images/jaipur/morningTrek.jpg",
      link: "/jaipur/nature/morningTrek",
    },
    {
      title: "Elephant Walks",
      img: "/images/jaipur/elephantWalks.jpg",
      link: "/jaipur/nature/elephantWalks",
    },
    {
      title: "Leopard Safari",
      img: "/images/jaipur/leopardSafari.jpg",
      link: "/jaipur/nature/leopardSafari",
    },
  ],
  2: [
    // Cultural Treasures
    {
      title: "Cooking",
      img: "/images/jaipur/cooking.jpg",
      link: "/jaipur/culture/cooking",
    },
    {
      title: "Yoga",
      img: "/images/jaipur/yoga.png",
      link: "/jaipur/culture/yoga",
    },
    {
      title: "Temple Walk",
      img: "/images/jaipur/temple.jpg",
      link: "/jaipur/culture/templeWalk",
    },
    {
      title: "Street Food Walk",
      img: "/images/jaipur/streetFoods.jpg",
      link: "/jaipur/culture/streetFood",
    },
  ],
  3: [
    // Time Traveler’s Picks
    {
      title: "Handicrafts",
      img: "/images/jaipur/handicrafts.jpg",
      link: "/jaipur/artist/handicrafts",
    },
    {
      title: "Jewellery",
      img: "/images/jaipur/jewellery.jpg",
      link: "/jaipur/artist/jewellery",
    },
    {
      title: "Carpets",
      img: "/images/jaipur/carpets.jpg",
      link: "/jaipur/artist/carpets",
    },
    {
      title: "Textile and Block Printing",
      img: "/images/jaipur/textileBlock.jpg",
      link: "/jaipur/artist/textile",
    },
  ],
};

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = Number(searchParams.get("tab") || "1");
  const [selected, setSelected] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tabsRef = useRef<HTMLDivElement | null>(null);

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
              {/* {innerTab === null && ( */}
                <div className={styles.selectionBlocks}>
                  {/* Sightseeing (enabled) */}
                  <div
                    className={styles.selectionBlock}
                    onClick={() => router.push("/sightseeing")}
                  >
                    <Image
                      src="/images/sightseeings.jpg"
                      alt="Sightseeing"
                      width={500}
                      height={500}
                    />
                    <div className={styles.selectionBlockText}>
                      <h2>Sightseeing</h2>
                      <p>
                        Explore the city&apos;s iconic landmarks and hidden gems with expert local guides.
                      </p>
                    </div>
                  </div>

                  {/* Homestays (disabled) */}
                  <div
                    className={`${styles.selectionBlock} ${styles.disabledBlock}`}
                  >
                    <span className={styles.comingSoonBadge}><Image
                      src="/images/comingSoon.png"
                      alt="Homestay"
                      width={200}
                      height={100}
                    /></span>
                    <Image
                      src="/images/jaipur/Homestay.jpg"
                      alt="Homestay"
                      width={500}
                      height={500}
                    />
                    <div className={styles.selectionBlockText}>
                      <h2>Homestays (Coming Soon)</h2>
                      <p>
                        Live like a local – stay in authentic homes and experience warm cultural hospitality.
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
                      <p>{item.title}</p>
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
                  Custom <span>Plan</span>
                </h2>
                <form className={styles.queryForm}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Date From</label>
                      <input type="date" />
                    </div>
                    <div className={styles.field}>
                      <label>Date To</label>
                      <input type="date" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>No. Of Travellers</label>
                      <input
                        type="number"
                        placeholder="Enter Total No. of Travellers"
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Phone Number</label>
                      <input type="tel" placeholder="(+91) Enter Phone no" />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Remarks</label>
                      <textarea
                        placeholder="E.g., I want a 3-day budget trip in Jaipur covering forts and local cuisine."
                        rows={15} // This controls height
                      ></textarea>
                    </div>
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
