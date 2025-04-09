import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
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

  const [itinerary, setItinerary] = useState(() =>
    defaultPlan.map((item) => ({
      ...item,
      selected: !item.optional, // selected by default if not optional
    }))
  );

  const [selectedDay, setSelectedDay] = useState("1 Day");

  const [activeTab, setActiveTab] = useState(1); // Default tab
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const resetToDefault = () => {
    setItinerary(
      defaultPlan.map((item) => ({
        ...item,
        selected: !item.optional,
      }))
    );
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

  const totalPrice = itinerary
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price, 0);

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
          <button
            className={styles.button}
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: "smooth",
              })
            }
          >
            Start Exploring
          </button>
        </div>
        {/* <Image src="/images/Border.jpg" alt="Border" width={200} height={200} className={styles.borderImage}/> */}

        {/* Tabs Section */}
        <div className={styles.tabsContainer}>
          {/* <div className={styles.shadowBox}></div> */}
          <div
            className={`${styles.tab} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            <span>Sights</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 2 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            <span>Unique Experiences</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 3 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(3)}
          >
            <span>Custom Plan</span>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === 4 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(4)}
          >
            <span>Blogs</span>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.hero2}>
          {activeTab === 1 && (
            <div className={styles.itineraryTab}>
              {/* Top Bar */}
              <div className={styles.itiHeading}>
                <h1>Design Your Perfect Day in Jaipur</h1>
                <p>
                  Start with the must-see Jaipur experiences and personalize it
                  by swapping selected stops with curated options. Travel time
                  between each stop is included for planning ease.
                </p>
              </div>

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
                  <option disabled>2 Day (Coming Soon)</option>
                </select>
              </div>
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
                <h3>Total Price: ₹{totalPrice}</h3>
                <button className={styles.button}>Buy Itinerary</button>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className={styles.sidebarLayout}>
              <div className={styles.sidebarButtons}>
                <p
                  className={selected === 0 ? styles.activeBtn : ""}
                  onClick={() => setSelected(0)}
                >
                  For Nature Lover
                </p>
                <p
                  className={selected === 1 ? styles.activeBtn : ""}
                  onClick={() => setSelected(1)}
                >
                  For Culture Lover
                </p>
                <p
                  className={selected === 2 ? styles.activeBtn : ""}
                  onClick={() => setSelected(2)}
                >
                  For History Lover
                </p>
                <p
                  className={selected === 3 ? styles.activeBtn : ""}
                  onClick={() => setSelected(3)}
                >
                  Trending
                </p>
              </div>

              <div className={styles.tabContent}>
                {selected === 0 && (
                  <div className={styles.ecardContainer}>
                    <div
                      className={styles.ecard}
                      style={{
                        backgroundImage: `url(/images/jaipur/morningTrek.jpg)`,
                      }}
                      onClick={() => router.push("/jaipur/experience/nature/morningTrek")}
                    >
                      <p>Morning Treks</p>
                    </div>
                    <div
                      className={styles.ecard}
                      style={{
                        backgroundImage: `url(/images/jaipur/elephantWalks.jpg)`,
                      }}
                    >
                      <p>Elephant Walks</p>
                    </div>
                    <div
                      className={styles.ecard}
                      style={{
                        backgroundImage: `url(/images/jaipur/leopardSafari.jpg)`,
                      }}
                    >
                      <p>Leopard Safari</p>
                    </div>
                  </div>
                )}

                {selected === 1 && <div>🎭 Culture-related content here</div>}
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
    </>
  );
}
