// HomePagePopupContent.tsx
import Image from "next/image";

export default function HomePagePopupContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="home-popup">
      <Image src="/icons/bell.png" alt="CityHelps Logo" className="homeLogoPopup" width={50} height={50} />
      <h2>Welcome to <span>CityHelps</span></h2>
      <p>
        CityHelps is a company dedicated to providing top-tier services to improve the quality of life in urban areas. We are here to help!
      </p>
      <button onClick={onClose} className="button">
        Explore Our Services
      </button>
    </div>
  );
}
