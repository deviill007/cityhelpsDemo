import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Popup from "@/components/Popup";
import HomePagePopupContent from "@/components/HomePagePopupContent";
const defaultPlan = [
  {
    time: "7:00 AM",
    name: "Optional: Sunrise Rooftop Yoga",
    price: 600,
    category: "Culture",
    img: "🧘",
    description: "Start your day grounded with yoga on a heritage rooftop.",
    optional: true,
    alternatives: [
      {
        name: "Morning Walk + Temple Visit",
        price: 400,
        img: "🚶‍♂",
        description:
          "Leisurely walk through quiet lanes ending with temple darshan.",
      },
      {
        name: "Tea with Locals",
        price: 200,
        img: "🍵",
        description: "Visit a local chaiwala and share morning stories.",
      },
    ],
  },
  {
    time: "9:00 AM",
    name: "Amber Fort & Sheesh Mahal",
    price: 500,
    category: "Classic",
    img: "🏯",
    description:
      "Explore the grand Amber Fort, including the mirror palace (Sheesh Mahal), courtyards, and panoramic views of Maota Lake.",
    alternatives: [],
  },
  {
    time: "10:30 AM",
    name: "Panna Meena Ka Kund (Stepwell)",
    price: 100,
    category: "Classic",
    img: "🪜",
    description:
      "Visit this symmetrical 16th-century stepwell—a hidden gem known for its photogenic zigzag staircases.",
    alternatives: [],
  },
  {
    time: "11:30 AM",
    name: "Jal Mahal + Chai Stop",
    price: 100,
    category: "Classic",
    img: "🍵",
    description:
      "Scenic photo stop at the Water Palace in Man Sagar Lake with a quick kulhad chai break.",
    alternatives: [
      {
        name: "Block Printing Workshop",
        price: 800,
        img: "🖌",
        description: "Hands-on textile printing at an artisan studio.",
      },
      {
        name: "Miniature Painting / Pottery",
        price: 800,
        img: "🎨",
        description:
          "Create your own blue pottery or learn intricate miniature painting.",
      },
    ],
  },
  {
    time: "1:00 PM",
    name: "Home Cooking + Lunch",
    price: 1500,
    category: "Culture",
    img: "🍛",
    description:
      "Cook and eat with a Rajasthani family in their home. Learn regional recipes and stories behind each dish.",
    alternatives: [],
  },
  {
    time: "2:30 PM",
    name: "City Palace + Jantar Mantar",
    price: 300,
    category: "Classic",
    img: "🏰",
    description:
      "Visit the royal City Palace complex and Jantar Mantar observatory—both UNESCO heritage sites.",
    alternatives: [
      {
        name: "Cultural Street Walk",
        price: 500,
        img: "🚶",
        description:
          "Explore artisan lanes, temples, and Jaipur’s vibrant local life on foot.",
      },
      {
        name: "Hidden Temple Visit",
        price: 300,
        img: "🛕",
        description:
          "Visit lesser-known, spiritual temples with a cultural guide.",
      },
    ],
  },
  {
    time: "5:30 PM",
    name: "Nahargarh Sunset Point",
    price: 200,
    category: "Classic",
    img: "🌇",
    description:
      "Enjoy panoramic views of Jaipur at golden hour from the Nahargarh Fort ramparts.",
    alternatives: [],
  },
  {
    time: "6:30 PM",
    name: "Govind Dev Ji Aarti",
    price: 0,
    category: "Culture",
    img: "🪔",
    description:
      "Evening temple aarti with joyful chanting at one of Jaipur’s most beloved Krishna temples.",
    alternatives: [],
  },
  {
    time: "8:00 PM",
    name: "Optional: Local Market Visit or Rooftop Dinner",
    price: 0,
    category: "Culture",
    img: "🛍",
    description:
      "Explore night markets or enjoy a rooftop dinner with city views.",
    optional: true,
    alternatives: [
      {
        name: "Heritage Hotel Cultural Show",
        price: 600,
        img: "🎭",
        description:
          "Enjoy a folk dance and music performance with traditional dinner.",
      },
      {
        name: "Night Bazaar + Food Tasting",
        price: 400,
        img: "🍢",
        description:
          "Walk through lively local bazaars and sample Rajasthani snacks.",
      },
    ],
  },
];
const defaultPlanDay2 = [
  {
    time: "8:00 AM",
    name: "Albert Hall Museum",
    price: 300,
    category: "Classic",
    img: "🏛️",
    description: "Explore one of the oldest museums in Rajasthan.",
    optional: false,
    alternatives: [],
  },
  {
    time: "10:00 AM",
    name: "Galta Ji Monkey Temple",
    price: 200,
    category: "Spiritual",
    img: "🐒",
    description: "Beautiful temple surrounded by hills and monkeys.",
    optional: false,
    alternatives: [],
  },
  {
    time: "12:30 PM",
    name: "Sisodia Rani Garden",
    price: 250,
    category: "Nature",
    img: "🌺",
    description: "A peaceful garden perfect for a relaxing stroll.",
    optional: true,
    alternatives: [],
  },
  {
    time: "3:00 PM",
    name: "Patrika Gate",
    price: 150,
    category: "Photo Spot",
    img: "🎨",
    description: "Instagram-famous gate with colorful Rajasthani art.",
    optional: true,
    alternatives: [],
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();



  const tourDetails = {
    description: `Experience Jaipur like a local by taking an autorickshaw (also known as tuk-tuk in Southeast Asia) on this full-day sightseeing tour. Your friendly driver will pick you up from your hotel and take you to all the must-see attractions, such as the City Palace, Hawa Mahal or “Palace of Winds”, Jantar Mantar observatory, and Amber Fort. Get ready for an authentic and immersive experience of Jaipur’s rich culture and history!`,

    included: [
      "Private Tuk-Tuk with English speaking driver",
      "Fuel Charges / Parking / All other taxes",
      "Hotel / Airport Pickup and Drop-off",
      "Bottled water",
    ],

    excluded: [
      "Meal expenses",
      "Monuments entrance fee / Camera fee",
      "Personal expenses",
    ],

    pickupDetails: `We provide convenient pickup services from your hotel in Jaipur (please provide details), as well as the airport (please provide flight details), railway station (please provide train details), and bus station (please provide bus details). Let us take care of your transportation needs so you can focus on enjoying your trip.`,

    additionalInfo: [
      "Confirmation will be received at time of booking",
      "Children must be accompanied by an adult",
      "Each traveler is allowed a maximum of 1 suitcase and 1 carry-on bag. Oversized or excessive luggage (e.g. surfboards, golf clubs or bikes) may have certain restrictions, please inquire prior to travel to confirm if your excess luggage is acceptable",
      "Dress code is smart casual. A scarf is advised when short skirts / sleeveless tops are not recommended in the temple",
      "A moderate amount of walking is involved; please wear comfortable shoes",
      "Valid passport is required on the day of travel for all participants",
      "No heart problems or other serious medical conditions",
      "Most travelers can participate",
      "This is a private tour/activity. Only your group will participate",
    ],

    terms: [
      "Tour will be booked only after receiving 100% advance.",
      "Transaction fee 15% will be charged if the cancellation is made within 45 days and more than 30 days from the scheduled booking.",
      "50% cancellation will be charged on cancellation within last 30 days.",
      "100% cancellation will be charged on NO SHOW.",
      "Requests to amend the cancellation has to be made on +91-9929152946 / +91-8960531046 or on the corresponding email ID: jeeptourjaipur@gmail.com / inquirytourtechjaipur@gmail.com ONLY otherwise no cancellations will be entertained.",
      "In case of any increase in cost of Hotel, Airfare, Transport, govt. tax, fuel etc. we are bound to pass on the same increment.",
      "In case of any incorrect hotel / transport details, please report immediately.",
      "Any Hotel/Package Booking would be tentative unless you pay in advance and book on a confirmed basis.",
    ],

    liability: `Please note that after the finalization of the tour/service cost, if there are any hikes in entrance fees of monuments/museums, taxes, fuel cost or guide charges by the Govt of India and Rajasthan state government the same would be charged as extra.`,
  };
  type ItineraryItem = {
    time: string;
    name: string;
    price: number;
    category: string;
    img: string;
    description: string;
    optional: boolean;
    alternatives: {
      name: string;
      price: number;
      img: string;
      description: string;
    }[];
    selected: boolean;
  };

  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const [selectedDay, setSelectedDay] = useState("1 Day");
  const activeTab = Number(searchParams.get("tab") || "1");
  const [selected, setSelected] = useState(0);
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTill, setTravelTill] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [planName, setPlanName] = useState("1 Day Sightseeing in");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Trigger popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 100); // 5 seconds after page load

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    const plan = selectedDay === "1 Day" ? defaultPlan : defaultPlanDay2;

    const normalizedPlan = plan.map((item) => ({
      ...item,
      optional: item.optional ?? false,
      selected: !(item.optional ?? false),
    }));

    setItinerary(normalizedPlan);
    setPlanName(
      selectedDay === "1 Day" ? "1 Day Sightseeing in" : "2 Days Sightseeing in"
    );
  }, [selectedDay]);

  const handleTabChange = (tabIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabIndex.toString());
    router.push(`?${params.toString()}`);
  };

  const resetToDefault = () => {
    const plan =
      selectedDay === "1 Day"
        ? defaultPlan
        : [...defaultPlan, ...defaultPlanDay2];

    const normalizedPlan = plan.map((item) => ({
      ...item,
      optional: item.optional ?? false,
      selected: !(item.optional ?? false),
    }));

    setItinerary(normalizedPlan);
  };

  const handleReplace = (index: number, newItem: (typeof defaultPlan)[0]) => {
    const original = itinerary[index];

    // Check if original already exists in newItem.alternatives
    const isOriginalAlreadyThere = newItem.alternatives?.some(
      (alt) => alt.name === original.name
    );

    const updated = [...itinerary];
    updated[index] = {
      ...newItem,
      time: original.time,
      selected: true,
      optional: true,
      alternatives: isOriginalAlreadyThere
        ? [...newItem.alternatives]
        : [
            ...newItem.alternatives,
            {
              name: original.name,
              price: original.price,
              img: original.img,
              description: original.description,
            },
          ],
    };

    setItinerary(updated);
  };

  const basePrice = itinerary
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price, 0);

  const totalPrice = basePrice * travellers;

  const tabsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTabs = () => {
    const navbarHeight = 70; // adjust if your navbar is taller/shorter
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
          <h2>Explore Jaipur like a local</h2>
          {/* <h1 className={styles.heading}>Jaipur</h1> */}
          <p>
            Personalized and Authentic Local Experiences Tailored Just for You{" "}
          </p>
          <button className={styles.button} onClick={handleScrollToTabs}>
            Start Exploring
          </button>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsContainer} ref={tabsRef}>
          <div
            className={`${styles.tab} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(1)}
          >
            <span>Discover Moments</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 2 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(2)}
          >
            <span>Design My Journey</span>
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
          {activeTab === 2 && (
            <div className={styles.itineraryTab}>
              {/* Top Bar */}
              {/* <div className={styles.itiHeading}>
                <h1>
                  <span className={styles.fancy}>Design</span> Your Perfect Day
                  in
                  <span className={styles.city}> Jaipur</span>
                </h1>
                <h1>
                  {planName}
                  <span className={styles.city}> Jaipur</span>
                </h1>
                <p>
                  Start with the must-see Jaipur experiences and personalize it
                  by swapping selected stops with curated options. Travel time
                  between each stop is included for planning ease.
                </p>
              </div> */}

              <div className={styles.topBar}>
                <button onClick={resetToDefault} className={styles.button}>
                  Reset Default
                </button>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className={styles.dropdown}
                >
                  <option>1 Day</option>
                  <option>2 Day</option>
                </select>
              </div>
              <div className={styles.rowCards}>
                <div>
                  <details>
                    <summary>Tour Description</summary>
                    <p>{tourDetails.description}</p>
                  </details>

                  <details>
                    <summary>What’s Included</summary>
                    <ul>
                      {tourDetails.included.map((item, i) => (
                        <li key={i}>✅ {item}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>What’s Not Included</summary>
                    <ul>
                      {tourDetails.excluded.map((item, i) => (
                        <li key={i}>❌ {item}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>Pickup Details</summary>
                    <p>{tourDetails.pickupDetails}</p>
                  </details>

                  <details>
                    <summary>Additional Information</summary>
                    <ul>
                      {tourDetails.additionalInfo.map((info, i) => (
                        <li key={i}>📌 {info}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>Terms and Conditions</summary>
                    <ul>
                      {tourDetails.terms.map((term, i) => (
                        <li key={i}>📄 {term}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>Our Liabilities & Limitations</summary>
                    <p>{tourDetails.liability}</p>
                  </details>
                </div>
                {/* Cards */}
                <div className={styles.cardContainer}>
                  {itinerary.map((item, index) => (
                    <div key={index} className={styles.card}>
                      <div className={styles.cardHeader}>
                        {item.optional && (
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={item.selected}
                            onChange={(e) => {
                              const updated = [...itinerary];
                              updated[index].selected = e.target.checked;
                              setItinerary(updated);
                            }}
                          />
                        )}
                        <span className={styles.time}>{item.time}</span>
                        <span className={styles.emoji}>{item.img}</span>
                        <div className={styles.titleBlock}>
                          <h3>{item.name}</h3>
                          <p className={styles.category}>
                            {item.optional ? "Optional" : "Mandatory"} •{" "}
                            {item.category}
                          </p>
                        </div>
                        <span className={styles.price}>₹{item.price}</span>
                      </div>
                      <p className={styles.description}>{item.description}</p>

                      {/* Replace section */}
                      {item.alternatives.length > 0 && (
                        <div className={styles.replaceBox}>
                          {/* <label>Replace with:</label> */}
                          <select
                            className={styles.dropdown}
                            onChange={(e) => {
                              const selectedAlt =
                                item.alternatives[parseInt(e.target.value)];
                              if (selectedAlt) {
                                handleReplace(index, {
                                  ...selectedAlt,
                                  time: item.time,
                                  category: item.category,
                                  optional: true,
                                  alternatives: item.alternatives,
                                });
                              }
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Replace
                            </option>
                            {item.alternatives.map((alt, i) => (
                              <option key={i} value={i}>
                                {alt.img} {alt.name} (₹{alt.price})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <hr className={styles.hline} />
                    </div>
                  ))}
                </div>

                {/* Total Price & Button */}
                <div className={styles.bottomBar}>
                  <div className={styles.planInfo}>
                    <h3>🗺️ Itinerary Plan: {planName}</h3>
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
                          onChange={(e) =>
                            setTravellers(Number(e.target.value))
                          }
                          className={styles.travellerInput}
                        />
                      </label>
                    </div>
                  </div>

                  <div className={styles.totalAndBtn}>
                    <h3>Total Price: ₹{totalPrice}</h3>
                    <button className={styles.button}>Buy Itinerary</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className={styles.sidebarLayout}>
              <div className={styles.sidebarButtons}>
                <p
                  className={selected === 0 ? styles.activeBtn : ""}
                  onClick={() => setSelected(0)}
                >
                  Explore Everything
                </p>
                <p
                  className={selected === 1 ? styles.activeBtn : ""}
                  onClick={() => setSelected(1)}
                >
                  Wilderness Escapes
                </p>
                <p
                  className={selected === 2 ? styles.activeBtn : ""}
                  onClick={() => setSelected(2)}
                >
                  Cultural Treasures
                </p>
                <p
                  className={selected === 3 ? styles.activeBtn : ""}
                  onClick={() => setSelected(3)}
                >
                  Time Traveler’s Picks
                </p>
              </div>

              <div className={styles.tabContent}>
                {selected === 0 && (
                  <div className={styles.ecardContainer}>
                    <div className={styles.ecardContainer}>
                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/morningTrek")
                        }
                      >
                        <Image
                          src="/images/jaipur/morningTrek.jpg"
                          alt="Morning Treks"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Morning Treks</p>
                      </div>

                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/elephantWalks")
                        }
                      >
                        <Image
                          src="/images/jaipur/elephantWalks.jpg"
                          alt="Elephant Walks"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Elephant Walks</p>
                      </div>

                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/leopardSafari")
                        }
                      >
                        <Image
                          src="/images/jaipur/leopardSafari.jpg"
                          alt="Leopard Safari"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Leopard Safari</p>
                      </div>
                    </div>
                  </div>
                )}

                {selected === 1 && (
                  <div className={styles.ecardContainer}>
                    <div className={styles.ecardContainer}>
                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/morningTrek")
                        }
                      >
                        <Image
                          src="/images/jaipur/elephantWalks.jpg"
                          alt="Elephant Walks"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Morning Treks</p>
                      </div>

                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/elephantWalks")
                        }
                      >
                        <Image
                          src="/images/jaipur/elephantWalks.jpg"
                          alt="Elephant Walks"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Elephant Walks</p>
                      </div>

                      <div
                        className={styles.ecard}
                        onClick={() =>
                          router.push("/jaipur/nature/leopardSafari")
                        }
                      >
                        <Image
                          src="/images/jaipur/leopardSafari.jpg"
                          alt="Leopard Safari"
                          className={styles.cardImage}
                          width={500} // You can adjust width/height as needed
                          height={300}
                        />
                        <p>Leopard Safari</p>
                      </div>
                    </div>
                  </div>
                )}
                {selected === 2 && <div>🏰 History-related content here</div>}
                {selected === 3 && <div>🔥 Trending content here</div>}
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
                  <button type="submit" className={styles.button}>
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
