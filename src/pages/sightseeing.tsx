import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React from "react";
import carImage from "@/components/animations/plane.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

const defaultPlan = [
  {
    time: "7:00 AM",
    name: "Optional: Sunrise Rooftop Yoga",
    price: 600,
    category: "Culture",
    imageUrl: "/images/jaipur/yoga.png", // Add your image path
    description: "Start your day grounded with yoga on a heritage rooftop.",
    optional: true,
    alternatives: [
      {
        name: "Morning Walk + Temple Visit",
        price: 400,
        imageUrl: "/images/jaipur/temple.jpg",
        description:
          "Leisurely walk through quiet lanes ending with temple darshan.",
      },
      {
        name: "Tea with Locals",
        price: 200,
        imageUrl: "/images/chai.jpg",
        description: "Visit a local chaiwala and share morning stories.",
      },
    ],
  },
  {
    time: "9:00 AM",
    name: "Amber Fort & Sheesh Mahal",
    price: 500,
    category: "Classic",
    imageUrl: "/images/jaipur/AmberFort.jpg",
    description:
      "Explore the grand Amber Fort, including the mirror palace (Sheesh Mahal), courtyards, and panoramic views of Maota Lake.",
    alternatives: [],
  },
  {
    time: "10:30 AM",
    name: "Panna Meena Ka Kund (Stepwell)",
    price: 100,
    category: "Classic",
    imageUrl: "/images/jaipur/PannaMeena.jpg",
    description:
      "Visit this symmetrical 16th-century stepwell—a hidden gem known for its photogenic zigzag staircases.",
    alternatives: [],
  },
  {
    time: "11:30 AM",
    name: "Jal Mahal + Chai Stop",
    price: 100,
    category: "Classic",
    imageUrl: "/images/jaipur/JalMahal.jpg",
    description:
      "Scenic photo stop at the Water Palace in Man Sagar Lake with a quick kulhad chai break.",
    alternatives: [
      {
        name: "Block Printing Workshop",
        price: 800,
        imageUrl: "/images/jaipur/textileBlock.jpg",
        description: "Hands-on textile printing at an artisan studio.",
      },
      {
        name: "Miniature Painting / Pottery",
        price: 800,
        imageUrl: "/images/jaipur/pottery.jpg",
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
    imageUrl: "/images/jaipur/cooking.jpg",
    description:
      "Cook and eat with a Rajasthani family in their home. Learn regional recipes and stories behind each dish.",
    alternatives: [],
  },
  {
    time: "2:30 PM",
    name: "City Palace + Jantar Mantar",
    price: 300,
    category: "Classic",
    imageUrl: "/images/jaipur/JantarMantar.jpg",
    description:
      "Visit the royal City Palace complex and Jantar Mantar observatory—both UNESCO heritage sites.",
    alternatives: [
      {
        name: "Cultural Street Walk",
        price: 500,
        imageUrl: "/images/street-walk.jpg",
        description:
          "Explore artisan lanes, temples, and Jaipur's vibrant local life on foot.",
      },
      {
        name: "Hidden Temple Visit",
        price: 300,
        imageUrl: "/images/jaipur/temple.jpg",
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
    imageUrl: "/images/jaipur/NahargarhSunset.jpg",
    description:
      "Enjoy panoramic views of Jaipur at golden hour from the Nahargarh Fort ramparts.",
    alternatives: [],
  },
  {
    time: "6:30 PM",
    name: "Govind Dev Ji Aarti",
    price: 0,
    category: "Culture",
    imageUrl: "/images/jaipur/GovindDevJi.jpg",
    description:
      "Evening temple aarti with joyful chanting at one of Jaipur's most beloved Krishna temples.",
    alternatives: [],
  },
  {
    time: "8:00 PM",
    name: "Optional: Local Market Visit or Rooftop Dinner",
    price: 0,
    category: "Culture",
    imageUrl: "/images/rooftop-dinner.jpg",
    description:
      "Explore night markets or enjoy a rooftop dinner with city views.",
    optional: true,
    alternatives: [
      {
        name: "Heritage Hotel Cultural Show",
        price: 600,
        imageUrl: "/images/cultural-show.jpg",
        description:
          "Enjoy a folk dance and music performance with traditional dinner.",
      },
      {
        name: "Night Bazaar + Food Tasting",
        price: 400,
        imageUrl: "/images/night-bazaar.jpg",
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
    imageUrl: "/images/albert-hall.jpg",
    description: "Explore one of the oldest museums in Rajasthan.",
    optional: false,
    alternatives: [],
  },
  {
    time: "10:00 AM",
    name: "Galta Ji Monkey Temple",
    price: 200,
    category: "Spiritual",
    imageUrl: "/images/monkey-temple.jpg",
    description: "Beautiful temple surrounded by hills and monkeys.",
    optional: false,
    alternatives: [],
  },
  {
    time: "12:30 PM",
    name: "Sisodia Rani Garden",
    price: 250,
    category: "Nature",
    imageUrl: "/images/garden.jpg",
    description: "A peaceful garden perfect for a relaxing stroll.",
    optional: true,
    alternatives: [],
  },
  {
    time: "3:00 PM",
    name: "Patrika Gate",
    price: 150,
    category: "Photo Spot",
    imageUrl: "/images/patrika-gate.jpg",
    description: "Instagram-famous gate with colorful Rajasthani art.",
    optional: true,
    alternatives: [],
  },
];

export default function sightseeing() {
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
    imageUrl: string; // Image path for main item
    description: string;
    optional: boolean;
    selected: boolean; // For optional items' selection state
    alternatives: {
      name: string;
      price: number;
      imageUrl: string; // Image path for alternatives
      description: string;
    }[];
  };

  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const [selectedDay, setSelectedDay] = useState("1 Day");
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTill, setTravelTill] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [planName, setPlanName] = useState("1 Day Sightseeing in");
  const [showReplaceDropdown, setShowReplaceDropdown] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const replaceButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

    const isOriginalAlreadyThere = newItem.alternatives?.some(
      (alt) => alt.name === original.name
    );

    const updated = [...itinerary];
    updated[index] = {
      ...newItem,
      time: original.time,
      selected: true,
      optional: original.optional,
      alternatives: isOriginalAlreadyThere
        ? [...newItem.alternatives]
        : [
            ...newItem.alternatives,
            {
              name: original.name,
              price: original.price,
              imageUrl: original.imageUrl,
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
      <div className={styles.innerContent}>
        

        <div className={styles.topBar}>
            <button className={styles.button} 
            onClick={() => router.back()}

        >
          <IoMdArrowRoundBack size={20} />
          Back
        </button>
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

        <div className={styles.mainContainer}>
          <div className={styles.itineraryContainer}>
            {/* Cards Grid on Left */}
            <div className={styles.cardsGrid}>
              {itinerary.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`${styles.card} ${
                      item.optional && !item.selected ? styles.dullCard : ""
                    }`}
                  >
                    {/* Card Buttons */}
                    <div className={styles.cardButtons}>
                      {item.optional && (
                        <label className={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => {
                              const updated = [...itinerary];
                              updated[index].selected = e.target.checked;
                              setItinerary(updated);
                            }}
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      )}

                      {item.alternatives.length > 0 && (
                        <button
                          className={styles.replaceButton}
                          ref={(el) => {
                            replaceButtonRefs.current[index] = el;
                          }}
                          // assign ref
                          onClick={() => {
                            const btn = replaceButtonRefs.current[index];
                            if (btn) {
                              const rect = btn.getBoundingClientRect();
                              setDropdownPosition({
                                top: rect.bottom + window.scrollY + 5, // few px below button
                                left: rect.right + window.scrollX,
                              });
                            }
                            setShowReplaceDropdown(
                              index === showReplaceDropdown ? -1 : index
                            ); // toggle
                          }}
                        >
                          <Image
                            src="/icons/replace.png"
                            alt="Replace"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>

                    {/* Card Image */}
                    <div className={styles.cardImage}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={1000}
                        height={1000}
                        // layout="responsive"
                      />
                    </div>

                    {/* Meta Info */}
                    <div className={styles.metaInfo}>
                      <span className={styles.time}>{item.time}</span>
                      <span className={styles.price}>₹{item.price}</span>
                    </div>

                    {/* Title */}
                    <h3 className={styles.cardTitle}>{item.name}</h3>

                    {/* Description (shown on hover) */}
                    <div className={styles.cardDescription}>
                      <p>{item.description}</p>
                    </div>

                    {/* Replace Dropdown */}
                  </div>

                  {/* Animated Path Line with Car after every 4 cards */}
                  {(index + 1) % 3 === 0 && index !== itinerary.length - 1 && (
                    <div className={styles.pathContainer} key={`path-${index}`}>
                      <div className={styles.pathLine}>
                        <div
                          className={styles.car}
                          style={
                            {
                              "--row-index": Math.floor(index / 4),
                            } as React.CSSProperties
                          }
                        >
                          <Image
                            src={carImage}
                            alt="Car Image"
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Payment Box on Right */}
            <div className={styles.paymentBox}>
              <div className={styles.planInfo}>
                <h3>🗺️ Itinerary Plan</h3>
                <h2>{planName}</h2>

                <div className={styles.inputGroup}>
                  <label>Travel Dates</label>
                  <div className={styles.dateInputs}>
                    <input
                      type="date"
                      value={travelFrom}
                      onChange={(e) => setTravelFrom(e.target.value)}
                      className={styles.dateInput}
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={travelTill}
                      onChange={(e) => setTravelTill(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Number of Travellers</label>
                  <div className={styles.travellerInputWrapper}>
                    <button
                      type="button"
                      className={styles.counterButton}
                      onClick={() =>
                        setTravellers((prev) => Math.max(1, prev - 1))
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={travellers}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 1) setTravellers(val);
                      }}
                      className={styles.travellerInput}
                    />
                    <button
                      type="button"
                      className={styles.counterButton}
                      onClick={() => setTravellers((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.priceSummary}>
                  <div className={styles.priceRow}>
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>Taxes & Fees</span>
                    <span>₹{(totalPrice * 0.18 * 0).toFixed(2)}</span>
                  </div>
                  <div className={styles.totalPrice}>
                    <span>Total</span>
                    <span>₹{(totalPrice * 1).toFixed(2)}</span>
                  </div>
                </div>

                <button className={styles.buyButton}>Buy Itinerary</button>
                <button className={styles.cartButton}>Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Description at Bottom */}
          <div className={styles.descriptionSection}>
            <details>
              <summary>Tour Description</summary>
              <p>{tourDetails.description}</p>
            </details>

            <details>
              <summary>What&apos;s Included</summary>
              <ul>
                {tourDetails.included.map((item, i) => (
                  <li key={i}>✅ {item}</li>
                ))}
              </ul>
            </details>

            <details>
              <summary>What&apos;s Not Included</summary>
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
        </div>
      </div>
      {showReplaceDropdown !== -1 && (
        <div
          className={styles.replaceDropdown}
          style={{
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 999,
          }}
        >
          {itinerary[showReplaceDropdown].alternatives.map((alt, i) => (
            <div
              key={i}
              className={styles.replaceOption}
              onClick={() => {
                handleReplace(showReplaceDropdown, {
                  ...alt,
                  time: itinerary[showReplaceDropdown].time,
                  category: itinerary[showReplaceDropdown].category,
                  optional: true,
                  alternatives: itinerary[showReplaceDropdown].alternatives,
                });
                setShowReplaceDropdown(-1);
              }}
            >
              <div className={styles.replaceInfo}>
                <span>{alt.name}</span>
                <span>₹{alt.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
